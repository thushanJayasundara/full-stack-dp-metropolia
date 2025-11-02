/* // The data model for pet is as follows
{
    "model": "Corolla",
    "color": "Red",
    "age": 3
}
 */
let todoArray = [];

let nextId = 1;

function getAll() {
  return todoArray;
}

function addOne(task, completed, dueDate) {
  if (!task || !completed || !dueDate) {
    return false;
  }

  const newTodo = {
    id: nextId++,
    task,
    completed,
    dueDate,
  };

  todoArray.push(newTodo);
  return newTodo;
}

function findById(id) {
  const numericId = Number(id);
  const todo = todoArray.find((item) => item.id === numericId);
  return todo || false;
}

function updateOneById(id, updatedData) {
  const todo = findById(id);
  if (todo) {
    if (updatedData.task) todo.task = updatedData.task;
    if (updatedData.completed) todo.completed = updatedData.completed;
    if (updatedData.dueDate) todo.dueDate = updatedData.dueDate;
    return todo;
  }
  return false;
}

function deleteOneById(id) {
  const car = findById(id);
  if (car) {
    const initialLength = todoArray.length;
    todoArray = todoArray.filter((car) => car.id !== Number(id));
    return todoArray.length < initialLength;
  }
  return false;
}

if (require.main === module) {
  // Add cars
  let result = addOne("Abc", "True", 3);
  console.log(result);
  result = addOne("Xyz", "False", 2);
  console.log(result);

  console.log("getAll called:", getAll());

  console.log("findById called:", findById(1));

  console.log(
    "updateOneById called:",
    updateOneById(1, { age: 4, color: "Black" })
  );
  console.log("findById called after item updated:", findById(1));

  console.log("deleteOneById called:", deleteOneById(1));
  console.log("findById called after item deleted:", findById(1));
}

const ToDos = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

module.exports = ToDos;
