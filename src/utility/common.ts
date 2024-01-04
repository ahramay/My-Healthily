export const round = (n: number, places: number) => {
  const rounded = parseFloat(n.toFixed(places));
  return isNaN(rounded) ? undefined : rounded;
};

export const calculateStaticValues = (numb1: number, numb2: number) => {
	if(numb2 > 0) {
        return round((numb1 + numb2), 2);
    } else {
        return round((numb1), 2)
    }
}

export const removeIndex = (data: any = [], indexNumber: number) => {
    let newData = data;
    if (!newData[indexNumber]) return data;
    newData.splice(indexNumber, 1);
    return newData;
}

export const hasRecord = (data: any=[]) => {
    return Boolean(data[0]);
}

export const filterMapRecords = (fieldValue: string = '', data: any = [], searchValue: string = '', searchType: string = 'filter', inputType: string = 'string') => {
    const lowercasedFilter = (inputType === 'int') ? parseInt(fieldValue) : fieldValue.toLowerCase();
    let filteredData;
    if (searchType === 'exact') {
        filteredData = data?.filter((item: any) => {
            const term = (inputType === 'int') ? item?.[searchValue] : item?.[searchValue]?.toLowerCase();
            return term === lowercasedFilter;
        });
    } else {
        filteredData = data?.filter((item: any) => {
            const term = (inputType === 'int') ? item?.[searchValue] : item?.[searchValue]?.toLowerCase();
            return term.indexOf(lowercasedFilter) !== -1;
        });
    }
    return filteredData;
}

export const setOptionLabel = (options: any = [], value: string = '', label:string = '') => {
    return options[parseInt(value)]?.[label] || '';
}

export const caseFormat = (value: string, format: string) => {
    switch(format) {
        case 'lower':
            return value.toLowerCase();
        case 'upper':
            return value.toUpperCase();
        case 'title':
            return value.replace(/\w\S*/g, (txt) => {
                  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        default:
            return value;
    }
}

export const createOptionsList = (data: any, options: String[], defaultOptions: String[]) => {
    let list = [];
    if (defaultOptions?.length > 0) {
        list.push({
            label: `${defaultOptions?.[0]}`, value: `${defaultOptions?.[1]}`
        });
    }
    for(let item of data) {
        list.push({
            label: `${item?.[`${options?.[0]}`]}`, value: `${item?.[`${options?.[1]}`]}`
        });
    }
    return list;
}

export const sortRecords = (data: String[] = [], columnName: string, type: string='', orderType='DESC') => {
    let items = data;
    if (type === 'number') {
        items?.sort(function (a: any, b: any) {
            let fieldOne:any = parseFloat(a?.[columnName]);
            let fieldTwo:any = parseFloat(b?.[columnName]);
            if (orderType === 'ASC') {
                fieldOne = parseFloat(b?.[columnName]);
                fieldTwo = parseFloat(a?.[columnName]);
            }
            return fieldTwo - fieldOne;
        });
    }

    if (type === 'alphabetic') {
        items?.sort(function(a: any, b: any) {
            let fieldOne = a?.[columnName].toLowerCase();
            let fieldTwo = b?.[columnName].toLowerCase();
            if (orderType === 'ASC') {
                fieldOne = b?.[columnName].toLowerCase();
                fieldTwo = a?.[columnName].toLowerCase();
            }
            if (fieldOne < fieldTwo) {
                return -1;
            }
            if (fieldOne > fieldTwo) {
                return 1;
            }
            return 0;
        });
    }
    return items;
}

export const hasWhiteSpace = (value: string) => {
  return value.indexOf(' ') >= 0;
}

export const replaceSpaces: any = (value: string) => {
    if (hasWhiteSpace(value)) {
        const initialValue: string = value?.replace(/\s+/g, '-');
        return replaceSpaces(initialValue).toString();
    } 
    return value;
}

export const trimCodeByLength = (value: string, digits: number=4) => {
    return  value.substring(0, digits);
}

export const randomCodeByLength = (value: string, digits: number=4, code='RAND') => {
    const newValue = replaceSpaces(value);
    return (code + trimCodeByLength(newValue, digits)).toUpperCase();
}

export const convertToCode = (value: string) => {
    const newValue = value.replace(" ", "-");
    return replaceSpaces(newValue).toUpperCase();
}

export const removeSpaces: any = (value: string) => {
    if (hasWhiteSpace(value)) {
        const initialValue: string = value?.replace(/\s+/g, '');
        return removeSpaces(initialValue).toString();
    } 
    return value;
}

export const findIndex = (data: String[], value: string) => {
    const indexValue = data.findIndex(item => item === value);
    if(indexValue >= -1) {
        return value;
    }
    return null;
}

export const filterUniqueRecords = (data: any, columnName: string) => {
    const list = data?.map((item: any) => {
        return item?.[columnName];
    });
    return list.sort().filter((item: any, i: any, a: any) => { return i===a.indexOf(item) });
}

export const filterUniqueMapRecords = (data: any, columnName: string) => {
    const finalList: any = [];
    data.forEach((dataItem: any) => {
        const dataValue = dataItem?.[columnName];
        const optionIndex = finalList?.findIndex((item: any) => item?.label === dataValue);
        if(optionIndex === -1) {
            finalList.push({
                value: dataValue,
                label: dataValue,
            });
        }
    });
    return finalList;
}

export const searchRecords = (data: any, columnName: string, search: string) => {
    return data?.filter((dataItem: any) => dataItem?.[columnName] === search);
}

export const createOptionValuePairs = (data: any, labelRef: string, valueRef: string) => {
    return data.map((item: any) => {
        const label = item?.[labelRef];
        const value = valueRef === '' ? label : item?.[valueRef];
        return { value, label };
    });
}

export const createMultipleOptionPairs = (data: any, compareData: any) => {
    const statesList = data?.map(
        (item: any) => {
            const getLabel = searchRecords(compareData, 'value', item.label)?.[0]?.label || item.label;
            return { value: item.value, label: getLabel }
        }
    );
    return statesList;
};

export const copyObject = (o: any) => {
	return JSON.parse(JSON.stringify(o));
}