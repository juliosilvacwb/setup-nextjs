import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useTranslation } from 'react-i18next';
import CardList from './CardList';

function DisplayCardList({...props}) {

    const { t } = useTranslation();

    const page = props.page;
    const count = props.count;
    const list = props.list;
    const keys = props.keys;
    const actions = props.actions;
    const setPage = props.setPage;
    const setRowPerPag = props.setRowPerPag;
    const rowsPerPage = props.rowsPerPage;
    const rowsPerPageOptions = props.rowsPerPageOptions;

    const start = (page * rowsPerPage) + 1;
    const over = count % rowsPerPage;
    const numberPageForOver = over > 0 ? 1 : 0;
    const numberOfPage = (Math.floor(count / rowsPerPage)) + numberPageForOver;

    const end = () => {
        if (numberPageForOver === 0 || page !== (numberOfPage - 1)) {
            return (page + 1) * rowsPerPage;
        } else {
            return (page * rowsPerPage) + over;
        }
    };

    const thereAreMorePage = () => {
        return page < (numberOfPage - 1);
    };

    const handleChangeRowPerPage = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRowPerPag(event.target.value);
    };

    return (
        <div>
            {
                list.map((line: any, index: number) => {
                    return <CardList line={line} keys={keys} key={index} actions={actions} />;
                })
            }
            <div style={{width: '100%'}}>
                <div style={{float: 'left'}}>
                    <FormControl>
                        <InputLabel id='select-row-by-page'>{t('listDisplay.textLabels.pagination.rowsPerPageMobile')}</InputLabel>
                        <Select value={rowsPerPage} onChange={handleChangeRowPerPage} style={{width: '8em'}}>
                            {
                                rowsPerPageOptions.map((option: number) => <MenuItem value={option} key={option}>{option}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </div>
                <div style={{float: 'right'}}>
                    { `${start} - ${end()} ${t('listDisplay.textLabels.pagination.displayRows')} ${count}` }
                    <IconButton disabled={page === 0} onClick={() => {
                        setPage(page - 1);
                    }}>
                        <KeyboardArrowLeft />
                    </IconButton>
                    {' '}
                    <IconButton disabled={!thereAreMorePage()} onClick={() => {
                        setPage(page + 1);
                    }}>
                        <KeyboardArrowRight />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default DisplayCardList;
