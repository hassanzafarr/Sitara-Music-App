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

  const queryParams : any = router.query;

  console.log("queryParams", queryParams);

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

  const handleEdit = () => {
    // queryParams
    setGeneratedMusic(queryParams.src);
    // setGeneratedMusicCounter(aiGeneratedMusics?.length + 1);
    // const songObj = {
    //   src: queryParams.src,
    //   singer: "AI",
    //   img: "../../../images/img5.jpg",
    //   songName: `AI Generated Song ${aiGeneratedMusics?.length + 1}`,
    // };

    // setAiGeneratedMusics([...aiGeneratedMusics, songObj]);
  };

  const itemSpring = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });


  useEffect(() => {
    setGeneratedMusic(queryParams.src);
  }, [queryParams]);

  return (
    <>
      <CustomMusicLoader loading={loading} />
      <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{color:'#fff'}}>Edit Music</Typography>
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
        ) : 
        <>
        <Grid item xs={12}>
          <Typography sx={{fontSize:18, color:'#fff', fontWeight:'bold'}} >Music Not Found</Typography>
        </Grid>
        </>
        }
      </Grid>
    </>
  );
};

export default EditMusic;
