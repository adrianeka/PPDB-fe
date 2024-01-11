import {
  Alert,
  Box,
  Button,
  Dialog,
  CircularProgress,
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
import Navigation from "./Navigation";
import RecipeCard from "./RecipeCard";

const DaftarResepFavorit = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [option, setOption] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [tempDifficulty, setTempDifficulty] = useState("");
  const [category, setCategory] = useState(null);
  const [tempCategory, setTempCategory] = useState("");
  const [cookMin, setCookMin] = useState(null);
  const [tempCookMin, setTempCookMin] = useState(null);
  const [cookMax, setCookMax] = useState(null);
  const [tempCookMax, setTempCookMax] = useState(null);
  const [tempCookTime, setTempCookTime] = useState("");
  const [sort, setSort] = useState(null);
  const [tempSort, setTempSort] = useState("");
  const [entries, setEntries] = useState(8);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const handleChangeDifficulty = (event) => {
    setTempDifficulty(event.target.value); // Update the temporary difficulty whenever the user selects a new difficulty
    console.log("temp difficulty changed: " + event.target.value);
  };

  const handleChangeCategory = (event) => {
    setTempCategory(event.target.value); // Update the temporary category whenever the user selects a new category
    console.log("temp category changed: " + event.target.value);
  };

  // Mengubah fungsi handleChangeCookTime
  const handleChangeCookTime = (event) => {
    setTempCookTime(event.target.value);
    if (event.target.value == 1) {
      console.log(
        `opsi nomer: ${event.target.value} bertipe ${typeof event.target.value}`
      );
      console.log("Set time 1 di klik");
      setTempCookMin(1);
      setTempCookMax(30);
    }

    if (event.target.value == 2) {
      console.log(
        `opsi nomer: ${event.target.value} bertipe ${typeof event.target.value}`
      );
      console.log("Set time 2 di klik");
      setTempCookMin(30);
      setTempCookMax(60);
    }
  };

  const handleChangeSort = (event) => {
    setTempSort(event.target.value);
    console.log("temp sort changed: " + event.target.value);
  };

  const handleChangeSortMobile = (event) => {
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

  const [myFavRecipes, setMyFavRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const userId = 101; // For further integration, Use the actual userID from LocalStorage or SessionStorage, which obtained from logging in

  const [alertVariant, setAlertVariant] = useState("");
  const [error, setError] = useState(null);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setErrorDialogOpen(false);
  };

  const showErrorDialog = () => {
    setErrorDialogOpen(true);
  };

  const handleEntriesClick = (value) => {
    if (entries === value) {
      return;
    }
    setEntries(value);
    setPage(0);
  };

  const fetchTotalRecipes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/book-recipe/book-recipes/my-favorite-recipes",
        {
          params: {
            userId: userId,
            recipeName: searchTerm || null,
            level: difficulty || null,
            category: category || null,
            cookMin: cookMin || null,
            cookMax: cookMax || null,
            sort: sort || null,
          },
        }
      );
  
      // Sesuaikan dengan respons dari server
      const totalRecipes = response.data.total;
      
      console.log(`total resep: ${totalRecipes}`);
      setTotal(totalRecipes);
    } catch (error) {
      console.error(`Error fetching total recipes: ${error}`);
      // Handle error fetching total recipes
    }
  };

  const fetchMyFavRecipes = async () => {
    try {
      setLoading(true);

      await fetchTotalRecipes(); // Panggil fungsi untuk mendapatkan total resep

      const response = await axios.get(
        "http://localhost:8080/book-recipe/book-recipes/my-favorite-recipes",
        {
          params: {
            pageSize: entries,
            page: page,
            userId: userId,
            recipeName: searchTerm || null,
            level: difficulty || null,
            category: category || null,
            cookMin: cookMin || null,
            cookMax: cookMax || null,
            sort: sort || null,
          },
        }
      );
      // console.log(`total resep: ${response.data.total}`);
      // setTotal(response.data.total);
      setMyFavRecipes(response.data.data);
      console.log(response.data.data);
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

  const handlePaginationChange = (event, page) => {
    setPage(page - 1);
  };

  useEffect(() => {
    fetchMyFavRecipes();
    console.log(`total resep: ${total}`)
    console.log(
      `level=${difficulty}&category=${category}&cookMin=${cookMin}&cookMax=${cookMax}&sort=${sort}`
    );
  }, [
    userId,
    searchTerm,
    difficulty,
    category,
    cookMin,
    cookMax,
    sort,
    entries,
    page,
  ]);

  const handleApplyFilters = () => {
    setDifficulty(tempDifficulty);
    setCategory(tempCategory);
    setCookMin(tempCookMin);
    setCookMax(tempCookMax);
    setSort(tempSort);
    //   console.log(`level=${difficulty}&category=${category}&cookMin=${cookMin}&cookMax=${cookMax}&sort=${sort}`)
    handleClose();
  };

  const handleClearFilters = () => {
    setTempDifficulty("");
    setTempCategory("");
    setTempCookTime("");
    setTempSort("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchChange = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      setPage(0);
      setSearchTerm(inputValue); // Update the search term when Enter is pressed
    }
  };

  const entryButtons = (value) => {
    return {
      textTransform: "none",
      backgroundColor: entries === value ? " #01BFBF" : "transparent",
      color: entries === value ? "white" : "grey",
      fontSize: "14px",
      fontWeight: "500",
      padding: "5px",
      borderRadius: "3px",
      minWidth: "26px",
      height: "27px",
    };
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
                    onChange={handleInputChange} // Update the TextField input value whenever the user types
                    onKeyDown={handleSearchChange} // Update the search term when Enter is pressed
                    value={inputValue}
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
                            value={tempDifficulty}
                            onChange={handleChangeDifficulty}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{ width: "180px", height: "36px" }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="Easy">Easy</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Hard">Hard</MenuItem>
                            <MenuItem value="Master Chef">Master Chef</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography fontSize={16}>Kategori</Typography>
                        <FormControl
                          sx={{ m: 1, minWidth: 120, margin: "0px" }}
                        >
                          <Select
                            value={tempCategory}
                            onChange={handleChangeCategory}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{ width: "180px", height: "36px" }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="Lunch">Lunch</MenuItem>
                            <MenuItem value="Breakfast">Breakfast</MenuItem>
                            <MenuItem value="Dinner">Dinner</MenuItem>
                            <MenuItem value="Snack">Snack</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography fontSize={16}>Waktu Memasak</Typography>
                        <FormControl
                          sx={{ m: 1, minWidth: 120, margin: "0px" }}
                        >
                          {/* Mengganti bagian Select untuk waktu memasak */}
                          <Select
                            value={tempCookTime}
                            onChange={handleChangeCookTime}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{ width: "180px", height: "36px" }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>0-30 Menit</MenuItem>
                            <MenuItem value={2}>30-60 Menit</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <Typography fontSize={16}>Sortir</Typography>
                        <FormControl
                          sx={{ m: 1, minWidth: 120, margin: "0px" }}
                        >
                          <Select
                            value={tempSort}
                            onChange={handleChangeSort}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{ width: "180px", height: "36px" }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Nama Resep A-Z</MenuItem>
                            <MenuItem value={2}>Nama Resep Z-A</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} display={"flex"}>
                        <Typography
                          onClick={handleClearFilters}
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
              <Typography variant="h4">Resep Favorit</Typography>
            </Grid>
          </Box>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <Box>
            <Grid item paddingBlock={3}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", fontSize: 22 }}
              >
                Resep Favorit
              </Typography>
            </Grid>
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
              onChange={handleInputChange} // Update the TextField input value whenever the user types
              onKeyDown={handleSearchChange} // Update the search term when Enter is pressed
              value={inputValue}
            />
            <Box
              item
              className="grid-filter"
              style={{
                paddingTop: "10px",
                display: "flex",
                gap: "20px",
                margin: "5px",
                justifyContent: "center",
                alignContent: "center",
              }}
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
                        value={tempDifficulty}
                        onChange={handleChangeDifficulty}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{ width: "180px", height: "36px" }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Easy">Easy</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Hard">Hard</MenuItem>
                        <MenuItem value="Master Chef">Master Chef</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Typography fontSize={16}>Kategori</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120, margin: "0px" }}>
                      <Select
                        value={tempCategory}
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
                        value={tempCookTime}
                        onChange={handleChangeCookTime}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{ width: "180px", height: "36px" }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>0-30 Menit</MenuItem>
                        <MenuItem value={2}>30-60 Menit</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} display={"flex"}>
                    <Typography
                      onClick={handleClearFilters}
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
                      onClick={handleApplyFilters}
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
                  onChange={handleChangeSortMobile}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ width: "150px", height: "40px", fontSize: "14px" }}
                >
                  <MenuItem sx={{ fontSize: "14px" }} value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value={"1"}>
                    Nama Resep A-Z
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value={"2"}>
                    Nama Resep Z-A
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
            justifyContent="center"
            alignItems="flex-start"
            marginTop={1}
            marginBottom={3}
          >
            {loading ? (
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                paddingBlock={10}
              >
                <CircularProgress />
                <Typography variant="body1">Loading your recipes...</Typography>
              </Box>
            ) : (
              myFavRecipes.map((resep) => (
                <RecipeCard
                  key={resep.recipeId}
                  resep={resep}
                  handleOpenOptions={handleOpenOptions}
                  option={option}
                  handleCloseOptions={handleCloseOptions}
                  userId={userId}
                />
              ))
            )}
          </Grid>
          <Grid item display={"flex"} justifyContent={"space-between"}>
            <Box
              sx={{
                maxWidth: "300px",
                display: "flex",
                gap: "10px",
                alignItems: "baseline",
                flexWrap: "wrap",
                marginTop: 2,
                marginBottom: 4,
              }}
            >
              Entries
              <Button
                sx={entries === 8 ? entryButtons(8) : entryButtons(8, true)}
                onClick={() => handleEntriesClick(8)}
              >
                8
              </Button>
              <Button
                sx={entries === 16 ? entryButtons(16) : entryButtons(16, true)}
                onClick={() => handleEntriesClick(16)}
              >
                16
              </Button>
              <Button
                sx={entries === 32 ? entryButtons(32) : entryButtons(32, true)}
                onClick={() => handleEntriesClick(32)}
              >
                32
              </Button>
            </Box>
            <Pagination
              className="pagination"
              count={Math.ceil(total / entries) + 1}
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
              page={page}
              onChange={handlePaginationChange}
            />
          </Grid>
        </Grid>

        <Dialog open={errorDialogOpen} onClose={handleDialogClose}>
          {error && (
            <Alert variant="filled" severity={alertVariant}>
              {error}
            </Alert>
          )}
        </Dialog>
      </Container>
    </>
  );
};

export default DaftarResepFavorit;
