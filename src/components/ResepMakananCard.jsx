import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Menu,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useState } from "react";

const ResepMakananCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [favoriteCheck, setFavoriteCheck] = useState(false);

  const handleChange = (event) => {
    setFavoriteCheck(event.target.checked);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="food"
        height="140"
        image="./img/image.png"
      />

      <IconButton
        aria-label="more"
        id="more-button"
        aria-controls={open ? "more-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
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
        <Box display="flex" justifyContent="space-between" marginBottom={1}>
          <Typography
            sx={{ fontSize: "12px", fontWeight: "400", color: "#01BFBF" }}>
            Breakfast
          </Typography>
          <Typography
            sx={{ fontSize: "12px", fontWeight: "400", color: "#01BFBF" }}>
            Easy
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: "600" }}>Classic Waffles</Typography>
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
            25 Menit
          </Typography>
          <FormControlLabel
            control={
              <Checkbox icon={<StarBorderIcon />} checkedIcon={<StarIcon />} />
            }
            checked={favoriteCheck}
            onChange={handleChange}
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
                sx={{ fontSize: "12px", fontWeight: "400", color: "#01BFBF" }}>
                Lihat Detail Resep
              </Typography>
              <Divider
                flexItem
                sx={{
                  backgroundColor: "#01BFBF",
                  width: "40%",
                  marginX: "auto",
                }}
              />
            </Link>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ResepMakananCard;
