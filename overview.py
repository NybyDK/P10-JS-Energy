import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import os

INPUT_FILE = "eslint.csv"
OUT_DIR = "figures"
os.makedirs(OUT_DIR, exist_ok=True)

def load():
    df = pd.read_csv(INPUT_FILE)
    df.columns = [c.strip() for c in df.columns]
    return df

def remove_best(df):
    return df[df["ratio_to_best"] > 1].copy()

def engine_summary(df):
    d = remove_best(df)

    g = d.groupby("engine")["ratio_to_best"]

    return pd.DataFrame({
        "median": g.median(),
        "q1": g.quantile(0.25),
        "q3": g.quantile(0.75),
    }).sort_values("median", ascending=False)

def plot_engine(summary):
    plt.figure(figsize=(10, 5))

    x = np.arange(len(summary))

    plt.bar(x, summary["median"])

    plt.errorbar(
        x,
        summary["median"],
        yerr=[
            summary["median"] - summary["q1"],
            summary["q3"] - summary["median"]
        ],
        fmt="none",
        ecolor="black",
        elinewidth=1.5,
        capsize=4
    )

    plt.xticks(x, summary.index, rotation=30, ha="right")
    plt.title("Engine Efficiency (Median + IQR)")
    plt.ylabel("Relative Energy Consumption (x)")

    ax = plt.gca()
    ax.yaxis.set_major_locator(mticker.MultipleLocator(1))

    plt.grid(axis="y", linestyle="--", alpha=0.4)

    plt.tight_layout()
    plt.savefig(f"{OUT_DIR}/engine.pdf")
    plt.close()

def category_summary(df):
    d = remove_best(df)

    g = d.groupby("category")["ratio_to_best"]

    return pd.DataFrame({
        "median": g.median(),
        "q1": g.quantile(0.25),
        "q3": g.quantile(0.75),
    }).sort_values("median", ascending=False)

def plot_category(summary):
    plt.figure(figsize=(12, 6))

    x = np.arange(len(summary))

    plt.bar(x, summary["median"])

    plt.errorbar(
        x,
        summary["median"],
        yerr=[
            summary["median"] - summary["q1"],
            summary["q3"] - summary["median"]
        ],
        fmt="none",
        ecolor="black",
        elinewidth=1.5,
        capsize=4
    )

    plt.xticks(x, summary.index, rotation=45, ha="right")
    plt.title("Category Risk (Median + IQR)")
    plt.ylabel("Relative Energy Consumption (x)")

    ax = plt.gca()
    ax.yaxis.set_major_locator(mticker.MultipleLocator(2))

    plt.grid(axis="y", linestyle="--", alpha=0.4)

    plt.tight_layout()
    plt.savefig(f"{OUT_DIR}/category.pdf")
    plt.close()

def plot_distribution(df):
    d = remove_best(df)
    vals = d["ratio_to_best"].values

    plt.figure(figsize=(10, 5))

    max_cap = 100
    counts = np.zeros(max_cap + 1)

    for v in vals:
        if v >= max_cap:
            counts[max_cap] += 1
        else:
            idx = max(1, int(v))
            counts[idx] += 1

    x = np.arange(1, max_cap + 1)

    plt.bar(x, counts[1:], edgecolor="black")

    ticks = np.arange(0, 101, 10)
    labels = [str(t) for t in ticks]
    labels[-1] = "100+"

    plt.xticks(ticks, labels)

    plt.title("Relative Energy Consumption Distribution (>1x only)")
    plt.xlabel("Relative Energy Consumption (x)")
    plt.ylabel("Count")
    plt.grid(axis="y", linestyle="--", alpha=0.4)

    plt.tight_layout()
    plt.savefig(f"{OUT_DIR}/distribution.pdf")
    plt.close()

def plot_distribution_zoom(df):
    d = remove_best(df)
    vals = d["ratio_to_best"].values

    zoom = vals[vals <= 2]

    plt.figure(figsize=(10, 5))

    bins = np.arange(1, 2.01, 0.05)

    plt.hist(zoom, bins=bins, edgecolor="black")

    plt.title("Relative Energy Consumption Distribution (1x–2x)")
    plt.xlabel("Relative Energy Consumption (x)")
    plt.ylabel("Count")
    plt.grid(axis="y", linestyle="--", alpha=0.4)

    plt.tight_layout()
    plt.savefig(f"{OUT_DIR}/distribution-zoom.pdf")
    plt.close()

def main():
    df = load()

    eng = engine_summary(df)
    plot_engine(eng)

    cat = category_summary(df)
    plot_category(cat)

    plot_distribution(df)
    plot_distribution_zoom(df)

if __name__ == "__main__":
    main()