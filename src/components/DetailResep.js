import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./style/custom.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid, IconButton, Typography } from "@mui/material";
import Navigation from "./Navigation";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import http from "../http-common"; // import axios dengan header authorization
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function DetailResep() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data for a single recipe
  const dummyData = {
    data: {
      recipeName: "Dummy Recipe",
      imageUrl: "dummyImageUrl",
      categories: { categoryName: "Dummy Category" },
      time: 30,
      levels: { levelName: "Easy" },
    },
    recipesIngridient: [
      {
        ingridients: {
          ingridientQuantity: 1,
          ingridientMeasurement: "cup",
          ingridientName: "Dummy Ingredient",
        },
      },
      // Add more dummy ingredients as needed
    ],
    recipesHowToCook: [
      {
        howToCooks: {
          position: 1,
          description: "Dummy Step 1",
        },
      },
      // Add more dummy cooking steps as needed
    ],
  };

  const [post, setPost] = useState(dummyData);

  useEffect(() => {
    // Simulate API call or any other async operation
    // Replace this with your actual API call if needed
    // http.get(`recipe/read/${id}`)
    //   .then((response) => {
    //     setPost(response.data);
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });

    // In this example, we're directly using dummy data
    setPost(dummyData);
  }, [id]);

  if (!post) return null;

  return (
    <div>
      <Navigation />
      <Container maxWidth="sm">
        <Grid
          container
          spacing={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
          paddingTop={7}
          marginBottom={2}
          wrap="nowrap"
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <IconButton aria-label="Example" onClick={() => navigate(-1)}>
                  <ArrowBackIosNewIcon fontSize="large" color="black" />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h4">{post.data.recipeName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <img src={post.data.imageUrl} alt="nasgor" />
          </Grid>
          <Grid item>
            <div className="box">
              <Grid
                spacing={2}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography sx={{ fontSize: 18 }}>Kategori</Typography>
                    </Grid>
                    <Grid item className="item">
                      {post.data.categories.categoryName}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography sx={{ fontSize: 18 }}>Waktu Masak</Typography>
                    </Grid>
                    <Grid item>
                      <div className="item">{post.data.time} menit</div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Typography sx={{ fontSize: 18 }}>Kesulitan</Typography>
                    </Grid>
                    <Grid item className="item">
                      {post.data.levels.levelName}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="add to favorites"
                    sx={{ color: "#01BFBF" }}
                  >
                    <StarOutlineIcon />{" "}
                    <Typography variant="body1">&nbsp;Favorite</Typography>
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          marginBottom={4}
        >
          <Grid item textAlign={"left"}>
            <Typography variant="h5">Bahan-bahan</Typography>
          </Grid>
          <Grid>
            <hr></hr>
          </Grid>
          <Grid item>
            <ul>
              {post.recipesIngridient.map((recipesIng) => (
                <li>
                  <Typography>
                    {recipesIng.ingridients.ingridientQuantity}{" "}
                    {recipesIng.ingridients.ingridientMeasurement}{" "}
                    {recipesIng.ingridients.ingridientName}
                  </Typography>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item textAlign={"left"}>
            <Typography variant="h5">Cara memasak</Typography>
          </Grid>
          <Grid>
            <hr></hr>
          </Grid>
          <Grid item textAlign={"left"}>
            {post.recipesHowToCook
              .sort((a, b) =>
                a.howToCooks.position > b.howToCooks.position ? 1 : -1
              )
              .map((recipesCook) => (
                <Typography component="div">
                  {recipesCook.howToCooks.position}.{" "}
                  {recipesCook.howToCooks.description}
                </Typography>
              ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default DetailResep;
