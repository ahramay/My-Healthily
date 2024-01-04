import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { DropBox } from './DropBox';
import { useDrop } from 'react-dnd';
import { Typography } from '@material-ui/core';

import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'block',
    },
    jobList: {
      backgroundColor: '#d4d4d4',
      padding: 10,
      maxHeight: 225,
      minHeight: 225,
      overflowY: 'scroll',
      "&::-webkit-scrollbar-track": {
          WebkitBoxShadow: "inset 0 0 spx rgba(0,0,0,0.3)",
          borderRadius: "5px",
          backgroundColor: "#F5F5F5"
      },
      "&::-webkit-scrollbar": { width: "6px", backgroundColor: "#F5F5F5" },
      "&::-webkit-scrollbar-thumb": {
          borderRadius: "5px",
          WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.1)",
          backgroundColor: "#3e3e3e"
      },
    },
    listItem: {
      padding: 5,
      backgroundColor: 'white',
      border: '1px dashed gray',
      margin: '5px 0',
    },
    dropArea: {
      display: 'block',
      content: '',
      height: '100%',
      marginBotom: 10,
    }
  }),
);

type Props = {
  title?: string;
  edit?: boolean;
  items?: any;
  accept?: any;
  area?: string,
  titlePlaceholder?: string;
  onItemDropped?: any;
  saveTitle?: (value: string) => void;
}

const CollectionBox: React.FC<Props> = ({ title="", edit, items = [], accept, area, titlePlaceholder, onItemDropped, saveTitle }) => {
  const classes = useStyles();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept,
    drop: () => ({ name: `dropbox_${area}` }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const [inputFields, setInputFields] = useState<any>({
    inputTitle : title,
  });

  const handleinputFields = (value: any, name: string) => {
    setInputFields({
        ...inputFields,
        [name]: value,
    })
    saveTitle?.(value);
  }

  const isActive = canDrop && isOver
  let backgroundColor = '#d4d4d4';
  if (isActive) {
    backgroundColor = '#737373';
  } else if (canDrop) {
    backgroundColor = '#8c966e';
  }
  return (
    <Box width={1} height={1}>
      <Box>
      {!edit &&
        <Typography variant="body1" component="span"><b>{title}</b>&nbsp;</Typography>
      }
      {edit &&
        <FormLabel>
            <TextField 
                name="inputTitle" value={inputFields.inputTitle} error={false} required={true} tabIndex={1}
                label={inputFields?.inputTitle === '' ? titlePlaceholder : ''} size="small"
                onChange={handleinputFields}
            />
        </FormLabel>
      }
      </Box>
      <Box width={1} height={1}>
        <div className={classes.dropArea} ref={drop} data-role={`dropbox_${area}`}>
          <Box position="relative" className={classes.jobList} style={{ backgroundColor: backgroundColor}}>
            <Box display={isActive ? 'block' : 'none'} position="absolute" bgcolor="white" style={{ opacity: 0.4, height: '100vh' }} width={1} height={225} left={0} top={0} zIndex={1}></Box>
            {items?.map((item: any, index: number) => (
              <Box width={1} height={1} key={index}>
                {!isActive &&
                  <DropBox enableDrop={accept === "" ? false : true} id={item.id} label={item.label} type={`${item.type}`} area={area} onItemDropped={onItemDropped} />
                }
                {isActive &&
                  <DropBox enableDrop={false} id={item.id} label={item.label} type={`${item.type}`} />
                }
              </Box>
            ))}
          </Box>
        </div>
      </Box>
    </Box>
  )
};

export default React.memo(CollectionBox);
