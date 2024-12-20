const { db } = require("../config/data.js");

const createTasks = async (username, task, task_order, category, status, date) => {
    try {
        const result = await db("tasks").insert(
            { username, task, task_order, category, status, date },
            ["id", "username", "task", "task_order", "category", "status", "date"]
        );
        return result;
    } catch (error) {
        console.error("Error in createTasks:", error.message);
        throw error;
    }
};
module.exports = {
    createTasks
};
