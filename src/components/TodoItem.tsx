import { FC, FormEvent, useState, useRef, useEffect } from "react";

import { Pencil, TrashCan } from "akar-icons";
import { ICategory, ITodo } from "../interfaces";

interface ITodoItem {
  taskId: string;
  taskName: string;
  isCompleted: boolean;
  categoryName?: string;
  currentCategory?: ICategory | undefined;
  allTodos: ITodo[];
  setAllTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  allCategories: ICategory[];
  setAllCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

const TodoItem: FC<ITodoItem> = ({
  allTodos,
  setAllTodos,
  allCategories,
  taskId,
  taskName,
  isCompleted,
  categoryName,
}) => {
  const [oldTaskName, setOldTaskName] = useState<string>("");
  const [editTaskId, setEditTaskId] = useState<string>("");
  const [isActiveInput, setIsActiveInput] = useState<boolean>(false);

  const todoRef = useRef<HTMLInputElement>(null);

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
      setIsActiveInput((prev) => !prev);
    }
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

  const handleTaskNameChange = (event: FormEvent<HTMLInputElement>) => {
    const newTaskName = event.currentTarget.value;
    setOldTaskName(newTaskName);

    const updatedTodos = allTodos.map((todo) =>
      todo.taskId === editTaskId ? { ...todo, taskName: newTaskName } : todo
    );
    setAllTodos(updatedTodos);
    localStorage.setItem("savedTodos", JSON.stringify([...updatedTodos]));
  };

  const handleCategoryChange = (event: string) => {
    const selectedCategoryName = event;
    const updatedTodos = allTodos.map((todo) =>
      todo.taskId === taskId
        ? { ...todo, categoryName: selectedCategoryName }
        : todo
    );
    setAllTodos(updatedTodos);
    localStorage.setItem("savedTodos", JSON.stringify([...updatedTodos]));
  };

  const categoryColor = () => {
    const neededTask = allTodos.find((todo) => todo.taskId === taskId);
    const neededColor = allCategories.find(
      (category) => category.name === neededTask?.categoryName
    );
    return neededColor?.color;
  };

  useEffect(() => {
    todoRef.current?.focus();
  }, [isActiveInput]);

  console.log(allTodos);

  return (
    <div key={taskId} className="todo">
      <label className="checkmark-container">
        <input
          type="checkbox"
          onChange={() => handleTaskCheckbox(taskId)}
          checked={isCompleted}
          readOnly
        />
        <span className="checkmark"></span>
      </label>

      {editTaskId === taskId ? (
        <form>
          <input
            type="text"
            ref={todoRef}
            value={oldTaskName}
            onChange={handleTaskNameChange}
          />
        </form>
      ) : (
        <p>{taskName}</p>
      )}

      {categoryName && (
        <div>
          <span style={{ backgroundColor: categoryColor() }}>
            {categoryName}
          </span>
          {isActiveInput && (
            <select
              value={categoryName}
              onChange={(event) => handleCategoryChange(event.target.value)}
            >
              {allCategories.map((category) => (
                <option value={category.name} key={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
      <Pencil
        strokeWidth={2}
        size={18}
        onClick={() => handleEditTask(taskId)}
        className="icon"
      />
      <TrashCan
        strokeWidth={2}
        size={18}
        onClick={() => handleDeleteTask(taskId)}
        className="icon"
      />
    </div>
  );
};
export default TodoItem;
