import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import useTheme from '@material-ui/styles/useTheme';
import { mdiAccountCardDetails } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { ADMIN, USER } from '../../models/roles.types';
import User from '../../models/user.model';
import DisplaySimpleList from '../common/listDisplay/DisplaySimpleList';

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
        {name: 'Jhon', fone: '987654321'},
        {name: 'Mary', fone: '123456789'},
        {name: 'Jack', fone: '456789123'},
        {name: 'Steve', fone: '789123456'},
        {name: 'Abbey', fone: '987654321'},
        {name: 'Alaina', fone: '123456789'},
        {name: 'Eagle', fone: '456789123'},
        {name: 'Earl', fone: '789123456'},
        {name: 'Tabby', fone: '987654321'},
        {name: 'Qadir', fone: '123456789'},
        {name: 'Naak', fone: '456789123'},
        {name: 'Nabila', fone: '789123456'},
        {name: 'Ian', fone: '987654321'},
        {name: 'Daan', fone: '123456789'},
    ];

    const [displayList, setDisplayList] = React.useState<Array<any>>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
    const [page, setPage] = React.useState<number>(0);
    const count = 14;
    const sizes = [70, 30];

    React.useEffect(() => {
        if (rowsPerPage  > 10) {
            setDisplayList(list);
        }
        if (page === 0 && rowsPerPage  === 10) {
            setDisplayList(list.splice(0, 9));
        }
        if (page === 1 && rowsPerPage  === 10) {
            setDisplayList(list.splice(10, 13));
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
                    <DisplaySimpleList
                        width={'100%'}
                        list={displayList}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        setRowsPerPage={setRowsPerPage}
                        setPage={setPage}
                        count={count}
                        sizes={sizes}/>
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
