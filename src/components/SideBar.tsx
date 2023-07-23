import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { nanoid } from "nanoid";

import { ICategoryProps } from "../interfaces";

const SideBar: FC<ICategoryProps> = ({ allCategories, setAllCategories }) => {
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");

  const navigate = useNavigate();

  const handleSaveCategory = (event: FormEvent) => {
    event.preventDefault();

    if (!categoryInput) {
      alert("Please enter a valid name for the new task");
      return;
    }
    const newCategory = {
      categoryId: nanoid(),
      name: categoryInput,
      color: "gray",
    };
    setAllCategories((prevCategories) => {
      return [...prevCategories, newCategory];
    });
    setCategoryInput("");
    setIsActiveInput(false);
    localStorage.setItem(
      "savedCategories",
      JSON.stringify([...allCategories, newCategory])
    );
    navigate(`/${newCategory.categoryId}`);
  };

  return (
    <aside>
      <h1 onClick={() => navigate("/")}>All tasks</h1>
      <div className="categories-list">
        {allCategories?.map((category) => (
          <h2
            key={category.categoryId}
            onClick={() => navigate(`/${category.categoryId}`)}
          >
            {category.name}
          </h2>
        ))}
      </div>
      <div>
        {isActiveInput ? (
          <form onSubmit={handleSaveCategory}>
            <input
              type="text"
              onChange={(event) => setCategoryInput(event.target.value)}
              value={categoryInput}
            />
            <button type="submit">+</button>
          </form>
        ) : (
          <p onClick={() => setIsActiveInput(true)}>+ New category</p>
        )}
      </div>
    </aside>
  );
};
export default SideBar;
