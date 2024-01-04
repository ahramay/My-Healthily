import React, {useState, useMemo, useCallback } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { Palette } from 'utility/Colors/Palette';
import CollectionBox from 'styleguide/DragDrop/CollectionBox';
import DropBoxHolder from 'styleguide/DragDrop/DropBoxHolder';
import ButtonIcon from 'styleguide/ButtonIcon';

type Props = {
  dropItems?: any;
  collectionItems?: any;
  titlePlaceholder?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropItem: {
      "&:nth-child(1) .dropItemChild": {
          paddingRight: 1,
      },
      "&:nth-child(2) .dropItemChild": {
          paddingRight: 0.5,
          paddingLeft: 0.5,
      },
      "&:nth-child(3) .dropItemChild": {
          paddingLeft: 1,
      },
    },
    carouselActive: {
      boxShadow: '0 0 8px #6363ff',
      paddingLeft: 5,
      paddingBottom: 5,
    },
    carouselNormal: {
      boxShadow: 'none',
    },
    activeArrow: {
      cursor: 'pointer',
      fontSize: '5rem',
      color: Palette.Grey.Dark,
    },
    inActiveArrow: {
      cursor: 'pointer',
      fontSize: '5rem',
      color: Palette.Grey.LightBg,
    },
  }),
);

