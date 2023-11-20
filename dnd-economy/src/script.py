import sqlite3
import json


def add_material(name, image_path):
    # Connect to the database
    conn = sqlite3.connect('dnd-economy\src\database.db')
    cursor = conn.cursor()

    # Insert material into the Materials table
    cursor.execute("INSERT INTO Materials (name, image_path) VALUES (?, ?)", (name, image_path))

    # Commit the changes and close the connection
    conn.commit()
    conn.close()



def display_material_columns():
    # Connect to the database
    conn = sqlite3.connect('dnd-economy\src\database.db')
    cursor = conn.cursor()

    # Execute the query to get column information
    cursor.execute("select * from materials")

    # Fetch all rows (each row contains information about a column)
    columns_info = cursor.fetchall()

    # Display the column information
    for column_info in columns_info:
        print(column_info)

    # Close the connection
    conn.close()

def get_materials():
    # Connect to the SQLite database
    conn = sqlite3.connect('dnd-economy\src\database.db')  # Make sure to adjust the database name if needed
    cursor = conn.cursor()

    # Query materials from the database
    cursor.execute('SELECT name, image_path FROM Materials')
    material_data = cursor.fetchall()

    # Convert the results to a dictionary
    material_dict = {name: image_path for name, image_path in material_data}

    # Close the database connection
    conn.close()

    return material_dict

# Example usage: print the material dictionary as a JSON string
if __name__ == "__main__":
    materials = get_materials()
    print(json.dumps(materials))
    display_material_columns()

