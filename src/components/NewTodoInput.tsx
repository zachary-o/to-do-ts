import { FC, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { ICategoryProps, ITodo, ITodoProps } from "../interfaces";

import { nanoid } from "nanoid";

const NewTodoInput: FC<ICategoryProps & ITodoProps> = ({
  allCategories,
  allTodos,
  setAllTodos,
}) => {
  const [todoInput, setTodoInput] = useState<string>("");
  const { categoryId } = useParams();

  const currentCategory = allCategories.find(
    (category) => category.categoryId === categoryId
  );

  const handleSaveTodo = (event: FormEvent) => {
    event.preventDefault();
    if (!todoInput) {
      alert("Please enter a task!");
      return;
    }
    const newTodo: ITodo = {
      taskId: nanoid(),
      taskName: todoInput,
      isCompleted: false,
      categoryName: currentCategory?.name,
    };
    setAllTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });
    setTodoInput("");
    localStorage.setItem("savedTodos", JSON.stringify([...allTodos, newTodo]));
  };

  return (
    <div className="todo-input-container">
      <form onSubmit={handleSaveTodo}>
        <input
          type="text"
          onChange={(event) => setTodoInput(event.target.value)}
          value={todoInput}
          className="new-todo-input"
          maxLength={60}
        />
        <button type="submit" className="add-todo-button">
          +
        </button>
      </form>
    </div>
  );
};
export default NewTodoInput;
