import express from "express";

const app = express();
app.use(express.json());
const TODOS = [
    {id: "1", title: "อ่านbook", done: false, priority: "high"},
    {id: "2", title: "เขียนbook", done: false, priority: "medium"},
    {id: "3", title: "เล่นเกม", done: true, priority: "high"},
    {id: "4", title: "วาดรูป", done: false, priority: "low"},
];

const PRIORITY = [ "high", "medium", "low"];
function validateTodo( req, res, next) {
    const { title, priority } = req.body ?? {};

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ error: "ต้องมี title เป็นข้อความ" });
    }
    if (priority !== undefined && !PRIORITY.includes(priority)) {
        return res.status(400).json({ error: "priority ไม่ถูกต้อง" });
    }
    return next();
}

const todoRouter = express.Router();
todoRouter.get("/health", (req, res)=>{
    res.status(200).json({ status: "ok"});
});
todoRouter.get("/", (req, res) => {
  res.json(TODOS.map((t) => ({ ...t })));
});
todoRouter.get("/:id", (req, res) => {
  const todo = TODOS.find((t) => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` });
  }
  return res.json({...todo});
});

todoRouter.post("/todos", validateTodo, (req, res) => {
    const created = {
        id: String(TODOS.length + 1),
        title: req.body.title,
        done: false,
        priority: req.body.priority ?? "normal",
    };
    TODOS.push(created);
    res.status(201).json({ ...created });
});

app.use("/api/v1/todos", todoRouter);

app.listen(3000, ()=>{
    console.log("เซิฟเวอร์ทำงานที่ http://localhost:3000");
});