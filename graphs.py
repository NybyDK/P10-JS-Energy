import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

INPUT_FILE = "samples.csv"
OUT_DIR = "graphs"

def load_data():
    df = pd.read_csv(INPUT_FILE)
    df.columns = df.columns.str.strip()

    df["energy_uj"] = pd.to_numeric(df["energy_uj"], errors="coerce")
    df["N"] = pd.to_numeric(df["N"], errors="coerce")

    df = df.dropna(subset=["energy_uj", "N"])
    return df

def normalize(df):
    return (
        df.groupby(["engine", "category", "test", "N"], as_index=False)
          .agg(energy_uj=("energy_uj", "mean"))
    )

def plot_engine_category(df, engine, category):
    d = df[(df["engine"] == engine) & (df["category"] == category)].copy()
    if d.empty:
        return

    os.makedirs(os.path.join(OUT_DIR, engine), exist_ok=True)

    d = d.sort_values("N")

    fig, ax = plt.subplots(figsize=(10, 6))

    for test, g in d.groupby("test"):
        g = g.sort_values("N")

        ax.plot(
            g["N"],
            g["energy_uj"],
            marker="o",
            linewidth=2,
            label=test
        )

    ax.set_xscale("log", base=2)
    ax.set_yscale("log", base=2)

    ax.set_title(f"{engine.upper()} — {category} Scaling")
    ax.set_xlabel("Iterations: N")
    ax.set_ylabel("Energy (µJ)")

    xticks = sorted(d["N"].unique())
    ax.set_xticks(xticks)
    ax.set_xticklabels([f"{int(v/1000)}k" for v in xticks])
    ax.tick_params(axis="x", rotation=45)

    ax.grid(True, which="both", linestyle="--", alpha=0.4)
    ax.legend(fontsize=8)

    plt.tight_layout()

    out_path = os.path.join(OUT_DIR, engine, f"{category}.pdf")
    plt.savefig(out_path, dpi=300)
    plt.close()

def main():
    df = load_data()
    df = normalize(df)

    for engine in sorted(df["engine"].unique()):
        for category in sorted(df["category"].unique()):
            plot_engine_category(df, engine, category)


if __name__ == "__main__":
    main()