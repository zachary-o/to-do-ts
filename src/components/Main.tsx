import { FC, useState, useRef, useEffect } from "react";
import NewTodoInput from "./NewTodoInput";
import TodoItem from "./TodoItem";
import { ICategoryProps, ITodoProps } from "../interfaces";

const Main: FC<ICategoryProps & ITodoProps> = ({
  allCategories,
  setAllCategories,
  allTodos,
  setAllTodos,
}) => {
  const [isActiveInput, setIsActiveInput] = useState<boolean>(false);

  const todoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActiveInput && todoRef.current) {
      todoRef.current.focus();
    }
  }, [isActiveInput]);

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
          <TodoItem
            key={todo.taskId}
            allTodos={allTodos}
            setAllTodos={setAllTodos}
            allCategories={allCategories}
            setAllCategories={setAllCategories}
            {...todo}
          />
        ))}
      </div>
    </main>
  );
};
export default Main;
