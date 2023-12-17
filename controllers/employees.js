const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/employees
 * @desc Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch {
    res.status(500).json({ message: "Couldn't put the boat" });
  }
};

/**
 * @route POST /api/employees/add
 * @desc Добавление сотрудника
 * @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.rideType || !data.rideName || !data.description || !data.phone) {
      return res.status(400).json({ message: "All fields are requires" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
        isBlocked: true,
        isAvailable: true,
        isNewRide: true,
        rideFoto: "https://res.cloudinary.com/db6a9pof6/image/upload/v1702731620/p2ieang5ovs8b7waqkuz.png",
        categorias: " ",
        startPoints: "01",

        morningMonday: "m",
        isAvailableMondayMorning: true,
        afternoonMonday: "a",
        isAvailableMondayAfternoon: true,
        eveningMonday: "e1",
        isAvailableMondayEvening: true,
        extraMonday: "extra0",
        extraIsAvailableMonday: false,

        morningTuesday: "m",
        isAvailableTuesdayMorning: true,
        afternoonTuesday: "a",
        isAvailableTuesdayAfternoon: true,
        eveningTuesday: "e1",
        isAvailableTuesdayEvening: true,
        extraTuesday: "extra0",
        extraIsAvailableTuesday: false,

        morningWednesday: "m",
        isAvailableWednesdayMorning: true,
        afternoonWednesday: "a",
        isAvailableWednesdayAfternoon: true,
        eveningWednesday: "e1",
        isAvailableWednesdayEvening: true,
        extraWednesday: "extra0",
        extraIsAvailableWednesday: false,

        morningThursday: "m",
        isAvailableThursdayMorning: true,
        afternoonThursday: "a",
        isAvailableThursdayAfternoon: true,
        eveningThursday: "e1",
        isAvailableThursdayEvening: true,
        extraThursday: "extra0",
        extraIsAvailableThursday: false,

        morningFriday: "m",
        isAvailableFridayMorning: true,
        afternoonFriday: "a",
        isAvailableFridayAfternoon: true,
        eveningFriday: "e1",
        isAvailableFridayEvening: true,
        extraFriday: "extra0",
        extraIsAvailableFriday: false,

        morningSaturday: "m",
        isAvailableSaturdayMorning: true,
        afternoonSaturday: "a",
        isAvailableSaturdayAfternoon: true,
        eveningSaturday: "e1",
        isAvailableSaturdayEvening: true,
        extraSaturday: "extra0",
        extraIsAvailableSaturday: false,

        morningSunday: "m",
        isAvailableSundayMorning: true,
        afternoonSunday: "a",
        isAvailableSundayAfternoon: true,
        eveningSunday: "e1",
        isAvailableSundayEvening: true,
        extraSunday: "extra0",
        extraIsAvailableSunday: false,
      },
    });

    return res.status(201).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @route POST /api/empoyees/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch {
    res.status(500).json({ message: "Couldn't delete the boat" });
  }
};

/**
 * @route PUT /api/empoyees/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */
const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json("OK");
  } catch (err) {
    res.status(500).json({ message: "Couldn't edit the boat" });
  }
};

/**
 * @route GET /api/employees/:id
 * @desc Получение сотрудника
 * @access Private
 */
const employee = async (req, res) => {
  const { id } = req.params; // http://localhost:8000/api/employees/9fe371c1-361f-494a-9def-465959ecc098

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(employee);
  } catch {
    res.status(500).json({ message: "Не удалось получить сотрудника" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  employee,
};
