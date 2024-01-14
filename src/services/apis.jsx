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

export const getDaftarResepFavorit = (
  userId,
  pageNumber,
  pageSize,
  recipeName,
  level,
  category,
  cookMin,
  cookMax,
  sort
) => {
  let apiUrl = `http://localhost:8080/book-recipe/book-recipes/my-favorite-recipes?pageNumber=${pageNumber}&pageSize=${pageSize}&userId=${userId}`;

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
    .get(apiUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error getting data daftar resep favorit", error);
      throw error;
    });
};

export const getTotalDaftarResepFavorit = (
  userId,
) => {
  let apiUrl = `http://localhost:8080/book-recipe/book-recipes/my-favorite-recipes?userId=${userId}`;
  
  return axios
    .get(apiUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error getting data daftar resep favorit", error);
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
