import {
  GoTriangleLeft as Prev,
  GoTriangleRight as Next,
} from "react-icons/go";

const Controls = ({ goNext, goPrevious }) => {
  return (
    <div className="controls">
      <button id="prevBtn" className="controlBtn btn" onClick={goPrevious}>
        <Prev></Prev>
      </button>
      <button id="nextBtn" className="controlBtn btn" onClick={goNext}>
        <Next></Next>
      </button>
    </div>
  );
};

export default Controls;
