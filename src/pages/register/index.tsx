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
import CustomInput from "@/components/customInput";
import CustomPasswordInput from "@/components/customPasswordInput";
import { useRouter } from "next/router";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const initialValues: any = {
    username: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
    // resolver: yupResolver(validationSchema),
  });

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
      sx={{ bgcolor: "black" }}
    >
      <Grid item xs={12}>
        <Card sx={{ bgcolor: "#18181b", color: "#E4E4E7",maxWidth: 650 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
                  Register
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  To enjoy Sitaar Music
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  control={control}
                  name="username"
                  required={true}
                  label="Username"
                  errors={errors}
                  type="string"
                  showAdornment={false}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomPasswordInput
                  control={control}
                  name="password"
                  required={true}
                  label="Password"
                  errors={errors}
                  type={showPassword ? "text" : "password"}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showAdornment={true}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                onClick={()=>router.push('/home')}
                  sx={{
                    width: "100%",
                    background: "#EE4950",
                    color: "#1A202C",
                    fontSize:'16px',
                    fontWeight:'bold',
                    "&:hover": {
                      background: "#e53e3e",
                    },
                  }}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ fontSize: "14px", textAlign: "center" }}>
                <Typography sx={{ fontSize: "14px", color: "#A1A1AA" }}>
                  OR
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#A1A1AA" }}>
                  Continue without Logging in
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "14px", color: "#A1A1AA" }}>
                  Don't have an account yet? {" "}
                  <span style={{ color: "#EE4950",cursor:'pointer' }} onClick={()=>router.push('/login')}>Login</span>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
