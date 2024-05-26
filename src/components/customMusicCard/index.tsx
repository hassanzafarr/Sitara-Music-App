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
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React from "react";
import { useRecoilState } from "recoil";
import { useSpring, animated } from "react-spring";
import { truncateText } from "@/helper/helper";
import {
  aiMusics,
  favoriteMusic,
  muiscInfo,
  musicIndex,
} from "@/helper/middlewareStates";
import { musics } from "@/helper/constants";

interface InputFieldProps {
  control: any;
  name: string;
  label?: string;
}

const CustomMusicCard = ({ setOpen }: any) => {
  const [musicData, setMusicData] = useRecoilState(muiscInfo);
  const [currentSongIndex, setCurrentSongIndex] = useRecoilState(musicIndex);

  const [favMusic, setFavMusic] = useRecoilState(favoriteMusic);
  const [aiGeneratedMusics, setAiGeneratedMusics] = useRecoilState(aiMusics);

  const mainCardSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const cardSpring = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(40px)" },
    config: { duration: 1000 },
  });

  const handlePlayMusic = (data: any) => {
    setOpen(true);
    const newIndex = aiGeneratedMusics.length >= 1 ? aiGeneratedMusics.indexOf(data) : musics.indexOf(data);    
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

  return (
    <>
      <animated.div style={mainCardSpring}>
        <Card
          sx={{
            background: "#27272a",
          }}
        >
          <CardHeader
            title={
              <Typography variant="h6" color="#E3E3E3">
                Top Charts
              </Typography>
            }
            sx={{ pb: 0 }}
          />
          <CardContent>
          {aiGeneratedMusics.length >= 1 ? (
            aiGeneratedMusics.slice(0, 8).map((item:any, index:any) => (
              <animated.div key={index} style={{ ...cardSpring }}>
                <Card
                  sx={{
                    background: "#18181b",
                    height: 60,
                    mb: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => handlePlayMusic(item)}
                >
                  <CardContent sx={{ p: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={item.img}
                          width={40}
                          height={40}
                          style={{ borderRadius: "5px" }}
                        />
                        <div style={{ marginLeft: "10px" }}>
                          <Typography
                            sx={{
                              color:
                                musicData.songName === item.songName
                                  ? "#EE4950"
                                  : "#E4E4E7",
                              fontWeight: "bold",
                              fontSize: "16px",
                            }}
                          >
                            {truncateText(item.songName, 15)}
                          </Typography>
                          <Typography
                            sx={{ color: "#A1A1AA", fontSize: "12px" }}
                          >
                            {item.singer}
                          </Typography>
                        </div>
                      </Box>
                      <IconButton onClick={() => handleFavorites(item)}>
                        <Typography
                          sx={{ color: "#A1A1AA", fontSize: "12px", mr: 2 }}
                        >
                          {item.time}
                        </Typography>
                        <FavoriteBorderOutlinedIcon
                          sx={{
                            color: favMusic.some(
                              (favorite: any) =>
                                favorite.songName === item.songName
                            )
                              ? "#EE4950"
                              : "#ddd",
                          }}
                        />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </animated.div>
            )) )
          : (
            musics.map((item:any, index:any) => (
              <animated.div key={index} style={{ ...cardSpring }}>
                <Card
                  sx={{
                    background: "#18181b",
                    height: 60,
                    mb: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => handlePlayMusic(item)}
                >
                  <CardContent sx={{ p: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={item.img}
                          width={40}
                          height={40}
                          style={{ borderRadius: "5px" }}
                        />
                        <div style={{ marginLeft: "10px" }}>
                          <Typography
                            sx={{
                              color:
                                musicData.songName === item.songName
                                  ? "#EE4950"
                                  : "#E4E4E7",
                              fontWeight: "bold",
                              fontSize: "16px",
                            }}
                          >
                            {truncateText(item.songName, 15)}
                          </Typography>
                          <Typography
                            sx={{ color: "#A1A1AA", fontSize: "12px" }}
                          >
                            {item.singer}
                          </Typography>
                        </div>
                      </Box>
                      <IconButton onClick={() => handleFavorites(item)}>
                        <Typography
                          sx={{ color: "#A1A1AA", fontSize: "12px", mr: 2 }}
                        >
                          {item.time}
                        </Typography>
                        <FavoriteBorderOutlinedIcon
                          sx={{
                            color: favMusic.some(
                              (favorite: any) =>
                                favorite.songName === item.songName
                            )
                              ? "#EE4950"
                              : "#ddd",
                          }}
                        />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </animated.div>
            ))
          )
          }
          </CardContent>
        </Card>
      </animated.div>
    </>
  );
};

export default CustomMusicCard;
