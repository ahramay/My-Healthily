import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

type Props = {
    reference?: number;
    min?: number;
    max?: number;
    inputDefault?: number;
    units?: string;
    onChange?: (value: number | number[], reference: number) => void;
}

const useStyles = makeStyles({
  root: {
    width: 200,
  },
  input: {
    width: 52,
  },
});

const RangeSlider: React.FC<Props> = ({
    inputDefault=0,
    min=0,
    max=100,
    reference=0,
    units,
    onChange,
}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState<number | string | Array<number | string>>(inputDefault);

    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setValue(newValue);
        onChange?.(newValue, reference);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const result = event.target.value === '' ? '' : Number(event.target.value);
        setValue(result);
        if (result !== '') {
            onChange?.(result, reference);
        }
    };

  return (
    <Box className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            className={classes.input}
            value={inputDefault}
            margin="dense"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min,
              max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
        <Grid item>
            <Typography variant="body1" component="h2">{min}{units}</Typography>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            defaultValue={20.10}
            step={0.5}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item>
          <Typography variant="body1" component="h2">{max}{units}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(RangeSlider);