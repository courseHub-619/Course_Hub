const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getFreeCourses = async (req, res) => {
  const course = await prisma.free_course.findMany({});
  return res.status(201).send(course);
};

exports.getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({});
  return res.status(201).send(posts);
};

exports.getTeachers = async (req, res) => {
  const teacher = await prisma.teacher.findMany({});
  return res.status(201).send(teacher);
};

exports.getStudents = async (req, res) => {
  const students = await prisma.student.findMany({});
  return res.status(201).send(students);
};

exports.getOneStudent = async (req, res) => {
  const student = await prisma.student.findUnique({
    where: {
      student_id: Number(req.params.id),
    },
  });
  return res.status(201).send(student);
};

exports.deleteOneStudent = async (req, res) => {
  const reviewIfExist = await prisma.review.findMany({
    where: {
      student_id: Number(req.params.id),
    },
  });

  if (reviewIfExist) {
    const post = await prisma.review.deleteMany({
      where: {
        student_id: Number(req.params.id),
      },
    });
  }

  const feedbackIfexist = await prisma.feedback.findUnique({
    where: {
      student: Number(req.params.id),
    },
  });

  if (feedbackIfexist) {
    const post = await prisma.feedback.delete({
      where: {
        student: Number(req.params.id),
      },
    });
  }

  const scheduleIfExistes = await prisma.schedule.findMany({
    where: {
      student: Number(req.params.id), // Number(req.params.id) Refactor
    },
  });

  if (scheduleIfExistes) {
    const post1 = await prisma.schedule.deleteMany({
      where: {
        student: Number(req.params.id), // Number(req.params.id) Refactor
      },
    });
  }

  const student = await prisma.student.delete({
    where: {
      student_id: Number(req.params.id), // Number(req.params.id) Refactor
    },
  });
  return res.status(201).send("deleted");
};

exports.getOnePost = async (req, res) => {
  console.log("one post", req.params.id);

  const onePost = await prisma.post.findUnique({
    where: {
      post_id: Number(req.params.id),
    },
  });
  // console.log(oneCourse, "course here")
  return res.status(201).send(onePost);
};

exports.getOneTeacherPost = async (req, res) => {
  // console.log("teacher", req.params.id)

  const teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: Number(req.params.id), // Number(req.params.id) Refactor
    },
  });
  console.log(teacher, "teacher here");
  return res.status(201).send(teacher);
};

exports.getOneFreeCourse = async (req, res) => {
  const freecourse = await prisma.free_course.findUnique({
    where: {
      freeCourse_id: Number(req.params.id),
      // Number(req.params.id)
    },
  });
  return res.status(201).send(freecourse);
};

exports.getOneTeacherFreeCourse = async (req, res) => {
  const freeCourse = await prisma.free_course.findMany({
    where: {
      freeCourse_id: Number(req.params.id),
    },
  });
  console.log(freeCourse);
  const teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: freeCourse[0].teacher,
      // Number(req.params.id)
    },
  });
  return res.status(201).send(teacher);
};

exports.getFreeCourseAttachement = async (req, res) => {
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
  return res.status(201).send(attachement);
};

exports.getAllTeachers = async (req, res) => {
  // console.log("teacher", req.params.id)
  const teachers = await prisma.teacher.findMany({});
  console.log(teachers, "teacher here");
  return res.status(201).send(teachers);
};

exports.getOneTeacher = async (req, res) => {
  // console.log("teacher", req.params.id)

  const teacher = await prisma.teacher.findUnique({
    where: {
      teacher_id: Number(req.params.id), // Number(req.params.id) Refactor
    },
  });
  console.log(teacher, "teacher here");
  return res.status(201).send(teacher);
};

exports.deleteOneTeacher = async (req, res) => {
  const sessionsIfExist = await prisma.sessions.findMany({
    where: {
      teacher_id: Number(req.params.id), // Number(req.params.id) Refactor
    },
  });

  if (sessionsIfExist) {
    const session = await prisma.sessions.deleteMany({
      where: {
        teacher_id: Number(req.params.id), // Number(req.params.id) Refactor
      },
    });
  }

  const daysIfExist = await prisma.weekDay.findMany({
    where: {
      teacher_id: Number(req.params.id), // Number(req.params.id) Refactor
    },
  });

  if (daysIfExist) {
    const days = await prisma.weekDay.deleteMany({
      where: {
        teacher_id: Number(req.params.id), // Number(req.params.id) Refactor
      },
    });
  }

  const postIfExist = await prisma.post.findMany({
    where: {
      author_id: Number(req.params.id), // Number(req.params.id) Refactor
    },
  });

  if (postIfExist) {
    const post = await prisma.post.deleteMany({
      where: {
        author_id: Number(req.params.id), // Number(req.params.id) Refactor
      },
    });
  }
  const freeCourseIfExistes = await prisma.free_course.findMany({
    where: {
      teacher: Number(req.params.id), // Number(req.params.id) Refactor
    },
  });

  if (freeCourseIfExistes) {
    const post1 = await prisma.free_course.deleteMany({
      where: {
        teacher: Number(req.params.id), // Number(req.params.id) Refactor
      },
    });
  }

  const teacher = await prisma.teacher.delete({
    where: {
      teacher_id: Number(req.params.id), // Number(req.params.id) Refactor
    },
  });
  return res.status(201).send("deleted");
};

exports.updateFreeCourse = async (req, res) => {
  const update = await prisma.free_course.update({
    where: {
      freeCourse_id: Number(req.params.id),
    },
    data: {
      Status: "Accepted",
    },
  });

  return res.status(201).send("Updated");
};

exports.deleteFreeCourse = async (req, res) => {
  const deleteCourse = await prisma.free_course.delete({
    where: {
      freeCourse_id: Number(req.params.id),
    },
  });

  return res.status(201).send("Updated");
};

exports.updatePost = async (req, res) => {
  const update = await prisma.post.update({
    where: {
      post_id: Number(req.params.id),
    },
    data: {
      status: "Accepted",
    },
  });

  return res.status(201).send("Updated");
};

exports.deletePost = async (req, res) => {
  const deleteCourse = await prisma.post.delete({
    where: {
      post_id: Number(req.params.id),
    },
  });

  return res.status(201).send("Updated");
};
