const express = require('express')
const next = require('next')

const PORT = process.env.PORT || 4200
const dev = process.env.NODE_ENV !== 'production'



const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()




const server = express();
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
var cors = require('cors');
server.use(cors());


// test 
server.get("/test/user", async (req, res) => {
    // console.log("hajaaaaaaaaaaaaa")
    const students = await prisma.student.findMany()
    return res.status(201).send(students);
})


//freeCourses: all
server.get("/freecourse/all", async (req, res) => {
    // console.log("free course")
    const course = await prisma.free_course.findMany({})
    return res.status(201).send(course);
})

//freeCourses: Teachers
server.get("/freecourse/all/teacher", async (req, res) => {
    // console.log("teachers")
    const teacher = await prisma.teacher.findMany({})
    return res.status(201).send(teacher);
})

// FreeCourses: one freeCourse
server.get(`/freecourse/all/:id`, async (req, res) => {
    console.log("one freeCourse", req.params.id)

    const oneCourse = await prisma.free_course.findUnique({
        where: {
            freeCourse_id: Number(req.params.id)
        }
    })
    // console.log(oneCourse, "course here")
    return res.status(201).send(oneCourse);
})

// freeCourse : one : attacement
server.get(`/freecourse/attachement/:id`, async (req, res) => {
    console.log("attachement", req.params.id)

    const attachement = await prisma.attachement.findUnique({
        where: {
            attachement_id: Number(req.params.id)
        }
    })
    console.log(attachement, "attachement here")
    return res.status(201).send(attachement);
})

// freeCourse: one : teacher
server.get(`/freecourse/teacher/:id`, async (req, res) => {
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

server.post("/freecourse/post", async (req, res) => {
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


