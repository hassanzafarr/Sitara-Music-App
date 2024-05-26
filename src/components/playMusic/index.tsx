import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Drawer,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import Slider from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { muiscInfo, musicIndex } from "@/helper/middlewareStates";
import { formatTime } from "@/helper/helper";


interface AudioType {
  volume: (newVolume: number) => void;
  seek: () => number; // Assuming seek returns a number
  duration: () => number; // Assuming duration returns a number
  // Add other properties and methods of your audio object
}


const PlayMusic = ({ setOpen, songsArray, open }:any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [seek, setSeek] = useState(0);
  const soundRef :any = useRef<AudioType>(null);
  
  const [totalDuration, setTotalDuration] = useState(0);
  const [runningDuration, setRunningDuration] = useState(0);

  const [musicData, setMusicData] = useRecoilState(muiscInfo);
  const [currentSongIndex, setCurrentSongIndex] = useRecoilState(musicIndex);

  const currentSong = songsArray[currentSongIndex];

  const volumeChangeHandler = (e:any) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (soundRef.current) {
      soundRef?.current?.volume(newVolume);
    }
  };

  const seekChangeHandler = (e:any) => {
    const newSeek = parseFloat(e.target.value);
    setSeek(newSeek);
    if (soundRef.current) {
      soundRef.current.seek(newSeek * soundRef.current.duration());
    }
  };
  

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };
  
  const nextSongHandler = () => {
    const nextIndex = (currentSongIndex + 1) % songsArray.length;
    setCurrentSongIndex(nextIndex);
    setMusicData(songsArray[nextIndex]);
  };

  const prevSongHandler = () => {
    const prevIndex = (currentSongIndex - 1 + songsArray.length) % songsArray.length;
    setCurrentSongIndex(prevIndex);
    setMusicData(songsArray[prevIndex]);
  };
  useEffect(() => {
    if (isPlaying) {
      const sound = new Howl({
        src: [musicData?.src],
        volume,
        onend: nextSongHandler,
      });

      soundRef.current = sound;

      sound.once("load", () => {
        setTotalDuration(sound.duration());
      });

      sound.play();

      sound.on("play", () => {
        requestAnimationFrame(updateSeek);
      });

      return () => {
        sound.unload();
      };
    }
  }, [currentSong, isPlaying,musicData]);

  const updateSeek = () => {
    const currentSeek = soundRef.current.seek();
    setSeek(currentSeek / soundRef.current.duration());
    setRunningDuration(currentSeek);
    if (isPlaying) {
      requestAnimationFrame(updateSeek);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        anchor={"bottom"}
        variant="persistent"
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDrawer-paper": {
            background: "rgba(0, 0, 0, 0.8)",
            borderTopLeftRadius:  "10px",
            borderTopRightRadius: "10px",            
            border: "1px solid #52525b",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Card
          sx={{
            background: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              '@media (max-width: 767px)': {
                flexDirection: "column" // Hide on screens less than or equal to 767px
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={musicData?.img}
                width={60}
                height={60}
                style={{ borderRadius: "5px" }}
              />
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  sx={{
                    color: "#E4E4E7",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {musicData?.songName}
                </Typography>
                <Typography sx={{ color: "#A1A1AA", fontSize: "12px" }}>
                  {musicData?.singer}
                </Typography>
              </div>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton onClick={prevSongHandler}>
                  <FastRewindIcon sx={{ color: "#fff" }} />
                </IconButton>
                <IconButton onClick={playPauseHandler}>
                  {isPlaying ? (
                    <PauseCircleIcon
                      sx={{ color: "#EE4950", fontSize: "3rem" }}
                    />
                  ) : (
                    <PlayCircleIcon
                      sx={{ color: "#EE4950", fontSize: "3rem" }}
                    />
                  )}
                </IconButton>
                <IconButton onClick={nextSongHandler}>
                  <FastForwardIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Box>
              <Box sx={{ width: 300, display: "flex", alignItems: "center" }}>
                <Typography sx={{ color: "#A1A1AA", fontSize: "12px", mr: 2 }}>
                {formatTime(runningDuration)}
                </Typography>
                {/* <Slider
                  size="small"
                  aria-label="Small"
                  sx={{ color: "#EE4950" }}
                  step={0.01}
                  min={0}
                  max={1}
                  value={seek}
                  onChange={seekChangeHandler}
                /> */}

                <input
                id="seek"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={seek}
                onChange={seekChangeHandler}
                style={{
                  width:500 ,
                  height: '2px', 
                  backgroundColor: '#EE4950',
                  color: "#EE4950",
                  border: 'none',
                  outline: 'none',
                  WebkitAppearance: 'none', 
                }}
              />
                <Typography sx={{ color: "#A1A1AA", fontSize: "12px", ml: 2 }}>
                {formatTime(totalDuration)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box>
                {/* <IconButton>
                  <FavoriteBorderOutlinedIcon sx={{ color: "#ddd" }} />
                </IconButton> */}
                {
                  volume == 0 ? 
                  <IconButton onClick={()=>setVolume(0.5)}>
                    <VolumeOffIcon sx={{ color: "#ddd",mb: 1, fontSize: "1.3rem" }} />
                  </IconButton> : 
                  <IconButton onClick={()=>setVolume(0)}>
                    <VolumeUpIcon sx={{ color: "#ddd",mb: 1, fontSize: "1.3rem" }} />
                  </IconButton>
                }
              </Box>
              <Box sx={{ width: 150 }}>
                <Slider
                  size="small"
                  defaultValue={50}
                  aria-label="Small"
                  sx={{ color: "#EE4950" }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={volumeChangeHandler}
                />
                {/* <input
                id="volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={volumeChangeHandler}
              /> */}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Drawer>
    </>
  );
};

export default PlayMusic;
