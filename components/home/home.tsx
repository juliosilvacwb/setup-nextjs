import { Button, Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import User from '../../models/user.model';
import { loadingsAction } from '../../state/actions/loadings';
import { messagesAction } from '../../state/actions/messages.action';
import MessageBuilder from '../common/message/model/builders/MessageBuilder';
import Profile from '../profile/Profile';

function Home({...props}) {
    const { t } = useTranslation();

    return (
        <>
          <div style={{width: '100%', marginBottom: '1em'}}>
            <Button onClick={() => {props.loadMessage(); }}  variant='contained' color='primary' style={{marginRight: '1em'}}>
                { t('showMessage') }
            </Button>
            <Button onClick={() => { props.incrementLoading(); }} variant='contained' color='secondary'>
                { t('showLoading') }
            </Button>
          </div>
          <Profile />
        </>
    );
}

function mapStateToProps(state: any) {
    const user: User = state.get('authReducer').toJS().user;
    return { user };
  }

function mapDispatchToProps(dispatch: any) {
    return {
        loadMessage: () => {
            dispatch(() => { dispatch(
                messagesAction([
                    MessageBuilder.builder()
                        .setVariant('warning')
                        .setSecondsTimeout(3)
                        .setMessage('Mensagem de teste')
                        .build()
                ])
            ); });
        },
        incrementLoading: () => {
          dispatch(() => {
            dispatch(loadingsAction(1));
            setTimeout(() => {
              dispatch(loadingsAction(-1));
            }, 3000);
          });
        },
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
