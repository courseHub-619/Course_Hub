const express = require("express");
const next = require("next");

const PORT = process.env.PORT || 4200;
const dev = process.env.NODE_ENV !== "production";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get("/test/user", async (req, res) => {
  console.log("hajaaaaaaaaaaaaa");
  const students = await prisma.student.findMany();
  return res.status(201).send(students);
});

// get one teacher profile

server.get("/teacher/:id", async (req, res) => {
  // console.log("kimotchiiiiiiiii", req.params.id);
  let teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: Number(req.params.id),
    },
  });
  console.log(teacher);
  return res.status(201).send(teacher);
});

//get all teacher profiles

server.get("/user/teachers", async (req, res) => {
  const teacher = await prisma.teacher.findMany({});
  console.log(teacher);
  return res.status(201).send(teacher);
});

// make a post
// const createPost = async (req, res) => {
//   const { title, body, teacher_id } = req.body;

//   prisma.query(
//     `INSERT INTO post author_id title body VALUES ($1, $2, $3)`,
//     [teacher_id, title, body],
//     (err, result) => {
//       if (err) {
//         throw err;
//       }
//       console.log("result", result, "response", res);
//       res.status(201).send("post added");
//     }
//   );
// };

var cors = require("cors");
server.use(cors());

server.post("/post", async (req, res) => {
  console.log("wabba lubba dub dub", req.body.body);
  let data = req.body;

  const post = await prisma.post.create({
    data: {
      title: data.body.title,
      body: data.body.body,
      author_id: data.body.teacher_id,
      Image: data.body.image,
    },
  });
  console.log("hajaaaa", post);
});

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Example app listening at http://localhost:${PORT}`);
});
