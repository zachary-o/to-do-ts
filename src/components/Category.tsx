import { FC, FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NewTodoInput from "./NewTodoInput";
import { ICategoryProps, ITodoProps } from "../interfaces";

import { Pencil, TrashCan } from "akar-icons";

const Category: FC<ICategoryProps & ITodoProps> = ({
  allCategories,
  setAllCategories,
  allTodos,
  setAllTodos,
}) => {
  const [editTaskId, setEditTaskId] = useState<string>("");
  const [oldTaskName, setOldTaskName] = useState<string>("");
  const [isColorsActive, setIsColorsActive] = useState<boolean>(false);

  const { categoryId } = useParams();
  const navigate = useNavigate();
  const currentCategory = allCategories.find(
    (category) => category.categoryId === categoryId
  );
  const categoryColors: string[] = [
    "#FF6868",
    "#FED568",
    "#74FF68",
    "#67C9FF",
    "#A168FF",
  ];

  const handleDeleteCategory = () => {
    const updatedTodos = allTodos.filter(
      (todo) => todo.categoryName !== currentCategory?.name
    );
    setAllTodos(updatedTodos);
    const updatedCategories = allCategories.filter(
      (category) => category.name !== currentCategory?.name
    );
    setAllCategories(updatedCategories);
    localStorage.setItem("savedTodos", JSON.stringify([...updatedTodos]));
    localStorage.setItem(
      "savedCategories",
      JSON.stringify([...updatedCategories])
    );
    navigate("/");
  };

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

  console.log(isColorsActive);
  return (
    <main>
      <div className="category-header">
        <h1>{currentCategory?.name}</h1>
        <TrashCan
          strokeWidth={2}
          size={18}
          onClick={() => handleDeleteCategory()}
        />
        <p
          className="category-color"
          onClick={() => setIsColorsActive(true)}
          style={{ backgroundColor: currentCategory?.color }}
        ></p>
        {isColorsActive && (
          <div className="colors-palette">
            {categoryColors.map((color, index) => (
              <p
                className="category-color"
                key={index}
                style={{ backgroundColor: color }}
              ></p>
            ))}
          </div>
        )}
      </div>
      <NewTodoInput
        allCategories={allCategories}
        setAllCategories={setAllCategories}
        allTodos={allTodos}
        setAllTodos={setAllTodos}
      />
      <div className="todos">
        {allTodos
          .filter((todo) => todo.categoryName === currentCategory?.name)
          .map((todo) => (
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
export default Category;
