import { React } from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export function Switches(props) {
    return (
        <FormGroup row>
            <FormControlLabel control={
                <Switch
                    checked={props.check.drone}
                    onChange={props.handleChange}
                    color="secondary"
                    name={props.nameA}
                    inputProps={{ "aria-label": "primary checkbox" }}
                />
            }
                label={props.labelA}
            />
            <FormControlLabel control={
                <Switch
                    checked={props.check.metronome}
                    onChange={props.handleChange}
                    color="secondary"
                    name={props.nameB}
                    inputProps={{ "aria-label": "primary checkbox" }}
                />
            }
                label={props.labelB}
            />
            <FormControlLabel control={
                <Switch
                    checked={props.check.multiNote}
                    onChange={props.handleChange}
                    color="secondary"
                    name={props.nameC}
                    disabled={props.isDisabled}
                    inputProps={{ "aria-label": "primary checkbox" }}
                />
            }
                label={props.labelC}
            />
        </FormGroup>
    );
}
