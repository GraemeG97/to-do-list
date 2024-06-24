import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const todos = await prisma.todo.findMany();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: "Could not fetch todos" });
    }
  } else if (req.method === "POST") {
    const { task, status } = req.body;

    if (!task || !status) {
      res.status(400).json({ error: "Task and status are required" });
      return;
    }

    try {
      const newTodo = await prisma.todo.create({
        data: {
          task,
          status,
        },
      });
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: "Could not add todo task" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
