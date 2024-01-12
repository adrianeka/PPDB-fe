import axios from "axios";

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
  let apiUrl = `http://localhost:8080/book-recipe/book-recipes?pageNumber=${pageNumber}&pageSize=${pageSize}&userId=${userId}`;

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

export const putFavoriteResepMasakan = (recipeId, userId) => {
  const apiUrl = `http://localhost:8080/book-recipe/book-recipes/${recipeId}/favorites/${userId}`;

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
