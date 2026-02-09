const mongoose = require('mongoose');
require('dotenv').config({ path: `${__dirname}/../../.env` });

async function dropIndexes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notes-bookmark-db');
    console.log('Connected to MongoDB');

    // Drop all indexes from both collections
    const db = mongoose.connection;
    
    // Drop Note collection indexes
    try {
      await db.collection('notes').dropIndexes();
      console.log('✓ Dropped all indexes from notes collection');
    } catch (err) {
      if (err.message.includes('ns does not exist')) {
        console.log('ℹ Notes collection does not exist yet');
      } else {
        throw err;
      }
    }

    // Drop Bookmark collection indexes
    try {
      await db.collection('bookmarks').dropIndexes();
      console.log('✓ Dropped all indexes from bookmarks collection');
    } catch (err) {
      if (err.message.includes('ns does not exist')) {
        console.log('ℹ Bookmarks collection does not exist yet');
      } else {
        throw err;
      }
    }

    console.log('\n✓ Index cleanup complete!');
    console.log('The indexes will be recreated automatically when the server starts.\n');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error dropping indexes:', error.message);
    process.exit(1);
  }
}

dropIndexes();
