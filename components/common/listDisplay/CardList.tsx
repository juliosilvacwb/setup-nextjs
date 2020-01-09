import { Card, CardContent, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTheme } from '@material-ui/styles';
import React from 'react';
import Utils from '../../../utils/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    moreActions: {
        float: 'right',
        padding: 0,
        margin: 0,
    },
  }),
);

function CardList({...props}) {

    const classes = useStyles(useTheme());
    const hide = props.hide ? props.hide : [];

    const [anchorMoreActionEl, setAnchorMoreActionEl] = React.useState<null | HTMLElement>(null);
    const isMoreActionOpen = Boolean(anchorMoreActionEl);
    function handleMoreActionOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorMoreActionEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorMoreActionEl(null);
    }

    return (
        <>
            <Card style={{marginBottom: '1em'}}>
                <CardContent>
                    {
                        (props.actions && props.actions.length) &&
                        <IconButton aria-label='settings' className={classes.moreActions} onClick={handleMoreActionOpen}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    {
                        props.keys.map((key: string, i: number) => {
                            if (hide.includes(key)) {
                                return '';
                            } else {
                                return (
                                    <div key={i}>
                                        <Typography variant='subtitle2'>
                                            {Utils.firstUppercase(key)}
                                        </Typography>
                                        <Typography variant='subtitle1'  color='textSecondary'>
                                            {props.line[key]}
                                        </Typography>
                                    </div>
                                );
                            }
                        })
                    }
                </CardContent>
            </Card>
            <Menu
                anchorEl={anchorMoreActionEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={'more-action-menu'}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMoreActionOpen}
                onClose={handleMenuClose} >
                    {
                        props.actions.map((action: any, index: number) =>
                            <MenuItem onClick={ () => {action.action(props.line); } } key={index}>{ action.icon }{' '}{ action.label }</MenuItem>)
                    }
            </Menu>
        </>
    );
}

export default CardList;
