import React from 'react';
import Box from '@material-ui/core/Box';
import { useDrag } from 'react-dnd';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useMemo } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      color: 'white',
      border: '1px dashed gray',
      marginRight: '0.5rem',
      marginBottom: '0.5rem',
      padding: '0.5rem 1rem',
    },
  }),
);

export interface BoxProps {
  id: string;
  enableDrop: boolean;
  label: string;
  type: any;
  area?: string;
  onItemDropped?: (item: any) => void;
}

interface DropResult {
  id: string,
  label: string,
}

export const DropBox: React.FC<BoxProps> = ({ id, enableDrop=true, label, type, area, onItemDropped }) => {
  const classes = useStyles();
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { id, label, type },
    end: (item, monitor) => {
      const dropResult: any = monitor.getDropResult<DropResult>();
      const compareValue = `dropbox_${area}`;
      const dropResultName = dropResult?.name;
      if (dropResultName !== compareValue) {
        if (item && dropResult) {
          onItemDropped?.({ id, label, type, area });
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  const opacity = isDragging ? 0.4 : 1;

  const rowColor = useMemo(() => {
    let color = '#1e79b9';
    if (type === 'data2') {
      color = '#1b9250';
    } else if (type === 'data3') {
      color = '#b91e1e';
    }
    return color;
  }, [type]);

  return (
    <Box width={1} height={1} maxWidth={450} bgcolor={rowColor} p={1} className={classes.listItem} style={{ cursor: enableDrop ? 'move' : 'default'}}>
      {enableDrop && 
        <div ref={drag} data-role="Box" style={{ opacity }} data-testid={`box-${type}-${id}`}>
          {label}
        </div>
      }
      {!enableDrop && 
        <div data-testid={`box-${type}-${id}`}>
            {label}
        </div>
      }
    </Box>
  )
};

export default React.memo(DropBox);
