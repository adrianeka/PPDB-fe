import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Link,
  Menu,
  Typography,
} from "@mui/material";
import cardImage from "../../public/img/image.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useState } from "react";
import FavoritDialog from "./FavoritDialog";
import { putFavoriteResepMasakan } from "../services/apis";

const ResepMakananCard = ({ resepData, setIsPageError }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, recipeId) => {
    setAnchorEl(event.currentTarget);
    console.log("event", event.currentTarget);
    console.log("resepId", recipeId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [favoriteCheck, setFavoriteCheck] = useState(false);
  const [openFavoriteDialog, setOpenFavoriteDialog] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState("");

  const handleChange = (event, recipeId) => {
    setFavoriteCheck(event.target.checked);
    console.log("id", recipeId);
    async function putFavorite() {
      try {
        const response = await putFavoriteResepMasakan(recipeId);
        console.log("response", response);
        setOpenFavoriteDialog(true);
      } catch (error) {
        console.log("error change favorite data", error);
        setIsPageError(true);
      }
    }
    putFavorite();
  };

  return (
    <>
      <FavoritDialog
        open={openFavoriteDialog}
        setOpen={setOpenFavoriteDialog}
        message={favoriteMessage}
      />
      {resepData.map((data, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ maxWidth: 345 }}>
            <Box
              className="cardImage"
              style={{
                backgroundImage: `url(${cardImage})`,
                backgroundSize: "cover",
                height: "140px",
              }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                }}>
                <IconButton
                  aria-label="more"
                  id="more-button"
                  aria-controls={open ? "more-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={(event) => {
                    handleClick(event, data.recipeId);
                  }}
                  size="small"
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.10)",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.10)",
                    },
                    zIndex: 2,
                    padding: 0,
                    margin: 0,
                  }}>
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            </Box>

            <Menu
              id="more-menu"
              MenuListProps={{
                "aria-labelledby": "more-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: "20ch",
                  boxShadow: "1px 1px rgba(0,0,0, 0.10)",
                },
              }}>
              <Box display="flex" flexDirection="column" gap={2} padding={1}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#01BFBF",
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}>
                  <Box display="flex" gap={2}>
                    <EditIcon />
                    <Typography>Edit</Typography>
                  </Box>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#FF0000",
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}>
                  <Box display="flex" gap={2}>
                    <DeleteSweepIcon />
                    <Typography>Hapus</Typography>
                  </Box>
                </Button>
              </Box>
            </Menu>

            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                marginBottom={1}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#01BFBF",
                  }}>
                  {data.categories.categoryName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#01BFBF",
                  }}>
                  {data.levels.levelName}
                </Typography>
              </Box>
              <Typography sx={{ fontWeight: "600" }}>
                {data.recipeName}
              </Typography>
              <Box display="flex" justifyContent="space-between" marginTop={1}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#01BFBF",
                    display: "flex",
                    gap: 0.5,
                    alignItems: "center",
                  }}>
                  <AccessTimeIcon />
                  {data.time} Menit
                </Typography>
                <FormGroup
                  sx={{
                    "&.MuiFormGroup-root": {
                      display: "flex",
                      justifyContent: "right",
                      position: "relative",
                      right: -17,
                    },
                  }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<StarBorderIcon />}
                        checkedIcon={<StarIcon />}
                      />
                    }
                    checked={data.is_favorite}
                    onChange={(event) => {
                      handleChange(event, data.recipeId);
                    }}
                    value="favorite"
                    label={
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#01BFBF",
                        }}>
                        Favorit
                      </Typography>
                    }
                  />
                </FormGroup>
              </Box>
            </CardContent>
            <CardActions>
              <Grid container>
                <Grid item xs={12}>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      textAlign: "center",
                    }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#01BFBF",
                      }}>
                      Lihat Detail Resep
                    </Typography>
                    <Divider
                      flexItem
                      sx={{
                        backgroundColor: "#01BFBF",
                        width: { xs: "25%", md: "40%" },
                        marginX: "auto",
                      }}
                    />
                  </Link>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default ResepMakananCard;
