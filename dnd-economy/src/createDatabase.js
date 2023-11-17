const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Function to create the database and tables
function createDatabase() {
    const dbPath = path.join(__dirname, 'database.db'); // Use __dirname to get the current script's directory
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
        } else {
            console.log('Connected to the database');

            // Create tables and perform other database setup here
            createTables(db);

            // Close the database connection when done
            db.close((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err.message);
                } else {
                    console.log('Closed the database connection');
                }
            });
        }
    });
}

// Rest of the code remains unchanged


// Function to create tables
function createTables(db) {
    // Create Materials table
    db.run(`
        CREATE TABLE IF NOT EXISTS Materials (
            material_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Error creating Materials table:', err.message);
        } else {
            console.log('Created Materials table');
        }
    });

    // Create Locations table
    db.run(`
        CREATE TABLE IF NOT EXISTS Locations (
            location_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            type TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating Locations table:', err.message);
        } else {
            console.log('Created Locations table');
        }
    });

    // Create Location_Materials table (Join Table)
    db.run(`
        CREATE TABLE IF NOT EXISTS Location_Materials (
            location_id INTEGER,
            material_id INTEGER,
            rarity TEXT,
            PRIMARY KEY (location_id, material_id),
            FOREIGN KEY (location_id) REFERENCES Locations(location_id),
            FOREIGN KEY (material_id) REFERENCES Materials(material_id)
        )
    `, (err) => {
        if (err) {
            console.error('Error creating Location_Materials table:', err.message);
        } else {
            console.log('Created Location_Materials table');
        }
    });

    // Create Categories table
    db.run(`
        CREATE TABLE IF NOT EXISTS Categories (
            category_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Error creating Categories table:', err.message);
        } else {
            console.log('Created Categories table');
        }
    });

    // Create Items table
    db.run(`
        CREATE TABLE IF NOT EXISTS Items (
            item_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            base_cost DECIMAL(10, 2)
        )
    `, (err) => {
        if (err) {
            console.error('Error creating Items table:', err.message);
        } else {
            console.log('Created Items table');
        }
    });

    // Create Item_Materials table (Join Table)
    db.run(`
        CREATE TABLE IF NOT EXISTS Item_Materials (
            item_id INTEGER,
            material_id INTEGER,
            percentage DECIMAL(5, 2) NOT NULL,
            PRIMARY KEY (item_id, material_id),
            FOREIGN KEY (item_id) REFERENCES Items(item_id),
            FOREIGN KEY (material_id) REFERENCES Materials(material_id)
        )
    `, (err) => {
        if (err) {
            console.error('Error creating Item_Materials table:', err.message);
        } else {
            console.log('Created Item_Materials table');
        }
    });

    // Create Item_Categories table (Join Table) with composite primary key
    db.run(`
        CREATE TABLE IF NOT EXISTS Item_Categories (
            item_id INTEGER,
            category_id INTEGER,
            PRIMARY KEY (item_id, category_id),
            FOREIGN KEY (item_id) REFERENCES Items(item_id),
            FOREIGN KEY (category_id) REFERENCES Categories(category_id)
        )
        `, (err) => {
        if (err) {
            console.error('Error creating Item_Categories table:', err.message);
        } else {
            console.log('Created Item_Categories table');
        }
    });


    // Create Shops table
    db.run(`
        CREATE TABLE IF NOT EXISTS Shops (
            shop_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            location_id INTEGER,
            general_quality TEXT NOT NULL,
            FOREIGN KEY (location_id) REFERENCES Locations(location_id)
        )
    `, (err) => {
        if (err) {
            console.error('Error creating Shops table:', err.message);
        } else {
            console.log('Created Shops table');
        }
    });

    // Create Shop_Categories table (Join Table)
    db.run(`
        CREATE TABLE IF NOT EXISTS Shop_Categories (
            shop_id INTEGER,
            category_id INTEGER,
            category_quality DECIMAL(5, 2),
            PRIMARY KEY (shop_id, category_id),
            FOREIGN KEY (shop_id) REFERENCES Shops(shop_id),
            FOREIGN KEY (category_id) REFERENCES Categories(category_id)
        )
    `, (err) => {
        if (err) {
            console.error('Error creating Shop_Categories table:', err.message);
        } else {
            console.log('Created Shop_Categories table');
        }
    });

    // Create Shop_Inventory table
    db.run(`
        CREATE TABLE IF NOT EXISTS Shop_Inventory (
            shop_inventory_id INTEGER PRIMARY KEY,
            shop_id INTEGER,
            item_id INTEGER,
            quantity INTEGER,
            shop_cost DECIMAL(10, 2),
            FOREIGN KEY (shop_id) REFERENCES Shops(shop_id),
            FOREIGN KEY (item_id) REFERENCES Items(item_id)
        )
    `, (err) => {
        if (err) {
            console.error('Error creating Shop_Inventory table:', err.message);
        } else {
            console.log('Created Shop_Inventory table');
        }
    });

    // Add more table creation code as needed for other tables
}

// Call the function to create the database if it doesnt exist
const dbPath = path.join(__dirname, 'database.db');
if (!fs.existsSync(dbPath)) {
  // Create the database and tables if the file doesn't exist
  createDatabase();
} else {
  console.log('Database file already exists. Skipping creation.');
}


