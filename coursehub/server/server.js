const express = require('express')
const next = require('next')
const cors = require("cors");



const PORT = process.env.PORT || 4200
const dev = process.env.NODE_ENV !== 'production'




const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



var corsOptions = {
    origin: "http://localhost:3000"
  };
  
  



const server = express();
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cors(corsOptions));




server.get("/test/user", async (req, res) => {
    console.log("hajaaaaaaaaaaaaa")
    const students = await prisma.student.findMany()
    return res.status(201).send(students);
})

// this is the authStudents route we're importing
require("./routes/authStudents.routes")(server);
// this is the authTeachers route we're importing

require("./routes/authTeachers.routes")(server);

server.listen(PORT, err => {
    if (err) throw err;
    console.log(`Example app listening at http://localhost:${PORT}`)
})


