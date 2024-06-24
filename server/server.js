//import express and prismaclient
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

//handle post request
app.post("/api/todos", async (req, res) => {
  const { task, status } = req.body;

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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
