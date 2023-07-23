import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import Category from "./components/Category";
import Layout from "./components/Layout";

import { ICategory, ITodo } from "./interfaces";

require("./index.css");

function App() {
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);
  const [allTodos, setAllTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const savedCategories = localStorage.getItem("savedCategories");
    if (savedCategories) {
      setAllCategories(JSON.parse(savedCategories));
    }

    const savedTodos = localStorage.getItem("savedTodos");
    if (savedTodos) {
      setAllTodos(JSON.parse(savedTodos));
    }
  }, []);

  console.log(allTodos);

  return (
    <div className="wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              allCategories={allCategories}
              setAllCategories={setAllCategories}
            />
          }
        >
          <Route
            index
            element={
              <Main
                allCategories={allCategories}
                setAllCategories={setAllCategories}
                allTodos={allTodos}
                setAllTodos={setAllTodos}
              />
            }
          />

          <Route
            path="/:categoryId"
            element={
              <Category
                allCategories={allCategories}
                setAllCategories={setAllCategories}
                allTodos={allTodos}
                setAllTodos={setAllTodos}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
