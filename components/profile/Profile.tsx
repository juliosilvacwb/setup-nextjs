import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import useTheme from '@material-ui/styles/useTheme';
import { mdiAccountCardDetails } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { ADMIN, USER } from '../../models/roles.types';
import User from '../../models/user.model';
import ZAutocomplete, { AutocompleteOption } from '../common/autocomplete/zautocomplete';
import ZDropzone from '../common/dropzone/ZDropzone';
import ZInputDate from '../common/input.date/ZInputDate';
import ZInputMoney from '../common/input.money/ZInputMoney';
import ZInput from '../common/input/ZInput';
import DisplayList from '../common/listDisplay/DisplayList';
import ZTextarea from '../common/textarea/ZTextarea';

const useStyles = makeStyles({
    card: {
      width: '100%',
    },
  });

function Profile({...props}) {
    const { t } = useTranslation();
    const classes = useStyles(useTheme());

    const user: User = props.user;
    const list = [
        {id: 1, name: 'Jhon', phone: '987654321'},
        {id: 2, name: 'Mary', phone: '123456789'},
        {id: 3, name: 'Jack', phone: '456789123'},
        {id: 4, name: 'Steve', phone: '789123456'},
        {id: 5, name: 'Abbey', phone: '987654321'},
        {id: 6, name: 'Alaina', phone: '123456789'},
        {id: 7, name: 'Eagle', phone: '456789123'},
        {id: 8, name: 'Earl', phone: '789123456'},
        {id: 9, name: 'Tabby', phone: '987654321'},
        {id: 10, name: 'Qadir', phone: '123456789'},
        {id: 11, name: 'Naak', phone: '456789123'},
        {id: 12, name: 'Nabila', phone: '789123456'},
        {id: 13, name: 'Ian', phone: '987654321'},
        {id: 14, name: 'Daan', phone: '123456789'},
        {id: 15, name: 'Daan', phone: '123456789'},
        {id: 16, name: 'Daan', phone: '123456789'},
        {id: 17, name: 'Daan', phone: '123456789'},
        {id: 18, name: 'Daan', phone: '123456789'},
        {id: 19, name: 'Daan', phone: '123456789'},
        {id: 20, name: 'Daan', phone: '123456789'},
        {id: 20, name: 'Daan', phone: '123456789'},
    ];

    const headers = [t('name'), t('phone')];

    const actions = [
        { icon: <AddIcon />, label: t('add'), action: (selectedIdRows: [], selectedObjects?: []) => { alert(selectedIdRows); } },
        { icon: <DeleteIcon />, label: t('delete'), action: (selectedIdRows: [], selectedObjects?: []) => { alert(selectedIdRows); } }
    ];

    const hide = ['id'];

    const [displayList, setDisplayList] = React.useState<Array<any>>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
    const [page, setPage] = React.useState<number>(0);
    const count = 21;
    const sizes = [70, 30];
    const search = (value: string) => { alert(value); };

    const autocompleteProps = {
        options: [
          { value: 'SINGLE', label: t('enums.typeTransaction.SINGLE') },
          { value: 'RECURRING', label: t('enums.typeTransaction.RECURRING') },
          { value: 'TRANSFER', label: t('enums.category.TRANSFER') },
        ],
        getOptionLabel: (option: AutocompleteOption) => option.label
      };

    const [textarea, setTextarea] = useState(undefined);

    React.useEffect(() => {
        if (rowsPerPage  > 20) {
            setDisplayList(list);
        }
        if (page === 0 && rowsPerPage  === 10) {
            setDisplayList(list.splice(0, 10));
        }
        if (page === 1 && rowsPerPage  === 10) {
            setDisplayList(list.splice(10, 21));
        }
        if (page === 2 && rowsPerPage  === 10) {
            setDisplayList(list.splice(20, 31));
        }
    }, [page, rowsPerPage]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={3}>
                <Card className={classes.card} style={{float: 'left'}}>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2' >
                            <Icon path={mdiAccountCardDetails} title='User Profile' size={1} color='grey'/>
                        </Typography>
                        <Typography gutterBottom variant='h5' component='h2' >
                            {t('profile.profile')}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            {t('profile.user')}{user.name}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            {t('profile.email')} {user.email}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size='small' color='primary' disabled={!user.containsRole(USER)}>
                            {t('profile.activeUser')}
                        </Button>
                        <Button size='small' color='primary' disabled={!user.containsRole(ADMIN)}>
                            {t('profile.activeAdmin')}
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
                {
                    displayList.length &&
                    <DisplayList
                        title={t('users')}
                        width={'100%'}
                        list={displayList}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        setRowsPerPage={setRowsPerPage}
                        setPage={setPage}numberOfPage
                        count={count}
                        sizes={sizes}
                        actions={actions}
                        hide={hide}
                        search={search}
                        headers={headers}
                    />
                }
            </Grid>

            <Grid item xs={3}>
                <ZInputDate locale={props.locale} invalidDateMessage={t('invalidDateMessage')} onChange={(value: string) => console.log(value)} />
            </Grid>
            <Grid item xs={3}>
                <ZInputMoney currencySimbol={t('currencySimbol')} onChange={(value: string) => console.log(value)} />
            </Grid>
            <Grid item xs={3}>
                <ZInput onChange={(value: string) => console.log(value)} />
            </Grid>
            <Grid item xs={3}>
                <ZAutocomplete autocompleteProps={autocompleteProps} onChange={(value: string) => console.log(value)} />
            </Grid>
            <Grid item xs={12}>
                <ZDropzone files={[]} />
            </Grid>
            <Grid item xs={12}>
                <ZTextarea value={textarea} onChange={(value: string) => setTextarea(value)} placeholder={'entre com o texto'} label={'Texto area'} />
            </Grid>

        </Grid>
    );
}

function mapStateToProps(state: any) {
    const user: User = state.get('authReducer').toJS().user;
    const activeLoadings: number = state.get('loadingsReducer').toJS().activeLoadings;
    return { user, activeLoadings };
}

export default connect(mapStateToProps)(Profile);
