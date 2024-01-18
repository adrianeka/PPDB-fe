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
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import { putFavoriteResepMasakan } from "../services/apis";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

function DetailResep() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [openFavoriteDialog, setOpenFavoriteDialog] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState("");

  const getAuthToken = () => {
    return localStorage.getItem("token");
    // Replace 'yourAuthTokenKey' with the actual key used to store the token.
  };

  useEffect(() => {
    getDetailResep();
    setResepData();
  }, [id]);

  const [resepData, setResepData] = useState();

  const apiUrl = import.meta.env.VITE_API_GETDAFTARRESEPMAKANAN;
  const getDetailResep = async () => {
    try {
      const authToken = getAuthToken();
      const response = await axios.get(
        `${apiUrl}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(`token: ${authToken}`);
      setResepData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = async (event, recipeId, recipeName, statusFavorite) => {
    try {
      const authToken = getAuthToken();
      console.log(`token: ${authToken}`);
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

      await putFavoriteResepMasakan(resepData.recipeId, userId);
      console.log(`isFavorite : ${resepData.isFavorite}`);
      console.log("berhasil");
    } catch (error) {
      console.log("error change favorite data", error);
      // Handle error jika diperlukan
    }
  };

  return (
    <div>
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
                      resepData.recipeId,
                      resepData.recipeName,
                      resepData.isFavorite
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
