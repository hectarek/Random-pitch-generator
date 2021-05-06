import { React } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


export function Picker(props) {

  return (
    <div>
      <FormControl className={props.classes}>
        <InputLabel id={props.labelIDs}>{props.label}</InputLabel>
        <Select
          select
          id={props.id}
          labelID={props.labelIDs}
          value={props.value}
          onChange={props.handleChange}
        >
          {props.list.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.displayName ? option.displayName : option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
