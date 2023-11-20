import { useState } from "react";
import { PillButton } from "../components";

import "./filter.css";

interface FilterProps {
  onChange: (value: string) => void;
  onFilter: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({onChange, onFilter}) => {
  const [zero, setZero] = useState(true);
  const [activeFirst, setActiveFirst] = useState(false);
  const [activeSecond, setActiveSecond] = useState(false);
  const [activeThird, setActiveThird] = useState(false);

  return (
    <div className="filter-container">
      <input
        type="text"
        onChange={(event) => {
          onChange(event.target.value);
        }}
        placeholder="Search by title, genre or description"
      />
      {/* <div className="modal-button">
        How to seacrh?
        <div className="modal">
          <p>
            You can find your movie typing the name, genre or description of it.
            Remember, if you put something wrong, the result will be wrong
          </p>
        </div>
      </div> */}
      <PillButton
        title="All"
        isActive={zero}
        onClick={() => {
          setZero(true);
          setActiveFirst(false);
          setActiveSecond(false);
          setActiveThird(false);
          onFilter("all");
        }}
      />
      <PillButton
        title="Drama"
        isActive={activeFirst}
        onClick={() => {
          setZero(false);
          setActiveFirst(true);
          setActiveSecond(false);
          setActiveThird(false);
          onFilter("drama");
        }}
      />
      <PillButton
        title="Action"
        isActive={activeSecond}
        onClick={() => {
          setZero(false);
          setActiveFirst(false);
          setActiveSecond(true);
          setActiveThird(false);
          onFilter("action");
        }}
      />
      <PillButton
        title="Crime"
        isActive={activeThird}
        onClick={() => {
          setZero(false);
          setActiveFirst(false);
          setActiveSecond(false);
          setActiveThird(true);
          onFilter("crime");
        }}
      />
    </div>
  );
};

export default Filter;
