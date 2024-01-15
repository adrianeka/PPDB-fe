import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
const apiGetDaftarResepMakanan = import.meta.env.VITE_API_GETDAFTARRESEPMAKANAN;
const apiGetMyRecipes = import.meta.env.VITE_API_GETMYRECIPES;
const apiGetMyFavoriteRecipes = import.meta.env.VITE_API_GETMYFAVORITERECIPES;

//Register

//Login

//Get Daftar Resep
export const getDaftarResepMakanan = (
  userId,
  pageNumber,
  pageSize,
  recipeName,
  levelId,
  categoryId,
  time,
  sortBy
) => {
  let apiUrl = `${apiGetDaftarResepMakanan}?pageNumber=${pageNumber}&pageSize=${pageSize}&userId=${userId}`;

  if (recipeName) {
    apiUrl += `&recipeName=${recipeName}`;
  }
  if (levelId) {
    apiUrl += `&levelId=${levelId}`;
  }
  if (categoryId) {
    apiUrl += `&categoryId=${categoryId}`;
  }
  if (time) {
    apiUrl += `&time=${time}`;
  }
  if (sortBy) {
    apiUrl += `&sortBy=${sortBy}`;
  }

  return axios
    .get(apiUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error getting data daftar resep makanan", error);
      throw error;
    });
};

//Get Resep Saya
export const getMyRecipes = (
  userId,
  pageNumber,
  pageSize,
  recipeName,
  levelId,
  categoryId,
  time,
  sortBy
) => {
  let apiUrl = `${apiGetMyRecipes}?pageNumber=${pageNumber}&pageSize=${pageSize}&userId=${userId}`;

  if (recipeName) {
    apiUrl += `&recipeName=${recipeName}`;
  }
  if (levelId) {
    apiUrl += `&levelId=${levelId}`;
  }
  if (categoryId) {
    apiUrl += `&categoryId=${categoryId}`;
  }
  if (time) {
    apiUrl += `&time=${time}`;
  }
  if (sortBy) {
    apiUrl += `&sortBy=${sortBy}`;
  }

  return axios
    .get(apiUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error getting data daftar resep makanan", error);
      throw error;
    });
};

//Get Daftar Resep Favorit
export const getDaftarResepFavorit = (
  userId,
  pageNumber,
  pageSize,
  recipeName,
  level,
  category,
  cookMin,
  cookMax,
  sort,
  authToken
) => {
  let apiUrl = `${apiGetMyFavoriteRecipes}?pageNumber=${pageNumber}&pageSize=${pageSize}&userId=${userId}`;

  if (recipeName) {
    apiUrl += `&recipeName=${recipeName}`;
  }
  if (level) {
    apiUrl += `&level=${level}`;
  }
  if (category) {
    apiUrl += `&category=${category}`;
  }
  if (cookMin) {
    apiUrl += `&cookMin=${cookMin}`;
  }
  if (cookMin) {
    apiUrl += `&cookMax=${cookMax}`;
  }
  if (sort) {
    apiUrl += `&sort=${sort}`;
  }

  return axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error getting data daftar resep favorit", error);
      throw error;
    });
};

//Get Total Daftar Resep Favorit
export const getTotalDaftarResepFavorit = (userId, authToken) => {
  let apiUrl = `${apiGetMyFavoriteRecipes}?userId=${userId}`;

  return axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error getting data daftar resep favorit", error);
      throw error;
    });
};

//Add/Remove to favorite
export const putFavoriteResepMasakan = (recipeId, userId) => {
  const apiUrl = `${baseUrl}/book-recipe/book-recipes/${recipeId}/favorites/${userId}`;

  return axios
    .put(apiUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error edit favorite resep masakan", error);
      throw error;
    });
};

//Delete My Recipe
export const deleteRecipe = async (recipeId, userId) => {
  try {
    const response = await axios.put(
      `${apiGetDaftarResepMakanan}/${recipeId}?userId=${userId}`
    );

    return {
      success: response.status === 200,
      errorMessage: response.status === 200 ? null : "Failed to delete recipe",
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: `Error deleting recipe: ${error.message}`,
    };
  }
};
