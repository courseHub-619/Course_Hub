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

//profile of the teacher, private:

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

app.post("/profile/student/form/feedback", async (req, res) => {
  let form = await prisma.feedback.create({
    data: {
      student: Number(req.body.Sid),
      stars: req.body.starsSelected,
      comment: req.body.comment,
    },
  });
  return res.status(201).send(form);
});

app.get("/profile/student/form", async (req, res) => {
  let form = await prisma.feedback.findMany({});
  return res.status(200).send(form);
});

app.get(`/all/blogs`, async (req, res) => {
  let blogs = await prisma.post.findMany({
    where: {
      status: "Accepted",
    },
  });
  return res.status(200).send(blogs);
});

app.use("/api/auth/teacher", require("./routes/authTeachers.routes.js"));

app.use("/api/auth/student", require("./routes/authStudents.routes.js"));

app.use("/api", require("./routes/buyPointsStudent.routes.js"));

app.use("/admin", require("./routes/admin.routes.js"));

app.use(`/teacher`, require("./routes/teacher.routes.js"));

app.use("/reservaition", require("./routes/reservation.routes.js"));

app.use("/freecourse", require("./routes/freecourse.routes.js"));

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Example app listening at http://localhost:${PORT}`);
});
