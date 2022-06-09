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

// import useToggle from "./Toggle";

  /* // Start game
  const [isToggled, toggle] = useToggle(false);
  if (isToggled === true) {

    toggle(false);
  } 

  <button onClick={toggle} autoFocus >Start game</button>
  */