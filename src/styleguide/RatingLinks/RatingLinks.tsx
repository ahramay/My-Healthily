import React, { useCallback, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import starOutline from 'assets/star-outline.svg';
import starFilled from 'assets/star-filled.svg';

import squareOutline from 'assets/square-outline.svg';
import squareFilled from 'assets/square-filled.svg';

import { Palette } from 'utility/Colors/Palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    borderBox: {
        borderBottom: `solid 1px ${Palette.Grey.Light}`,
    },
    boxHeading: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    starText: {
        fontSize: 13,
        fontWeight: 'bold',
        msUserSelect: 'none',
        MozUserSelect:'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
    }
  }),
);

export type Props = {
    title?: string;
    bottomBorder?: boolean;
    list?: any;
    type: 'star'|'square';
    onChange?: (type: string, value: number | null) => void;
}

const RatingLinks:React.FC<Props> = ({
    title,
    bottomBorder=true,
    list,
    type,
    onChange,
}) => {
    const classes = useStyles();
    const [ratings, setRatings] = useState<any>(null);

    const handleRatings = useCallback((value) => {
        const num = parseInt(value);
        let finalValue: number | null;
        if (num === ratings) {
            finalValue = null;
        } else {
            finalValue = num;
        }
        setRatings(finalValue);
        onChange?.(type, finalValue);
        
    }, [ratings, type, onChange]);

    const getStatus = useCallback((value: string) => {
        const num = parseInt(value);
        if (ratings && ratings > 0) {
            if (ratings <= num) {
                return true;
            }
        }
        return false;
    }, [ratings]);

    return (
        <Box position="relative" width={1} height={1} p={1}>
            <Box width={1} pb={1} className={bottomBorder ? classes.borderBox: ''}>
                {title &&
                    <Box width={1} height={1} mb={1.5}><Typography variant="h6" component="h6" className={classes.boxHeading}>{title}</Typography></Box>
                }
                
                    <Box display="flex">
                        {list?.map((row: any, index: number) => (
                            <Box width={1} height={55} p={0} key={index}>
                                <Box onClick={() => {handleRatings(row.value) }} width={1} 
                                position="relative" textAlign="center" alignItems="center" display="flex" justifyContent="flex-start"
                                style={{cursor: 'pointer'}}
                                >
                                    <Box top={1} width={35} height={40} position="absolute" zIndex={0}>
                                        {type === 'star' && <img height="50" width="50" src={getStatus(row?.value) ? starFilled : starOutline} alt="Star Icon" /> }
                                        {type === 'square' && <img height="50" width="50" src={getStatus(row?.value) ? squareFilled : squareOutline} alt="Square Icon" /> }
                                    </Box>
                                    <Box width={18} color={getStatus(row?.value) ? "white":"black"} position="absolute" textAlign="center" 
                                        top={18} left={16} zIndex={1}>
                                        <Typography color="inherit" variant="body1" component="span" className={classes.starText}>{row.label}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                
            </Box>
        </Box>
    )
};

export default React.memo(RatingLinks);