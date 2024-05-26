import PlayMusic from "@/components/playMusic";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { aiMusics } from "@/helper/middlewareStates";
import { Grid, Typography } from "@mui/material";
import MusicCard from "@/components/musicCard";
import { useSpring, animated } from "react-spring";

const Playlists = () => {
  const [aiGeneratedMusics, setAiGeneratedMusics] = useRecoilState(aiMusics);
  const [open, setOpen] = useState(false);

  const itemSpring = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  return (
    <>
      <h1 style={{ color: "#fff" }}>My Playlists</h1>
      <Grid container spacing={2} sx={{ mb: 15 }}>
        {aiGeneratedMusics.length >= 1 ? (
          aiGeneratedMusics.map((item: any) => (
            <Grid item lg={2} md={3} sm={4} xs={6}>
              <animated.div
                style={{ ...itemSpring, opacity: itemSpring.opacity }}
              >
                <MusicCard
                  data={item}
                  songsArray={aiGeneratedMusics}
                  setOpen={setOpen}
                />
              </animated.div>
            </Grid>
          ))
        ) : (
          <Grid item xs={6}>
            <Typography sx={{ color: "#fff" }}>
              No Musics in Play list.
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <PlayMusic
            songsArray={aiGeneratedMusics}
            open={open}
            setOpen={setOpen}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Playlists;
