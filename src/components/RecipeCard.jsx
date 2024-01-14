import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Hidden,
  CircularProgress,
} from "@mui/material";
import {
  MoreHoriz,
  Edit,
  DeleteSweep,
  AccessTime,
  Star,
  StarOutline,
  ErrorOutline,
} from "@mui/icons-material";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({
  resep,
  handleOpenOptions,
  option,
  handleCloseOptions,
  handleDeleteRecipe,
  userId,
  deletionLoading,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {/* Desktop */}
      <Hidden smDown>
        <Grid item key={resep.recipeId}>
          <Card sx={{ width: 250, position: "relative" }}>
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
              onClick={(event) => handleOpenOptions(event, resep.recipeId)}>
              <MoreHoriz />
            </IconButton>
            <Menu
              anchorEl={
                option === resep.recipeId ? document.activeElement : null
              }
              open={option === resep.recipeId}
              onClose={handleCloseOptions}>
              <MenuItem
                component="a"
                href={`/resep-saya/edit-resep/${resep.recipeId}`}>
                <Edit sx={{ color: "#01BFBF" }} />
                <Typography sx={{ color: "#01BFBF" }}>Edit</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleOpenDialog();
                  handleCloseOptions();
                }}>
                <DeleteSweep sx={{ color: "red" }} />
                <Typography sx={{ color: "red" }}>Hapus</Typography>
              </MenuItem>
            </Menu>

            {/* Dialog for confirmation */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle sx={{ textAlign: "center" }}>
                <ErrorOutline sx={{ fontSize: 96, color: "#FBBC04" }} />
              </DialogTitle>
              <DialogContent sx={{ textAlign: "center" }}>
                <Typography variant="body1">
                  Apakah anda yakin akan menghapus resep {resep.recipeName}?
                </Typography>
              </DialogContent>
              <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button
                  onClick={handleCloseDialog}
                  sx={{
                    color: "#01BFBF",
                    textTransform: "capitalize",
                    backgroundColor: "white",
                    boxShadow: "none",
                    border: "1px solid #01BFBF",
                    width: "145px",
                  }}>
                  Tidak
                </Button>
                <Button
                  disabled={deletionLoading ? true : false}
                  onClick={() => handleDeleteRecipe(resep.recipeId, userId)}
                  sx={{
                    color: "white",
                    textTransform: "capitalize",
                    backgroundColor: "#01BFBF",
                    boxShadow: "none",
                    width: "145px",
                    "&:hover": {
                      backgroundColor: "#01A0A0",
                      boxShadow: "none",
                    },
                  }}>
                  {deletionLoading ? <CircularProgress size={25} /> : "Ya"}
                </Button>
              </DialogActions>
            </Dialog>

            <CardMedia
              component="img"
              height="142"
              image={resep.imageUrl}
              alt={resep.imageUrl}
            />
            <CardContent sx={{ padding: 1 }}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign={"left"}
                  sx={{ color: "#01BFBF" }}>
                  {resep.categories.categoryName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign={"left"}
                  sx={{ color: "#01BFBF" }}>
                  {resep.levels.levelName}
                </Typography>
              </Box>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                textAlign={"left"}>
                {resep.recipeName}
              </Typography>
            </CardContent>
            <CardActions sx={{ padding: 1 }}>
              <Grid container direction="column" marginBottom={1}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ color: "black" }}>
                  <Grid item>
                    <IconButton
                      aria-label="add to favorites"
                      disabled
                      sx={{ padding: 0 }}>
                      <AccessTime sx={{ color: "#01BFBF" }} />
                      <Typography variant="body2" sx={{ color: "#01BFBF" }}>
                        &nbsp;{resep.time} Menit
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    display={"flex"}
                    alignItems={"center"}
                    sx={{ "&:hover": { cursor: "pointer" } }}>
                    {resep.is_favorite === true ? (
                      <Star sx={{ color: "#01BFBF" }} />
                    ) : (
                      <StarOutline sx={{ color: "#01BFBF" }} />
                    )}
                    &nbsp;
                    <Typography variant="body2" color={"#01BFBF"}>
                      Favorit
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Link to={`/resep-saya/detail-resep/${resep.recipeId}`}>
                    <Typography variant="body2" color={"#01BFBF"}>
                      Lihat Detil Resep
                    </Typography>
                  </Link>
                </Box>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Hidden>

      {/* Mobile View */}
      <Hidden smUp>
        <Grid item key={resep.recipeId} justifyContent="center" alignItems="center" padding={0}>
          <Card sx={{ width: 330, position: "relative" }}>
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
              onClick={(event) => handleOpenOptions(event, resep.recipeId)}>
              <MoreHoriz />
            </IconButton>
            <Menu
              anchorEl={
                option === resep.recipeId ? document.activeElement : null
              }
              open={option === resep.recipeId}
              onClose={handleCloseOptions}>
              <MenuItem
                component="a"
                href={`/resep-saya/edit-resep/${resep.recipeId}`}>
                <Edit sx={{ color: "#01BFBF" }} />
                <Typography sx={{ color: "#01BFBF" }}>Edit</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleOpenDialog();
                  handleCloseOptions();
                }}>
                <DeleteSweep sx={{ color: "red" }} />
                <Typography sx={{ color: "red" }}>Hapus</Typography>
              </MenuItem>
            </Menu>

            {/* Dialog for confirmation */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle sx={{ textAlign: "center" }}>
                <ErrorOutline sx={{ fontSize: 96, color: "#FBBC04" }} />
              </DialogTitle>
              <DialogContent sx={{ textAlign: "center" }}>
                <Typography variant="body1">
                  Apakah anda yakin akan menghapus resep {resep.recipeName}?
                </Typography>
              </DialogContent>
              <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button
                  onClick={handleCloseDialog}
                  sx={{
                    color: "#01BFBF",
                    textTransform: "capitalize",
                    backgroundColor: "white",
                    boxShadow: "none",
                    border: "1px solid #01BFBF",
                    width: "145px",
                  }}>
                  Tidak
                </Button>
                <Button
                  onClick={() => handleDeleteRecipe(resep.recipeId, userId)}
                  sx={{
                    color: "white",
                    textTransform: "capitalize",
                    backgroundColor: "#01BFBF",
                    boxShadow: "none",
                    width: "145px",
                    "&:hover": {
                      backgroundColor: "#01A0A0",
                      boxShadow: "none",
                    },
                  }}>
                  Ya
                </Button>
              </DialogActions>
            </Dialog>

            <CardMedia
              component="img"
              height="142"
              image={resep.imageUrl}
              alt={resep.imageUrl}
            />
            <CardContent sx={{ padding: 1 }}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign={"left"}
                  sx={{ color: "#01BFBF" }}>
                  {resep.categories.categoryName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign={"left"}
                  sx={{ color: "#01BFBF" }}>
                  {resep.levels.levelName}
                </Typography>
              </Box>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                textAlign={"left"}>
                {resep.recipeName}
              </Typography>
            </CardContent>
            <CardActions sx={{ padding: 1 }}>
              <Grid container direction="column" marginBottom={1}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ color: "black" }}>
                  <Grid item>
                    <IconButton
                      aria-label="add to favorites"
                      disabled
                      sx={{ padding: 0 }}>
                      <AccessTime sx={{ color: "#01BFBF" }} />
                      <Typography variant="body2" sx={{ color: "#01BFBF" }}>
                        &nbsp;{resep.time} Menit
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    display={"flex"}
                    alignItems={"center"}
                    sx={{ "&:hover": { cursor: "pointer" } }}>
                    {resep.is_favorite === true ? (
                      <Star sx={{ color: "#01BFBF" }} />
                    ) : (
                      <StarOutline sx={{ color: "#01BFBF" }} />
                    )}
                    &nbsp;
                    <Typography variant="body2" color={"#01BFBF"}>
                      Favorit
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Link to={`/resep-saya/detail-resep/${resep.recipeId}`}>
                    <Typography variant="body2" color={"#01BFBF"}>
                      Lihat Detil Resep
                    </Typography>
                  </Link>
                </Box>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Hidden>
    </>
  );
};

RecipeCard.propTypes = {
  resep: PropTypes.shape({
    recipeId: PropTypes.number.isRequired,
    recipeName: PropTypes.string.isRequired,
    categories: PropTypes.object.isRequired,
    levels: PropTypes.object.isRequired,
    time: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    is_favorite: PropTypes.bool.isRequired,
  }).isRequired,
  handleOpenOptions: PropTypes.func.isRequired,
  option: PropTypes.number,
  handleCloseOptions: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  deletionLoading: PropTypes.bool,
  deletionSuccess: PropTypes.bool,
};

export default RecipeCard;
