import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config';

export interface Props {
    children?: React.ReactNode;
}

const Theme:React.FC<Props> = ({
    children,
}) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
};

export default React.memo(Theme);