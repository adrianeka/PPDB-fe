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
import {
  FilterList,
  Search,
} from "@mui/icons-material";
import { useState } from "react";
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

  const ResepSaya = () => {
    return [
      {
        id: 1,
        nama: "Chocolate Chip",
        kategori: "Breakfast",
        difficulty: "Hard",
        waktu: 25,
        isFavorite: true,
        image: ChocolateChip,
      },
      {
        id: 2,
        nama: "Egg Benedict",
        kategori: "Breakfast",
        difficulty: "Hard",
        waktu: 20,
        isFavorite: false,
        image: EggBenedict,
      },
      {
        id: 3,
        nama: "Grilled Rib Eye",
        kategori: "Breakfast",
        difficulty: "Hard",
        waktu: 45,
        isFavorite: false,
        image: GrilledRibEye,
      },
      {
        id: 4,
        nama: "Nasi Goreng",
        kategori: "Dinner",
        difficulty: "Easy",
        waktu: 25,
        isFavorite: false,
        image: NasiGoreng,
      },
      {
        id: 5,
        nama: "Old Fashioned Pancake",
        kategori: "Breakfast",
        difficulty: "Hard",
        waktu: 20,
        isFavorite: false,
        image: OldFashionedPancake,
      },
      {
        id: 6,
        nama: "Pancake",
        kategori: "Breakfast",
        difficulty: "Easy",
        waktu: 20,
        isFavorite: false,
        image: Pancake,
      },
      {
        id: 7,
        nama: "Sashimi",
        kategori: "Breakfast",
        difficulty: "Easy",
        waktu: 15,
        isFavorite: true,
        image: Sashimi,
      },
      {
        id: 8,
        nama: "Simple Sugar Cakes",
        kategori: "Breakfast",
        difficulty: "Medium",
        waktu: 20,
        isFavorite: false,
        image: SugarCake,
      },
    ];
  };

  return (
    <>
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
          <Hidden smDown>
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
                            <MenuItem value={"Easy"}>Easy</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"Hard"}>Hard</MenuItem>
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
                            <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                            <MenuItem value={"Lunch"}>Lunch</MenuItem>
                            <MenuItem value={"Dinner"}>Dinner</MenuItem>
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
                            <MenuItem value={"0-30 Menit"}>0-30 Menit</MenuItem>
                            <MenuItem value={"30-60 Menit"}>
                              30-60 Menit
                            </MenuItem>
                            <MenuItem value={"+60 Menit"}>+60 Menit</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
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
                            <MenuItem value={"Nama Resep A-Z"}>
                              Nama Resep A-Z
                            </MenuItem>
                            <MenuItem value={"Nama Resep Z-A"}>
                              Nama Resep Z-A
                            </MenuItem>
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
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h4">Resep Saya</Typography>
            </Grid>
          </Hidden>

          <Hidden smUp>
            <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
              Resep Saya
            </Typography>
            <Grid item>
              <TextField
                id="filled-basic"
                placeholder="Cari Resep"
                type="search"
                size="small"
                sx={{ maxWidth: "100%", background: "white" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
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
                        <MenuItem value={"Easy"}>Easy</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"Hard"}>Hard</MenuItem>
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
                        <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                        <MenuItem value={"Lunch"}>Lunch</MenuItem>
                        <MenuItem value={"Dinner"}>Dinner</MenuItem>
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
                        <MenuItem value={"0-30 Menit"}>0-30 Menit</MenuItem>
                        <MenuItem value={"30-60 Menit"}>30-60 Menit</MenuItem>
                        <MenuItem value={"+60 Menit"}>+60 Menit</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Typography fontSize={16}>Sortir</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120, margin: "0px" }}>
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
                        <MenuItem value={"Nama Resep A-Z"}>
                          Nama Resep A-Z
                        </MenuItem>
                        <MenuItem value={"Nama Resep Z-A"}>
                          Nama Resep Z-A
                        </MenuItem>
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
            </Grid>
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
              {ResepSaya().map((resep) => (
                <RecipeCard
                  key={resep.id}
                  resep={resep}
                  handleOpenOptions={handleOpenOptions}
                  option={option}
                  handleCloseOptions={handleCloseOptions}
                />
              ))}
            </Grid>
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DaftarResepSaya;
