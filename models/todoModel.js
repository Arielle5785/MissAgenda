const { db } = require("../config/data.js");

const getAllTasksFromDB = () => {
  // Correctly set the WHERE clause for "username"
  return db("tasks")
    .select("task", "task_order", "category", "status")
    .where("username", "Canelle"); // Corrected syntax
};

// // Log the function call (not the function itself)
// getAllTasksFromDB().then(tasks => console.log(tasks)).catch(err => console.error(err));
getAllTasksFromDB()
  .then(tasks => {
    console.log("Tasks fetched:", tasks);
  })
  .catch(err => {
    console.error("Error fetching tasks:", err);
  });
module.exports = {
  getAllTasksFromDB,
};



// const createTasks = async (username, task, task_order, category, status, date) => {
//     try {
//         const result = await db("tasks").insert(
//             { username, task, task_order, category, status, date },
//             ["id", "username", "task", "task_order", "category", "status", "date"]
//         );
//         return result;
//     } catch (error) {
//         console.error("Error in createTasks:", error.message);
//         throw error;
//     }
// };
// module.exports = {
//     createTasks
// };
