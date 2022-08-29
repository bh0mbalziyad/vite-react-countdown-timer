import { useState, useEffect } from "react";
import moment from "moment";
import Countdown from "./components/Countdown";

const App = () => {
  const [nowDate, setNowDate] = useState(moment());

  const [tillDate, setTillDate] = useState(
    nowDate.add(7, "days").utc().local().format("YYYY-MM-DD")
  );
  const [tillTime, setTillTime] = useState(
    nowDate.add(3, "hours").utc().local().format("HH:mm")
  );

  const [combinedDate, setCombinedDate] = useState();

  const [showCountdown, setShowCountdown] = useState(false);

  const timeFormat = "MM DD YYYY, h:mm a";

  const onDateChange = (event) => {
    setTillDate(event.target.value);
  };

  const onTimeChange = (event) => {
    setTillTime(event.target.value);
  };

  useEffect(() => {
    console.log(`${tillDate} ${tillTime}`);
  }, []);

  useEffect(() => {
    if (!combinedDate) return;

    setShowCountdown(true);
  }, [combinedDate]);

  const startCountdown = () => {
    if (!tillTime || !tillDate) {
      console.log("please fill");
      return;
    }

    const date = `${tillDate} ${tillTime}`;
    setCombinedDate(date);
  };

  return (
    <div className="bg-blue-400 min-h-screen flex flex-col">
      <div className="h-[200px]"></div>
      <p className="text-white text-center font-bold text-4xl select-none">
        When do you want to procrastinate till?
      </p>

      <div className="flex gap-8 mx-auto">
        <input
          className="flex items-center text-center w-[180px] self-center mt-8 p-4 caret-transparent rounded-md"
          type="date"
          name="till-date"
          id="till-date"
          onChange={onDateChange}
          defaultValue={tillDate}
          min={nowDate.format("YYYY-MM-DD")}
          max={nowDate.add(7, "days").format("YYYY-MM-DD")}
        />
        <input
          className="flex items-center text-center w-[180px] self-center mt-8 p-4 caret-transparent rounded-md"
          type="time"
          name="till-date"
          id="till-date"
          onChange={onTimeChange}
          defaultValue={tillTime}
          min={nowDate.utc().local().add("5", "minutes").format("HH:mm")}
        />
      </div>

      <button
        onClick={startCountdown}
        className="bg-blue-300 text-white w-fit mx-auto px-4 py-2 text-xl rounded-md mt-6 shadow transition-shadow duration-150 hover:shadow-lg"
      >
        Let's go
      </button>

      {showCountdown && (
        <Countdown timeFormat={timeFormat} timeTillDate={combinedDate} />
      )}
    </div>
  );
};

export default App;
