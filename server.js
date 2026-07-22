//Importerar paket
const express = require("express"); 
const Database = require("better-sqlite3"); 
const cors = require("cors"); 

//Kopplar mot databasen 
const db = new Database("laboration-2.db"); 

//Skapar server
const app = express(); 

//Middlewares 
app.use(cors()); //Tillåter cross-origin
app.use(express.json()); //Parsa json-body

//Startar servern
app.listen(5000, () => console.log("Servern är startad på port: 5000")); 
