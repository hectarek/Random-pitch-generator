import { React, useState } from 'react';
import "../style/App.css";

// Component Imports 
import { Length } from "./Length";
import { Picker } from "./Picker";
import { Range } from "./Range";
import { Switches } from "./Switches";
import { Title } from "./Title";
import { Play } from "./Play";
import { Headings } from './Heading';
import { Rest } from './Rest';
import { Tempo } from './Tempo';

// UI Imports
import { makeStyles } from '@material-ui/core/styles';

// Logic Imports

// useStyles 

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function App() {

  const classes = useStyles();

  const [currency, setCurrency] = useState([
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ]);

  const [value, setValue] = useState([20, 37]);

  const [checked, setChecked] = useState({
    isChecked: true,
  });

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const handlePickerChange = (event) => {
    setCurrency(event.target.value);
  };

	return (
		<div className="container">
			<Title text={"Random Pitch Generator"}/>
      <Headings text={"INSTRUMENT"}/>
      <div className="range-container">
        <Picker 
          value={currency}
          currencies={currency}
          helperText={"Pick an Instrument"}
          handleChange={handlePickerChange}
        />
        <Picker 
          value={currency}
          currencies={currency}
          helperText={"Pick an Scale"}
          handleChange={handlePickerChange}
        />
        <Picker 
          value={currency}
          currencies={currency}
          helperText={"Pick an Key"}
          handleChange={handlePickerChange}
        />
      </div>
      <div className="range-container">
        <Switches 
          text={"Drone?"}
          handleChange={handleChange}
          checked={checked.isChecked}
          />
          <Switches 
          text={"Limit Octave?"}
          handleChange={handleChange}
          checked={checked.isChecked}
          />
      </div>  
      <Headings text={"PITCH"}/>
      <Range 
        value={value}
        styles={classes}
        handleChange={handleSliderChange}
      />
      <Headings text={"LENGTH"}/>
      <Length 
        styles={classes}
        handleChange={handleSliderChange}
      />
      <Rest 
        styles={classes}
        handleChange={handleSliderChange}
      />
      <Tempo 
        styles={classes}
        handleChange={handleSliderChange}
      />
      <Play />
		</div>
	);
}