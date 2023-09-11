import { openDB } from 'idb';

const initdb = async () =>

  // Create a new db named 'jate' using version 1,
  openDB('jate', 1, {

    // Add db schema if not there already,
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }

      // then create an Object Store w key path 'id'++
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  // Establish db connection
  const jateDB = await openDB('jate', 1);

  // After the db opens, create a new transx with r/w priv and open the obj store
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Pass the content into the store and save the result
  const request = store.put({ id: 1, value: content });
  const result = await request;

  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  // Establish db connection
  const jateDB = await openDB('jate', 1);

  // After the db opens, create a new read-only transaction and open the obj store
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Retrieve content from the store and save the result
  const request = store.getAll();
  const result = await request;

   return result;
};

initdb();
