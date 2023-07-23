import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import NewTodoInput from "./NewTodoInput";
import { ICategoryProps, ITodoProps } from "../interfaces";

import { Pencil, TrashCan } from "akar-icons";

const Category: FC<ICategoryProps & ITodoProps> = ({
  allCategories,
  setAllCategories,
  allTodos,
  setAllTodos,
}) => {
  const { categoryId } = useParams();
  const currentCategory = allCategories.find(
    (category) => category.categoryId === categoryId
  );

  const handleDeleteTask = (taskId: string) => {
    const updatedTodos = allTodos.filter((todo) => todo.taskId !== taskId);
    setAllTodos(updatedTodos);
    localStorage.setItem("savedTodos", JSON.stringify([...updatedTodos]));
  };

  return (
    <main>
      <h1>{currentCategory?.name}</h1>
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
export default Category;
