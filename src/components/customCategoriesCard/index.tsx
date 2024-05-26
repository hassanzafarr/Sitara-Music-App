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
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { categoryMusics } from "@/helper/middlewareStates";

const CustomCategoriesCard = ({ data,handleCategory }: any) => {
  const router = useRouter();

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

  // const handleCategoryMusic = (data: any) => {
  //   setMusicCategory(data);
  //   router.push("/categoryMusics");
  // };

  return (
    <>
      <Box
        sx={{
          borderRadius:1,
          background: 'linear-gradient(to bottom, #ffac22 0%, #e80c64 100%)',
        }}
      >
        <Card
          sx={{
            padding: 1,
            backgroundImage: `${data.img}`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            cursor: "pointer",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(0.96)",
            },
          }}
          onClick={handleCategory}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {data.title}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default CustomCategoriesCard;
