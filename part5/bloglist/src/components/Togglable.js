import { useState } from "react";

const Togglable = ({ openButtonLabel, closeButtonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div>
        <button
          className="view"
          style={hideWhenVisible}
          onClick={toggleVisibility}
        >
          {openButtonLabel}
        </button>
      </div>
      <div className="togglableContent" style={showWhenVisible}>
        <button className="hide" onClick={toggleVisibility}>
          {closeButtonLabel}
        </button>
        {children}
      </div>
    </>
  );
};

export default Togglable;
