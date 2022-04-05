import "./DateSlider.css";

const DateSlider = ({ dates, active, setActive }: DateSliderProps) => {
  const datesLength = dates.length;
  const prevClickHandler = () => {
    setActive(active + 1);
  };
  const nextClickHandler = () => {
    setActive(active - 1);
  };

  return (
    <li key={dates[0]} className="date-slider">
      <span>date:</span>
      {active !== datesLength - 1 && (
        <span className="date-slider-arrow" onClick={prevClickHandler}>
          &#8678;
        </span>
      )}
      {dates[active]}
      {active !== 0 && (
        <span className="date-slider-arrow" onClick={nextClickHandler}>
          &#8680;
        </span>
      )}
    </li>
  );
};

interface DateSliderProps {
  dates: Array<string>;
  active: number;
  setActive: (index: number) => void;
}

export default DateSlider;
