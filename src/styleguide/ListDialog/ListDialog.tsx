import React, { useState, useCallback, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import { blue } from '@material-ui/core/colors';
import ButtonLinks from 'styleguide/ButtonLinks';
import { Palette } from 'utility/Colors/Palette';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface Props {
  data: any;
  id?: string;
  title?: string;
  icon?: any;
  open: boolean;
  multiCheck?: boolean;
  selectedValue: string;
  noListLabel?: string;
  onClose: (value: any) => void;
}

const ListDialog:React.FC<Props> = ({ ...props }) => {
  const classes = useStyles();
  const { data, id='list-dialog', title, icon, onClose, selectedValue, noListLabel, open, multiCheck } = props;
  const [checkedList, setCheckedList] = useState<any>({});
  const [checkEnterprise, setCheckEnterprise] = useState<boolean>(false);

  const handleClose = () => {
    const resultKeys = Object.keys(checkedList);
    let activeItems = [];
    for (let item of resultKeys){
        if(checkedList?.[item]) {
            activeItems.push(item);
        }
    }
    onClose({
      'label': selectedValue,
      'value': {
        enterprise: checkEnterprise,
        members: activeItems,
      }
    });
    setCheckEnterprise(false);
  };

  const handleListItemClick = (value: string) => {
    const currentValue = checkedList?.[value];
    const newValue:boolean = currentValue ? currentValue : false;
    const result = {
        ...checkedList,
        [value] : !newValue
    };
    setCheckedList(result);
  };

  const handleSelectAll = useCallback(() => {
    const value = !checkEnterprise;
    setCheckEnterprise(value);
  }, [checkEnterprise]);

  useMemo(() => {
    let result: any = {};
    for(let item of data) {
      result = {
          ...result,
          [item] : checkEnterprise,
      };
    }
    setCheckedList(result);
  }, [data, checkEnterprise]);

  return (
    <Dialog id={id} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      {data?.length > 0 && title &&
        <Box display="flex" width={1} height={1} pl={2} borderBottom={1} onClick={() => handleSelectAll()} style={{cursor: 'pointer'}}>
          {multiCheck &&
            <Box color="primary" height={1} width={25} ml={-1} pt={1.3}>
              <Checkbox
                  checked={checkEnterprise}
                  color="primary"
                  inputProps={{ 'aria-label': `check_all` }}
              />
            </Box>
          }
          <Box width={1} height={1}><DialogTitle id={`${id}-title`}>{title}</DialogTitle></Box>
        </Box>
      }
      <List>
        {data?.length === 0 &&
          <ListItem>
            {noListLabel}
          </ListItem>
        }
        {data?.map((item: any, index: number) => (
          <ListItem button onClick={() => handleListItemClick(item)} key={index}>
            <Box display="flex" width={1} height={1}>
              {multiCheck &&
                <Box color="primary" height={1} width={25} ml={-1} mt={-0.5}>
                  <Checkbox
                      checked={checkedList?.[item]}
                      color="primary"
                      inputProps={{ 'aria-label': `${index}` }}
                  />
                </Box>
              }
              <Box width={1} height={1} pl={2} pr={1} pt={0}>
                {!multiCheck &&
                  <ListItemAvatar>
                  {icon &&
                    <Avatar className={classes.avatar}>
                      <Icon>{icon}</Icon>
                    </Avatar>
                  }
                  </ListItemAvatar>
                }
                <ListItemText primary={item} />
              </Box>
            </Box>
            
          </ListItem>
        ))}
        <Box width={1} height={1}>
          <Box mr={1} textAlign="right">
            <ButtonLinks label="close" icon="close" bgColor={Palette.deepMaroon.BgDark}  onClickAction={handleClose}  />
          </Box>
        </Box>
      </List>
    </Dialog>
  );
};

export default React.memo(ListDialog);