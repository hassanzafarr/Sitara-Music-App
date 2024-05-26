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
import CustomCategoriesCard from "@/components/customCategoriesCard";
import { categories } from "@/helper/musicCategories";
import CustomSelect from "@/components/customSelect";
import CloseIcon from "@mui/icons-material/Close";
import { showAlert } from "@/helper/helper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { timeDuration } from "@/helper/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { generateMusic } from "@/helper/middlewareStates";
import { useRecoilState } from "recoil";
import { useSpring, animated } from "react-spring";

const CreateMusic = () => {
  const schema = yup.object().shape({
    timeDuration: yup.string().required("Time Duration is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categoryChips, setCategoryChips] = useState<any>([]);
  const [musicParams, setMusicParams] = useRecoilState(generateMusic);

  const itemSpring = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  const selectCategory = (data: any) => {
    if (categoryChips.includes(data.title))
      showAlert("Category already Selected!");
    else setCategoryChips([...categoryChips, data.title]);
  };

  const handleDeleteChip = (data: any) => {
    const deletedChips = categoryChips.filter((item: any) => item !== data);
    setCategoryChips(deletedChips);
  };

  const GenreCategories = categories.filter(
    (name: any) => name.type == "Genre"
  );
  const MoodCategories = categories.filter((name: any) => name.type == "Mood");
  const InstrumentCategories = categories.filter(
    (name: any) => name.type == "Instrument"
  );

  const onSubmit = (form:any) => {
    const response: any = {
      duration: form.timeDuration,
      prompt: categoryChips,
    };
    setMusicParams(response);
    router.push("/editMusic");
  };

  return (
    <>
      <ToastContainer />
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ color: "#fff", fontSize: "18px" }}>
              CHOOSE THE LENGTH
            </Typography>
          </Grid>
          <Grid item md={4} xs={6}>
            <CustomSelect
              control={control}
              options={timeDuration}
              // disabled={true}
              type={"number"}
              name={"timeDuration"}
              label={"Time Duration"}
              errors={errors}
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <Button
              variant="contained"
              size="medium"
              type="submit"
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
              Generate Music
            </Button>
          </Grid>

          <Grid xs={12} sx={{ mt: 2, ml: 2 }}>
            {categoryChips &&
              categoryChips.map((item:any, index:any) => (
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

          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography
              sx={{ color: "#EE4950", fontSize: "16px", fontWeight: "bold" }}
            >
              START GENERATING
            </Typography>
            <Typography
              sx={{ color: "#ffff", fontSize: "52px", fontWeight: "bold" }}
            >
              Select the Genre
            </Typography>

            <Grid container spacing={2}>
              {GenreCategories.map((item:any, index:any) => (
                <Grid item md={3} xs={4}>
                  <animated.div
                    style={{ ...itemSpring, opacity: itemSpring.opacity }}
                  >
                    <CustomCategoriesCard
                      data={item}
                      handleCategory={() => selectCategory(item)}
                    />
                  </animated.div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography
              sx={{ color: "#EE4950", fontSize: "16px", fontWeight: "bold" }}
            >
              START GENERATING
            </Typography>
            <Typography
              sx={{ color: "#ffff", fontSize: "52px", fontWeight: "bold" }}
            >
              Select the Mood
            </Typography>

            <Grid container spacing={2}>
              {MoodCategories.map((item:any, index:any) => (
                <Grid item md={3} xs={4}>
                  <animated.div
                    style={{ ...itemSpring, opacity: itemSpring.opacity }}
                  >
                    <CustomCategoriesCard
                      data={item}
                      handleCategory={() => selectCategory(item)}
                    />
                  </animated.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography
              sx={{ color: "#EE4950", fontSize: "16px", fontWeight: "bold" }}
            >
              START GENERATING
            </Typography>
            <Typography
              sx={{ color: "#ffff", fontSize: "52px", fontWeight: "bold" }}
            >
              Select the Theme
            </Typography>

            <Grid container spacing={2}>
              {InstrumentCategories.map((item:any, index:any) => (
                <Grid item md={3} xs={4}>
                  <animated.div
                    style={{ ...itemSpring, opacity: itemSpring.opacity }}
                  >
                    <CustomCategoriesCard
                      data={item}
                      handleCategory={() => selectCategory(item)}
                    />
                  </animated.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreateMusic;
