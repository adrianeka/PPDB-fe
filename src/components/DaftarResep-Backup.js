import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./style/custom.css";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Navigation from "./Navigation";
import AddIcon from "@mui/icons-material/Add";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import nasgor from "../assets/nasgor.jpg";
import http from "../http-common"; // import axios dengan header authorization
import Favorite from "./Favorite";

function DaftarResep() {
  // // Mengambil token dari local storage
  // const [post, setPost] = useState(null);

  // const [searchParams, setSearchParams] = useSearchParams({});
  // const searchTerm = searchParams.get('recipeName') || '';
  // const [isThereParams, setIsThereParams] = useState(false);

  // const handleSearch = event => {
  //     const recipeName = event.target.value;
  //     if (recipeName) {
  //         setSearchParams({recipeName})
  //         setIsThereParams(true)
  //     }else{
  //         setSearchParams({})
  //         setIsThereParams(false)
  //     }
  // }

  // useEffect(() => {
  //     if (isThereParams) {
  //         http.get(`/recipe/search-recipes?${searchParams}`)
  //         .then((response) => {
  //         setPost(response.data);
  //         console.log(response.data);
  //         })
  //         .catch((err) => {
  //             console.log(err);
  //         });
  //     }else{
  //         http.get('/recipe/read')
  //         .then((response) => {
  //           setPost(response.data);
  //           console.log(response.data);
  //         })
  //         .catch((err) => {
  //             console.log(err);
  //         });
  //     }
  //   }, [searchParams]);

  // if (!post) return null;

  // Dummy data for recipes
  const dummyData = [
    {
      recipeId: 1,
      imageUrl: "dummyImageUrl1",
      categories: { categoryName: "Category1" },
      recipeName: "Recipe 1",
      time: 30,
    },
    {
      recipeId: 2,
      imageUrl: "dummyImageUrl2",
      categories: { categoryName: "Category2" },
      recipeName: "Recipe 2",
      time: 45,
    },
    // Add more dummy data as needed
  ];

  // Set dummy data as initial state
  const [post, setPost] = useState(dummyData);

  const [searchParams, setSearchParams] = useState({});
  const searchTerm = searchParams.recipeName || "";
  const [isThereParams, setIsThereParams] = useState(false);

  const handleSearch = (event) => {
    const recipeName = event.target.value;
    if (recipeName) {
      setSearchParams({ recipeName });
      setIsThereParams(true);
    } else {
      setSearchParams({});
      setIsThereParams(false);
    }
  };

  useEffect(() => {
    // Use dummy data instead of making actual API calls
    if (isThereParams) {
      // Perform filtering based on searchParams if needed
      const filteredData = dummyData.filter((recipe) =>
        recipe.recipeName
          .toLowerCase()
          .includes(searchParams.recipeName.toLowerCase())
      );
      setPost(filteredData);
    } else {
      setPost(dummyData);
    }
  }, [searchParams, isThereParams]);

  return (
    <div>
      <Navigation />
      <Container>
        <Grid
          container
          spacing={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
          paddingTop={7}
        >
          <Grid item>
            <Grid
              container
              spacing={4}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Link to={"/tambah-resep"}>
                  <Button variant="contained" startIcon={<AddIcon />}>
                    Tambah Resep
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <TextField
                  id="filled-basic"
                  placeholder="Cari Resep"
                  type="search"
                  size="small"
                  sx={{ width: "500px", background: "white" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={searchTerm}
                  onChange={handleSearch}
                  //onChange={(event) => {setSearchParams( createSearchParams({ recipeName: event.target.value }));}}
                />
              </Grid>
              <Grid item>
                <Typography>BARIS FILTER</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h4">Daftar Resep Masakan</Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              spacing={6}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              marginBottom={10}
            >
              {post && post.map(recipes =>  (
                <Grid item key={recipes.recipeId}>
                  <Card sx={{ width: 250 }}>
                    <CardMedia
                      sx={{ height: 120 }}
                      image={recipes.imageUrl}
                      title={nasgor}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign={"left"}
                      >
                        {recipes.categories.categoryName}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        textAlign={"left"}
                      >
                        {recipes.recipeName}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Grid container direction="column" marginBottom={1}>
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ color: "black" }}
                        >
                          <Grid item>
                            <IconButton aria-label="add to favorites" disabled>
                              <AccessTimeIcon sx={{ color: "#01BFBF" }} />{" "}
                              <Typography
                                variant="body2"
                                sx={{ color: "#01BFBF" }}
                              >
                                &nbsp;{recipes.time} menit
                              </Typography>
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <Favorite recipeId={recipes.recipeId} />
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Link
                            className="recipe"
                            to={"detail-resep/" + recipes.recipeId}
                          >
                            <Typography variant="body2">
                              Lihat detail Resep
                            </Typography>
                          </Link>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default DaftarResep;
