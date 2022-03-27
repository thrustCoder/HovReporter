import viewNames from "../../ViewNames"

export const clearAllStateFn = (props) => {
    props.clearAllState();
    props.navigation.popToTop();
}
