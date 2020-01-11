import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React from 'react';
import { useWindowSize } from '../../../utils/resize/resizeDetector';
import Utils from '../../../utils/utils';
import CardList from './CardList';
import CustomToolbarSelect from './CustomToolbarSelect';
import DisplayCardList from './DisplayCardList';

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
function DisplayList({ ...props }) {
    const size = useWindowSize();
    const width = props.width;
    const title = props.title;
    const hide = props.hide ? props.hide : [];
    const keys = Object.keys(props.list[0]).filter((key: string) => !hide.includes(key));

    function getSelected(selectedRows: any) {
        const keysSelected = Object.keys(selectedRows.lookup);
        return keysSelected.map((key: any) => props.list[key]);
    }

    function getSelectedIdsRows(selectedRows: any) {
        return Object.keys(selectedRows.lookup);
    }

    const columns = keys.map((key: string) => Utils.firstUppercase(key));
    const data = props.list.map((obj: any) => keys.map((key: string) => obj[key]));

    const customToolbarSelect = (props.actions  && props.actions.length > 0)
        ? (selectedRows: any) =>
            <CustomToolbarSelect
                actions={props.actions}
                selected={getSelected(selectedRows)}
                selectedIdsRows={getSelectedIdsRows(selectedRows)}/>
        : () => <></>;

    const handleChangePage = (newPage: number) => {
        props.setPage(newPage);
    };

    const handleChangeRowsPerPage = (numberOfRows: number) => {
        props.setRowsPerPage(numberOfRows);
        props.setPage(0);
    };

    const rowsPerPageOptions = [10, 25, 50, 100];

    const options: any = {
        filterType: props.filterType ? props.filterType : 'textField',
        selectableRows: props.selectableRows ? props.selectableRows : 'multiple',
        page: props.page,
        count: props.count,
        sort: props.sort ? props.sort : true,
        filter: props.filter ? props.filter : true,
        search: props.search ? props.search : true,
        sortFilterList: props.sortFilterList ? props.sortFilterList : true,
        print: props.print ? props.print : true,
        download: props.download ? props.download : true,
        rowsPerPage: 10,
        rowsPerPageOptions,
        downloadOptions: {filename: (title ? `${ title.replace(/\s/g, '') }.csv` : 'tableDownload.csv') , separator: ';'},
        customToolbarSelect,
        onChangePage: handleChangePage,
        onChangeRowsPerPage: handleChangeRowsPerPage,
        serverSide: true,
        textLabels: {
            body: {
              noMatch: 'Sorry, no matching records found',
              toolTip: 'Sort',
              columnHeaderTooltip: (column) => `Sort for ${column.label}`
            },
            pagination: {
              next: 'Next Page',
              previous: 'Previous Page',
              rowsPerPage: 'Rows per page:',
              displayRows: 'of',
            },
            toolbar: {
              search: 'Search',
              downloadCsv: 'Download CSV',
              print: 'Print',
              viewColumns: 'View Columns',
              filterTable: 'Filter Table',
            },
            filter: {
              all: 'All',
              title: 'FILTERS',
              reset: 'RESET',
            },
            viewColumns: {
              title: 'Show Columns',
              titleAria: 'Show/Hide Table Columns',
            },
            selectedRows: {
              text: 'row(s) selected',
              delete: 'Delete',
              deleteAria: 'Delete Selected Rows',
            },
          }
    };

    if (props.customSearch ) {
        options.customSearch = props.customSearch;
    }

    if (props.customSort ) {
        options.customSort = props.customSort;
    }

    return (
        size.width > 600 ?
        <div style={{ width: `${width}` }}>
            <MUIDataTable
                title={title}
                data={data}
                columns={columns}
                options={options}
            />
        </ div>
        :
        <DisplayCardList page={props.page}
            count={props.count}
            list={props.list}
            keys={keys}
            actions={props.actions}
            setPage={handleChangePage}
            setRowPerPag={handleChangeRowsPerPage}
            rowsPerPage={props.rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}/>
    );
}

DisplayList.propTypes = {
    width: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    setRowsPerPage: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired
};

export default DisplayList;
