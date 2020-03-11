import { Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Language from '@material-ui/icons/Language';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React from 'react';
import { useTranslation } from 'react-i18next';

function mobileMenu({...props}) {
    const { t } = useTranslation();

    return (
        <Menu
            anchorEl={props.mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={props.mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.isMobileMenuOpen}
            onClose={props.handleMobileMenuClose} >
            <MenuItem>
                <IconButton aria-label='show 4 new mails' color='inherit'>
                    <Badge badgeContent={4} color='error'>
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>{t('app_bar_icons.messages')}</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label='show 11 new notifications' color='inherit'>
                    <Badge badgeContent={11} color='error'>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>{t('app_bar_icons.notifications')}</p>
            </MenuItem>
            <MenuItem onClick={props.handleProfileMenuOpen}>
                <IconButton
                    aria-label='account of current user'
                    aria-controls='primary-search-account-menu'
                    aria-haspopup='true'
                    color='inherit'>
                    <AccountCircle />
                </IconButton>
                <p>{t('app_bar_icons.profile')}</p>
            </MenuItem>
            <MenuItem onClick={props.handleLanguageOpen}>
                <IconButton
                    aria-label='account of current user'
                    aria-controls='primary-search-account-menu'
                    aria-haspopup='true'
                    color='inherit'>
                    <Language />
                </IconButton>
                <p>{props.language.toUpperCase()}</p>
            </MenuItem>
        </Menu>
    );
}

export default mobileMenu;
