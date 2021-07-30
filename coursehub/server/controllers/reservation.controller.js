const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.availableDays = async (req, res) => {
  const days = await prisma.weekDay.findUnique({
    where: {
      teacher_id: Number(req.params.id),
    },
  });
  return res.status(201).send(days);
};

exports.availableSessions = async (req, res) => {
  const session = await prisma.sessions.findUnique({
    where: {
      teacher_id: Number(req.params.id),
    },
  });
  return res.status(201).send(session);
};

exports.getBalance = async (req, res) => {
  const balance = await prisma.student.findUnique({
    where: {
      student_id: Number(req.params.id),
    },
  });
  return res.status(201).send(balance);
};

exports.changeBalance = async (req, res) => {
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
};

exports.postReservation = async (req, res) => {
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
};

exports.getAvailableReservation = async (req, res) => {
  const scheduel = await prisma.schedule.findMany({
    where: {
      teacher: Number(req.params.id),
    },
  });
  return res.status(201).send(scheduel);
};

exports.getAvailableDay = async (req, res) => {
  const scheduel = await prisma.schedule.findMany({
    where: {
      teacher: Number(req.params.id),
      day: req.params.day,
    },
  });
  return res.status(201).send(scheduel);
};

exports.getAllReservation = async (req, res) => {
  const scheduel = await prisma.schedule.findMany({
    where: {
      teacher: Number(req.params.id),
    },
  });
  return res.status(201).send(scheduel);
};

exports.deleteReservation = async (req, res) => {
  const scheduel = await prisma.schedule.delete({
    where: {
      scheduel_id: Number(req.params.id),
    },
  });
  return res.status(201).send("deleted");
};
