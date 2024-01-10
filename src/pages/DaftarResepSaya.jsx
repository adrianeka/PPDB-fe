import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Hidden,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { FilterList, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import ChocolateChip from "./Resources/Imgs/cookies_pastries_chocolate_chips_187114_1600x900.jpg";
import EggBenedict from "./Resources/Imgs/classic-eggs-benedict-with-lemon-basil-hollandaise-1.webp";
import GrilledRibEye from "./Resources/Imgs/grilled-ribeye-5.jpg";
import NasiGoreng from "./Resources/Imgs/fried-rice-recipe-1366x768.webp";
import OldFashionedPancake from "./Resources/Imgs/oldfashionedpanckae.jpg";
import Pancake from "./Resources/Imgs/Fluffy-Pancakes-New-CMS.jpg";
import Sashimi from "./Resources/Imgs/sashimi.jpg";
import SugarCake from "./Resources/Imgs/sugarcake.jpg";
import RecipeCard from "../components/RecipeCard";

const DaftarResepSaya = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [option, setOption] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState(null);
  const [cookTIme, setCookTime] = useState(null);
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenOptions = (event, id) => {
    setOption(id);
  };

  const handleCloseOptions = () => {
    setOption(null);
  };

  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const userId = "129"; // For further integration, Use the actual userID from LocalStorage or SessionStorage, which obtained from logging in

  const fetchMyRecipes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/book-recipe/book-recipes/my-recipes",
        {
          params: {
            userId: userId,
            foodName: searchTerm,
            levelId: difficulty,
            categoryId: category,
            time: cookTIme,
            sortBy: sort,
          },
        }
      );
      setMyRecipes(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(`Error fetching recipes: ${error}`);
    } finally {
      setLoading(false); // Set loading to false whether the request is successful or not
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, [searchTerm, difficulty, category, cookTIme, sort]);

  const handleApplyFilters = () => {
    setLoading(true);
    fetchMyRecipes();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteRecipe = async (recipeId, userId) => {
    try {
      setDeletionLoading(true);
      const response = await axios.put(
        `http://localhost:8080/book-recipe/book-recipes/${recipeId}?userId=${userId}`
      );
  
      // Check if the request was successful
      if (response.status === 200) {
        console.log("Recipe deleted successfully!");
        setDeletionLoading(false);
        setDeletionSuccess(true);
      } else {
        console.error("Failed to delete recipe: ");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error.message);
    } finally {
      fetchMyRecipes();
    }
  };  

  return (
    <>
      <Navigation />
      <Container>
        {/* Desktop view */}
        <Hidden smDown>
          <Box
            display="flex"
            flexDirection="Column"
            alignItems={"center"}
            paddingTop={5}
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
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{
                        textTransform: "capitalize",
                        backgroundColor: "#01BFBF",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#01A0A0",
                          boxShadow: "none",
                        },
                      }}
                    >
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
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleSearchChange}
                    value={searchTerm}
                  />
                </Grid>
                <Grid item>
                  <Button
                    className="filter-button"
                    sx={{
                      padding: "7px 10px",
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      textTransform: "capitalize",
                    }}
                    onClick={handleClick}
                  >
                    <Box display={"flex"}>
                      <Typography
                        color={"black"}
                        display={"flex"}
                        alignItems={"center"}
                        marginRight={3}
                      >
                        Filter
                      </Typography>
                      <FilterList sx={{ color: "black" }} />
                    </Box>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Grid
                      className="filter-grid"
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        maxWidth: "445px",
                        height: "250px",
                        padding: "10px",
                      }}
                    >
                      <Grid item xs={6}>
                        <Typography fontSize={16}>Tingkat Kesulitan</Typography>
                        <FormControl
                          sx={{ m: 1, minWidth: 120, margin: "0px" }}
                        >
                          <Select
                            value={difficulty}
                            onChange={handleChangeDifficulty}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{ width: "180px", height: "36px" }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={3}>Easy</MenuItem>
                            <MenuItem value={2}>Medium</MenuItem>
                            <MenuItem value={1}>Hard</MenuItem>
                            <MenuItem value={0}>Master Chef</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography fontSize={16}>Kategori</Typography>
                        <FormControl
                          sx={{ m: 1, minWidth: 120, margin: "0px" }}
                        >
                          <Select
                            value={category}
                            onChange={handleChangeCategory}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{ width: "180px", height: "36px" }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={0}>Lunch</MenuItem>
                            <MenuItem value={1}>Breakfast</MenuItem>
                            <MenuItem value={2}>Dinner</MenuItem>
                            <MenuItem value={3}>Snack</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography fontSize={16}>Waktu Memasak</Typography>
                        <FormControl
                          sx={{ m: 1, minWidth: 120, margin: "0px" }}
                        >
                          <Select
                            value={cookTIme}
                            onChange={handleChangeCookTime}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{ width: "180px", height: "36px" }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={30}>0-30 Menit</MenuItem>
                            <MenuItem value={60}>30-60 Menit</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <Typography fontSize={16}>Sortir</Typography>
                        <FormControl
                          sx={{ m: 1, minWidth: 120, margin: "0px" }}
                        >
                          <Select
                            value={sort}
                            onChange={handleChangeSort}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{ width: "180px", height: "36px" }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={"nameAsc"}>
                              Nama Resep A-Z
                            </MenuItem>
                            <MenuItem value={"nameDesc"}>
                              Nama Resep Z-A
                            </MenuItem>
                            <MenuItem value={"timeAsc"}>Durasi A-Z</MenuItem>
                            <MenuItem value={"timeDesc"}>Durasi Z-A</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} display={"flex"}>
                        <Typography
                          fontSize={16}
                          sx={{
                            color: "#EA4335",
                            "&:hover": { cursor: "pointer" },
                          }}
                        >
                          Bersihkan Filter
                        </Typography>
                      </Grid>
                      <Grid display={"flex"} item xs={6} gap={1}>
                        <Button
                          onClick={handleClose}
                          variant="contained"
                          sx={{
                            color: "#01BFBF",
                            textTransform: "capitalize",
                            backgroundColor: "white",
                            boxShadow: "none",
                            border: "1px solid #01BFBF",
                            width: "85px",
                            height: "40px",
                            "&:hover": {
                              backgroundColor: "white",
                              boxShadow: "none",
                            },
                          }}
                        >
                          Batal
                        </Button>
                        <Button
                          onClick={handleApplyFilters}
                          variant="contained"
                          sx={{
                            textTransform: "capitalize",
                            backgroundColor: "#01BFBF",
                            boxShadow: "none",
                            width: "85px",
                            height: "40px",
                            "&:hover": {
                              backgroundColor: "#01A0A0",
                              boxShadow: "none",
                            },
                          }}
                        >
                          Terapkan
                        </Button>
                      </Grid>
                    </Grid>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
            <Grid item paddingBlock={3}>
              <Typography variant="h4">Resep Saya</Typography>
            </Grid>
          </Box>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
              Resep Saya
            </Typography>
            <TextField
              id="filled-basic"
              placeholder="Cari Resep"
              type="search"
              size="small"
              sx={{ width: "320px", background: "white" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearchChange}
              value={searchTerm}
            />
            <Box
              item
              className="grid-filter"
              style={{ paddingTop: "10px", display: "flex", gap: "20px" }}
            >
              <Button
                className="filter-button"
                sx={{
                  padding: "7px 10px",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  textTransform: "capitalize",
                  width: "150px",
                }}
                onClick={handleClick}
              >
                <Box display={"flex"} gap={5}>
                  <Typography
                    color={"black"}
                    display={"flex"}
                    alignItems={"center"}
                    marginRight={3}
                  >
                    Filter
                  </Typography>
                  <FilterList sx={{ color: "black" }} />
                </Box>
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Grid
                  className="filter-grid"
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{
                    maxWidth: "257px",
                    height: "250px",
                    padding: "10px",
                  }}
                >
                  <Grid item>
                    <Typography fontSize={16}>Tingkat Kesulitan</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120, margin: "0px" }}>
                      <Select
                        value={difficulty}
                        onChange={handleChangeDifficulty}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{ width: "180px", height: "36px" }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={3}>Easy</MenuItem>
                        <MenuItem value={2}>Medium</MenuItem>
                        <MenuItem value={1}>Hard</MenuItem>
                        <MenuItem value={0}>Master Chef</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Typography fontSize={16}>Kategori</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120, margin: "0px" }}>
                      <Select
                        value={category}
                        onChange={handleChangeCategory}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{ width: "180px", height: "36px" }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={0}>Lunch</MenuItem>
                        <MenuItem value={1}>Breakfast</MenuItem>
                        <MenuItem value={2}>Dinner</MenuItem>
                        <MenuItem value={3}>Snack</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Typography fontSize={16}>Waktu Memasak</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120, margin: "0px" }}>
                      <Select
                        value={cookTIme}
                        onChange={handleChangeCookTime}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{ width: "180px", height: "36px" }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={30}>0-30 Menit</MenuItem>
                        <MenuItem value={60}>30-60 Menit</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} display={"flex"}>
                    <Typography
                      fontSize={16}
                      sx={{
                        color: "#EA4335",
                        "&:hover": { cursor: "pointer" },
                      }}
                    >
                      Bersihkan Filter
                    </Typography>
                  </Grid>
                  <Grid display={"flex"} item gap={1}>
                    <Button
                      variant="contained"
                      sx={{
                        color: "#01BFBF",
                        textTransform: "capitalize",
                        backgroundColor: "white",
                        boxShadow: "none",
                        border: "1px solid #01BFBF",
                        width: "85px",
                        height: "40px",
                        "&:hover": {
                          backgroundColor: "white",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Batal
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: "capitalize",
                        backgroundColor: "#01BFBF",
                        boxShadow: "none",
                        width: "85px",
                        height: "40px",
                        "&:hover": {
                          backgroundColor: "#01A0A0",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Terapkan
                    </Button>
                  </Grid>
                </Grid>
              </Menu>
              <FormControl sx={{ m: 1, minWidth: 120, margin: "0px" }}>
                <Select
                  value={sort}
                  onChange={handleChangeSort}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ width: "150px", height: "40px", fontSize: "14px" }}
                >
                  <MenuItem sx={{ fontSize: "14px" }} value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value={"nameDesc"}>
                    Nama Resep A-Z
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value={"nameAsc"}>
                    Nama Resep Z-A
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value={"timeDesc"}>
                    Durasi A-Z
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value={"timeAsc"}>
                    Durasi Z-A
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box paddingBlock={1}>
              <Link to={"/tambah-resep"}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    width: "320px",
                    textTransform: "capitalize",
                    backgroundColor: "#01BFBF",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#01A0A0",
                      boxShadow: "none",
                    },
                  }}
                >
                  Tambah Resep
                </Button>
              </Link>
            </Box>
          </Box>
        </Hidden>
        <Grid item>
          <Grid
            container
            spacing={6}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            marginBottom={3}
          >
            {myRecipes.map((resep) => (
              <RecipeCard
                key={resep.recipeId}
                resep={resep}
                handleOpenOptions={handleOpenOptions}
                option={option}
                handleCloseOptions={handleCloseOptions}
                handleDeleteRecipe={handleDeleteRecipe}
                userId={userId}
                deletionLoading={deletionLoading}
                deletionSuccess={deletionSuccess}
              />
            ))}
          </Grid>

          <div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              myRecipes.map((recipe) => (
                <div key={recipe.recipeId}>
                  <h2>{recipe.recipeName}</h2>
                  <p>Category: {recipe.categories.categoryName}</p>
                  <p>Level: {recipe.levels.levelName}</p>
                  <p>Time: {recipe.time} minutes</p>
                  <p>Favorite: {recipe.is_favorite ? "Yes" : "No"}</p>
                  <button
                    onClick={() => handleDeleteRecipe(recipe.recipeId, userId)}
                  >
                    delete
                  </button>
                </div>
              ))
            )}
          </div>

          <Box display={"flex"} justifyContent={"space-between"}>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "baseline",
                flexWrap: "wrap",
              }}
            >
              Entries
              <Button>8</Button>
              <Button>16</Button>
              <Button>32</Button>
            </Box>
            <Pagination
              className="pagination"
              count={10}
              size="small"
              sx={{
                display: "flex",
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
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default DaftarResepSaya;
