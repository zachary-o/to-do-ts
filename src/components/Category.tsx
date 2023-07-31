import { FC, useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NewTodoInput from "./NewTodoInput";
import TodoItem from "./TodoItem";
import { ICategoryProps, ITodoProps } from "../interfaces";

import { TrashCan } from "akar-icons";

const Category: FC<ICategoryProps & ITodoProps> = ({
  allCategories,
  setAllCategories,
  allTodos,
  setAllTodos,
}) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const colorsPaletteRef = useRef<HTMLDivElement>(null);

  const categoryColors: string[] = [
    "#FF6868",
    "#FED568",
    "#74FF68",
    "#67C9FF",
    "#A168FF",
  ];
  let currentCategory = allCategories.find(
    (category) => category.categoryId === categoryId
  );

  const [isColorsActive, setIsColorsActive] = useState<boolean>(false);

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

  const setCategoryColor = (color: string) => {
    if (currentCategory) {
      const updatedCategories = allCategories.map((category) => {
        if (category.name === currentCategory?.name) {
          return {
            ...category,
            color,
          };
        }
        return category;
      });
      setAllCategories(updatedCategories);
      localStorage.setItem(
        "savedCategories",
        JSON.stringify(updatedCategories)
      );
    }
    setIsColorsActive(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isColorsActive &&
        colorsPaletteRef.current &&
        !colorsPaletteRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).classList.contains("category-color")
      ) {
        setIsColorsActive(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isColorsActive]);

  useEffect(() => {
    if (!currentCategory) {
      navigate("/");
    }
  }, []);

  return (
    <main>
      <div className="category-header">
        <h1>{currentCategory?.name}</h1>
        <TrashCan
          strokeWidth={2}
          size={20}
          onClick={() => handleDeleteCategory()}
          className="icon"
        />
        <p
          className="category-color"
          onClick={() => setIsColorsActive((prev) => !prev)}
          style={{ backgroundColor: currentCategory?.color }}
        ></p>
        {isColorsActive && (
          <div ref={colorsPaletteRef} className="colors-palette">
            {categoryColors.map((color, index) => (
              <p
                className="category-color"
                key={index}
                style={{ backgroundColor: color }}
                onClick={() => setCategoryColor(color)}
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
            <TodoItem
              key={todo.taskId}
              allTodos={allTodos}
              setAllTodos={setAllTodos}
              allCategories={allCategories}
              setAllCategories={setAllCategories}
              currentCategory={currentCategory}
              {...todo}
            />
          ))}
      </div>
    </main>
  );
};
export default Category;
