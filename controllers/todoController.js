const { db } = require("../config/data.js");
const { 
    _createTasks,
} = require("../models/todoModel.js");
const path = require("path");

const mainPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dashboardIndex.html"))
}
const loginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"))
}
const registerPage = (req, res) => {
    res.sendFile(path.join(__dirname,"../public/register.html"))
}

const createTasks = (req, res) => {
    
    try {
        console.log(req.body);
        const { username, task, task_order, category, status, date } = req.body;
        const newTask = { id: tasks.length + 1, username, task, task_order, category, status, date };
        tasks.push(newTask)
            .then((data) => {
                res.json({ message: "task inserted in table", data })
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({ msg: "something went wrong" })
            });
    } catch (e)
    {console.log(e)};
    
};


module.exports = {
    // getAllTasks,
    createTasks,
    mainPage,
    loginPage,
    registerPage,
}