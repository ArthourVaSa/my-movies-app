import * as React from "react";

import "./pill-buttton.css";

interface PillButtonProps {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

const PillButton: React.FC<PillButtonProps> = ({ title, isActive = false, onClick = () => {} }) => {

  return (
    <button
      className={`${isActive ? "active" : "pill-button"}`}
      onClick={() => {
        onClick();
      }}
    >
      {title}
    </button>
  );
};

export default PillButton;
