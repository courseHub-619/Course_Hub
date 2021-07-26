//admin     

//admin: all freecourses
app.get("/admin/freeCourse/all", async (req, res) => {
    const course = await prisma.free_course.findMany({})
    return res.status(201).send(course);
})
//admin: all posts
app.get("/admin/post/all", async (req, res) => {
    const posts = await prisma.post.findMany({})
    return res.status(201).send(posts);
})

//admin: Teacher
app.get("/admin/all/teacher", async (req, res) => {

    const teacher = await prisma.teacher.findMany({})
    return res.status(201).send(teacher);
})

//admin: students


app.get("/admin/students/all", async (req, res) => {

    const students = await prisma.student.findMany({})
    return res.status(201).send(students);
})

// admin : one student
app.get(`/admin/student/one/:id`, async (req, res) => {
    const student = await prisma.student.findUnique({
        where: {
            student_id: Number(req.params.id),
        },
    })
    return res.status(201).send(student);
})

//admin : student : delete

app.delete(`/admin/student/delete/:id`, async (req, res) => {

    const reviewIfExist = await prisma.review.findMany({
        where: {
            student: Number(req.params.id)
        }
    })

    if (reviewIfExist) {
        const post = await prisma.review.deleteMany({
            where: {
                student: Number(req.params.id)
            }
        })
    }
    const scheduleIfExistes = await prisma.schedule.findMany({
        where: {
            student: Number(req.params.id)                                            // Number(req.params.id) Refactor
        }
    })

    if (scheduleIfExistes) {
        const post1 = await prisma.schedule.deleteMany({
            where: {
                student: Number(req.params.id)                                            // Number(req.params.id) Refactor

            }
        })
    }

    const student = await prisma.student.delete({
        where: {
            student_id: Number(req.params.id)                                            // Number(req.params.id) Refactor

        }
    })
    return res.status(201).send("deleted");

})

//admin: one post

app.get(`/admin/posts/all/:id`, async (req, res) => {
    console.log("one post", req.params.id)

    const onePost = await prisma.post.findUnique({
        where: {
            post_id: Number(req.params.id),
        },
    });
    // console.log(oneCourse, "course here")
    return res.status(201).send(onePost);
});


// post: one : teacher
app.get(`/admin/posts/teacher/:id`, async (req, res) => {
    // console.log("teacher", req.params.id)

    const teacher = await prisma.teacher.findUnique({
        where: {
            teacher_id: 0                                                // Number(req.params.id) Refactor

        }
    })
    console.log(teacher, "teacher here")
    return res.status(201).send(teacher);
})

// freecourse : all

app.get(`/admin/freecourse/all/:id`, async (req, res) => {

    const freecourse = await prisma.free_course.findUnique({
        where: {
            freeCourse_id: Number(req.params.id)
            // Number(req.params.id)
        }
    })
    return res.status(201).send(freecourse);
})

// admin: freecourse : one : teacher
app.get(`/admin/freecourse/teacher/:id`, async (req, res) => {
    const freeCourse = await prisma.free_course.findMany({
        where: {
            freeCourse_id: Number(req.params.id)
        }
    })

    console.log("ya looootfiiiiiiiiiiiiii", freeCourse)
    const teacher = await prisma.teacher.findUnique({
        where: {
            teacher_id: freeCourse[0].teacher
            // Number(req.params.id)
        }
    })
    return res.status(201).send(teacher);
})


app.get(`/admin/freecourse/attachement/:id`, async (req, res) => {

    console.log("attachement", req.params.id)

    const freeCourse = await prisma.free_course.findUnique({
        where: {
            freeCourse_id: Number(req.params.id),
        },
    });

    const attachement = await prisma.attachement.findUnique({
        where: {
            attachement_id: Number(freeCourse.document),
        },
    });
    // console.log(attachement, "attachement here");
    return res.status(201).send(attachement);

})


// admin: teacher : all (static path)
app.get(`/admin/teacher/all`, async (req, res) => {
    // console.log("teacher", req.params.id)

    const teachers = await prisma.teacher.findMany({})

    console.log(teachers, "teacher here")
    return res.status(201).send(teachers);
})



// teacher: one 
app.get(`/admin/teacher/one/:id`, async (req, res) => {
    // console.log("teacher", req.params.id)

    const teacher = await prisma.teacher.findUnique({
        where: {
            teacher_id: Number(req.params.id)                                            // Number(req.params.id) Refactor

        }
    })
    console.log(teacher, "teacher here")
    return res.status(201).send(teacher);
})


//teacher: delete

app.delete('/admin/teacher/delete/:id', async (req, res) => {

    const postIfExist = await prisma.post.findMany({
        where: {
            author_id: Number(req.params.id)                                            // Number(req.params.id) Refactor

        }
    })

    if (postIfExist) {
        const post = await prisma.post.deleteMany({
            where: {
                author_id: Number(req.params.id)                                            // Number(req.params.id) Refactor

            }
        })
    }
    const freeCourseIfExistes = await prisma.free_course.findMany({
        where: {
            teacher: Number(req.params.id)                                            // Number(req.params.id) Refactor

        }
    })

    if (freeCourseIfExistes) {
        const post1 = await prisma.free_course.deleteMany({
            where: {
                teacher: Number(req.params.id)                                            // Number(req.params.id) Refactor

            }
        })
    }



    const teacher = await prisma.teacher.delete({
        where: {
            teacher_id: Number(req.params.id)                                            // Number(req.params.id) Refactor

        }
    })
    return res.status(201).send("deleted");


})

// free coure update status
app.put(`/admin/freeCourse/update/:id`, async (req, res) => {
    const update = await prisma.free_course.update({
        where: {
            freeCourse_id: Number(req.params.id),
        },
        data: {
            Status: 'Accepted',
        },
    })

    return res.status(201).send("Updated");
})

//free course : delete

app.delete(`/admin/freeCourse/delete/:id`, async (req, res) => {
    const deleteCourse = await prisma.free_course.delete({
        where: {
            freeCourse_id: Number(req.params.id),
        }
    })

    return res.status(201).send("Updated");
})

// post : update status
app.put(`/admin/post/update/:id`, async (req, res) => {
    const update = await prisma.post.update({
        where: {
            post_id: Number(req.params.id),
        },
        data: {
            status: 'Accepted',
        },
    })

    return res.status(201).send("Updated");
})

//post : delete
app.delete(`/admin/post/delete/:id`, async (req, res) => {
    const deleteCourse = await prisma.post.delete({
        where: {
            post_id: Number(req.params.id),
        }
    })

    return res.status(201).send("Updated");
})