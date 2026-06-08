#!/bin/bash
set -euo pipefail

RAPL="/sys/class/powercap/intel-rapl:0/energy_uj"
MAX_ENERGY=$(cat /sys/class/powercap/intel-rapl:0/max_energy_range_uj)

ENGINES=("v8" "sm" "jsc" "graaljs" "hermes" "qjs" "xs")

for ENGINE in "${ENGINES[@]}"; do
    if ! command -v "$ENGINE" >/dev/null 2>&1; then
        echo "[FATAL] Engine not found: $ENGINE" >&2
        exit 1
    fi
done

SAMPLES=5
TARGET_TIME=10
OUT="samples.csv"

echo "category,test,engine,N,sample,energy_uj,time_s,mem_kb" > "$OUT"

fmt_time() { awk -v x="$1" 'BEGIN{printf "%.6f", x}'; }

run_bench() {
    local engine="$1"
    local file="$2"
    local start_e start_t end_e end_t mem

    start_e=$(cat "$RAPL")
    start_t=$(date +%s%N)

    mem=$(/usr/bin/time -f "%M" "$engine" "$file" 2>&1)

    end_e=$(cat "$RAPL")
    end_t=$(date +%s%N)

    local energy=$((end_e - start_e))
    if (( energy < 0 )); then
        energy=$((energy + MAX_ENERGY))
    fi

    local time_s
    time_s=$(awk -v a="$start_t" -v b="$end_t" 'BEGIN {print (b-a)/1e9}')

    echo "$time_s|$energy|$mem"
}

calibrate_n_max() {
    local engine="$1"
    local template="$2"
    local N=1024
    local last_good=1024
    local t
    local category
    category=$(basename "$(dirname "$template")")

    echo "---- CALIBRATION [$engine][$category] ----" >&2

    while true; do
        tmp=$(mktemp)
        sed "s/__ITERATIONS__/$N/g" "$template" > "$tmp"

        t=$(run_bench "$engine" "$tmp" | cut -d'|' -f1)

        printf "TRY N=%12d time=%s\n" "$N" "$(fmt_time "$t")" >&2

        rm "$tmp"

        awk -v t="$t" -v target="$TARGET_TIME" 'BEGIN {exit !(t >= target)}' && break

        last_good=$N
        N=$((N * 2))
    done

    echo "$last_good"
}

run_suite() {
    local engine="$1"
    local category_dir="$2"
    local N_max="$3"
    local category
    category=$(basename "$category_dir")

    echo ""
    echo "========================================"
    echo "ENGINE: $engine | CATEGORY: $category | N_max=$N_max"
    echo "========================================"

    for template in "$category_dir"/*.js; do
        [ -f "$template" ] || continue

        local testname
        testname=$(basename "$template" .js)

        for ((N=1024; N<=N_max; N*=2)); do

            tmp=$(mktemp)
            sed "s/__ITERATIONS__/$N/g" "$template" > "$tmp"

            for ((i=1;i<=SAMPLES;i++)); do
                result=$(run_bench "$engine" "$tmp")
                IFS="|" read -r t e mem <<< "$result"

                echo "RUN $category $testname $engine N=$N sample=$i $(fmt_time "$t")s ${e}µJ ${mem}KB"
                echo "$category,$testname,$engine,$N,$i,$e,$t,$mem" >> "$OUT"

                sleep 1
            done

            rm "$tmp"
        done
    done
}

for ENGINE in "${ENGINES[@]}"; do
    for CATEGORY_DIR in templates/*; do
        BASELINE="$CATEGORY_DIR/baseline.js"

        if [[ ! -f "$BASELINE" ]]; then
            echo "Skipping $CATEGORY_DIR (no baseline)" >&2
            continue
        fi

        N_MAX=$(calibrate_n_max "$ENGINE" "$BASELINE")

        run_suite "$ENGINE" "$CATEGORY_DIR" "$N_MAX"
    done
done

echo "DONE -> $OUT"
