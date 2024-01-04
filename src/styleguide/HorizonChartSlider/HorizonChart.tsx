import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { round } from 'utility/common';
import { useCallback } from 'react';

const useStyles = makeStyles({
  chart : {
      width: '100%',
  }
});

export type Props = {
    seriesData?: any;
}

const HorizonChart:React.FC<Props> = ({seriesData = {}}) => {
    const classes = useStyles();
    const [options, setOptions] = useState<any>(undefined);

    useEffect(() => {
        if(!seriesData) return;
        var defaultOptions = {
            title: {
                text: '',
                left: 0
            },
            tooltip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                bottom: 70,
                top: 0,
            },
            dataZoom: [{
                // type: 'inside',
            }, {
                type: 'slider',
            }],
            xAxis: {
                data: seriesData?.categoryData,
                silent: true,
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                // show: false,
            },
            yAxis: {
                splitArea: {
                    show: false
                },
                show: false,
            },
            series: [{
                type: 'bar',
                data: seriesData?.valueData,
                large: true
            }]
        };
        setOptions({
            ...defaultOptions,
        });
    }, [seriesData]);

    const datesList: any = seriesData?.categoryData;
    const datesLength: any = datesList?.length - 1;
    const [displayDate, setDisplayDate] = useState<any>({
        start: datesList?.[0],
        end: datesList?.[datesLength],
    });

    const onDataZoom = useCallback((data) => {
        const { start, end } =  data;
        const startCal: any = round(datesLength * (start / 100), 0);
        const startDate = datesList?.[startCal];
        const endCal: any = round(datesLength * (end / 100), 0);
        const endDate = datesList?.[parseFloat(endCal)];
        if (startDate === undefined || endDate === undefined) {
            return;
        }
        if (startDate !== '' || endDate !== '') {
            setDisplayDate({
                start: startDate,
                end: endDate,
            });
        }
        return;
    }, [datesList, datesLength, setDisplayDate]);

    return (
        <Box width={'100%'} height={1}>
            {options &&
                <Box className={classes.chart} position="relative">
                    <ReactECharts
                        option={options} 
                        onEvents= {{
                        'dataZoom': onDataZoom,
                        }}
                    />
                    <Box position="absolute">
                        <Box width={1} height={1} display="flex">
                            <Box id="chart_start_date" width={125} fontWeight="bold">{displayDate.start}</Box>
                            <Box id="chart_end_date" width={150} fontWeight="bold" textAlign="right">{displayDate.end}</Box>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    );
};

export default React.memo(HorizonChart);