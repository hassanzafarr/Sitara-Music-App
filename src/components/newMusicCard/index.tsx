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
  import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
  import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
  import React, { useState } from "react";
  
  import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
  import { useRecoilState } from "recoil";
  import {
    favoriteMusic,
    muiscInfo,
    musicIndex,
  } from "@/helper/middlewareStates";
  import { truncateText } from "@/helper/helper";
  import { Router, useRouter } from "next/router";
  
  interface InputFieldProps {
    control: any;
    name: string;
    label?: string;
  }
  
  const CustomNewMusciCard = ({ data, songsArray, setOpen }: any) => {
    const [musicData, setMusicData] = useRecoilState(muiscInfo);
    const [currentSongIndex, setCurrentSongIndex] = useRecoilState(musicIndex);
    const [favMusic, setFavMusic] = useRecoilState(favoriteMusic);
  const router = useRouter()
    const [xyz, setXyz] = useState("");
  
    const handlePlayMusic = (data: any) => {
      setOpen(true);
      const newIndex = songsArray.findIndex(
        (song:any) => song.songName === data.songName
      );
      setCurrentSongIndex(newIndex);
      setMusicData(data);
    };
  
    const handleFavorites = (item: any) => {
      const currentFavMusic = favMusic || [];
  
      const index = currentFavMusic.findIndex(
        (favorite: any) => favorite.songName === item.songName
      );
  
      let newFavMusic;
  
      if (index !== -1) {
        newFavMusic = [
          ...currentFavMusic.slice(0, index),
          ...currentFavMusic.slice(index + 1),
        ];
      } else {
        newFavMusic = [...currentFavMusic, item];
      }
      setFavMusic(newFavMusic);
    };
  
    // const handleEdit = (data) => {
    //   console.log('data', data)
    //   router.push({
    //     pathname: "/editGeneratedSong",
    //     query: data,
    //   });
    // }
  
    return (
      <>
        <Card
          sx={{
            background: "#18181B",
            borderRadius: "10px",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            "&:hover": {
              "& img": {
                transform: "scale(1.1)",
                opacity: 0.5,
              },
              "& .play-icon": {
                opacity: 1,
              },
            },
          }}
        >
          <Box
            className="image-container"
            sx={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={data.img}
              alt="Paella dish"
              onClick={() => handlePlayMusic(data)}
              sx={{
                transition: "transform 0.3s, opacity 0.3s",
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
            <PlayCircleFilledOutlinedIcon
              className="play-icon"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                fontSize: 40,
                opacity: 0,
                transition: "opacity 0.3s",
              }}
            />
          </Box>
  
          <CardContent>
            <Typography
              sx={{
                color:
                  musicData.songName == data.songName ? "#EE4950" : "#E4E4E7",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {truncateText(data.songName, 10)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#A1A1AA", fontSize: "12px" }}>
                {truncateText(data.singer, 6)}
              </Typography>
              <Box sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}>
              <IconButton onClick={() => handleFavorites(data)}>
                <FavoriteBorderOutlinedIcon
                  sx={{
                    color: favMusic.some(
                      (favorite:any) => favorite.songName === data.songName
                    )
                      ? "#EE4950" 
                      : "#ddd", 
                    fontSize: "14px",
                  }}
                />
              </IconButton>
              {/* <IconButton onClick={() => handleEdit(data)}>
                <EditOutlinedIcon
                  sx={{
                    color: "#ddd", 
                    fontSize: "14px",
                  }}
                />
              </IconButton>             */}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </>
    );
  };
  
  export default CustomNewMusciCard;
  