export const Container: React.FC<Props> = ({
		dropItems, collectionItems, titlePlaceholder
	}) => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = useState<any>({
    data: [],
    title: '',
  });

  const [displayList, setDisplayList] = useState<any>([]);
  const [jobsDisplayList, setJobsDisplayList] = useState<any>([]);
  const [finalListValues, setFinalListValues] = useState<any>(null);
  const [reloadValues, setReloadValues] = useState<boolean>(false);
  const previousData: any = collectionItems?.[1] || null;
  const [activeCarouselItem, setActiveCarouselItem] = useState<number>(0);
  const [disablePrevious, setDisablePrevious] = useState<boolean>(true);
  const [disableNext, setDisableNext] = useState<boolean>(false);

  const removeSelectedItems = (selectedData: any, currentData: any) => {
    const index = currentData?.findIndex((item: any) => (item.id === selectedData.id && item.type === selectedData.type));
    let list = currentData || [];
	  if (index !== -1) {
		  list.splice(index, 1);
	  }
    return list;
  }

  const addSelectedItems = (items: any, currentData: any) => {
    const index = currentData?.findIndex((item: any) => (item.id === items.id && item.type === items.type));
    let list = currentData;
    if (index === -1) {
      list.push({ id: items.id, label: items.label, type: items.type });
    }
    return list;
  }

  const handleCollectionDrop = useCallback((items: any) => {
    let collectionItems = selectedItems?.data;
    let selectionList = addSelectedItems(items, collectionItems);
    setSelectedItems({
      ...selectedItems,
      data: selectionList,
    });

    const previousData = finalListValues?.[items.type];
    let list = removeSelectedItems(items, previousData);
    setFinalListValues({
      ...finalListValues,
      [items.type]: list
    });

    return;
  }, [selectedItems, finalListValues]);

  const handleBoxesDrop = useCallback((items: any) => {
    const selectedData = selectedItems?.data;
    let selectionList = removeSelectedItems(items, selectedData);
    setSelectedItems({
      ...selectedItems,
      data: selectionList,
    });

    let list = addSelectedItems(items, finalListValues?.[items.type]);
    setFinalListValues({
      ...finalListValues,
      [items.type]: list,
    });
    
    return;
  }, [selectedItems, finalListValues]);

  const handleSaveTitle = useCallback((value: string) => {
    setSelectedItems({
      ...selectedItems,
      title: value,
    });
  }, [selectedItems])

  const updateUserSelectionDropItems = useCallback((selectedData: any, dropItems: any) => {
    let result: any = {};
    let displayList: any = [];
    let jobsDisplayList: any = [];
    for(let item of dropItems) {
        const itemObj = Object.keys(item);
        const itemObjValues: any = Object.values(item);
        const itemLabel = itemObjValues?.[0]?.[0];
        const itemArray = itemObjValues?.[0]?.[1];

        let filteredArray: any = [];
        if (!selectedData) {
          filteredArray = itemArray;
        } else {
          for(let newItem of itemArray) {
            const index = selectedData?.findIndex((item: any) => (item.id === newItem.id && item.type === newItem.type));
            if (index === -1) {
              filteredArray.push(newItem);
            }
          }
        }

        result = {
          ...result,
          [itemObj[0]]: filteredArray
        }

        displayList.push([
          itemObj[0],
          filteredArray,
          itemLabel
        ]);

        jobsDisplayList.push(itemObj[0]);

      }
      setFinalListValues(result);
      setDisplayList(displayList);
      setJobsDisplayList(jobsDisplayList);
      setSelectedItems({
        ...selectedItems,
        data: selectedData ? selectedData : [],
      });
  }, [selectedItems]);

  const resetSelectedAndDisplayData = useCallback(() => {
    setFinalListValues(null);
    setDisplayList([]);
    setSelectedItems({
      title: '',
      data: [],
    });
  }, []);

  const handlePrevItem = useCallback(() => {
    let count = activeCarouselItem - 1;
    if (count < 0) {
      return;
    }
    resetSelectedAndDisplayData();
    if (count === 0) {
      setDisablePrevious(true);
    }
    setDisableNext(false);
    setActiveCarouselItem(count);
    const selectedData = previousData?.[count]?.data || null;
    updateUserSelectionDropItems(selectedData, dropItems);
  }, [activeCarouselItem, previousData, dropItems, updateUserSelectionDropItems, resetSelectedAndDisplayData]);

  const handleNextItem = useCallback(() => {
    const total = previousData?.length;
    let count = activeCarouselItem + 1;
    resetSelectedAndDisplayData();
    if (count === total) {
      setDisableNext(true);
    }
    if (count > total) {
      setDisableNext(true);
      return;
    }
    setDisablePrevious(false);
    setActiveCarouselItem(count);
    const selectedData = previousData?.[count]?.data;
    updateUserSelectionDropItems(selectedData, dropItems);
  }, [activeCarouselItem, previousData, dropItems, updateUserSelectionDropItems, resetSelectedAndDisplayData]);

  const showItemStatus = (index: any, activeItem: any, total: any) => {
    const currentIndex = parseInt(index);
    const calc = parseInt(activeItem) - parseInt(total);
    return currentIndex >= calc;
  }

  useMemo(() => {
    if (!dropItems || !previousData) return;
    if (!reloadValues) {
      setSelectedItems({
        title: '',
        data: [],
      });
      setActiveCarouselItem(0);
      const selectedData = previousData?.[0]?.data;
      updateUserSelectionDropItems(selectedData, dropItems);
      setReloadValues(true);
    }
  }, [dropItems, reloadValues, previousData, updateUserSelectionDropItems]);

  return (
    <Box>
      <Box display="flex">
        {displayList && displayList?.map((item: any, index: number) => (
          <Box key={index} my={2} width="33.33%" className={classes.dropItem}>
            <Box width={1} height={1} className="dropItemChild">
              <CollectionBox title={item[2]} items={finalListValues?.[item[0]]} accept={item[0]} area={item[0]} onItemDropped={handleCollectionDrop} />
            </Box>
          </Box>
        ))}
      </Box>
      <Box>
        <Grid container spacing={0}>

          <Grid item xs={1}>
            <Box width={1} height={1} onClick={handlePrevItem}>
              <Box mt={18} width={1} style={{transform: 'rotate(180deg)'}}>
                <ButtonIcon icon="double_arrow" label="" classStyle={ disablePrevious ? classes.inActiveArrow : classes.activeArrow} />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={10}>
            <Box width={1} height={1}>

              <Grid container spacing={2}>
                {previousData && previousData?.map((item: any, index: number) => (
                  ( activeCarouselItem === index ) ? (
                    <Grid key={index} item xs={1} sm={6} style={{ display: showItemStatus(index, activeCarouselItem, previousData.length) ? 'block':'none'}}>
                      <Box my={2} className={classes.carouselActive} style={{ overflow: 'hidden', clear: 'both' }}>
                        <DropBoxHolder title={item?.title || collectionItems?.[0]} items={selectedItems?.data} accept={jobsDisplayList} titlePlaceholder={titlePlaceholder} onItemDropped={handleBoxesDrop} saveTitle={handleSaveTitle} />
                      </Box>
                    </Grid>
                  ) : (
                    <Grid key={index} item xs={1} sm={3} style={{ display: showItemStatus(index, activeCarouselItem, previousData.length) ? 'block':'none'}}>
                      <Box mt={6} mb={2} className={classes.carouselNormal} style={{ overflow: 'hidden', clear: 'both' }}>
                        <CollectionBox title={item?.title} items={item?.data} accept="" area="list-previous" />
                      </Box>
                    </Grid>
                  )
                ))}

                {selectedItems && activeCarouselItem === previousData?.length ? (
                  <Grid key={previousData?.length} item xs={1} sm={6} style={{ display: showItemStatus(previousData?.length, activeCarouselItem, previousData.length) ? 'block':'none'}}>
                    <Box my={2} className={classes.carouselActive} style={{ overflow: 'hidden', clear: 'both' }}>
                      <DropBoxHolder title={collectionItems?.[0]} items={selectedItems?.data} accept={jobsDisplayList} titlePlaceholder={titlePlaceholder} onItemDropped={handleBoxesDrop} saveTitle={handleSaveTitle} />
                    </Box>
                  </Grid>
                ) : (
                  <Grid key={previousData?.length} item xs={1} sm={3} style={{ display: showItemStatus(previousData?.length, activeCarouselItem, previousData.length) ? 'block':'none'}}>
                    <Box mt={6} mb={2} className={classes.carouselNormal} style={{ overflow: 'hidden', clear: 'both' }}>
                      <CollectionBox title="" items={[]} accept="" area="list-next" />
                    </Box>
                  </Grid>
                )}
                    
              </Grid>
              
            </Box>
          </Grid>

          <Grid item xs={1}>
            <Box width={1} height={1} onClick={handleNextItem}>
                <Box mt={18} width={1}>
                  <ButtonIcon icon="double_arrow" label="" classStyle={ disableNext ? classes.inActiveArrow : classes.activeArrow} />
                </Box>
            </Box>
          </Grid>

        </Grid>
      </Box>
      
    </Box>
  )
};

export default React.memo(Container);
