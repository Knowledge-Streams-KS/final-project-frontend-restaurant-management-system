import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import RecipeTable from "../components/recipes";
import RecipeFrom from "../components/addRecipe";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axiosInstance.get("/recipes");
      setRecipes(response.data.allRecipe);
    } catch (error) {
      console.error("Error fetching Recipes:", error);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="Recipes">
      <RecipeFrom refreshRecipe={fetchRecipes} />
      <RecipeTable allRecipes={recipes} />
    </div>
  );
};

export default Recipes;
