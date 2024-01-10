import { Container } from "@mui/system";
import React, {
  useEffect,
  useState,
  MouseEvent,
  HTMLButtonElement,
} from "react";
import "./style/custom.css";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  colors,
  FormHelperText,
  Menu,
  MenuItem,
  FormLabel,
  InputLabel,
  Select,
  FormControl,
  Grid,
  Pagination,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Navigation from "./Navigation";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import nasgor from "../assets/nasgor.jpg";
import axios from "axios";
import Favorite from "./Favorite";

function DaftarResep() {
  const [anchorEl, setAnchorEl] = useState(null);

  //Dummy Data untuk Filter
  const categories = [
    {
      value: "Breakfast",
    },
    {
      value: "Lunch",
    },
    {
      value: "Dinner",
    },
    {
      value: "Desserts",
    },
  ];

  const difficulties = [
    {
      value: "Easy",
    },
    {
      value: "Medium",
    },
    {
      value: "Hard",
    },
  ];

  const cookTimes = [
    {
      value: "0 - 15 Menit",
    },
    {
      value: "0 - 30 Menit",
    },
    {
      value: "0 - 45 Menit",
    },
    {
      value: "0 - 60 Menit",
    },
  ];

  const sortBy = [
    {
      value: "Nama Resep A - Z",
    },
    {
      value: "Nama Resep Z - A",
    },
  ];

  // Data dummy untuk resep
  const dummyData = [
    {
      recipeId: 1,
      imageUrl: nasgor,
      difficult: "Hard",
      categories: { categoryName: "Dinner" },
      recipeName: "Nasi Goreng",
      time: 30,
    },
    {
      recipeId: 2,
      imageUrl: nasgor,
      difficult: "Medium",
      categories: { categoryName: "Dinner" },
      recipeName: "Nasi Goreng",
      time: 45,
    },
    {
      recipeId: 3,
      imageUrl: nasgor,
      difficult: "Medium",
      categories: { categoryName: "Dinner" },
      recipeName: "Nasi Goreng",
      time: 45,
    },
    {
      recipeId: 4,
      imageUrl: nasgor,
      difficult: "Medium",
      categories: { categoryName: "Dinner" },
      recipeName: "Nasi Goreng",
      time: 45,
    },
    {
      recipeId: 5,
      imageUrl: nasgor,
      difficult: "Medium",
      categories: { categoryName: "Dinner" },
      recipeName: "Nasi Goreng",
      time: 45,
    },
    {
      recipeId: 6,
      imageUrl: nasgor,
      difficult: "Medium",
      categories: { categoryName: "Dinner" },
      recipeName: "Nasi Goreng",
      time: 45,
    },
    {
      recipeId: 7,
      imageUrl: nasgor,
      difficult: "Medium",
      categories: { categoryName: "Dinner" },
      recipeName: "Nasi Goreng",
      time: 45,
    },
    {
      recipeId: 8,
      imageUrl: nasgor,
      difficult: "Medium",
      categories: { categoryName: "Dinner" },
      recipeName: "Nasi Goreng",
      time: 45,
    },

    // Tambahkan data dummy sesuai kebutuhan
  ];

  // Mengambil token dari local storage
  const accessToken = localStorage.getItem("token");
  console.log(accessToken);

  const authAxios = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const [post, setPost] = useState(dummyData);

  if (!post) return null;

  //Filter

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Link to={"/tambah-resep"}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      backgroundColor: "#01BFBF",
                      fontFamily: "Mulish-Regular",
                      textTransform: "none",
                    }}
                  >
                    Tambah Resep
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="filled-basic"
                  placeholder="Cari Resep"
                  type="search"
                  size="small"
                  sx={{ background: "white" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  id="filter-button"
                  variant="contained"
                  endIcon={<FilterListIcon />}
                  aria-controls={open ? "filter-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{
                    background: "white",
                    color: "#0000008A",
                    textTransform: "none",
                  }}
                >
                  Filter
                </Button>
                <Menu
                  id="filter-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <MenuItem sx={{ flexDirection: "row" }}>
                    <FormControl fullWidth>
                      <FormLabel>Tingkat Kesulitan</FormLabel>
                      <TextField
                        id="outlined-select-difficult"
                        select
                        defaultValue="Easy"
                      >
                        {difficulties.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <FormLabel>Kategori</FormLabel>
                      <TextField
                        id="outlined-select-category"
                        select
                        defaultValue="Breakfast"
                      >
                        {categories.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </MenuItem>
                  <MenuItem sx={{ flexDirection: "row" }}>
                    <FormControl fullWidth>
                      <FormLabel>Waktu Memasak</FormLabel>
                      <TextField
                        id="outlined-select-cooktime"
                        select
                        defaultValue="0 - 30 Menit"
                      >
                        {cookTimes.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <FormLabel>Sortir</FormLabel>
                      <TextField
                        id="outlined-select-sort"
                        select
                        defaultValue="Nama Resep A - Z"
                      >
                        {sortBy.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button variant="text" sx={{ color: "#EA4335" }}>
                      Bersihkan Filter
                    </Button>
                    <Button variant="outlined" sx={{ color: "#01BFBF" }}>
                      Batal
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#01BFBF" }}
                    >
                      Terapkan
                    </Button>
                  </MenuItem>
                </Menu>
                {/* <Typography>BARIS FILTER</Typography> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h4">Resep Favorit</Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              spacing={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
              marginBottom={10}
            >
              {post.map((recipes) => (
                <Grid item key={recipes.recipeId}>
                  <Card sx={{ width: 250 }}>
                    <CardMedia
                      sx={{ height: 120 }}
                      image={recipes.imageUrl}
                      title={nasgor}
                    />
                    <CardContent>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Typography
                          variant="body2"
                          color="#01BFBF"
                          textAlign={"left"}
                        >
                          {recipes.categories.categoryName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="#01BFBF"
                          textAlign={"right"}
                        >
                          {recipes.difficult}
                        </Typography>
                      </Grid>
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
                              <AccessTimeIcon sx={{ color: "#01BFBF" }} />
                              <Typography
                                variant="body2"
                                sx={{ color: "#01BFBF", marginLeft: 1 }}
                              >
                                &nbsp;{recipes.time} menit
                              </Typography>
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton aria-label="add to favorites" disabled>
                              <StarIcon sx={{ color: "#01BFBF" }} />
                              <Typography
                                variant="body2"
                                sx={{ color: "#01BFBF", marginLeft: 1 }}
                              >
                                Favorit
                              </Typography>
                            </IconButton>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ color: "black" }}
                        >
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
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
              <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ color: "#787885" }}>Entries</Typography>
                  <Button variant="contained" sx={{backgroundColor: "#01BFBF", color:"#FFFFFF"}}>8</Button>
                  <Button variant="text">16</Button>
                  <Button variant="text">32</Button>
                </Box>
                <Grid item>
                  <Pagination
                    count={10}
                    sx={{
                      justifyContent: "center",
                      "& .Mui-selected": {
                        color: "white", // Change the color for the selected page
                        backgroundColor: "#01BFBF", // Change the background color for the selected page
                      },
                      "& .MuiPaginationItem-root": {
                        color: "black", // Change the color for other pages
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default DaftarResep;
