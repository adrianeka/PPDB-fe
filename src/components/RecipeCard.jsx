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
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    // Perform delete operation here
    // Close the dialog
    handleCloseDialog();
  };

  return (
    <>
      <Hidden smDown>
        <Grid item key={resep.id}>
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
              onClick={(event) => handleOpenOptions(event, resep.id)}
            >
              <MoreHoriz />
            </IconButton>
            <Menu
              anchorEl={option === resep.id ? document.activeElement : null}
              open={option === resep.id}
              onClose={handleCloseOptions}
            >
              <MenuItem>
                <Edit sx={{ color: "#01BFBF" }} />
                <Typography sx={{ color: "#01BFBF" }}>Edit</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleOpenDialog();
                  handleCloseOptions();
                }}
              >
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
                  Apakah anda yakin akan menghapus resep {resep.nama}?
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
                  }}
                >
                  Tidak
                </Button>
                <Button
                  onClick={handleDelete}
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
                  }}
                >
                  Ya
                </Button>
              </DialogActions>
            </Dialog>

            <CardMedia
              component="img"
              height="142"
              image={resep.image}
              alt={resep.image}
            />
            <CardContent sx={{ padding: 1 }}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign={"left"}
                  sx={{ color: "#01BFBF" }}
                >
                  {resep.kategori}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign={"left"}
                  sx={{ color: "#01BFBF" }}
                >
                  {resep.difficulty}
                </Typography>
              </Box>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                textAlign={"left"}
              >
                {resep.nama}
              </Typography>
            </CardContent>
            <CardActions sx={{ padding: 1 }}>
              <Grid container direction="column" marginBottom={1}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ color: "black" }}
                >
                  <Grid item>
                    <IconButton
                      aria-label="add to favorites"
                      disabled
                      sx={{ padding: 0 }}
                    >
                      <AccessTime sx={{ color: "#01BFBF" }} />
                      <Typography variant="body2" sx={{ color: "#01BFBF" }}>
                        &nbsp;{resep.waktu} Menit
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    display={"flex"}
                    alignItems={"center"}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    {resep.isFavorite ? (
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
                  <Link to={`/your-page-path/${resep.id}`}>
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
      <Hidden smUp>
        <Grid item key={resep.id}>
          <Card sx={{ width: 330, position: "relative"}}>
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
              onClick={(event) => handleOpenOptions(event, resep.id)}
            >
              <MoreHoriz />
            </IconButton>
            <Menu
              anchorEl={option === resep.id ? document.activeElement : null}
              open={option === resep.id}
              onClose={handleCloseOptions}
            >
              <MenuItem>
                <Edit sx={{ color: "#01BFBF" }} />
                <Typography sx={{ color: "#01BFBF" }}>Edit</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleOpenDialog();
                  handleCloseOptions();
                }}
              >
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
                  Apakah anda yakin akan menghapus resep {resep.nama}?
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
                  }}
                >
                  Tidak
                </Button>
                <Button
                  onClick={handleDelete}
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
                  }}
                >
                  Ya
                </Button>
              </DialogActions>
            </Dialog>

            <CardMedia
              component="img"
              height="142"
              image={resep.image}
              alt={resep.image}
            />
            <CardContent sx={{ padding: 1 }}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign={"left"}
                  sx={{ color: "#01BFBF" }}
                >
                  {resep.kategori}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign={"left"}
                  sx={{ color: "#01BFBF" }}
                >
                  {resep.difficulty}
                </Typography>
              </Box>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                textAlign={"left"}
              >
                {resep.nama}
              </Typography>
            </CardContent>
            <CardActions sx={{ padding: 1 }}>
              <Grid container direction="column" marginBottom={1}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ color: "black" }}
                >
                  <Grid item>
                    <IconButton
                      aria-label="add to favorites"
                      disabled
                      sx={{ padding: 0 }}
                    >
                      <AccessTime sx={{ color: "#01BFBF" }} />
                      <Typography variant="body2" sx={{ color: "#01BFBF" }}>
                        &nbsp;{resep.waktu} Menit
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    display={"flex"}
                    alignItems={"center"}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    {resep.isFavorite ? (
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
                  <Link to={`/your-page-path/${resep.id}`}>
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
    id: PropTypes.number.isRequired,
    nama: PropTypes.string.isRequired,
    kategori: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    waktu: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  handleOpenOptions: PropTypes.func.isRequired,
  option: PropTypes.number,
  handleCloseOptions: PropTypes.func.isRequired,
};

export default RecipeCard;
