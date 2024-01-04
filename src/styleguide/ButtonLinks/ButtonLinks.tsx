import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from  '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonIcon from 'styleguide/ButtonIcon';
import { Palette } from 'utility/Colors/Palette';

type Props = {
    bgColor?: string,
    bgActiveColor?: string,
    size?: 'small'|'medium'|'large',
    variant?: any,
    color?: any,
    label?: string;
    tooltip?: string;
    textTransform?: 'none'|'capitalize'|'uppercase'|'lowercase'|'full-width'|'full-size-kana';
    icon?: string;
    fontSize?: 'inherit'|'default'|'small'|'large';
    circleIcon?: boolean;
    flexIcon?: boolean;
    onClickAction?: () => void;
}

const ButtonLinks: React.FC<Props> = ({
    bgColor='',
    bgActiveColor='',
    size='small',
    variant='contained',
    color='secondary',
    label='',
    icon='',
    tooltip='',
    textTransform='uppercase',
    circleIcon,
    flexIcon,
    fontSize,
    onClickAction,
}) => {
    const useStyles = makeStyles({
        icon : {
            height: 30,
            width: 30,
            fontSize: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: bgColor !== '' ? bgColor : Palette.deepMaroon.BgLight,
            borderRadius: '50%', 
            '&:active': {
                color: Palette.Base.White,
                backgroundColor: bgActiveColor !== '' ? bgActiveColor : Palette.deepMaroon.BgDark,
            },
        },
        flatIcon: {
            color: `${Palette.Grey.DarkBg}`,
            '&:active' : {
                color: `${Palette.deepPurple.Main}`,
            }
        }
    });
    const classes = useStyles();
    const handleEvent = useCallback(() => {
        onClickAction?.();
    }, [onClickAction]);
    return (

        <Box display="inline-flex" px={0.5}>
            {!flexIcon && !circleIcon && 
                <Tooltip title={tooltip}>
                    <Button 
                        size={size} 
                        variant={variant} 
                        color={color} 
                        style={{ backgroundColor: bgColor, textTransform }} 
                        onClick={() => handleEvent()} 
                        disableElevation={true}
                        >
                        {icon ? (
                            <ButtonIcon icon={icon} label={label} />
                        ) : (
                            label
                        )}
                    </Button>
                </Tooltip>
            }
            {flexIcon && 
                <Box maxWidth={'auto'} width={1} height={1} position="relative" display="inline-block" className={classes.flatIcon}
                onClick={() => handleEvent()}>
                    <ButtonIcon type="default" icon={icon} fontSize={fontSize}  />
                </Box>
            }
            {circleIcon &&
                <Box maxWidth={'auto'} width={30} height={30} position="relative" display="inline-block" onClick={() => handleEvent()}>
                    <Box position="absolute" top={5} color={color} display="inline-block" textAlign="center" className={classes.icon}>
                        <ButtonIcon type="button" icon={icon} label={label} />
                    </Box>
                </Box>
            }
        </Box>
    )
};

export default React.memo(ButtonLinks);