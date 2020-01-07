import Router from 'next/router';
import MessageBuilder from '../components/common/message/model/builders/MessageBuilder';
import CompanyBuilder from '../models/builders/CompanyBuilder';
import RoleBuilder from '../models/builders/RoleBuilder';
import UserBuilder from '../models/builders/UserBuilder';
import { SALES_AND_MARKETING } from '../models/modules.type';
import { USER } from '../models/roles.types';
import User from '../models/user.model';
import { authenticateAction, deAuthenticateAction } from '../state/actions/authAction';
import { loadingsAction, loadingsLogin } from '../state/actions/loadings';
import { messagesAction } from '../state/actions/messages.action';
import { removeCookie, setCookie } from '../utils/cookie';
import CustomFetch from './custom.fetch';

export default class UserService {

    public static login(username: string, password: string, rememberme: boolean, redirect: string) {
        return (dispatch: any) => {

            dispatch(loadingsLogin(true));
            CustomFetch.get(`/users/${username}`).then((githubuser: any) => {

                const company = CompanyBuilder.builder().setId(1).setName(githubuser.company).build();

                const user: User = UserBuilder.builder()
                .setId(1)
                .setName(githubuser.name)
                .setEmail(username)
                .setImage(githubuser.avatar_url)
                .addRole(USER)
                .addModule(SALES_AND_MARKETING)
                .setCompany(company)
                .setToken(btoa(githubuser.node_id)).build();

                setCookie('user', btoa(JSON.stringify(user)), rememberme);
                setCookie('token', user.token, rememberme);
                window.localStorage.removeItem('logout');
                dispatch(authenticateAction(user));

                if (redirect) {
                    Router.push(redirect);
                }
                Router.push('/index');

                // waiting two seconds during redirect, then close login load, but if redirected, login load will not be displayed
                setTimeout(() => {dispatch(loadingsLogin(false)); }, 2000);
            })
            .catch((error: Error) => {
                dispatch(loadingsLogin(false));
                dispatch(
                    messagesAction([
                        MessageBuilder.builder()
                            .setVariant('error')
                            .setMessage('Invalid login')
                            .build()
                    ])
                );
            });
        };
    }

    public static logout() {
        return (dispatch: any) => {
            removeCookie('user');
            removeCookie('token');

            if (window) {
                window.localStorage.setItem('logout', Date.now().toString());
            }

            dispatch(deAuthenticateAction());
            Router.push('/login');
        };
    }

    public static loadUser(user: User) {
        return (dispatch: any) => {
            dispatch(authenticateAction(user));
        };
    }
}
