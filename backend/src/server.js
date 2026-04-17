import express from "express";
// import express from "express" ---> "type":"module" in package.json

import notesRoutes from "./routes/notesRoutes.js"

// every file related to server can be stored on the src/ folder

import { connectDB } from "./config/db.js";
// to import the database connection

import dotenv from "dotenv";
dotenv.config();
// instead of hard-coding, we can store api-keys/other important
// variables in our .env file

import rateLimiter from "./middleware/rateLimiter.js";

const app=express();

import dns from 'dns'; // mongodb connection troubleshoot
dns.setServers(["1.1.1.1", "8.8.8.8"]); // to change dns


// to start the database we use connectDB();


app.use(express.json());
// app.use() can be used for middleware
// here, it parses JSON bodies: req.body
// middleware can be used for rate limiting
app.use(rateLimiter);
app.use((req,res,next)=>{
    console.log(`Request method is ${req.method} & Req URL is ${req.url}`);
    next();
});

app.use("/api/notes", notesRoutes);
// helps in clean coding


connectDB().then(()=>{
    app.listen(5001, () => {
        console.log("Server started on port 5001.");
    });
}); // first connects database, then starts the app


/*

app.get("/api/notes", (req, res)=>{
    res.status(200).send("you got 10 notes");
}); // if we 'GET' request for /api/notes, then res.send

// GET: get some data
// POST: create
// PUT: update
// DELETE: remove

// nodemon: allows real time changes to the server code

// Endpoint: URL + HTTP method

app.post("/api/notes", (req, res)=>{
    res.status(201).json({message:"Post created."})
});

app.put("/api/notes/:id", (req, res)=>{
    res.status(200).json({message:"Post updated."})
}); // the :id at the end is dynamic like /2 or /5

app.delete("/api/notes", (req, res)=>{
    res.status(200).json({message:"Post deleted."})
});

*/
// for clean/secure coding practices, we will put the above
// methods in routes -> notesRoutes.js


// npm run dev
