import React, { useState, useEffect, useRef } from "react";
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
import MusicCard from "@/components/musicCard";
import { musics } from "@/helper/constants";
import PlayMusic from "@/components/playMusic";
import { useRecoilState } from "recoil";
import { favoriteMusic } from "@/helper/middlewareStates";
import { useSpring, animated } from "react-spring";
import CustomNewMusciCard from "@/components/newMusicCard";


const Favourites = () => {
  const [open, setOpen] = useState(false);

  const initialValues: any = {
    search: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues:initialValues,
    mode: "onBlur",
  });

  const [favMusic, setFavMusic] = useRecoilState(favoriteMusic);

  const itemSpring = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  // useEffect(() => {
  //   console.log("first");
  // }, [favMusic]);

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 15 }}>
        {favMusic.length >= 1 ? (
          favMusic.map((item: any) => (
            <Grid item lg={2} md={4} sm={4} xs={6}>
              <animated.div
                style={{ ...itemSpring, opacity: itemSpring.opacity }}
              >
                <CustomNewMusciCard
                  data={item}
                  songsArray={favMusic}
                  setOpen={setOpen}
                />
              </animated.div>
            </Grid>
          ))
        ) : (
          <Grid item xs={6}>
            <Typography sx={{ color: "#fff" }}>
              No Musics in favorites.
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <PlayMusic songsArray={favMusic} open={open} setOpen={setOpen} />
        </Grid>
      </Grid>
    </>
  );
};

export default Favourites;
