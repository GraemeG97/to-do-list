import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Request method:", req.method);
  try {
    if (req.method === "GET") {
      const todos = await prisma.todo.findMany();
      console.log("Todos fetched:", todos);
      res.status(200).json(todos);
    } else if (req.method === "POST") {
      const { task, status } = req.body;
      console.log("Received task:", task, "status:", status);

      if (!task || !status) {
        res.status(400).json({ error: "Task and status are required" });
        return;
      }

      const newTodo = await prisma.todo.create({
        data: {
          task,
          status,
        },
      });
      console.log("New todo created:", newTodo);
      res.status(201).json(newTodo);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
