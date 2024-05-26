import React from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import {
  Avatar,
  Typography,
  Button,
  Grid,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 250;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop:any) => prop !== "open",
})<AppBarProps>(({ theme, open }:any) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Navbar({ setMobileOpen }:any) {
  //   const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState:any) => !prevState);
  };

  return (
    <>
      <AppBar component="nav" sx={{ bgcolor: "#000" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img width={50} height={50} src={"../../../images/logo(FYP).png"} />
            <Typography
              sx={{ color: "#fff", fontSize: "16px", fontWeight: "bold" }}
            >
              SITAAR
            </Typography>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
