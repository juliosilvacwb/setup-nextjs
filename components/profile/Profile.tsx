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
import DisplayList from '../common/listDisplay/DisplayList';

const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    },
  });

function Profile({...props}) {
    const { t } = useTranslation();
    const classes = useStyles(useTheme());

    const user: User = props.user;
    const list = [
        {id: 1, name: 'Jhon', fone: '987654321'},
        {id: 2, name: 'Mary', fone: '123456789'},
        {id: 3, name: 'Jack', fone: '456789123'},
        {id: 4, name: 'Steve', fone: '789123456'},
        {id: 5, name: 'Abbey', fone: '987654321'},
        {id: 6, name: 'Alaina', fone: '123456789'},
        {id: 7, name: 'Eagle', fone: '456789123'},
        {id: 8, name: 'Earl', fone: '789123456'},
        {id: 9, name: 'Tabby', fone: '987654321'},
        {id: 10, name: 'Qadir', fone: '123456789'},
        {id: 11, name: 'Naak', fone: '456789123'},
        {id: 12, name: 'Nabila', fone: '789123456'},
        {id: 13, name: 'Ian', fone: '987654321'},
        {id: 14, name: 'Daan', fone: '123456789'},
        {id: 15, name: 'Daan', fone: '123456789'},
        {id: 16, name: 'Daan', fone: '123456789'},
        {id: 17, name: 'Daan', fone: '123456789'},
        {id: 18, name: 'Daan', fone: '123456789'},
        {id: 19, name: 'Daan', fone: '123456789'},
        {id: 20, name: 'Daan', fone: '123456789'},
        {id: 20, name: 'Daan', fone: '123456789'},
    ];

    const actions = [
        { icon: <AddIcon />, label: 'Adicionar', action: (selectedIdRows: [], selectedObjects?: []) => { console.log(selectedIdRows); }},
        { icon: <DeleteIcon />, label: 'Deletar', action: (selectedIdRows: [], selectedObjects?: []) => { console.log(selectedIdRows); }}
    ];

    const hide = ['id'];

    const [displayList, setDisplayList] = React.useState<Array<any>>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
    const [page, setPage] = React.useState<number>(0);
    const count = 21;
    const sizes = [70, 30];

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
                        title={'Users'}
                        width={'100%'}
                        list={displayList}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        setRowsPerPage={setRowsPerPage}
                        setPage={setPage}numberOfPage
                        count={count}
                        sizes={sizes}
                        actions={actions}
                        hide={hide}/>
                }
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
