// import sqlite3 from 'sqlite3';
// import { open, Database } from 'sqlite';

// const dbName = 'tree.db';

// type DatabaseConnection = Database<sqlite3.Database, sqlite3.Statement>;

// export async function openOrCreateDatabase(): Promise<DatabaseConnection> {
//   try {
//     const db = await open({
//       filename: dbName,
//       driver: sqlite3.Database,
//     });

//     console.log(`Base de datos ${dbName} abierta exitosamente.`);

//     return db;
//   } catch (error:any) {
//     if (error.code === 'SQLITE_CANTOPEN') {
//       console.log(`La base de datos ${dbName} no existe. Creando una nueva...`);

//       const db = await open({
//         filename: dbName,
//         driver: sqlite3.Database,
//       });

//       // Crear la tabla de usuarios
//       await db.exec(`
//         CREATE TABLE IF NOT EXISTS usuarios (
//           id INTEGER PRIMARY KEY,
//           username TEXT NOT NULL,
//           password TEXT NOT NULL
//         );
//       `);

//       console.log('Tabla de usuarios creada exitosamente.');

//       return db;
//     } else {
//       throw error;
//     }
//   }
// }



