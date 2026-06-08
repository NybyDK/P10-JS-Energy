import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

INPUT_FILE = "eslint.csv"
OUTPUT_FILE = "figures/heatmap"

def load_data():
    df = pd.read_csv(INPUT_FILE)
    df.columns = df.columns.str.strip()

    df["best_energy"] = pd.to_numeric(df["best_energy"], errors="coerce")
    df["candidate_energy"] = pd.to_numeric(df["candidate_energy"], errors="coerce")
    df = df.dropna(subset=["best_energy", "candidate_energy"])

    df["slowdown"] = df["candidate_energy"] / df["best_energy"]

    return df


def build_matrix(df):
    pivot = df.pivot_table(
        index="category",
        columns="engine",
        values="slowdown",
        aggfunc="max"
    )

    pivot = pivot.fillna(1.0)

    return pivot


def sort_categories(pivot):
    severity = pivot.max(axis=1).sort_values(ascending=False)
    return pivot.loc[severity.index]


def plot_heatmap(pivot):
    import numpy as np
    import matplotlib.pyplot as plt

    data = pivot.values.copy()
    categories = pivot.index.tolist()
    engines = pivot.columns.tolist()

    category_order = pivot.max(axis=1).sort_values(ascending=False).index
    pivot = pivot.loc[category_order]

    data = pivot.values
    categories = pivot.index.tolist()

    CLIP = 10
    data_clipped = np.clip(data, 1, CLIP)

    plt.figure(figsize=(max(10, len(engines) * 1.2),
                        max(8, len(categories) * 0.25)))

    im = plt.imshow(
        data_clipped,
        aspect="auto",
        interpolation="nearest",
        vmin=1,
        vmax=CLIP
    )

    cbar = plt.colorbar(im)
    cbar.set_label(f"Relative energy consumption (color clipped at {CLIP}x)")

    plt.xticks(range(len(engines)), engines, rotation=45, ha="right")
    plt.yticks(range(len(categories)), categories)

    for i in range(len(categories)):
        for j in range(len(engines)):
            val = data[i, j]

            if val < 2:
                label = f"{val:.2f}x"
            elif val < 10:
                label = f"{val:.1f}x"
            else:
                label = f"{val:.0f}x"

            plt.text(
                j, i,
                label,
                ha="center",
                va="center",
                fontsize=7,
                color="black"
            )

    plt.title("Engine vs Category relative energy consumption (color clipped at 10x)")
    plt.tight_layout()

    plt.savefig(f"{OUTPUT_FILE}.pdf", dpi=300)
    plt.close()

def main():
    df = load_data()
    pivot = build_matrix(df)
    pivot = sort_categories(pivot)
    plot_heatmap(pivot)

if __name__ == "__main__":
    main()
