// DetailResep.js
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import "../styles/style.css";
import "../styles/index.css";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, IconButton, Typography } from "@mui/material";
import Navigation from "../components/Navbar.jsx";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";

function DetailResep() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <div>
      <Navigation />
      {resepData ? (
        <Container maxWidth="sm" sx={{ paddingBottom: 3 }}>
          <Grid
            container
            spacing={4}
            direction="column"
            justifyContent="center"
            alignItems="center"
            paddingTop={7}
            marginBottom={2}
            wrap="nowrap">
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center">
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
                    }}>
                    {resepData.recipeName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <img
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
              alignItems="center">
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start">
                  <Grid item>
                    <Typography
                      sx={{
                        Size: 14,
                        color: "#01bfbf",
                      }}>
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
                  alignItems="flex-start">
                  <Grid item>
                    <Typography sx={{ fontSize: 14, color: "#01bfbf" }}>
                      Waktu Masak
                    </Typography>
                  </Grid>
                  <Grid item>
                    <div className="item">{resepData.time} menit</div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start">
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
                <IconButton
                  aria-label="add to favorites"
                  sx={{ color: "#01BFBF" }}>
                  <StarOutlineIcon />{" "}
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeigth: 400,
                    }}>
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
            marginBottom={4}>
            <Grid item textAlign={"left"}>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 600,
                  lineHeight: "27px",
                  color: "#01bfbf",
                }}>
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
                }}>
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
                }}>
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
                }}>
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
