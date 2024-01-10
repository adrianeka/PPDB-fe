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
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  colors,
  FormHelperText,
  Menu,
  MenuItem,
  FormLabel,
  InputLabel,
  Snackbar,
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

//Dummy Data untuk Filter
const categories = [
  {
    value: "",
    label: "none",
  },
  {
    value: 0,
    label: "Lunch"
  },
  {
    value: 1,
    label: "Breakfast"
  },
  {
    value: 2,
    label: "Dinner"
  },
  {
    value: 3,
    label: "Snack"
  },
];

const difficulties = [
  {
    value: "",
    label: "none",
  },
  {
    value: 3,
    label: "Easy",
  },
  {
    value: 2,
    label: "Medium",
  },
  {
    value: 1,
    label: "Hard",
  },
  {
    value: 0,
    label: "Master Chef",
  },
];

const cookTimes = [
  {
    value: "",
    label: "none",
  },
  {
    value: 15,
    label: "0 - 15 Menit",
  },
  {
    value: 30,
    label: "15 - 30 Menit",
  },
  {
    value: 45,
    label: "30 - 45 Menit",
  },
  {
    value: 60,
    label: "45 - 60 Menit",
  },
];

const sortBy = [
  {
    value: "",
    label: "none",
  },
  {
    value: "nameAsc",
    label: "Nama Resep A - Z",
  },
  {
    value: "nameDesc",
    label: "Nama Resep Z - A",
  },
];


function ResepFavorit() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [option, setOption] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState(null);
  const [cookTime, setCookTime] = useState(null);
  const [sort, setSort] = useState(null);

  const handleChangeDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeCookTime = (event) => {
    setCookTime(event.target.value);
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleOpenOptions = (event, id) => {
    setOption(id);
  };

  const handleCloseOptions = () => {
    setOption(null);
  };

  //Filter

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [myFavRecipes, setMyFavRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const userId = 100;

  const [alertVariant, setAlertVariant] = useState("")
  const [error, setError] = useState(null);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setErrorDialogOpen(false);
  };

  const showErrorDialog = () => {
    setErrorDialogOpen(true);
  };

  //Pagination
  const [pageSize, setPageSize] = useState(8); // Ubah sesuai kebutuhan
  const [page, setPage] = useState(0);

  const handlePageSizeButtonClick = (size) => {
    setPageSize(size);
  };

  const handlePageChange = (event, value) => {
    setPage(value-1);
  };

  const fetchMyFavRecipes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/book-recipe/my-favorite-recipes",
        {
          params: {
            userId: userId,
            foodName: searchTerm,
            levelId: difficulty,
            categoryId: category,
            time: cookTime,
            sortBy: sort,
            pageSize: pageSize,
            page: page,
          },
        }
      );
      setMyFavRecipes(response.data.data);
      console.log(response.data);
      console.log("Msg: ", response.data.message)
    } catch (error) {
      console.error(`Error fetching recipes: ${error}`);
      showErrorDialog();

      // Mengatur pesan dan variant alert berdasarkan status error
      if (error.response && error.response.status === 500) {
        setError("Terjadi kesalahan server. Silakan coba kembali.");
        setAlertVariant("error");
        console.log(`status error: ${error.response.status}`);
      } else if (error.response && error.response.status === 404) {
        setError("Resep masakan tidak tersedia");
        setAlertVariant("info");
        console.log(`status error: ${error.response.status}`);
      } else {
        setError("Terjadi kesalahan. Silakan coba kembali.");
        setAlertVariant("error");
        console.log(`status error: ${error.response.status}`);
      }
      
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchMyFavRecipes();
  }, [searchTerm, difficulty, category, cookTime, sort, pageSize, page]);  


  const handleApplyFilters = () => {
    setLoading(true); // Set loading to true when applying filters
    fetchMyFavRecipes();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  // Mengambil token dari local storage
  // const accessToken = localStorage.getItem("token");
  // console.log(accessToken);

  // const authAxios = axios.create({
  //   baseURL: "http://localhost:8080/api",
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });

  // const [post, setPost] = useState(dummyData);

  // if (!post) return null;

  

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
                  // Connect the input field to the search term state
                  value={searchTerm}
                  onChange={handleSearchChange}
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
                        defaultValue=""
                      >
                        {difficulties.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <FormLabel>Kategori</FormLabel>
                      <TextField
                        id="outlined-select-category"
                        select
                        defaultValue=""
                      >
                        {categories.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
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
                        defaultValue=""
                      >
                        {cookTimes.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <FormLabel>Sortir</FormLabel>
                      <TextField
                        id="outlined-select-sort"
                        select
                        defaultValue=""
                      >
                        {sortBy.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
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
              { loading ? (
              <Grid item>
                <CircularProgress />
              </Grid>
                ) : (
                myFavRecipes.map((recipes) => (
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
                            {recipes.levels.levelName}
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
                            {recipes.is_favorite ? (
                              <Grid item>
                                <IconButton aria-label="add to favorites">
                                  <StarIcon sx={{ color: "#01BFBF" }} />
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "#01BFBF", marginLeft: 1 }}
                                  >
                                    Favorit
                                  </Typography>
                                </IconButton>
                              </Grid>
                              // <Grid item>
                              //     <Favorite recipeId={recipes.recipeId}/>
                              // </Grid> 
                              ) : null
                              }

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
                ))
              )}
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
                  <Button
                    variant={pageSize === 8 ? "contained" : "text"}
                    sx={{
                      backgroundColor: pageSize === 8 ? "#01BFBF" : "transparent",
                      color: pageSize === 8 ? "#FFFFFF" : "#787885",
                    }}
                    onClick={() => handlePageSizeButtonClick(8)}
                  >
                    8
                  </Button>
                  <Button
                    variant={pageSize === 16 ? "contained" : "text"}
                    sx={{
                      backgroundColor: pageSize === 16 ? "#01BFBF" : "transparent",
                      color: pageSize === 16 ? "#FFFFFF" : "#787885",
                    }}
                    onClick={() => handlePageSizeButtonClick(16)}
                  >
                    16
                  </Button>
                  <Button
                    variant={pageSize === 32 ? "contained" : "text"}
                    sx={{
                      backgroundColor: pageSize === 32 ? "#01BFBF" : "transparent",
                      color: pageSize === 32 ? "#FFFFFF" : "#787885",
                    }}
                    onClick={() => handlePageSizeButtonClick(32)}
                  >
                    32
                  </Button>
                </Box>
                <Grid item>
                  <Pagination
                    count={10}
                    page={page}
                    onChange={handlePageChange}
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

      <Dialog open={errorDialogOpen} onClose={handleDialogClose}>
      {error && (
            <Alert variant="filled" severity={alertVariant}>
              {error}
            </Alert>
      )}
      </Dialog>
    </div>
  );
}

export default ResepFavorit;
