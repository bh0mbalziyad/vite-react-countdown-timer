import moment from "moment";
import { useEffect, useState } from "react";
import SVGCircle from "./SVGCircle";

const Countdown = ({ timeTillDate }) => {
  const [days, setDays] = useState(30);
  const [hours, setHours] = useState(24);
  const [minutes, setMinutes] = useState(60);
  const [seconds, setSeconds] = useState(60);

  const mapNumbers = (number, in_min, in_max, out_min, out_max) => {
    return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const then = moment(timeTillDate);
      const now = moment();
      const countdown = moment(then - now);
      const days = countdown.format("D");
      const hours = countdown.format("HH");
      const minutes = countdown.format("mm");
      const seconds = countdown.format("ss");

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="mx-auto text-center mt-12">
      <div className="flex flex-wrap gap-6 text-white">
        <div className="w-[100px] h-[100px] relative flex flex-col justify-center font-bold text-3xl">
          {days}
          <span className="text-base font-thin">Days</span>
          <SVGCircle radius={mapNumbers(days, 0, 30, 0, 360)} />
        </div>
        <div className="w-[100px] h-[100px] relative flex flex-col justify-center font-bold text-3xl">
          {hours} <span className="text-base font-thin">Hours</span>
          <SVGCircle radius={mapNumbers(hours, 0, 24, 0, 360)} />
        </div>
        <div className="w-[100px] h-[100px] relative flex flex-col justify-center font-bold text-3xl">
          {minutes} <span className="text-base font-thin">Minutes</span>
          <SVGCircle radius={mapNumbers(minutes, 0, 60, 0, 360)} />
        </div>
        <div className="w-[100px] h-[100px] relative flex flex-col justify-center font-bold text-3xl">
          {seconds} <span className="text-base font-thin">Seconds</span>
          <SVGCircle radius={mapNumbers(seconds, 0, 60, 0, 360)} />
        </div>
      </div>
    </div>
  );
};

export default Countdown;
