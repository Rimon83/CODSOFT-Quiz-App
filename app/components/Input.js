"use client";
import { useState, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, TextField } from "@mui/material";
import { GlobalContext } from "../context/state";

const Input = (props) => {
  const { label, options, setValid } = props;
  const [value, setValue] = useState("");
  const { dataKey, dispatch } = useContext(GlobalContext);

  const handleChange = (event) => {
    setValid(false)
    const newValue = event.target.value;
    setValue(newValue);
    dispatch({
      type: `update${label.charAt(0).toUpperCase() + label.slice(1)}`,
      payload: newValue,
    });
  };

  return (
    <Box width="100%">
      <FormControl fullWidth>
        {label === "number" ? (
          <TextField
            type="number"
            label={label}
            value={value}
            onChange={(event) => handleChange(event)}
          />
        ) : (
          <section className="w-full">
            <InputLabel>{label}</InputLabel>

            <Select
              fullWidth
              value={value}
              label={label}
              onChange={(event) => handleChange(event)}
            >
              {options &&
                options.map(({ name, id }) =>
                  label === "category" ? (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ) : (
                    <MenuItem key={id} value={name}>
                      {name}
                    </MenuItem>
                  )
                )}
            </Select>
          </section>
        )}
      </FormControl>
    </Box>
  );
};

export default Input;
