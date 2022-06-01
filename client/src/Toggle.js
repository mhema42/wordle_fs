import React from "react";

const useToggle = (initialState) => {
const [isToggled, setIsToggled] = React.useState(initialState);
const toggle = React.useCallback(
    () => setIsToggled(state => !state),
    [setIsToggled],
);

return [isToggled, toggle];
};

export default useToggle;