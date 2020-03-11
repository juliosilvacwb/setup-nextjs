import * as im from 'immutable';
import { MESSAGES } from '../actionsConstants';

const initialState = im.fromJS({ messages: [] });

function messagesReducer(state = im.Map(), action: any) {
  switch (action.type) {
    case MESSAGES:
      return state.merge({ messages: action.messages });
    default:
      return state.merge(initialState);
  }
}

export default messagesReducer;
