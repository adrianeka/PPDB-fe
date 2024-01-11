import { useState } from "react";
import {
  Box,
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import {
  AccountCircle,
  Logout,
  Menu as MenuIcon,
  StarOutline,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../pages/Resources/Imgs/logo.png"; // Update with the path to your logo

const ResponsiveAppBar = styled(AppBar)(({ theme }) => ({
  background: "#f49881",
  paddingLeft: theme.spacing(0), // Adjust as needed
  paddingRight: theme.spacing(0), // Adjust as needed
  boxShadow: "none",
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(2), // Adjust as needed
    paddingRight: theme.spacing(2), // Adjust as needed
  },
  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(8), // Adjust as needed
    paddingRight: theme.spacing(8), // Adjust as needed
  },
}));

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleDrawerItemClick = (path) => {
    setOpenDrawer(false);
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  const location = useLocation();

  return (
    <Box margin={0} sx={{ display: "flex" }}>
      <ResponsiveAppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src={logo}
            alt="logo"
            width="50px"
            height="50px"
            style={{ order: { xs: 2, md: 1 } }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              marginLeft: "12px",
              flexGrow: 1,
            }}
          >
            Buku Resep 79
          </Typography>
          <Stack
            className="stack"
            direction="row"
            spacing={4}
            justifyContent="flex-end"
            display={{ xs: "none", md: "contents" }}
          >
            <Link to="/daftar-resep">
              <Button
                sx={{
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  textTransform: "capitalize",
                }}
              >
                Daftar Resep
              </Button>
            </Link>
            <Link to="/resep-saya">
              <Button
                sx={{
                  fontWeight: "bold",
                  color:
                    location.pathname === "/resep-saya" ? "#01BFBF" : "#FFFFFF",
                  textTransform: "capitalize",
                }}
              >
                Resep Saya
              </Button>
            </Link>
            <Link to="/resep-favorit">
              <Button
                sx={{
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  textTransform: "capitalize",
                }}
              >
                Resep Favorit
              </Button>
            </Link>
            <Box>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Stack>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "flex", md: "none" },
              order: { xs: 1, md: 2 },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </ResponsiveAppBar>
      {/* Drawer for mobile view */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiPaper-root": { backgroundColor: "#F49881" },
        }}
      >
        <List>
          <ListItem
            button
            onClick={() => handleDrawerItemClick("/daftar-resep")}
          >
            <ListItemText
              sx={{ color: "white" }}
              primary="Daftar Resep Makanan"
            />
          </ListItem>
          <ListItem button onClick={() => handleDrawerItemClick("/resep-saya")}>
            <ListItemText
              sx={{
                fontWeight: "bold",
                color:
                  location.pathname === "/resep-saya" ? "#01BFBF" : "#FFFFFF",
                textTransform: "capitalize",
              }}
              primary="Resep Saya"
            />
          </ListItem>
          <ListItem
            button
            onClick={() => handleDrawerItemClick("/resep-favorit")}
          >
            <StarOutline sx={{ color: "white" }} />
            <ListItemText sx={{ color: "white" }} primary="Resep Favorit" />
          </ListItem>
          <ListItem button onClick={() => handleDrawerItemClick("/Logout")}>
            <Logout sx={{ color: "white", transform: "scaleX(-1)" }} />
            <ListItemText sx={{ color: "white" }} primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navigation;
