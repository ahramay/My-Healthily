import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const UnderConstruction: React.FC = () => {
    return (
        <Card>
            <Box p={2.5}>
                <CardContent>
                    <Box display="flex">
                        <Box p={1} width="100%">
                            <Typography variant="h5" component="h2">Under Construction</Typography>
                        </Box>
                    </Box>

                    <Divider />

                    <Box width={1} height={1} p={2}>
                        <Typography variant="body1" component="h5">This page is still under construction, please visit later.</Typography>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    )
};

export default React.memo(UnderConstruction);