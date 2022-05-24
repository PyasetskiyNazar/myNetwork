import { actions } from '../reducers/dialogsReducer'
import Dialogs from './../components/Dialogs/Dialogs';
import { connect } from 'react-redux'
import withAuthNavigate from './../components/HOC/withAuthNavigate';
import { compose } from 'redux';
import { AppStateType } from '../redux-store/redux-store';


const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsMessages
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        { handleAddNewMessage: actions.actionAddMessage }),
    withAuthNavigate
)(Dialogs)
