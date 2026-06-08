import pandas as pd
import numpy as np

INPUT_FILE = "samples.csv"
OUTPUT_FILE = "eslint.csv"

def load_data():
    df = pd.read_csv(INPUT_FILE, engine="python", on_bad_lines="skip")

    df.columns = [c.strip().lower() for c in df.columns]

    required = ["category", "test", "engine", "n", "sample", "energy_uj"]
    for r in required:
        if r not in df.columns:
            raise ValueError(f"Missing column: {r}")

    df["n"] = pd.to_numeric(df["n"], errors="coerce")
    df["energy_uj"] = pd.to_numeric(df["energy_uj"], errors="coerce")

    df = df.dropna(subset=["n", "energy_uj"])

    return df

def aggregate(df):
    return (
        df.groupby(["engine", "category", "test", "n"])
        .agg(median_energy=("energy_uj", "median"))
        .reset_index()
    )

def filter_max_n(df):
    max_n = (
        df.groupby(["engine", "category"])["n"]
        .max()
        .reset_index()
        .rename(columns={"n": "max_n"})
    )

    df = df.merge(max_n, on=["engine", "category"])
    return df[df["n"] == df["max_n"]].drop(columns=["max_n"])

def compute_rules(df):
    rows = []

    for (engine, category), g in df.groupby(["engine", "category"]):

        best_row = g.loc[g["median_energy"].idxmin()]
        best_test = best_row["test"]
        best_energy = best_row["median_energy"]

        for _, r in g.iterrows():

            rows.append({
                "engine": engine,
                "category": category,
                "best_test": best_test,
                "candidate_test": r["test"],
                "best_energy": float(best_energy),
                "candidate_energy": float(r["median_energy"]),
                "ratio_to_best": float(r["median_energy"] / best_energy)
            })

    return pd.DataFrame(rows)

def main():
    df = load_data()
    agg = aggregate(df)
    max_n = filter_max_n(agg)
    rules = compute_rules(max_n)
    df.to_csv(OUTPUT_FILE, index=False)


if __name__ == "__main__":
    main()