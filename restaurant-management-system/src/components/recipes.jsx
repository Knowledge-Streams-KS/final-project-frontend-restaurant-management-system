import React, { useState } from "react";

const RecipeTable = ({ allRecipes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = allRecipes.filter((recipe) =>
    recipe.recipeId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 sm:px-8">
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
                <tr>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    ID
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Title
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Size
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Price
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Type
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Ingredients
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRecipes.map((recipe) => (
                  <tr key={recipe.recipeId}>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      {recipe.recipeId}
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      {recipe.title}
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      {recipe.size}
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      {recipe.price}
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      {recipe.type}
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeTable;
