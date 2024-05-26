import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface InputFieldProps {
  control: any;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: any;
  onEndAdornmentClick?: any;
  showAdornment?: boolean;
  placeholder?: string;
  type?: string;
  title?: any;
  multiline?: boolean;
  showPassword?: any;
  setShowPassword?: any;
}

const textFieldDesign = {
  "& label": {
    color: "#A1A1AA", // Change the default label color to #4e4e54
  },
  "& label.Mui-focused": {
    color: "#A1A1AA", // Change the label color on focus to #4e4e54
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#4e4e54", // Change the border color on hover to #4e4e54
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4e4e54", // Change the focused border color to #4e4e54
    },
    "& fieldset": {
      borderColor: "#4e4e54", // Change the default border color to #4e4e54
    },
    "& input": {
      color: "white", // Change the input text color to white
    },
  },
};

const CustomPasswordInput = ({
  control,
  name = "",
  label = "",
  title,
  placeholder,
  onEndAdornmentClick,
  showAdornment,
  required,
  disabled,
  errors = {},
  multiline,
  type,
  showPassword,
setShowPassword,
}: InputFieldProps) => {
  return (
    <FormControl style={{ width: "100%" }}>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            autoComplete="off"
            size="small"
            sx={textFieldDesign}
            disabled={disabled}
            label={label || title}
            multiline={multiline}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            InputLabelProps={{ shrink: !!value }}
            placeholder={placeholder}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    sx={{color:'#A1A1AA'}}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <VisibilityIcon width={20} />
                    ) : (
                      <VisibilityOffIcon width={20} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {errors?.[name] && (
        <FormHelperText sx={{ color: "error.main" }}>
          {errors?.[name].message}
        </FormHelperText>
      )}
    </FormControl>
  );
};
export default CustomPasswordInput;
