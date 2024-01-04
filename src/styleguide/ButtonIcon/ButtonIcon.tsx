import React from 'react';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';

type Props = {
    label?: string;
    icon?: string;
    type?: string;
    fontSize?: 'inherit'|'default'|'small'|'large';
    fontStyle?: any;
    classStyle?: string;
}

const ButtonIcon : React.FC<Props> = ({
    label = '',
    icon = '',
    type = 'default',
    fontSize = 'small',
    fontStyle = {},
    classStyle = '',
}) => {
    return (
        <>
        {type === 'button' && 
            <Box display="flex"><Icon>{icon}</Icon></Box>
        }
        {type === 'default' && icon &&
            <Box textAlign="center" alignItems="center" display="flex" justifyContent="flex-start" flexDirection="column" pr={0.5}>
                <Icon fontSize={fontSize} className={classStyle !== '' ? classStyle : ''} style={fontStyle}>{icon}</Icon>
            </Box>
        }
        {type === 'default' && label && 
            <Box fontSize={14} display="inline-block" pr={0.5} pl={icon ? 0.5 : 0}>
                {label}
            </Box>
        }
        </>
    )
};
export default ButtonIcon;