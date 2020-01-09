import { Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import { useWindowSize } from '../../../utils/resize/resizeDetector';
import Utils from '../../../utils/utils';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: { marginBottom: '1em', color: '#333' },
    })
);

/**
 *
 * @param title optional title component for display
 * @param sizes optional list of number percent width for table
 * @param width size of width for this
 * @param list objects for display
 * @param rowsPerPage number of rows for this
 * @param page number of page
 * @param count total number of items
 * @param setRowsPerPage
 * @param setPage
 */
function DisplaySimpleList({ ...props }) {
    const classes = useStyles(useTheme());
    const size = useWindowSize();

    const width = props.width;
    const title = props.title;
    const list = props.list;

    const firstObject = props.list[0];
    const keys = Object.keys(firstObject);
    const numberColumn = keys.length;
    let sizeColumns = 100 / numberColumn;
    let sizes: number[];
    if (props.sizes && props.sizes.length === keys.length) {
        sizes = props.sizes;
    }

    const handleChangePage = (event: unknown, newPage: number) => {
      props.setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setRowsPerPage(+event.target.value);
      props.setPage(0);
    };

    return (
        size.width > 600 ?
        <div style={{ width: `${width}` }}>
            {title && <div className={classes.title}>{title}</div>}
            <Paper style={{ width: `${width}` }}>
                <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        {
                            keys.map((key: string, index: number) => {

                            if (sizes) {
                                sizeColumns = sizes[index];
                            }

                            return <TableCell key={index} align={'inherit'} style={{ width: `${sizeColumns}%` }} >
                                {Utils.firstUppercase(key)}
                            </TableCell>;
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                       list.map((line: any, index: number) => {
                            return (<TableRow hover role='checkbox' tabIndex={-1} key={index}>
                                {
                                    keys.map((key: string, i: number) => {

                                        if (sizes) {
                                            sizeColumns = sizes[i];
                                        }

                                        return <TableCell key={i} align={'inherit'} style={{ width: `${sizeColumns}%` }}>
                                            {line[key]}
                                        </TableCell>;
                                    })
                                }
                            </TableRow>);
                        })
                    }
                </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component='div'
                    count={props.count}
                    rowsPerPage={props.rowsPerPage}
                    page={props.page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

        </ div> :
        <div>
            {
                list.map((line: any, index: number) => {
                    return (
                    <Card key={index} style={{marginBottom: '1em'}}>
                        <CardContent>
                            {
                                keys.map((key: string, i: number) => {

                                    return (
                                        <div key={i}>
                                            <Typography variant='subtitle2'>
                                                {Utils.firstUppercase(key)}
                                            </Typography>
                                            <Typography variant='subtitle1'  color='textSecondary'>
                                                {line[key]}
                                            </Typography>
                                        </div>
                                    );
                                })
                            }
                        </CardContent>
                  </Card>);
                })
            }
        </div>
    );
}

DisplaySimpleList.propTypes = {
    width: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    setRowsPerPage: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired
};

export default DisplaySimpleList;
