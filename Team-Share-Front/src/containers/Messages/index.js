// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import ParticipationMessage from 'src/components/Messages/ParticipationMessage';
import { acceptRequest } from '../../store/reducer';



/* === State (donnÃ©es) === */
const mapStateToProps = (state) => ({
    token: state.token,
    requestId: state.requestId,
});

/* === Actions === */
const mapDispatchToProps = (dispatch) => ({
    sendRequestId: (id) => {
      const action = changeRequestId(id);
      dispatch(action);
    },
    sendAcceptRequest: (id) => {
      const action = acceptRequest(id);
      dispatch(action);
    },
    sendDeclineRequest: () => {
      const action = declineRequest();
      dispatch(action);
    }
});


// Container
const ParticipationMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ParticipationMessage);

// == Export
export default ParticipationMessageContainer;

