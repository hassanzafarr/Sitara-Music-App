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
import PlayMusic from "@/components/playMusic";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useSpring, animated } from "react-spring";
import { categoryMusics } from "@/helper/middlewareStates";

const CategoriesMusic = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryParams = router.query;

  const [musicCategory, setMusicCategory] = useRecoilState(categoryMusics);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const itemSpring = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ color: "#fff", fontSize: "20px" }}>
            {musicCategory.title}
          </Typography>
        </Grid>
        {musicCategory.songs.map((item: any) => (
          <Grid item xs={2}>
            <animated.div
              style={{ ...itemSpring, opacity: itemSpring.opacity }}
            >
              <MusicCard
                data={item}
                songsArray={musicCategory.songs}
                setOpen={setOpen}
              />
            </animated.div>
          </Grid>
        ))}

        <Grid item xs={12}>
          <PlayMusic
            open={open}
            songsArray={musicCategory.songs}
            setOpen={setOpen}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CategoriesMusic;
