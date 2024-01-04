import { Box, Grid, Paper, Typography } from '@mui/material';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import CropIcon from '@mui/icons-material/Crop';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { styled } from '@mui/material/styles';
import GraphImg from 'assets/committee-graph.svg';
import SideTray from './SideTray';
import styles from './ScenerioExplorer.module.css';
import { Leftbardata } from 'pages/Dashboard/Dashboard';
import { Palette } from 'utility/Colors/Palette';
import StickyHeadTable from './Table';

const ScenerioExplorer = () => {
  const StyledIconsBox = styled(Box)({
    '& .MuiSvgIcon-root': {
      color: '#707070',
      fontSize: 'medium',
    },
    color: '#707070',
  });

  const StyledPapper = styled(Paper)({
    backgroundColor: 'white',
    margin: '46px',
    height: 'fit-content',
    padding: '43px 30px 50px 35px',
  });
  return (
    <Box className={styles.mainScenerio}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} className={styles.mainChildGrid}>
          <SideTray />
          <Box>
            <StyledPapper square elevation={0}>
              <Box className={styles.scenarioConvention}>
                <Typography sx={{ margin: 'auto 17px auto 0' }}>Y</Typography>
                <Box>
                  <Box className={styles.scenerioTopbar}>
                    <Typography>SSA Committee Default</Typography>
                    <StyledIconsBox className={styles.IconsBox}>
                      <ZoomOutMapIcon className={styles.committee_icons} />
                      <CropIcon className={styles.committee_icons} />
                      <ZoomInIcon className={styles.committee_icons} />
                      <ZoomOutIcon className={styles.committee_icons} />
                    </StyledIconsBox>
                  </Box>
                  <Box className={styles.imgBorder} mt={1}>
                    <img src={GraphImg} />
                  </Box>
                </Box>
              </Box>
              <Typography className={styles.scenerioX_axis}>X</Typography>
            </StyledPapper>
            <StyledPapper sx={{padding:'0'}} square elevation={0}><StickyHeadTable/></StyledPapper>
          </Box>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                '& > :not(style)': {
                  width: 435,
                  height: 730,
                  ml: 2,
                  position: 'fixed',
                  mt: 1,
                },
              }}
              className={styles.header}
            >
              <Paper square elevation={0} sx={{ backgroundColor: 'white' }}>
                {Leftbardata.map((item) => (
                  <Box sx={{ p: 1, pl: 4 }}>
                    <Typography sx={{ fontSize: 16, color: Palette.Grey.lightest, marginTop: 2 }}>{item.title}</Typography>
                    <Typography sx={{ fontSize: 25, fontWeight: '100' }}>{item.subTitle}</Typography>
                  </Box>
                ))}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScenerioExplorer;
