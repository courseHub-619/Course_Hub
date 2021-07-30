const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4200;
const dev = process.env.NODE_ENV !== "production";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config({ path: "/custom/path/to/.env" });
const { Server } = require("socket.io");
const server = http.createServer(app);

// server.use(express.json());
// server.use(express.urlencoded({ extended: false }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  var corsOptions = {
    origin: "http://localhost:3000",
  };

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

//upload a post by a certain teacher according to his id   // Lotfi new

// app.post("/post", async (req, res) => {
//   // console.log("wabba lubba dub dub", req.body.body);
//   let data = req.body;
//   const teacher = await prisma.teacher.findUnique({
//     where: {
//       teacher_id: Number(data.body.teacher_id),
//     },
//   });

//   console.log("tescherrrrr", teacher);

//   const post = await prisma.post.create({
//     data: {
//       title: data.body.title,
//       body: data.body.body,
//       author_id: teacher.teacher_id,
//       Image: data.body.image,
//       price: Number(data.body.price),
//     },
//   });
//   console.log("hajaaaa", post);
// });

//get all students

app.get("/student/all", async (req, res) => {
  // console.log("free course")
  const student = await prisma.student.findMany({});
  return res.status(201).send(student);
});

//check available days

app.get("/reservaition/day/available/:id", async (req, res) => {
  const days = await prisma.weekDay.findUnique({
    where: {
      teacher_id: Number(req.params.id),
    },
  });
  return res.status(201).send(days);
});

//check available sessions

app.get("/reservaition/session/available/:id", async (req, res) => {
  const session = await prisma.sessions.findUnique({
    where: {
      teacher_id: Number(req.params.id),
    },
  });
  return res.status(201).send(session);
});

//check student balance

app.get("/reservaition/balance/:id", async (req, res) => {
  const balance = await prisma.student.findUnique({
    where: {
      student_id: Number(req.params.id),
    },
  });
  return res.status(201).send(balance);
});

//minus student account
app.put("/reservaition/balance/:id/:price/:tId", async (req, res) => {
  let data = req.params;
  console.log(data);
  const teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: Number(req.params.tId),
    },
  });

  console.log(teacher.wallet, "heeeeeeeeeee");
  const balance1 = await prisma.teacher.update({
    where: {
      teacher_id: Number(req.params.tId),
    },
    data: {
      wallet: Number(teacher.wallet) + Number(req.params.price),
    },
  });

  const student = await prisma.student.findUnique({
    where: {
      student_id: Number(req.params.id),
    },
  });
  const balance = await prisma.student.update({
    where: {
      student_id: Number(req.params.id),
    },
    data: {
      wallet: student.wallet - req.params.price,
    },
  });

  return res.status(201).send("updated");
});

// scheduel

app.post("/reservation/scheduel", async (req, res) => {
  console.log(req.body, "bodyyyyyy");
  const scheduel = await prisma.schedule.create({
    data: {
      student: Number(req.body.id),
      teacher: Number(req.body.teacherId),
      day: req.body.day,
      session: req.body.session,
    },
  });
  return res.status(201).send(scheduel);
});

//Check teacher availability
app.get("/reservaition/available/:id", async (req, res) => {
  const scheduel = await prisma.schedule.findMany({
    where: {
      teacher: Number(req.params.id),
    },
  });
  return res.status(201).send(scheduel);
});

app.get("/reservaition/available/:id/:day", async (req, res) => {
  const scheduel = await prisma.schedule.findMany({
    where: {
      teacher: Number(req.params.id),
      day: req.params.day,
    },
  });
  return res.status(201).send(scheduel);
});

app.get("/reservaition/scheduel/:id", async (req, res) => {
  const scheduel = await prisma.schedule.findMany({
    where: {
      teacher: Number(req.params.id),
    },
  });
  return res.status(201).send(scheduel);
})





//freeCourses: all
app.get("/freecourse/all", async (req, res) => {
  // console.log("free course")
  const course = await prisma.free_course.findMany({});
  return res.status(201).send(course);
});

//freeCourses: al
app.get("/freecourse/all", async (req, res) => {
  // console.log("free course")
  const course = await prisma.free_course.findMany({});
  return res.status(201).send(course);
});

//freeCourses: Teacher
app.get("/freecourse/all/teacher", async (req, res) => {
  // console.log("teachers")
  const teacher = await prisma.teacher.findMany({});
  return res.status(201).send(teacher);
});

// FreeCourses: one freeCours
app.get(`/freecourse/all/:id`, async (req, res) => {
  console.log("one freeCourse", req.params.id);

  const oneCourse = await prisma.free_course.findUnique({
    where: {
      freeCourse_id: Number(req.params.id),
    },
  });
  // console.log(oneCourse, "course here")
  return res.status(201).send(oneCourse);
});

// freeCourse : one : attachement
app.get(`/freecourse/attachement/:id`, async (req, res) => {
  console.log("attachement", req.params.id);

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
});

// freeCourse: one : teacher
app.get(`/freecourse/teacher/:id`, async (req, res) => {
  // console.log("teacher", req.params.id)

  const teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: 0,
      // Number(req.params.id)
    },
  });
  console.log(teacher, "teacher here");
  return res.status(201).send(teacher);
});

// freeCourse : post
app.post("/freecourse/post", async (req, res) => {
  console.log("boooddddyyyyyyy", req.body);
  let data = req.body;
  const attachement = await prisma.attachement.create({
    data: {
      Type: "text",
      attachement: data.fileUrl,
      body: data.body,
    },
  });
  const post = await prisma.free_course.create({
    data: {
      title: data.title,
      category: data.category,
      image: data.url,
      document: attachement.attachement_id,
      teacher: Number(data.id), // teacher id
    },
  });
});


app.get("/profile/teacher/week/:id", async (req, res) => {
  let teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: Number(req.params.id),
    },
  });

  console.log(teacher, "hererererer");

  let days = await prisma.weekDay.findUnique({
    where: {
      weekDay_id: Number(teacher.teacher_id),
    },
  });

  return res.status(201).send(days);
});

app.get("/profile/teacher/session/:id", async (req, res) => {
  let teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: Number(req.params.id),
    },
  });

  console.log(teacher, "hererererer");

  let session = await prisma.sessions.findUnique({
    where: {
      sessions_id: Number(teacher.teacher_id),
    },
  });

  return res.status(201).send(session);
});

// require("./routes/authTeachers.routes")(app);
app.use("/api/auth/teacher", require("./routes/authTeachers.routes.js"));

// require("./routes/authStudents.routes")(app);
app.use("/api/auth/student", require("./routes/authStudents.routes.js"));

app.use("/admin", require("./routes/admin.routes.js"));

app.use(`/teacher`, require("./routes/teacher.routes.js"));

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Example app listening at http://localhost:${PORT}`);
});
