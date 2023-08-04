import { FC, FormEvent, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { nanoid } from "nanoid";

import { ICategoryProps } from "../interfaces";

import { ThreeLineHorizontal, Cross } from "akar-icons";

const SideBar: FC<ICategoryProps> = ({ allCategories, setAllCategories }) => {
  const [isActiveInput, setIsActiveInput] = useState<boolean>(false);
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [showAside, setShowAside] = useState<boolean>(false);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

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
    setActiveCategory(newCategory.categoryId);
    localStorage.setItem(
      "savedCategories",
      JSON.stringify([...allCategories, newCategory])
    );
    navigate(`/${newCategory.categoryId}`);
  };

  useEffect(() => {
    if (isActiveInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActiveInput]);

  return (
    <>
      <aside className="aside-container" id={showAside ? "hidden" : ""}>
        <h1
          onClick={() => {
            navigate("/");
            setIsActiveInput(false);
            setActiveCategory("");
          }}
          style={{
            fontWeight: activeCategory === "" ? "600" : "400",
          }}
        >
          All tasks
        </h1>
        <div className="categories-list">
          {allCategories?.map((category) => (
            <h2
              key={category.categoryId}
              onClick={() => {
                navigate(`/${category.categoryId}`);
                setIsActiveInput(false);
                setActiveCategory(category.categoryId);
              }}
              style={{
                fontWeight:
                  activeCategory === category.categoryId ? "600" : "400",
              }}
              className="category-name"
            >
              {category.name}
            </h2>
          ))}
        </div>
        <div className="category-input-container">
          {isActiveInput ? (
            <form onSubmit={handleSaveCategory}>
              <input
                type="text"
                ref={inputRef}
                onChange={(event) => setCategoryInput(event.target.value)}
                value={categoryInput}
                className="category-input"
                placeholder="Enter category name"
                maxLength={30}
              />
              <button type="submit" className="add-category-button">
                +
              </button>
            </form>
          ) : (
            <p onClick={() => setIsActiveInput(true)} className="new-category">
              + New category
            </p>
          )}
        </div>
      </aside>
      {!showAside ? (
        <ThreeLineHorizontal
          strokeWidth={2}
          size={20}
          onClick={() => setShowAside(!showAside)}
          className="aside-icon"
        />
      ) : (
        <Cross
          strokeWidth={2}
          size={20}
          onClick={() => setShowAside(!showAside)}
          className="aside-icon"
        />
      )}
    </>
  );
};
export default SideBar;
