const Database = require("better-sqlite3");
const db = new Database("laboration-2.db"); //Skapar databas

//Skapar tabell i databas
db.exec(`
    DROP TABLE IF EXISTS workexperience; 
    CREATE TABLE IF NOT EXISTS workexperience (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    companyname TEXT NOT NULL, 
    jobtitle TEXT NOT NULL, 
    location TEXT, 
    startdate DATE NOT NULL, 
    enddate DATE, 
    description TEXT);
`); 

//Skriver ut att koden lyckades
console.log("Databas och tabell har skapats!")