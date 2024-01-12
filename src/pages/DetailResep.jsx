// DetailResep.js
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import "../styles/style.css";
import "../styles/index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid, IconButton, Typography } from "@mui/material";
import Navigation from "../components/Navbar.jsx";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Nasgor from "../public/nasgor.jpg";
import axios from "axios";

function DetailResep() {
  const { id } = useParams();
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState("");
  const [imageFilename, setImageFilename] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [timeCook, setTimeCook] = useState("");
  const [levelName, setLevelName] = useState("");
  const [favorit, setFavorit] = useState("");
  const [ingridient, setIngridient] = useState("");
  const [howToCook, setHowToCook] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getDetailResep();
  }, [id]);

  const getDetailResep = async () => {
    try {
      console.log("hai");
      const response = await axios.get(
        `http://localhost:8080/book-recipe/book-recipes/read/${id}`
      );
      console.log("Data : ", response.data);
      setRecipeName(response.data.recipeName);
      setImageFilename(response.data.imageFileName);
      setCategoryName(response.data.categories.categoryName);
      setTimeCook(response.data.timeCook);
      setLevelName(response.data.levels.levelName);
      setFavorit(response.data.favorit);
      setIngridient(response.data.ingridient);
      setHowToCook(response.data.howToCook);
      setDataLoaded(true);
    } catch (error) {
      console.log(error.message);
      setNotFound(true);
    }
  };

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
                <Typography
                  sx={{
                    fontSize: 36,
                    fontWeight: "600",
                  }}
                >
                  {recipeName ? recipeName : "Dummy Data"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <img
              src={imageFilename ? imageFilename : Nasgor}
              alt="nasgor"
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item></Grid>
        </Grid>
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
                  <Typography
                    sx={{
                      Size: 14,
                      color: "#01bfbf",
                    }}
                  >
                    Kategori
                  </Typography>
                </Grid>
                <Grid item className="item">
                  {categoryName ? categoryName : "Dummy Kategori"}
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
                  <Typography sx={{ fontSize: 14, color: "#01bfbf" }}>
                    Waktu Masak
                  </Typography>
                </Grid>
                <Grid item>
                  <div className="item">{timeCook ? timeCook : "30"} menit</div>
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
                  <Typography sx={{ fontSize: 14, color: "#01bfbf" }}>
                    Kesulitan
                  </Typography>
                </Grid>
                <Grid item className="item">
                  {levelName ? levelName : "Easy"}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="add to favorites"
                sx={{ color: "#01BFBF" }}
              >
                <StarOutlineIcon />{" "}
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeigth: 400,
                  }}
                >
                  &nbsp;Favorit
                </Typography>
              </IconButton>
            </Grid>
          </Grid>
        </div>

        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          marginBottom={4}
        >
          <Grid item textAlign={"left"}>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 600,
                lineHeight: "27px",
                color: "#01bfbf",
              }}
            >
              Bahan-Bahan
            </Typography>
          </Grid>
          <Grid>
            <hr></hr>
          </Grid>
          <Grid item>
            <ul>
              <li>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: "20px",
                    marginBottom: "17px",
                  }}
                >
                  {ingridient ? ingridient : "Tidak ada Bahan - Bahan"}
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item textAlign={"left"}>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 600,
                lineHeight: "27px",
                color: "#01bfbf",
              }}
            >
              Cara memasak
            </Typography>
          </Grid>
          <Grid>
            <hr></hr>
          </Grid>
          <Grid item textAlign={"left"}>
            {howToCook && howToCook.length > 0 ? (
              howToCook
                .sort((a, b) =>
                  a.howToCook.position > b.howToCook.position ? 1 : -1
                )
                .map((recipesCook) => (
                  <Typography
                    component="div"
                    sx={{
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    {recipesCook.howToCook.position}.{" "}
                    {recipesCook.howToCook.description
                      ? recipesCook.howToCook.description
                      : "Tidak ada cara memasak"}
                  </Typography>
                ))
            ) : (
              <Typography
                component="div"
                sx={{
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Tidak ada cara memasak
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default DetailResep;
