import * as im from 'immutable';
import User from '../../models/user.model';
import { AUTHENTICATE, DEAUTHENTICATE, RESTORE_AUTH_STATE } from '../actionsConstants';

const initialState = im.Map({user: new User()});

const authReducer = (state = im.Map(), action: any) => {
    switch (action.type) {
       case DEAUTHENTICATE:
           return state.merge({
               isLoggedIn: false
           });

       case AUTHENTICATE:
           const authObj = {
               isLoggedIn: true,
               user: action.payload
           };
           return state.merge(authObj);

       case RESTORE_AUTH_STATE:
           return state.merge({
               isLoggedIn: true,
               user: action.payload.user
           });

       default:
            return state.merge(initialState);
   }
};

export default authReducer;
