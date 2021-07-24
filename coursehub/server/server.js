const express = require('express')
const next = require('next')
const http = require("http")

const PORT = process.env.PORT || 4200
const dev = process.env.NODE_ENV !== 'production'



const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()




const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

var cors = require('cors');
app.use(cors());

const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.emit("me", socket.id)

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })
})

// test
app.get("/test/user", async (req, res) => {
    // console.log("hajaaaaaaaaaaaaa")
    const students = await prisma.student.findMany()
    return res.status(201).send(students);
})


//freeCourses: al
app.get("/freecourse/all", async (req, res) => {
    // console.log("free course")
    const course = await prisma.free_course.findMany({})
    return res.status(201).send(course);
})

//freeCourses: Teacher
app.get("/freecourse/all/teacher", async (req, res) => {
    // console.log("teachers")
    const teacher = await prisma.teacher.findMany({})
    return res.status(201).send(teacher);
})

// FreeCourses: one freeCours
app.get(`/freecourse/all/:id`, async (req, res) => {
    console.log("one freeCourse", req.params.id)

    const oneCourse = await prisma.free_course.findUnique({
        where: {
            freeCourse_id: Number(req.params.id)
        }
    })
    // console.log(oneCourse, "course here")
    return res.status(201).send(oneCourse);
})

// freeCourse : one : attacemen
app.get(`/freecourse/attachement/:id`, async (req, res) => {
    console.log("attachement", req.params.id)

    const attachement = await prisma.attachement.findUnique({
        where: {
            attachement_id: Number(req.params.id)
        }
    })
    console.log(attachement, "attachement here")
    return res.status(201).send(attachement);
})

// freeCourse: one : teache
app.get(`/freecourse/teacher/:id`, async (req, res) => {
    // console.log("teacher", req.params.id)

    const teacher = await prisma.teacher.findUnique({
        where: {
            teacher_id: 1
            // Number(req.params.id)
        }
    })
    console.log(teacher, "teacher here")
    return res.status(201).send(teacher);
})

// freeCourse : post
app.post("/freecourse/post", async (req, res) => {
    // console.log("boooddddyyyyyyy", req.body)
    let data = req.body
    const attachement = await prisma.attachement.create({
        data: {
            Type: "text",
            attachement: data.fileUrl,
            body: data.body
        },
    })
    const post = await prisma.free_course.create({
        data: {
            title: data.title,
            category: data.category,
            image: data.url,
            document: attachement.attachement_id,
            teacher: 1 // teacher id 
        },
    })

})

server.listen(PORT, err => {
    if (err) throw err;
    console.log(`Example app listening at http://localhost:${PORT}`)
})


