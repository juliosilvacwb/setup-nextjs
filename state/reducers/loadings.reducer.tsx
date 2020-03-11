import * as im from 'immutable';
import { LOADING, LOADING_LOGIN } from '../actionsConstants';

const initialState = im.Map({ activeLoadings: 0, loadingLogin: false });

function loadingsReducer(state = im.Map(), action: any) {
    switch (action.type) {
        case LOADING:
            const activeLoadings = state.get('activeLoadings') + action.incrementLoading;
            return state.merge({ activeLoadings });
        case LOADING_LOGIN:
            return state.merge({ loadingLogin: action.loadingLogin });
        default:
            return state.merge(initialState);
    }
}

export default loadingsReducer;
