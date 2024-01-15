// DetailResep.js
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import "../styles/style.css";
import "../styles/index.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  IconButton,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Link,
} from "@mui/material";
import Navigation from "../components/Navbar.jsx";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import { putFavoriteResepMasakan } from "../services/apis";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import FavoritDialog from "../components/FavoritDialog";
import Nasgor from "../public/nasgor.jpg";

function DetailResep() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openFavoriteDialog, setOpenFavoriteDialog] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState("");

  useEffect(() => {
    getDetailResep();
  }, [id]);

  const [resepData, setResepData] = useState();
  const getDetailResep = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/book-recipe/book-recipes/${id}`
      );
      setResepData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = async (event, recipeId, recipeName, statusFavorite) => {
    try {
      const updatedResepData = {
        ...resepData,
        isFavorite: !resepData.isFavorite,
      };
      setResepData(updatedResepData);

      const message = statusFavorite
        ? `Berhasil Menghapus Resep ${resepData.recipeName}`
        : `Berhasil Menambah Resep ${resepData.recipeName}`;

      setFavoriteMessage(message);
      setOpenFavoriteDialog(true);

      await putFavoriteResepMasakan(resepData.recipeId, resepData.userId);

      fetchDataResepMasakan(
        userId,
        page,
        entries,
        recipeNameProps,
        foodLevel,
        foodCategory,
        cookingTime,
        sortBy
      );
    } catch (error) {
      console.log("error change favorite data", error);
      // Handle error jika diperlukan
    }
  };

  return (
    <div>
      <Navigation />
      {resepData ? (
        <Container maxWidth="sm" sx={{ paddingBottom: 3 }}>
          <Grid
            container
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
                    {resepData.recipeName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <img
                className="imgDetail"
                src={resepData.imageUrl}
                alt={resepData.recipeName}
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
                    {resepData.category.categoryName}
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
                  <Grid item className="item">
                    {resepData.time} menit
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
                    {resepData.levels.levelName}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<StarBorderIcon sx={{ color: "#01BFBF" }} />}
                      checkedIcon={<StarIcon sx={{ color: "#01BFBF" }} />}
                    />
                  }
                  checked={resepData.isFavorite}
                  onChange={(event) => {
                    handleChange(
                      event,
                      data.recipeId,
                      data.recipeName,
                      data.isFavorite
                    );
                  }}
                  value="favorite"
                  label={
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#01BFBF",
                      }}
                    >
                      Favorit
                    </Typography>
                  }
                />
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
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: "20px",
                  marginBottom: "17px",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: resepData.ingredient }}
                />
              </Typography>
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
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#586A84",
                  textAlign: "justify",
                  lineHeight: "20px",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: resepData.howToCook }}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Typography>Loading..</Typography>
      )}
    </div>
  );
}

export default DetailResep;
