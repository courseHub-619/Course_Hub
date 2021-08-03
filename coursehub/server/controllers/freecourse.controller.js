const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.allFreecourses = async (req, res) => {
  const course = await prisma.free_course.findMany({
    where: {
      Status: "Accepted",
    },
  });
  return res.status(201).send(course);
};

exports.getAllTeachers = async (req, res) => {
  // console.log("teachers")
  const teacher = await prisma.teacher.findMany({});
  return res.status(201).send(teacher);
};

exports.getFreeCourse = async (req, res) => {
  console.log("one freeCourse", req.params.id);

  const oneCourse = await prisma.free_course.findUnique({
    where: {
      freeCourse_id: Number(req.params.id),
    },
  });
  // console.log(oneCourse, "course here")
  return res.status(201).send(oneCourse);
};

exports.getAttachement = async (req, res) => {
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
};

exports.getOneTeacher = async (req, res) => {
  // console.log("teacher", req.params.id)

  const teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: Number(req.params.id),
    },
  });
  console.log(teacher, "teacher here");
  return res.status(201).send(teacher);
};

exports.postFreeCourse = async (req, res) => {
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
};
