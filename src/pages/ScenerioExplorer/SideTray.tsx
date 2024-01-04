import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import { Grid, Typography, NativeSelect, Rating, TextField, InputAdornment, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SearchIcon from '@mui/icons-material/Search';
import styles from './ScenerioExplorer.module.css';
import GrapghImage from 'assets/graph.svg';
import { useState } from 'react';
import RangeSlider from './RangeSlider';
import { deepGreen } from 'utility/Colors/DeepGreen';

const SideTray = () => {
  const [showDataScenerioType, setShowDataScenerioType] = useState(3);
  const [showDataAssetClass, setShowDataAssetClass] = useState(4);

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#A87791',
    },
  });

  const StyledNativeSelect = styled(NativeSelect)({
    '& .MuiNativeSelect-select': {
      backgroundColor: '#E5E5E5',
      paddingLeft: '8px',
    },
  });

  const StyledSearchField = styled(TextField)({
    '& .MuiInputBase-input': {
      paddingTop: '6px',
      paddingBottom: '6px',
    },
    '& .MuiFilledInput-root': {
      display: 'flex',
      alignItems: 'baseline',
      border: '2px solid #A87791',
      borderRadius: 'inherit',
    },
  });

  const StyledButton = styled(Button)({
    border: '1px solid #16161A',
    color: '#16161A',
    textTransform: 'inherit',
    borderRadius: 'inherit',
    justifyContent: 'left',
  });

  const StyledFormControlLabel = styled(FormControlLabel)({
    '& .MuiFormControlLabel-label' :{
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px !important',
      lineHeight: '18px',
    }
  });

  
  const ScenerioType = [
    {
      label: 'Downside',
    },
    {
      label: 'Thematic',
    },
    {
      label: 'Geopolitical',
    },
    {
      label: 'Downside2',
    },
    {
      label: 'Thematic2',
    },
  ];

  const AsseteeClass = [
    {
      label: 'Equiries',
    },
    {
      label: 'Real Estate',
    },
    {
      label: 'Credit',
    },
    {
      label: 'Thematic',
    },
    {
      label: 'Geopolitical',
    },
  ];

  const allDataScenerioType = ScenerioType.length;
  const allDataAssetClass = AsseteeClass.length;

  return (
    <Box className={styles.tray_container}>
      <Box className={styles.section1}>
        <Typography className={styles.caption1} mb={1}>User Rating</Typography>
        <StyledRating
          name="customized-color"
          defaultValue={2}
          size="small"
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
      </Box>
      <Box className={styles.section2}>
        <Grid container mt={1}>
          <Grid item xs={6} mb={3}>
            <Typography className={styles.caption1}>Date Horizon</Typography>
          </Grid>
          <Grid item xs={6}>
            <StyledNativeSelect id="select" disableUnderline fullWidth IconComponent={KeyboardArrowDownIcon} className={styles.caption2}>
              <option value="10">Count Three</option>
              <option value="20">Twenty</option>
            </StyledNativeSelect>
          </Grid>
          <Grid item xs={12}>
            <img src={GrapghImage} />
            <RangeSlider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', color: deepGreen.primary }}>
              <Typography className={styles.caption1}>2021-09-01</Typography>
              <Typography className={styles.caption1}>2026-12-31</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.section3}>
      <Typography className={styles.caption1} mb={1}>Scenario Type</Typography>

        <FormGroup>
          {ScenerioType.slice(0, showDataScenerioType).map((item, index) => (
            <StyledFormControlLabel className={styles.caption3} key={index} control={<Checkbox size="small" />} label={item.label} />
          ))}
        </FormGroup>

        <Typography className={styles.caption2} sx={{ color: '#A87791' }}>
          {ScenerioType.length !== showDataScenerioType && (
            <span onClick={() => setShowDataScenerioType(allDataScenerioType)}>+ {ScenerioType.length - 3} more</span>
          )}
        </Typography>
      </Box>

      <Box className={styles.section3}>
        <Typography className={styles.caption1} mb={1}>Author</Typography>
        <StyledSearchField
          id="filled-search"
          type="search"
          variant="filled"
          placeholder="Search field 2"
          size="small"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className={styles.section4}>
        <FormGroup>
          {AsseteeClass.slice(0, showDataAssetClass).map((item, index) => (
            <StyledFormControlLabel key={index} control={<Checkbox size="small" />} label={item.label} />
          ))}
        </FormGroup>

        <Typography className={styles.caption2} sx={{ color: '#A87791' }}>
          {AsseteeClass.length !== showDataAssetClass && (
            <span onClick={() => setShowDataAssetClass(allDataAssetClass)}>+ {AsseteeClass.length - 4} more</span>
          )}
        </Typography>
      </Box>
      <Box>
        <Typography className={styles.caption1} mb={1}>Subscription Type</Typography>
        <StyledButton className={styles.caption1} fullWidth>Needs approval by Admin</StyledButton>
      </Box>
    </Box>
  );
};

export default SideTray;
