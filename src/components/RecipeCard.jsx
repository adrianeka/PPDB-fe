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
} from "@mui/material";
import {
  MoreHoriz,
  Edit,
  DeleteSweep,
  AccessTime,
  Star,
  StarOutline,
} from "@mui/icons-material";
import { PropTypes } from "prop-types";

const RecipeCard = ({
  resep,
  handleOpenOptions,
  option,
  handleCloseOptions,
}) => {
  return (
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
          <MenuItem>
            <DeleteSweep sx={{ color: "red" }} />
            <Typography sx={{ color: "red" }}>Hapus</Typography>
          </MenuItem>
        </Menu>
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
          </Grid>
        </CardActions>
      </Card>
    </Grid>
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
