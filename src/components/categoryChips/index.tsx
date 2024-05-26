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
import "react-toastify/dist/ReactToastify.css";
import { CategoryNames } from "@/helper/constants";

const CategoryChips = ({ handleChip, selectedCategory }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
  });
  return (
    <>
      {CategoryNames.map((item:any) => (
        <Chip
          onClick={() => handleChip(item)}
          label={item}
          sx={{ cursor: "pointer", 
          color: selectedCategory === item ? "red" : "#fff",
          // color:"#fff",
        }}
        />
      ))}
    </>
  );
};

export default CategoryChips;
