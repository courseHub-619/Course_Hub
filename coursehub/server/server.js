const express = require('express')
const next = require('next')

const PORT = process.env.PORT || 4200
const dev = process.env.NODE_ENV !== 'production'



const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()




const server = express();
server.use(express.json())
server.use(express.urlencoded({ extended: false }))



server.get("/test/user", async (req, res) => {
    console.log("hajaaaaaaaaaaaaa")
    const students = await prisma.student.findMany()
    return res.status(201).send(students);
})



server.listen(PORT, err => {
    if (err) throw err;
    console.log(`Example app listening at http://localhost:${PORT}`)
})


