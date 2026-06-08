import pandas as pd

INPUT_FILE = "eslint.csv"
OUTPUT_FILE = "worst.csv"

def load_data():
    df = pd.read_csv(INPUT_FILE)
    df.columns = df.columns.str.strip()

    df["best_energy"] = pd.to_numeric(df["best_energy"], errors="coerce")
    df["candidate_energy"] = pd.to_numeric(df["candidate_energy"], errors="coerce")

    df = df.dropna(subset=["best_energy", "candidate_energy"])

    df["slowdown"] = df["candidate_energy"] / df["best_energy"]

    return df

def top2_per_category(df):
    df = df.sort_values(["category", "slowdown"], ascending=[True, False])

    return df.groupby("category", group_keys=False).head(2)

def rank_categories(df):
    return (
        df.groupby("category")["slowdown"]
        .max()
        .sort_values(ascending=False)
        .index
        .tolist()
    )

def main():
    df = load_data()

    top2 = top2_per_category(df)

    category_order = rank_categories(top2)

    rank_map = {c: i for i, c in enumerate(category_order)}
    top2["cat_rank"] = top2["category"].map(rank_map)

    top2 = top2.sort_values(
        ["cat_rank", "slowdown"],
        ascending=[True, False]
    )

    top2 = top2.drop(columns=["cat_rank"])
    top2 = top2.head(100)

    top2["case"] = (
        top2["engine"].astype(str) + " | " +
        top2["category"].astype(str) + " | " +
        top2["candidate_test"].astype(str)
    )

    out = top2[[
        "case",
        "engine",
        "category",
        "candidate_test",
        "best_energy",
        "candidate_energy",
        "slowdown"
    ]]

    out.to_csv(OUTPUT_FILE, index=False)

if __name__ == "__main__":
    main()