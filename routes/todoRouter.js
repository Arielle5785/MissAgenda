const { Router } = require("express");
const { getAllTasks,
    createTasks,
    mainPage,
    loginPage,
    registerPage,

} = require("../controllers/todoController.js");

const router = Router();

// router.get("/api/todo", getAllTasks );
// router.delete("/api/todo/:id", deleteTasks);
// router.put("/api/todo/:id", updateTasks);
router.post("/tasks", createTasks);
router.get("/home", mainPage);
router.post("/login", loginPage);
router.post("/register",registerPage)

module.exports = {
  todoRouter: router,
};
