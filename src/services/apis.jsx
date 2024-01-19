import instance from "./axiosConfig";

const baseUrl = import.meta.env.VITE_API_URL;
const apiGetDaftarResepMakanan = import.meta.env.VITE_API_GETDAFTARRESEPMAKANAN;
const apiGetMyRecipes = import.meta.env.VITE_API_GETMYRECIPES;
const apiGetMyFavoriteRecipes = import.meta.env.VITE_API_GETMYFAVORITERECIPES;

const buildUrl = (base, params) => {
  let url = base + "?";
  for (const key in params) {
    if (params[key]) {
      url += `${key}=${params[key]}&`;
    }
  }
  // Remove the trailing '&'
  url = url.slice(0, -1);
  return url;
};

//Register
export const userRegister = (formData) => {
  const apiRegister = import.meta.env.VITE_API_REGISTER;
  return instance
    .post(apiRegister, formData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

//Login
export const userLogin = (username, password) => {
  const apiLogin = import.meta.env.VITE_API_SIGNIN;
  return instance
    .post(apiLogin, { username: username, password: password })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

//Get Master Category
export const getCategory = () => {
  return instance
    .get("/book-recipe-masters/category-option-lists")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

//Get Master Level
export const getLevels = () => {
  return instance
    .get("/book-recipe-masters/level-option-lists")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

//Post Tambah Resep
export const postTambahResep = (formData) => {
  return instance
    .post("/book-recipe/book-recipes", formData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

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
  const apiUrl = buildUrl(apiGetDaftarResepMakanan, {
    pageNumber,
    pageSize,
    userId,
    recipeName,
    levelId,
    categoryId,
    time,
    sortBy,
  });

  return instance
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
  const apiUrl = buildUrl(apiGetMyRecipes, {
    pageNumber,
    pageSize,
    userId,
    recipeName,
    levelId,
    categoryId,
    time,
    sortBy,
  });

  return instance
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
  levelId,
  categoryId,
  time,
  sortBy
) => {
  const apiUrl = buildUrl(apiGetMyFavoriteRecipes, {
    pageNumber,
    pageSize,
    userId,
    recipeName,
    levelId,
    categoryId,
    time,
    sortBy,
  });

  return instance
    .get(apiUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error getting data daftar resep makanan", error);
      throw error;
    });
};

//Add/Remove to favorite
export const putFavoriteResepMasakan = (recipeId, userId) => {
  const apiUrl = `${baseUrl}/book-recipe/book-recipes/${recipeId}/favorites`;

  return instance
    .put(apiUrl, { userId: userId })
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
    const response = await instance.put(
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

//Get Detail Resep
export const getDetailResep = (recipeId) => {
  const apiUrl = import.meta.env.VITE_API_GETDAFTARRESEPMAKANAN;
  return instance
    .get(`${apiUrl}/${recipeId}`)
    .then((response) => {
      console.log("response", response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
