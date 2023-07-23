import { FC } from "react";
import NewTodoInput from "./NewTodoInput";
import { ICategoryProps, ITodoProps } from "../interfaces";

import { Pencil, TrashCan } from "akar-icons";

const Main: FC<ICategoryProps & ITodoProps> = ({
  allCategories,
  setAllCategories,
  allTodos,
  setAllTodos,
}) => {
  const handleDeleteTask = (taskId: string) => {
    const updatedTodos = allTodos.filter((todo) => todo.taskId !== taskId);
    setAllTodos(updatedTodos);
    localStorage.setItem("savedTodos", JSON.stringify([...updatedTodos]));
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
            <input type="checkbox" />
            <p>{todo.taskName}</p>
            {todo.categoryName && <span>{todo.categoryName}</span>}
            <Pencil strokeWidth={2} size={18} />
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
