import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import AddRecipe from "./addRecipe";
import DeleteRecipe from "./deleteRecipe";
import EditRecipe from "./editRecipe";
import { BeatLoader } from "react-spinners";

const ReadRecipe = () => {
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [editRecipeId, setEditRecipeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchRecipes = async () => {
    try {
      const response = await axiosInstance.get("/recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(response.data.allRecipe);
    } catch (error) {
      console.error("Error fetching Recipes:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.recipeId.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleEdit = (recipeId) => {
    setEditRecipeId(recipeId);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <AddRecipe fetchRecipes={fetchRecipes} />
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Recipes</h2>
          <input
            type="text"
            placeholder="Search by recipe Id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    ID
                  </th>
                  <th className="bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Title
                  </th>
                  <th className="bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Size
                  </th>
                  <th className="bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Price
                  </th>
                  <th className="bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Type
                  </th>
                  <th className="bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Ingredients
                  </th>
                  <th className="bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-5">
                      <div className="flex h-full items-center justify-center">
                        <BeatLoader color="#111827" />
                      </div>
                    </td>
                  </tr>
                ) : filteredRecipes.length > 0 ? (
                  filteredRecipes.map((recipe) => (
                    <tr
                      className="border-b border-gray-200"
                      key={recipe.recipeId}
                    >
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {recipe.recipeId}
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {recipe.title}
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {recipe.size}
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {recipe.price}
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {recipe.type}
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        <ul>
                          {recipe["Ingredients Codes"].map((ingredient) => (
                            <li key={ingredient.code}>
                              {ingredient.code} - {ingredient.name} (
                              {ingredient.IngredientsRecipe.quantity}
                              {ingredient.unit})
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="flex justify-center px-5 py-5 text-center text-sm">
                        {editRecipeId === recipe.recipeId ? (
                          <EditRecipe
                            recipeId={recipe.recipeId}
                            fetchRecipes={fetchRecipes}
                            onEdit={handleEdit}
                          />
                        ) : (
                          <>
                            <button
                              className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                              onClick={() => handleEdit(recipe.recipeId)}
                            >
                              Edit
                            </button>
                            <DeleteRecipe
                              recipeId={recipe.recipeId}
                              fetchRecipes={fetchRecipes}
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-5 py-5 text-center text-sm">
                      No Recipes Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadRecipe;
