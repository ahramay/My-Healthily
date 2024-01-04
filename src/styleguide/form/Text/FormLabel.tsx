import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Icon from '@material-ui/core/Icon';
import { Palette } from 'utility/Colors/Palette';
import ButtonLinks from 'styleguide/ButtonLinks';

type Props = {
    children?: React.ReactNode;
    label?: string;
    bold?: boolean;
    hasFilter?: boolean;
    collapsable?: boolean;
    sortBy?: string;
    onSort?: (value: string) => void;
    size?: 'small'|'default';
}

const useStyles = makeStyles({
    small: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 1,
    },
    default: {
        fontSize: 16,
    },
    boldTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const FormLabel: React.FC<Props> = ({ children, label, bold, hasFilter, collapsable, sortBy='', onSort, size='default' }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [togglePanel, setTogglePanel] = useState<boolean>(false);

    const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSort = () => {
        onSort?.(sortBy);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popover' : undefined;

    return <>
        <Box py={1}>
            {label &&
                <Box py={1} color={Palette.Base.Black}>

                    {!(hasFilter || sortBy !== '') && 
                        <>
                        {collapsable && 
                            <Box display="flex" width={1} height={1}>
                                <Box width="100%">
                                    <Typography variant="body1" component="div" className={size === 'small' ? classes.small : (bold ? classes.boldTitle : classes.default)}>
                                        {label}
                                    </Typography>    
                                </Box>
                                <Box mr={1} p={0.2} mt={-0.2} onClick={() => setTogglePanel(!togglePanel)} flexDirection="end" flexShrink={1} style={{cursor: 'pointer'}}>
                                    <Icon color="inherit">{togglePanel ? 'expand_more' : 'expand_less'}</Icon>
                                </Box>
                            </Box>
                        }
                        {!collapsable &&
                            <Typography variant="body1" component="div" className={size === 'small' ? classes.small : (bold ? classes.boldTitle : classes.default)}>
                                {label}
                            </Typography>
                        }
                        </>
                    }
                    {(hasFilter || sortBy !== '') && 
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Typography variant="body1" component="div">
                                    {label}
                                </Typography>
                            </Box>
                            {sortBy !== '' && 
                                <Box maxWidth={20} width={1} height={1} mr={0.2} style={{ cursor: 'pointer' }} onClick={handleSort}>
                                    <ButtonLinks label="" icon="import_export" flexIcon={true} color={Palette.Grey.Dark} bgActiveColor={Palette.Grey.DarkBg} />
                                </Box>
                            }
                            {hasFilter && 
                                <Box  maxWidth={20} width={1} height={1} mr={0.2} style={{ cursor: 'pointer' }} onClick={handleFilter}>
                                    <ButtonLinks label="" icon="filter_list" flexIcon={true} color={Palette.Grey.Dark} bgActiveColor={Palette.Grey.DarkBg} />
                                </Box>
                            }
                        </Box>
                    }
                </Box>
            }
            {!(hasFilter || sortBy !== '') && !togglePanel &&
                <>{children}</>
            }
            {hasFilter &&
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {children}
                </Popover>
            }
        </Box>
    </>
}

export default React.memo(FormLabel);