import { FC, FormEvent, useState } from "react";
import NewTodoInput from "./NewTodoInput";
import { ICategoryProps, ITodoProps } from "../interfaces";

import { Pencil, TrashCan } from "akar-icons";

const Main: FC<ICategoryProps & ITodoProps> = ({
  allCategories,
  setAllCategories,
  allTodos,
  setAllTodos,
}) => {
  const [editTaskId, setEditTaskId] = useState<string>("");
  const [oldTaskName, setOldTaskName] = useState<string>("");

  const handleDeleteTask = (taskId: string) => {
    const updatedTodos = allTodos.filter((todo) => todo.taskId !== taskId);
    setAllTodos(updatedTodos);
    localStorage.setItem("savedTodos", JSON.stringify([...updatedTodos]));
  };

  const handleEditTask = (taskId: string) => {
    const editableTask = allTodos.find((todo) => todo.taskId === taskId);
    if (editableTask) {
      setOldTaskName(editableTask.taskName);
      setEditTaskId(taskId);
    }
  };

  const handleTaskNameChange = (event: FormEvent<HTMLInputElement>) => {
    const newTaskName = event.currentTarget.value;
    setOldTaskName(newTaskName);

    const updatedTodos = allTodos.map((todo) =>
      todo.taskId === editTaskId ? { ...todo, taskName: newTaskName } : todo
    );
    setAllTodos(updatedTodos);
    localStorage.setItem("savedTodos", JSON.stringify([...updatedTodos]));
  };

  const handleTaskCheckbox = (taskId: string) => {
    const updatedTodos = allTodos.map((todo) =>
      todo.taskId === taskId
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo
    );
    setAllTodos(updatedTodos);
    localStorage.setItem("savedTodos", JSON.stringify(updatedTodos));
  };

  return (
    <main>
      <h1>All Tasks</h1>
      <NewTodoInput
        allCategories={allCategories}
        setAllCategories={setAllCategories}
        allTodos={allTodos}
        setAllTodos={setAllTodos}
      />
      <div className="todos">
        {allTodos.map((todo) => (
          <div key={todo.taskId} className="todo">
            <input
              type="checkbox"
              onChange={() => handleTaskCheckbox(todo.taskId)}
              checked={todo.isCompleted}
              readOnly
            />
            {editTaskId === todo.taskId ? (
              <form>
                <input
                  type="text"
                  value={oldTaskName}
                  onChange={handleTaskNameChange}
                />
              </form>
            ) : (
              <p>{todo.taskName}</p>
            )}
            {todo.categoryName && <span>{todo.categoryName}</span>}
            <Pencil
              strokeWidth={2}
              size={18}
              onClick={() => handleEditTask(todo.taskId)}
            />
            <TrashCan
              strokeWidth={2}
              size={18}
              onClick={() => handleDeleteTask(todo.taskId)}
            />
          </div>
        ))}
      </div>
    </main>
  );
};
export default Main;
