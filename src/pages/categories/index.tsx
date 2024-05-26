import React, { useEffect, useState } from "react";
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
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MusicCard from "@/components/musicCard";
import CustomCategoriesCard from "@/components/customCategoriesCard";
import CustomLoader from "@/components/customLoader";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { categoryMusics } from "@/helper/middlewareStates";
import { useSpring, animated } from "react-spring";
import { categories } from "@/helper/musicCategories";

const Categories = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const router = useRouter();

  const [musicCategory, setMusicCategory] = useRecoilState(categoryMusics);

  const handleCategoryMusic = (data: any) => {
    setMusicCategory(data);
    router.push("/categoryMusics");
  };
  const [loading, setLoading] = useState(true);

  const AnimatedTypography = animated(Typography);

  const containerSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const itemSpring = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* {loading ? ( */}
      <CustomLoader loading={loading} />
      {/* // ) : ( */}
      <animated.div style={containerSpring}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AnimatedTypography sx={{ color: "#fff", fontSize: "20px" }}>
              Categories
            </AnimatedTypography>
          </Grid>
          {categories.map((item:any, index:any) => (
            <Grid item xs={3} key={index}>
              <animated.div
                style={{ ...itemSpring, opacity: itemSpring.opacity }}
              >
                <CustomCategoriesCard data={item} handleCategory={() => handleCategoryMusic(item)} />
              </animated.div>
            </Grid>
          ))}
        </Grid>
      </animated.div>
      {/* // )} */}
    </>
  );
};

export default Categories;
