import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
  triggerText?: string;
  boldText?: string;
  open?: boolean;
}

const Collapse: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  triggerText,
  boldText,
  open,
}) => {
  const [isOpen, setIsOpen] = useState(open ? open : false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTransitionEnd = (event: React.TransitionEvent<SVGSVGElement>) => {
    if (event.propertyName === "transform") {
      event.currentTarget.classList.remove("spin");
    }
  };

  const trigger = (
    <div
      className="collapsible-trigger"
      onClick={isOpen ? handleClose : handleOpen}
    >
      {triggerText ? <p>{triggerText}</p> : <h4>{boldText}</h4>}
      <div
        className={`trigger_icon ${isOpen ? "open" : ""}`}
        onClick={isOpen ? handleClose : handleOpen}
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          className={isOpen ? "spin" : ""}
          onTransitionEnd={handleTransitionEnd}
        />
      </div>
    </div>
  );

  return (
    <Collapsible open={isOpen} transitionTime={100} trigger={trigger}>
      {children}
    </Collapsible>
  );
};

export default Collapse;
