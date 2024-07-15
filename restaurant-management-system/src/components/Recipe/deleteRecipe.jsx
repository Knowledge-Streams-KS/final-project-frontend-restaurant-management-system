import React from "react";
import axiosInstance from "../../axios/axios";
import toast from "react-hot-toast";

const DeleteRecipe = ({ recipeId, fetchRecipes }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/recipe/${recipeId}`);
      const successMessage =
        response.data.message || "Recipe deleted successfully.";
      toast.success(successMessage);
      fetchRecipes();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete Recipe.";
      toast.error(errorMessage);
    }
  };

  return (
    <button
      className="ml-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteRecipe;
