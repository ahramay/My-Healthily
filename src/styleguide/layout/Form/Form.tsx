import React from 'react';
import Box from '@material-ui/core/Box';
import Loader from 'assets/loader.svg';

export interface Props {
    children?: React.ReactNode;
    loading?: boolean;
}

const FormLayout:React.FC<Props> = ({
    loading,
    children,
}) => {
    return (
        <>
            {loading && 
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh"
                    width={1}
                    height={1}
                >
                    <img src={Loader} alt="Loader" />
                </Box>
            }
            {!loading && 
                <>{children}</>
            }
        </>
    )
};

export default React.memo(FormLayout);