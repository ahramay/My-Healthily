import React, { useCallback, useMemo, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import FormLabel from 'styleguide/form/Text/FormLabel';

import { Palette } from 'utility/Colors/Palette';
import { sortRecords } from 'utility/common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pointer: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: Palette.Grey.RowLightBg,
        }
    },
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
    list: any;
	selected?: any;
    limit?: number;
    sortOrder?: string;
    onChange?: (result: any | null) => void;
}

const ChoiceGroup:React.FC<Props> = ({
    title,
    list,
	selected,
    limit=0,
    sortOrder='DESC',
    bottomBorder=true,
    onChange,
}) => {
    const classes = useStyles();
    const [limitRecords, setLimitRecords] = useState<number>(limit);
    const [checkedList, setCheckedList] = useState<any>({});
    const [activeItems, setActiveItems] = useState<String[]>([]);

    const getCheckedStatus = ((value: string) => {
        const inputValue = checkedList?.[value];
        return inputValue ? inputValue : false;
    });

	useMemo(() => {
		if (!selected) {
            return;
        }
        let r:any = {};

		for (let i = 0; i < selected.length; i += 1) { // a list of selected IDs may be supplied
			let s = selected[i];
			r[s] = true;
		}
		setCheckedList(r);
	}, [selected]);

    const handleSelection = useCallback((value: string) => {
        const currentValue = checkedList?.[value];
        const newValue:boolean = currentValue ? currentValue : false;
        const result = {
            ...checkedList,
            [value] : !newValue
        };

        setCheckedList(result);
        const resultKeys = Object.keys(result);
        let activeItems = [];
        for (let item of resultKeys){
            if(result?.[item]) {
                activeItems.push(item);
            }
        }
        setActiveItems(activeItems);
        onChange?.(activeItems);
    }, [checkedList, onChange]);

    const displayStatus = (index: number, limit: number) => {
        if (limit === 0) {
            return 'flex';
        } else {
            return index > (limit-1) ? 'none' : 'flex';
        }
    }

    const handleShowAll = useCallback(() => {
        setLimitRecords(list ? list.length : 0);
    }, [list]);

    const handleShowLess = useCallback(() => {
        setLimitRecords(limit);
    }, [limit]);

    const handleResetSelections = useCallback(() => {
        setCheckedList({});
        setActiveItems([]);
        onChange?.([]);
    }, [onChange]);

    const remainingCount = list?.length - limit;
    const showMore = (limit > 0) ? (list?.length > limitRecords) : false;
    
    const filteredData = useMemo(() => {
        let recordsList = list;
        let sortedResult = sortRecords(recordsList, 'count', 'number', sortOrder);
        if (showMore) {
            let checked: any = [];
            let unChecked: any = [];
            for(let item of list) {
                const index = activeItems.findIndex(child => child === item.value);
                if (index === -1) {
                    unChecked.push(item);
                } else {
                    checked.push(item);
                }
            }
            let finalResult: any = [];
            if(checked?.length > 0) {
                const sortChecked: any = sortRecords(checked, 'count', 'number', sortOrder);
                finalResult = finalResult.concat(sortChecked);
            }
            if(checked?.length > 0) {
                const sortUnChecked = sortRecords(unChecked, 'count', 'number', sortOrder);
                finalResult = finalResult.concat(sortUnChecked);
            }
            return finalResult?.length > 0 ? finalResult : sortedResult;
        } else {
            return sortedResult;
        }
    }, [list, sortOrder, showMore, activeItems]);

    return (
		<FormLabel label={title}>
            <Box width={1} pb={1} className={bottomBorder ? classes.borderBox : ''}>
				<Box width={1} height={1}>
					{filteredData?.map((row: any, index: number) => (
						<Box display={displayStatus(index, limitRecords)} width={1} height={1} p={0} key={index} onClick={() => handleSelection(row.value)} className={classes.pointer}>
							<Box width="12%" p={0} m={0} flexShrink={1}>
								<Checkbox
									checked={getCheckedStatus(row.value)}
									color="primary"
									inputProps={{ 'aria-label': row.value }}
								/>
							</Box>
							<Box p={1} width="60%" flexShrink={1}><Typography variant="body1" component="span">{row.label}</Typography></Box>
							<Box py={1} width="23%" flexShrink={1} textAlign="right"><Typography variant="body1" component="span">{row.count}</Typography></Box>
						</Box>
					))}
				</Box>
				{remainingCount && remainingCount > 0 && 
					<Box display="flex" color={Palette.deepBlue.Dark} py={1} onClick={showMore ? handleShowAll : handleShowLess} className={classes.pointer}>
						<Box pl={1}><Icon color="inherit">{showMore ? 'add':'remove'}</Icon></Box>
						<Box pl={0}><Typography variant="body1" component="span">{showMore ? `${remainingCount} more` : `show less`}</Typography></Box>
					</Box>
				}
				{(activeItems?.length > 0) && 
					<Box display="flex" color={Palette.deepBlue.Dark} py={1} onClick={handleResetSelections} className={classes.pointer}>
						<Box pl={1}><Icon color="inherit">clear</Icon></Box>
						<Box pl={0.1}><Typography variant="body1" component="span">reset</Typography></Box>
					</Box>
				}
            </Box>
		</FormLabel>
    )
};
export default React.memo(ChoiceGroup);