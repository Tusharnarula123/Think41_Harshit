import mysql.connector
import csv
from datetime import datetime

# Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="ecommerce_chatbot"
)
cursor = conn.cursor()

# CSV files and tables
csv_files = {
    "distribution_centers.csv": "distribution_centers",
    "products.csv": "products",
    "inventory_items.csv": "inventory_items",
    "users.csv": "users",
    "orders.csv": "orders",
    "order_items.csv": "order_items"
}

# Parse and insert data
for csv_file, table in csv_files.items():
    with open(f"data/{csv_file}", "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            columns = ", ".join(row.keys())
            placeholders = ", ".join(["%s" for _ in row])
            query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders}) ON DUPLICATE KEY UPDATE id=id"
            values = [row[col] if row[col] else None for col in row.keys()]
            # Convert string dates to datetime
            for i, col in enumerate(row.keys()):
                if "at" in col and row[col]:
                    values[i] = datetime.strptime(row[col], "%Y-%m-%d %H:%M:%S")
                elif col in ["cost", "retail_price", "latitude", "longitude", "age", "num_of_item", "id"]:
                    values[i] = int(row[col]) if row[col].isdigit() else float(row[col]) if row[col] else None
            cursor.execute(query, values)

conn.commit()
cursor.close()
conn.close()
print("Data ingestion complete.")