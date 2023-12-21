//controler users
const { prisma } = require("../prisma/prisma-client");
const brypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route POST /api/user/deviceIdLogin
 * @desс Логин deviceId
 * @access Public
 */
const deviceIdLogin = async (req, res) => {
  try {
    const { deviceId } = req.body;

    if (deviceId === "" && deviceId === null && deviceId === undefined) {
      return res.status(400).json({ message: "Faild device id" });
    }

    const user = await prisma.user.findFirst({
      where: {
        deviceId,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        owner: user. owner,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "1d" }),
      });
    } else {
      return res
        .status(400)
        .json({ message: "Is the deviceId entered incorrectly" });
    }
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    // Закройте соединение с базой данных после выполнения запроса
    await prisma.$disconnect();
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    const password = data.password;
    const deviceId = data.deviceId;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in the required fields" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const isPasswordCorrect =
      user && (await brypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      if (deviceId) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            deviceId,
          },
        });
      }

      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        owner: user. owner,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "1d" }),
        deviceId: deviceId, // Возможно, вам также нужно вернуть deviceId в ответе
      });

      console.log("deviceId ", deviceId);
    } else {
      return res
        .status(400)
        .json({ message: "Is the username or password entered incorrectly" });
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
};


/**
 *
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res, next) => {
  try {
    const { email, password, name, phone, owner, deviceId } = req.body;

    if (!email || !password || !name || !phone) {
      return res
        .status(400)
        .json({ message: "Please fill in the required fields" });
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (registeredUser) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists" });
    }

    const salt = await brypt.genSalt(10);
    const hashedPassord = await brypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassord,
        newUser: true,
        isBlocked: false,
        owner: owner === true ? true : false,
        deviceId,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        phone,
        deviceId,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "1d" }),
      });
    } else {
      return res.status(400).json({
        message: "The user could not be created, try refreshing the page",
      });
    }
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    // Закройте соединение с базой данных после выполнения запроса
    await prisma.$disconnect();
  }
};

/**
 * @route POST /api/user/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch {
    res.status(500).json({ message: "Couldn't delete the user" });
  } finally {
    // Закройте соединение с базой данных после выполнения запроса
    await prisma.$disconnect();
  }
};

/**
 * @route POST /api/user/reloadeviceid/:id
 * @desc reloadeviceid
 * @access Private
 */
const reloadeviceid = async (req, res) => {
  const data = req.body;
  const email = data.email;
  const deviceId = data.deviceId;

  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        deviceId,
      },
    });

    res.status(204).json("Device Id was updated");
  } catch (err) {
    res.status(500).json({ message: "Couldn't update the Device Id" });
  } finally {
    await prisma.$disconnect();
  }
};

/**
 *
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany(); // Assuming you have a Prisma model named "User"

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Закройте соединение с базой данных после выполнения запроса
    await prisma.$disconnect();
  }
};

module.exports = {
  deviceIdLogin,
  reloadeviceid,
  login,
  register,
  current,
  getAllUsers,
  remove,
};
