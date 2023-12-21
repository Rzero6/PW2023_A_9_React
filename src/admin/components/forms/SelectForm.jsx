import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const SelectForm = ({ props, options, selectedValue, onChange }) => {
  const handleSelectChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} id={props.id}>
      <InputLabel>{props.label}</InputLabel>
      <Select {...props} value={selectedValue} onChange={handleSelectChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
