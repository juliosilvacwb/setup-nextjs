import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from '../../../utils/resize/resizeDetector';
import Utils from '../../../utils/utils';
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
    const { t } = useTranslation();

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

    let timeout = null;
    const search = !props.search ? null : (value: string) => {
        clearTimeout(timeout);

        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(() => {
            if (value) {
                props.search(value);
            }
        }, 1000);
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
        sortFilterList: props.sortFilterList ? props.sortFilterList : true,
        print: props.print ? props.print : true,
        download: props.download ? props.download : true,
        rowsPerPage: 10,
        rowsPerPageOptions,
        downloadOptions: {filename: (title ? `${ title.replace(/\s/g, '') }.csv` : `${t('listDisplay.tableDownload')}.csv`) , separator: ';'},
        customToolbarSelect,
        search: props.search ? true : false,
        onSearchChange: search,
        onChangePage: handleChangePage,
        onChangeRowsPerPage: handleChangeRowsPerPage,
        serverSide: true,
        textLabels: {
            body: {
              noMatch: t('listDisplay.textLabels.body.noMatch'),
              toolTip: t('listDisplay.textLabels.body.toolTip'),
              columnHeaderTooltip: (column) => `${t('listDisplay.textLabels.body.columnHeaderTooltip')} ${column.label}`
            },
            pagination: {
              next: t('listDisplay.textLabels.pagination.previous'),
              previous: t('listDisplay.textLabels.pagination.next'),
              rowsPerPage: t('listDisplay.textLabels.pagination.rowsPerPage'),
              displayRows: t('listDisplay.textLabels.pagination.displayRows'),
            },
            toolbar: {
              search: t('listDisplay.textLabels.toolbar.search'),
              downloadCsv: t('listDisplay.textLabels.toolbar.downloadCsv'),
              print: t('listDisplay.textLabels.toolbar.print'),
              viewColumns: t('listDisplay.textLabels.toolbar.viewColumns'),
              filterTable: t('listDisplay.textLabels.toolbar.filterTable'),
            },
            filter: {
              all: t('listDisplay.textLabels.filter.all'),
              title: t('listDisplay.textLabels.filter.title'),
              reset: t('listDisplay.textLabels.filter.reset'),
            },
            viewColumns: {
              title: t('listDisplay.textLabels.viewColumns.title'),
              titleAria: t('listDisplay.textLabels.viewColumns.titleAria'),
            },
            selectedRows: {
              text: t('listDisplay.textLabels.selectedRows.text'),
              delete: t('listDisplay.textLabels.selectedRows.delete'),
              deleteAria: t('listDisplay.textLabels.selectedRows.deleteAria'),
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
            rowsPerPageOptions={rowsPerPageOptions}
            search={search}
        />
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
