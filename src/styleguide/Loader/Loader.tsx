import React from 'react';
import Box from '@material-ui/core/Box';
import preloader from 'assets/loader.svg';

type Props = {
    margin?: number;
}
const Loader:React.FC<Props> = ({ 
    margin = 0
}) => {
    return <Box m={margin} textAlign="center"><img height="32" width="32" src={preloader} alt="SAPIAT Loader" /></Box>
}

export default Loader;