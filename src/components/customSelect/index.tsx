// import React from "react";
// import { Controller } from "react-hook-form";
// import { TextField, Button } from "@material-ui/core";
// import { Autocomplete, FormHelperText } from "@mui/material";

// interface InputFieldProps {
//   control: any;
//   name: string;
//   label?: string;
//   required?: boolean;
//   disabled?: boolean;
//   fullDisabled?: boolean;
//   errors?: any;
//   onEndAdornmentClick?: any;
//   showAdornment?: boolean;
//   type?: string;
//   title?: any;
//   data?: any;
//   options?: any;
//   size?: any;
// }

// const CustomSelect = ({
//   control,
//   name = "",
//   label = "",
//   options = [],
//   title = "",
//   size = "",
//   errors = {},
// }: InputFieldProps) => {
//   const [value, setValue] = React.useState<string | null>(options[0] || null);
//   const [inputValue, setInputValue] = React.useState("");

//   return (
//     <>
//       <Controller
//         name={name}
//         control={control}
//         defaultValue={value}
//         rules={{ required: true }}
//         render={({ field }) => (
//           <Autocomplete
//             disablePortal
//             id="combo-box-demo"
//             options={options}
//             renderInput={(params) => (
//               <TextField
//                 variant="outlined"
//                 {...params}
//                 label={label}
//               />
//             )}
//           />
//         )}
//       />
//       {errors?.[name] && (
//         <FormHelperText sx={{ color: "error.main" }}>
//           {errors?.[name].message}
//         </FormHelperText>
//       )}
//     </>
//   );
// };

// export default CustomSelect;import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller } from "react-hook-form";
// import * as Icons from 'mdi-material-ui'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";

interface SelectProps {
  control: any;
  name: string;
  label: string;
  allowZero?: boolean;
  required?: boolean;
  options: Array<any>;
  setCat?: any;
  disabled?: boolean;
  placeholder?: string;
  errors?: any;
  multiple?: boolean;
  hasCode?: boolean;
  inputWidth?: string;
  size?: any;
  type?: string;
  customStyles?: any;
}

const CustomSelect = ({
  control,
  name = "",
  label = "",
  allowZero = false,
  required = false,
  options = [],
  setCat,
  type= 'string',
  disabled = false,
  placeholder = "select",
  errors,
  multiple = false,
  hasCode = false,
  inputWidth = "100%",
  size = "small",

  customStyles = {
    // top: '-7px'
    color: "#ffff",
    "&.Mui-focused": {
      color: "#ffff",
    },
  },

}: SelectProps) => {
  return (
    <>
      <FormControl style={{ width: "100%" }} size={size}>
        <Controller
          name={name}
          control={control}
          rules={{ required: required }}
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <InputLabel id={label} sx={customStyles}>
                {label}
              </InputLabel>
              <Select
                readOnly={disabled}
                label={label}
                labelId={label}
                name={label}
                sx={{
                  width: inputWidth,
                  color: "white",                
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffff",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffff",
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffff",
                  },
                }}
                value={multiple ? value || [] : allowZero ? value : value || ""}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={placeholder}
                multiple={multiple}
                size="small"
                type={type}
              >
                {options && options.length ? (
                  options?.map((op:any, index:any) => {
                    // const CustomIcon = Icons[op.icon]

                    return (
                      <MenuItem
                        key={index}
                        value={op?.duration || op?.name || op?.itemName || op?.label || op}
                      >
                        {op?.icon ? (
                          <span
                            style={{ marginRight: op.icon ? "5px" : "0px" }}
                          >
                            {<RemoveRedEye fontSize="small" />}{" "}
                          </span>
                        ) : null}
                        <span>
                          {op?.label || op?.name || op?.itemName || op}
                        </span>
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem disabled={true}>
                    <span>No Options</span>
                  </MenuItem>
                )}
              </Select>
            </>
          )}
        />
        {errors?.[name] && (
          <FormHelperText sx={{ color: "error.main" }}>
            {errors[name].message}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};
export default CustomSelect;
