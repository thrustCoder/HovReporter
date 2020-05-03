import { bindActionCreators } from 'redux';

export const mapStateToPropsFn = (state) => {
    const { appState, navState } = state
    return { appState, navState }
};

export const getMapDispatchToPropsFn = (actions) => {
    const mapDispatchToPropsFn = dispatch => (
        bindActionCreators(actions, dispatch)
    );
    return mapDispatchToPropsFn;
}
