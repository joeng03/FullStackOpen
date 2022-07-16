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
          className="view py-1 px-2 rounded-full bg-teal-400/75"
          style={hideWhenVisible}
          onClick={toggleVisibility}
        >
          {openButtonLabel ? openButtonLabel : "View"}
        </button>
      </div>
      <div className="togglableContent" style={showWhenVisible}>
        <button
          className="hide py-1 px-2 rounded-full bg-teal-400"
          onClick={toggleVisibility}
        >
          {closeButtonLabel ? closeButtonLabel : "Hide"}
        </button>
        {children}
      </div>
    </>
  );
};

export default Togglable;
