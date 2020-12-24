import { React } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


export function Picker(props) {
  return (
    <div className="tad-margin">
      <TextField
        select
        label="Select"
        value={props.currency}
        onChange={props.handleChange}
        helperText={props.helperText}
        variant="outlined"
      >
      {props.currencies.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
      </TextField>
    </div>
  )
}
