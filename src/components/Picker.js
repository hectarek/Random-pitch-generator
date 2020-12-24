import { React } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


export function Picker(props) {
  
  return (
    <div className="tad-margin">
      <TextField
        select
        label="Select"
        value={props.value}
        onChange={props.handleChange}
        helperText={props.helperText}
        variant="outlined"
      >
      {props.list.map((option) => (
        <MenuItem key={option.name} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
      </TextField>
    </div>
  )
}
