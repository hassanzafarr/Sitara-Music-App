import CustomInput from "@/components/customInput";
import CustomMusicCard from "@/components/customMusicCard";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Input,
  TextField,
  IconButton,
  Typography,
  useMediaQuery,
  CardMedia,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import MusicCard from "@/components/musicCard";
import PlayMusic from "@/components/playMusic";
import { musics } from "@/helper/constants";
import CustomCategoriesCard from "@/components/customCategoriesCard";
import { Router, useRouter } from "next/router";
import { useSpring, animated } from "react-spring";
import { categories } from "@/helper/musicCategories";
import { categoryMusics } from "@/helper/middlewareStates";
import { useRecoilState } from "recoil";
import CustomNewMusciCard from "@/components/newMusicCard";

const LandingPage = () => {
  const initialValues: any = {
    search: "",
  };

  const [open, setOpen] = React.useState(false);
  const router = useRouter() 
  const [musicCategory, setMusicCategory] = useRecoilState(categoryMusics);

  const handleCategoryMusic = (data: any) => {
    setMusicCategory(data);
    router.push("/categoryMusics");
  };

  const category = categories.slice(0, 6);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues:initialValues,
    mode: "onBlur",
    // resolver: yupResolver(validationSchema),
  });

  const mainCardSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 2000 },
  });

  const itemSpring = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 15 }}>
        <Grid item md={8} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                control={control}
                name="search"
                required={true}
                label="Search"
                errors={errors}
                type="string"
                showAdornment={true}
              />
              <Divider sx={{ mt: 2, mb: 2 }} color="#4e4e54" />
            </Grid>

            <Grid item xs={12}>
            <animated.div style={mainCardSpring}>
              <Card
                sx={{
                  backgroundImage: "url('../../../images/gradient_bg.jpg')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: 350,
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      color: "#E3E3E3",
                      fontSize: "36px",
                      fontWeight: "bold",
                    }}
                  >
                    Amazing Playlists
                  </Typography>
                  <Typography sx={{ color: "#E3E3E3", fontSize: "16px" }}>
                    Listen to the best playlists curated by us and our users.
                  </Typography>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() => setOpen(true)}
                    sx={{
                      // width: "25%",
                      color: "#27272A",
                      background: "#F4F4F5",
                      textTransform: "none",
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderRadius: 2,
                      mt: 2,
                      "&:hover": {
                        background: "#fff",
                      },
                    }}
                  >
                    Listen Now
                  </Button>
                </CardContent>
              </Card>
              </animated.div>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "#fff", fontSize: "20px" }}>
                  New Releases
                </Typography>
                <Button
                  variant="text"
                  size="medium"
                  sx={{
                    color: "#EE4950",
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  See more
                </Button>
              </Box>
            </Grid>

            {/* New Releases Music Cards */}
            {musics.map((item:any) => (
              <Grid item lg={3} md={4} sm={4} xs={6}>
                <animated.div
                style={{ ...itemSpring, opacity: itemSpring.opacity }}
              >                
                <CustomNewMusciCard data={item} songsArray={musics} setOpen={setOpen} />
                </animated.div>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item md={4} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomMusicCard setOpen={setOpen} />
            </Grid>

            <Grid item xs={12}>
            <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
              <Typography sx={{ color: "#fff", fontSize: "20px" }}>
                Categories
              </Typography>
              <Button
                  variant="text"
                  size="medium"
                  sx={{
                    color: "#EE4950",
                    textTransform: "none",
                    fontSize: "14px",
                  }}
                  onClick={()=>router.push('/categories')}
                >
                  See more
                </Button>
                </Box>
            </Grid>
            {category.map((item:any, index:any) => (
              <Grid item xs={6}>
                <CustomCategoriesCard data={item} handleCategory={() => handleCategoryMusic(item)} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <PlayMusic songsArray={musics} open={open} setOpen={setOpen} />
        </Grid>
      </Grid>
    </>
  );
};

export default LandingPage;
