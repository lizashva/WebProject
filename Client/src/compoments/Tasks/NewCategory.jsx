import React from "react";
import { useState } from "preact/hooks";
import { styles } from "../../utils/styles";
export default function NewCategory({
  addCategoryShow,
  SetAddCategoryShow,
  categories,
  setCategories,
}) {
  const [ShowErrorAddCategory, setShowErrorAddCategory] = useState(false);

  const saveNewCategory = async (data) => {
    const missionData = {
      Name: data,
    };
    try {
      const response = await fetch(
        "/categories/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(missionData),
        },
      );
      const responseData = await response.json();
      if (response.status === 200) {
        let tempCategory = categories;
        tempCategory.push(responseData);
        localStorage.setItem("categories", JSON.stringify(tempCategory));
        setCategories(JSON.parse(localStorage.getItem("categories")));
      } else {
        setShowErrorAddCategory(true);
        setTimeout(() => {
          setShowErrorAddCategory(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Failed to save Category", error);
    }
  };

  const handleAddClick = () => {
    const user = document.querySelector("#category").value;
    saveNewCategory(user);
  };

  return (
    <div
      style={styles.gradient_background}
      className="max-w-md mx-25 p-5  text-white rounded-lg shadow-lg mb-3"
    >
      <form onSubmit={handleAddClick} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">
            Fill new category name:
          </label>
          <input
            type="text"
            id="category"
            className="  text-black rounded px-3 py-2"
            required
          />
        </div>
        <div className="mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            type="submit"
          >
            Add Category
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              SetAddCategoryShow(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
      <div>
        {ShowErrorAddCategory && (
          <p className="text-red-600 mt-4">
            The category exists, please try again
          </p>
        )}
      </div>
    </div>
  );
}
