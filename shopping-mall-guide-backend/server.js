const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const directoryDbFilePath = path.join(__dirname, '../assets/directory.sqlite'); // Path to directory.sqlite

// Enable CORS
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

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

// Handle store creation
app.post('/create-store', (req, res) => {
  const { storeName, storeData } = req.body;
  const filePath = path.join(__dirname, '../AssFolder/DetailPages', `${storeData.id}.tsx`);

  try {
    // Create the .tsx file with the store component
    const storeComponent = `
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { stores } from '../CommonData'; // Import the stores object
import { useUserRole } from '../UserRoleContext'; // Context to get the user role
import { FloatingAction } from 'react-native-floating-action';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ${storeData.id} = () => {
  const navigation = useNavigation();
  const { userRole } = useUserRole();
  const storeData = stores.${storeData.category.toLowerCase()}.find(store => store.id === '${storeData.id}');
  const handleEdit = () => {
    navigation.navigate('EditScreen', { storeData });
  };

  const handleDelete = async () => {
    try {
      console.log('Sending delete request...');
      const response = await fetch(\`http://<Your-IP-Address>:3000/delete-store/\${storeData.id}\`, {
        method: 'DELETE',
      });
      console.log('Response status:', response.status);
      if (response.ok) {
        Alert.alert('Success', 'Store deleted successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to delete store.');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const actionsForAdmin = [
    {
      text: 'Edit',
      icon: require('../../icons/edit_icon.png'),
      name: 'edit',
      position: 1,
    },
    {
      text: 'Delete',
      icon: require('../../icons/delete_icon.jpg'),
      name: 'delete',
      position: 2,
    },
  ];

  const handleActionPress = (name) => {
    if (name === 'edit') handleEdit();
    else if (name === 'delete') handleDelete();
  };

  const Actions = [...(userRole === 'admin' ? actionsForAdmin : [])];

  return (
    <View style={styles.container}>
      <Image source={require('../DetailsPages/PagesImg/${storeData.id}.png')} style={styles.storeImage} />
      <View style={styles.storeInfo}>
        <View style={styles.storeDetails}>
          <Text style={styles.category}>{storeData.category}</Text>
          <Text style={styles.storeName}>{storeData.name}</Text>
          <Text style={styles.floor}>{storeData.floor}</Text>
          <Text style={styles.phoneNumber}>{storeData.phone}</Text>
        </View>
        <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate(storeData.mapLocation)}>
          <Text style={styles.mapButtonText}>Map</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{storeData.description}</Text>
      {userRole === 'admin' && (
        <FloatingAction
          actions={Actions}
          onPressItem={handleActionPress}
          floatingIcon={<MaterialCommunityIcons name="plus" size={24} color="#fff" />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, bottom: 50 },
  storeImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 16 },
  storeInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  storeDetails: { flex: 1 },
  category: { fontSize: 16, fontWeight: '600', color: '#555' },
  storeName: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  floor: { fontSize: 16, marginTop: 4, color: '#777' },
  phoneNumber: { fontSize: 16, color: '#777', marginTop: 4 },
  description: { fontSize: 16, marginTop: 16, lineHeight: 24, color: '#333' },
  mapButton: { backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center' },
  mapButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ${storeData.id};
`;

    fs.writeFileSync(filePath, storeComponent);
    console.log(`Store component file ${filePath} created successfully.`);

    // Insert store data into SQLite database
    const directoryDb = initDatabase(directoryDbFilePath);

    const insertStoreData = (database) => {
      const stmt = database.prepare('INSERT INTO stores (id, name, category, description, phone, floor, mapLocation) VALUES (?, ?, ?, ?, ?, ?, ?)');
      stmt.run(storeData.id, storeData.storeName, storeData.category, storeData.description, storeData.phone, storeData.floor, storeData.mapLocation);
      stmt.finalize();
    };

    insertStoreData(directoryDb);

    // Close the database connection
    directoryDb.close((err) => {
      if (err) console.error('Error closing directory database', err);
    });

    res.json({ message: 'Store created successfully' });
  } catch (err) {
    console.error('Failed to create store:', err);
    res.status(500).json({ error: 'Failed to create store' });
  }
});

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

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('store_created', (storeData) => {
    console.log('Store created:', storeData);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
