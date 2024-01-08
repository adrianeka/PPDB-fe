import { AccountCircle, Close } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Navigate("/");
    localStorage.clear();
  };

  //drawer mobile
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box margin={0} sx={{ display: "flex" }}>
      <AppBar
        position="static"
        style={{
          background: "#f49881",
          paddingLeft: "352px",
          paddingRight: "352px",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
            display="contents"
          >
            <Link to={"/daftar-resep"}>
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
            <Link to={"/resep-saya"}>
              <Button
                sx={{
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  textTransform: "capitalize",
                }}
              >
                Resep Saya
              </Button>
            </Link>
            <Link to={"/resep-favorit"}>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
