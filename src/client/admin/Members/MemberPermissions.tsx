import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Palette } from 'utility/Colors/Palette';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { subscriptionTypes } from 'staticData/usersList';
import { caseFormat } from 'utility/common';

const useStyles = makeStyles({
  childTable: {
    border: `solid 1px ${Palette.Grey.Light}`,
    boxShadow: 'none',
    backgroundColor: `${Palette.Base.White}`,
  }
});

export type Props = {
    row?: any;
}
const MemberPermissions: React.FC<Props> = ({
    row,
}) => {
    const classes = useStyles();
    const [memberSelections, setMemberSelections] = useState<any>(null);

    const handleMemberAllowance = useCallback((data: any, event: React.SyntheticEvent) => {
        if (!event) return;
        const title = caseFormat(data[1], 'lower');
        const currentValue: boolean = memberSelections?.[`user_${data[0]}`]?.[`${title}`];
        let result = {
            ...memberSelections,
            [`user_${data[0]}`] : {
                [`${title}`]: !currentValue,
            }
        };
        setMemberSelections(result);
    }, [memberSelections]);

    const getMemberSelectionValues = (id: any, title: any) => {
        const currentValue = memberSelections?.[`user_${id}`]?.[`${title}`];
        return currentValue;
    }

    return (
        <TableContainer className={classes.childTable}>
            <Table aria-label="users_data table">
                <TableHead>
                    <TableRow>
                    {subscriptionTypes.map((childRow: any, childRowKey: number) =>
                        <TableCell key={childRowKey} align="left"><b>{childRow}</b></TableCell>
                    )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    {subscriptionTypes.map((childRow: any, childRowKey: number) => 
                        <TableCell key={childRowKey} align="left">
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={getMemberSelectionValues(row.id, childRow)}
                                    onChange={(e) => handleMemberAllowance([row.id, childRow], e)}
                                    name="agreed"
                                    color="primary"
                                />
                                }
                                label=""
                            />
                        </TableCell>
                    )}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default React.memo(MemberPermissions);