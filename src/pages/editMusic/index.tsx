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
import { categories } from "@/helper/musicCategories";
import CategoryChips from "@/components/categoryChips";
import { CategoryNames, EndPoint } from "@/helper/constants";
import CloseIcon from "@mui/icons-material/Close";
import { showAlert } from "@/helper/helper";
import { useRouter } from "next/router";
import axios from "axios";
import MusicPlayer from "@/components/musicPlayer";
import CustomLoader from "@/components/customLoader";
import { useRecoilState } from "recoil";
import { aiMusics, generateMusic } from "@/helper/middlewareStates";
import CustomMusicLoader from "@/components/customMusicLoader";

import { useSpring, animated } from "react-spring";

const EditMusic = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [musicParams, setMusicParams] = useRecoilState<any>(generateMusic);
  const [aiGeneratedMusics, setAiGeneratedMusics] = useRecoilState(aiMusics);
  const [generatedMusic, setGeneratedMusic] = useState();
  const [generatedMusicCounter, setGeneratedMusicCounter] = useState(0);

  const GenreCategories = categories.filter(
    (name: any) => name.type == "Genre"
  );

  const [categoryies, setCategories] = useState<any>(GenreCategories);
  const [chipType, setChipType] = useState<any>(CategoryNames[0]);
  const [selectedChips, setSelectedChips] = useState<any>(
    musicParams.prompt ?? []
  );

  const selectCategory = (data: any) => {
    if (selectedChips.includes(data.title))
      showAlert("Category already Selected!");
    else {
      // const response :any = {duration: musicParams.duration , prompt:[categoryChips]}
      setSelectedChips([...selectedChips, data.title]);
    }
  };

  const handleDeleteChip = (data: any) => {
    const deletedChips = selectedChips.filter((item: any) => item !== data);
    setSelectedChips(deletedChips);
  };

  const handleCategoryType = (chipName: any) => {
    if (CategoryNames.includes(chipName)) {
      const filterCategory = categories.filter(
        (name: any) => name.type == chipName
      );
      setChipType(chipName);
      setCategories(filterCategory);
    }
  };

  const GenerateMusic = async () => {
    try {
      setLoading(true);

      const request = {
        duration: parseInt(musicParams.duration),
        prompt: `${selectedChips}`,
      };

      const result = await axios.post(`${EndPoint}/prediction`, request);
      if (result?.status == 201 || result?.status == 200) {
        // setLoading(false);
        setGeneratedMusic(result?.data?.content[0]);
        setGeneratedMusicCounter(aiGeneratedMusics?.length + 1);
        const songObj = {
          src: result?.data?.content[0],
          singer: "AI",
          img: "../../../images/img5.jpg",
          songName: `AI Generated Song ${aiGeneratedMusics?.length + 1}`,
        };

        setAiGeneratedMusics([...aiGeneratedMusics, songObj]);
      }
    } catch (error: any) {
      console.log("Internal Server Error", error);
    } finally {
      setLoading(false);
    }
  };

  const itemSpring = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  useEffect(() => {
    GenerateMusic();
  }, [musicParams]);

  return (
    <>
      <CustomMusicLoader loading={loading} />
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <CategoryChips
            handleChip={handleCategoryType}
            selectedCategory={chipType}
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography
            sx={{ color: "#fff", ml: 2 }}
          >{`Length: ${musicParams.duration} seconds`}</Typography>
          <Button
            variant="contained"
            size="small"
            onClick={GenerateMusic}
            sx={{
              ml: 2,
              color: "#ffff",
              background: "#EE4950",
              borderColor: "#EE4950",
              textTransform: "none",
              "&:hover": {
                borderColor: "#d32f2f",
                background: "#d32f2f",
              },
            }}
          >
            Re Generate
          </Button>
        </Grid>
        <Grid item xs={12}>
          {categoryies.map((item:any, index:any) => (
            <Chip
              sx={{
                // color: "#fff",
                color: selectedChips.includes(item.title) ? "#EE4950" : "#fff",
                borderColor: selectedChips.includes(item.title)
                  ? "#EE4950"
                  : "#fff",
                borderRadius: 1,
                m: "8px 10px 8px 0px",
                cursor: "pointer",
              }}
              onClick={() => selectCategory(item)}
              label={item.title}
              variant="outlined"
            />
          ))}
        </Grid>

        <Grid xs={12} sx={{ mt: 2, ml: 2 }}>
          {selectedChips &&
            selectedChips.map((item:any, index:any) => (
              <Chip
                sx={{
                  color: "#fff",
                  borderRadius: 1,
                  m: "8px 10px 8px 0px",
                  cursor: "pointer",
                }}
                label={item}
                variant="outlined"
                onDelete={() => handleDeleteChip(item)}
                deleteIcon={
                  <CloseIcon
                    style={{
                      color: "#f5f5f5",
                      paddingLeft: 1,
                      fontSize: "14px",
                    }}
                  />
                }
              />
            ))}
        </Grid>

        {generatedMusic ? (
          <Grid item xs={12}>
            <animated.div
              style={{ ...itemSpring, opacity: itemSpring.opacity }}
            >
              <MusicPlayer
                musicData={generatedMusic}
                setGeneratedMusic={setGeneratedMusic}
                setGeneratedMusicCounter={setGeneratedMusicCounter}
                generatedMusicCounter={generatedMusicCounter}
                setAiGeneratedMusics={setAiGeneratedMusics}
                aiGeneratedMusics={aiGeneratedMusics}
                setLoading={setLoading}
                loading={loading}
              />
            </animated.div>
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Typography
                sx={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}
              >
                Music Not Found
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default EditMusic;
