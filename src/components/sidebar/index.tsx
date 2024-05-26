import * as React from "react";
import { Theme, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Navigation from "./drawerContent";
import CloseIcon from '@mui/icons-material/Close';
// import Logo from "../../../public/images/logo.png";
import {
  Avatar,
  Button,
  Grid,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import Navbar from "../navbar";

const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop:any) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }:any) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const scrollbarStyles = (theme:any) => ({
  height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
  overflowY: "auto",
  scrollbarWidth: "thin", // For Firefox
  scrollbarColor: "#888 transparent", // For Firefox
  "&::-webkit-scrollbar": {
    width: "6px",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

const DrawerHeader = styled("div")(({ theme }:any) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface CustomTheme extends Theme {
  breakpoints: any; // You can replace 'any' with the specific type of breakpoints if available
}

export default function SideBar(props: any) {
  const router = useRouter();
  const theme = useTheme() as CustomTheme;

  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const currentRoute = router.pathname;
  const isMobileOrTablet = useMediaQuery(theme?.breakpoints.down("lg"));
  const [activeDropDown, setActiveDropDown] = React.useState<number[]>([]);


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = (key: number) => {
    if (activeDropDown.includes(key)) {
      setActiveDropDown([...activeDropDown.filter((e) => e !== key)]);
    } else {
      setActiveDropDown([...activeDropDown, key]);
    }
  };

  const navigationdone = (path: string) => {
    router.push(path);
  };

  React.useEffect(() => {
    if (isMobileOrTablet) {
      // Close the sidebar if the screen size is mobile or tablet
      handleDrawerClose();
    } else {
      // Open the sidebar if the screen size is larger
      handleDrawerOpen();
      setMobileOpen(false)
    }
  }, [isMobileOrTablet]);

  const mobileDrawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ display: "flex", justifyContent:'space-between', alignItems: "center" }}>
      <Box sx={{display:'flex', alignItems:'center'}} >
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
        onClick={()=>alert('haha')}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <CloseIcon sx={{ color: "#fff" }}/>
      </IconButton>
      </Box>
      
      <List>
        {Navigation.map((item: any, key:any) => (
          <List>
            <ListItemButton
              sx={{
                borderRadius: 2,
                ml: 2,
                mr: 2,

                backgroundColor:
                  currentRoute === item.path ? "#EE4950" : "transparent",
                color: "#fff",
                "&:hover": {
                  background: "#EE4950",
                  color: "#fff",
                  "& .MuiListItemIcon-root": {
                    color: "#fff", // Change the color of the ListItemIcon when hovering
                  },
                },
              }}
              onClick={
                item.children?.length > 0
                  ? () => handleClick(key)
                  : () => navigationdone(item.path)
              }
            >
              <ListItemIcon
                sx={{
                  color: "#fff",
                  // color: "#37474F",
                  minWidth: 0,
                  mr: mobileOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: mobileOpen ? 1 : 0, color: "inherit" }}
              />{" "}
            </ListItemButton>
          </List>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isMobileOrTablet && <Navbar setMobileOpen={setMobileOpen} />}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            background: "#18181b",
            width: drawerWidth,
            boxSizing: "border-box",
            borderRightColor: "#52525b",
            overflow: "hidden",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <img width={100} height={100} src={"../../../images/logo(FYP).png"} />
          <Typography
            sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
          >
            SITAAR
          </Typography>
        </DrawerHeader>
        <Box sx={scrollbarStyles}>
          {Navigation.map((item: any, key:any) => (
            <List>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  ml: 2,
                  mr: 2,

                  backgroundColor:
                    currentRoute === item.path ? "#EE4950" : "transparent",
                  color: "#fff",
                  "&:hover": {
                    background: "#EE4950",
                    color: "#fff",
                    "& .MuiListItemIcon-root": {
                      color: "#fff", // Change the color of the ListItemIcon when hovering
                    },
                  },
                }}
                onClick={
                  item.children?.length > 0
                    ? () => handleClick(key)
                    : () => navigationdone(item.path)
                }
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    // color: "#37474F",
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0, color: "inherit" }}
                />{" "}
              </ListItemButton>
            </List>
          ))}
          <Divider sx={{ m: 2 }} color="#4e4e54" />
          <Box sx={{ m: 2 }}>
            <Button
              variant="outlined"
              size="medium"
              onClick={()=>router.push('/login')}
              sx={{
                color: "#fff",
                width: "100%",
                borderColor: "#52525b",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#EE4950",
                  background: "#EE4950",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Drawer>

      <nav>
        <SwipeableDrawer
          disableSwipeToOpen={false}
          swipeAreaWidth={10}
          sx={{
            "& .MuiDrawer-paper": {
              background: "#000",
              // width: { xs: 300, sm: 400 },
              width: "100%",
              borderTopLeftRadius: "18px",
              borderBottomLeftRadius: "18px",
              boxSizing: "border-box",
              overflow: "hidden",
              padding: 2,
            },
          }}
          anchor={"top"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onOpen={handleDrawerToggle}
        >
          {mobileDrawer}
        </SwipeableDrawer>
      </nav>

      <Main
        open={open}
        sx={{
          overflowX: "hidden",
          bgcolor: "#141414",
          width: "100%",
          height: "100vh", // 100% of the viewport height
          // overflow: "hidden",
        }}
      >
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  );
}
