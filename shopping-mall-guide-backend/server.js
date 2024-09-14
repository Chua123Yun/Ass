const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json()); // For parsing application/json
app.use(cors()); // Enable CORS

const directoryDbFilePath = path.join(__dirname, '../assets/directory.sqlite'); // Path to directory.sqlite

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Initialize SQLite Database
const initDatabase = (dbPath) => {
  ensureDirectoryExists(path.dirname(dbPath));
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database', err);
    } else {
      console.log(`Database opened successfully at ${dbPath}`);
    }
  });

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS stores (
      id TEXT PRIMARY KEY,
      name TEXT,
      category TEXT,
      description TEXT,
      phone TEXT,
      floor TEXT,
      mapLocation TEXT
    )`);
  });

  return db;
};

// Handle store deletion
app.delete('/delete-store/:id', (req, res) => {
  const storeId = req.params.id;
  const filePath = path.join(__dirname, '../AssFolder/DetailPages', `${storeId}.tsx`);

  try {
    // Delete the .tsx file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Store component file ${filePath} deleted successfully.`);
    } else {
      console.log(`File ${filePath} does not exist.`);
    }

    // Delete store data from SQLite database
    const directoryDb = initDatabase(directoryDbFilePath);

    const deleteStoreData = (database) => {
      const stmt = database.prepare('DELETE FROM stores WHERE id = ?');
      stmt.run(storeId);
      stmt.finalize();
    };

    deleteStoreData(directoryDb);

    // Close the database connection
    directoryDb.close((err) => {
      if (err) console.error('Error closing directory database', err);
    });

    res.json({ message: 'Store deleted successfully' });
  } catch (err) {
    console.error('Failed to delete store:', err);
    res.status(500).json({ error: 'Failed to delete store' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
