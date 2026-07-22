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

//Routing 
app.get("/workexperience", (req, res) => {
    const workexperience = db.prepare("SELECT * FROM workexperience").all(); 
    res.json(workexperience); 
}); 

app.post("/workexperience", (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body; 

    if (!companyname || !jobtitle || !startdate)
        return res.status(400).json({ message: "Arbetsplatsens namn, jobbtitel och startdatum krävs." }); 

    const stmt = db.prepare(`
        INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)
        `);
        
    try {
        const result = stmt.run(companyname, jobtitle, location, startdate, enddate, description); 
        res.status(201).json({ id: result.lastInsertRowid, ...req.body }); 
    } catch (error) {
        res.status(500).json({ message: "Arbetserfarenheten kunde inte läggas till" });
    } 
});

app.put("/workexperience/:id", (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body; 

    if (!companyname || !jobtitle || !startdate)
        return res.status(400).json({ message: "Arbetsplatsens namn, jobbtitel och startdatum krävs." });

    const stmt = db.prepare(`
        UPDATE workexperience SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ?, description = ? WHERE id = ?
        `);
    
    try {
        const result = stmt.run(companyname, jobtitle, location, startdate, enddate, description, req.params.id); 
        res.status(201).json({ id: result.lastInsertRowid, ...req.body });
    } catch (error) {
        res.status(500).json({ message: "Arbetserfarenheten kunde inte uppdateras" }); 
    }
})

app.delete("/workexperience/:id", (req, res) => {
    const result = db.prepare(`
        DELETE FROM workexperience WHERE id = ?`).run(req.params.id); 
        res.json({ message: "Arbetserfarenheten borttagen"}); 
})