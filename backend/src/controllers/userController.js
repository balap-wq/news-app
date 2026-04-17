import prisma from '../prismaClient.js';

export const createUser = async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
  });
  res.json(user);
};

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};