import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
// import { Plus } from 'mdi-material-ui'
import SearchIcon from "@mui/icons-material/Search";

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



const CustomInput = ({
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
              readOnly: disabled ? disabled : false,
              endAdornment: showAdornment ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="click end adorment button"
                    onClick={onEndAdornmentClick}
                    sx={{color:'#4e4e54'}}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
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
export default CustomInput;
