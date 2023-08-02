import { FC, FormEvent, useState, useRef, useEffect } from "react";

import { Pencil, Save, TrashCan } from "akar-icons";
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

  //   DELETE TASK FUNCTION

  const handleDeleteTask = (taskId: string) => {
    const updatedTodos = allTodos.filter((todo) => todo.taskId !== taskId);
    setAllTodos(updatedTodos);
    localStorage.setItem("savedTodos", JSON.stringify([...updatedTodos]));
  };

  // EDIT TASK FUNCTION

  const handleEditTask = (taskId: string) => {
    const editableTask = allTodos.find((todo) => todo.taskId === taskId);
    if (editableTask) {
      setOldTaskName(editableTask.taskName);
      setEditTaskId(taskId);
      setIsActiveInput((prev) => !prev);
    }
  };

  // CHECKBOX FUNCTION

  const handleTaskCheckbox = (taskId: string) => {
    const updatedTodos = allTodos.map((todo) =>
      todo.taskId === taskId
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo
    );
    setAllTodos(updatedTodos);
    localStorage.setItem("savedTodos", JSON.stringify(updatedTodos));
  };

  // SAVE NEW TASK NAME FUNCTION

  const handleTaskNameChange = (event: FormEvent<HTMLInputElement>) => {
    const newTaskName = event.currentTarget.value;
    setOldTaskName(newTaskName);

    const updatedTodos = allTodos.map((todo) =>
      todo.taskId === editTaskId ? { ...todo, taskName: newTaskName } : todo
    );
    setAllTodos(updatedTodos);
    localStorage.setItem("savedTodos", JSON.stringify([...updatedTodos]));
  };

  // SAVE NEW TASK CATEGORY FUNCTION

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

  // TASK'S CATEGORY COLOR FUNCTION

  const categoryColor = () => {
    const neededTask = allTodos.find((todo) => todo.taskId === taskId);
    const neededColor = allCategories.find(
      (category) => category.name === neededTask?.categoryName
    );
    return neededColor?.color;
  };

  // ACTIVE INPUT FOCUS
  useEffect(() => {
    if (isActiveInput) {
      todoRef.current?.focus();
    }
  }, [isActiveInput]);

  console.log(allTodos);

  return (
    // CHECKMARK
    <div key={taskId} className="todo">
      <div className="checkmark-taskname-container">
        <label className="checkmark-container">
          <input
            type="checkbox"
            onChange={() => handleTaskCheckbox(taskId)}
            checked={isCompleted}
            readOnly
          />
          <span className="checkmark"></span>
        </label>

        {/* EDIT TASK INPUT */}
        {isActiveInput ? (
          <form>
            <input
              type="text"
              spellCheck="false"
              ref={todoRef}
              value={oldTaskName}
              onChange={handleTaskNameChange}
              className="edit-todo-input"
            />
          </form>
        ) : (
          <p className="taskname">{taskName}</p>
        )}
      </div>

      <div className="category-icons-container">
        {" "}
        {/* SINGLE TASK CATEGORY */}
        {categoryName && (
          <div>
            <span
              style={{ backgroundColor: categoryColor() }}
              className="todo-category-color"
            >
              {categoryName.length > 10
                ? `${categoryName.slice(0, 10)}...`
                : categoryName}
            </span>

            {/* CATEGORY DROPDOWN */}
            {isActiveInput && (
              <select
                className="dropdown"
                value={categoryName}
                onChange={(event) => handleCategoryChange(event.target.value)}
              >
                {allCategories.map((category) => (
                  <option
                    value={category.name}
                    key={category.categoryId}
                    className="option"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
        {/* ICONS */}
        <div className="icons-container">
          {" "}
          {isActiveInput ? (
            <Save
              strokeWidth={2}
              size={18}
              className="icon"
              onClick={() => setIsActiveInput(false)}
            />
          ) : (
            <Pencil
              strokeWidth={2}
              size={18}
              onClick={() => handleEditTask(taskId)}
              className="icon"
            />
          )}
          <TrashCan
            strokeWidth={2}
            size={18}
            onClick={() => handleDeleteTask(taskId)}
            className="icon"
          />
        </div>
      </div>
    </div>
  );
};
export default TodoItem;
