import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker

INPUT_FILE = "eslint.csv"
OUTPUT_FILE = "figures/bars"
CLIP_MAX = 10

def load_data():
    df = pd.read_csv(INPUT_FILE)
    df.columns = df.columns.str.strip()

    df["best_energy"] = pd.to_numeric(df["best_energy"], errors="coerce")
    df["candidate_energy"] = pd.to_numeric(df["candidate_energy"], errors="coerce")
    df = df.dropna(subset=["best_energy", "candidate_energy"])
    df["true_ratio"] = df["candidate_energy"] / df["best_energy"]

    return df

def get_category_order(df):
    return (
        df.groupby("category")["true_ratio"]
        .max()
        .sort_values(ascending=False)
        .head(25)
        .index
        .tolist()
    )

def color(v):
    if v <= 1.1:
        return "#2ecc71"
    elif v <= 2:
        return "#f1c40f"
    else:
        return "#e74c3c"

def plot_engine(df, engine, category_order):
    sub = df[df["engine"] == engine]

    summary = (
        sub.groupby("category")["true_ratio"]
        .max()
        .reindex(category_order)
        .dropna()
        .sort_values()
    )

    true_vals = summary
    clipped_vals = summary.clip(upper=CLIP_MAX)

    colors = [color(v) for v in true_vals.values]

    fig, ax = plt.subplots(figsize=(10, 7))

    ax.barh(clipped_vals.index, clipped_vals.values, color=colors)

    ax.axvline(1.0, color="black", linestyle="--", linewidth=1)

    ax.set_title(f"{engine.upper()} - Worst-Case Relative Energy Consumption")
    ax.set_xlabel(f"Ratio vs best (1.0 = best, clipped at {CLIP_MAX}x)")

    ax.set_xlim(0.8, CLIP_MAX + 0.5)

    ax.grid(True, axis="x", linestyle="--", alpha=0.4)
    ax.xaxis.set_major_locator(mticker.MultipleLocator(1))

    for i, (cat, val) in enumerate(true_vals.items()):
        if val > CLIP_MAX:
            ax.text(CLIP_MAX + 0.2, i, f"{val:.0f}x", va="center", fontsize=8)

    plt.tight_layout()
    plt.savefig(f"{OUTPUT_FILE}_{engine}.pdf")
    plt.close()

def main():
    df = load_data()

    engines = df["engine"].unique()
    category_order = get_category_order(df)

    for engine in engines:
        plot_engine(df, engine, category_order)

if __name__ == "__main__":
    main()