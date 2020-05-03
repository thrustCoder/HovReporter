import viewNames from "../../ViewNames"

export const getNextStepFn = (props, terminalState) => {
    let currentNavIndex = props.navState.navSequence.lastIndexOf(terminalState);
    let i = currentNavIndex;
    let nextState;

    do {
        i = (i + 1) % 4;
        nextState = props.navState[props.navState.navSequence[i]];
    } while (nextState.completed === true && props.navState.navSequence[i] !== terminalState);

    if (props.navState.navSequence[i] === terminalState) {
        return viewNames.DolPreCheck;
    }

    return props.navState.navSequence[i];
}

export const clearAllStateFn = (props) => {
    props.clearAllState();
    props.navigation.popToTop();
}
