import clsx from "clsx";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isToday,
  startOfMonth,
} from "date-fns";

interface IEvent {
  date: Date;
  title: string;
}

interface ICalendarProps {
  events: IEvent[];
}

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Calendar = ({ events }: ICalendarProps) => {
  const currentDate = new Date();

  const firstDayOfMonth = startOfMonth(currentDate);

  const lastDayOfMonth = endOfMonth(currentDate);

  const startingDayIndex = getDay(firstDayOfMonth);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  return (
    <div className="container mx-auto p-12">
      <div className="mb-16">
        <h2 className="text-center text-3xl">
          {format(currentDate, "MMMM yyyy")}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map((day: string, index: number) => {
          return (
            <div
              key={index}
              className="font-bold text-center border py-6 rounded-lg"
            >
              {day}
            </div>
          );
        })}
        {Array.from({ length: startingDayIndex }).map((_, index: number) => {
          return (
            <div
              key={`empty-${index}`}
              className="font-bold text-center border py-6 rounded-lg"
            />
          );
        })}
        {daysInMonth.map((day: Date, index) => {
          return (
            <div
              key={index}
              className={clsx(
                `flex flex-col items-center justify-center  gap-y-2 border py-6 px-2 rounded-lg`,
                {
                  ["bg-gray-200 text-gray-900"]: isToday(day),
                }
              )}
            >
              <span className="font-bold">{format(day, "d")}</span>
              {events
                .filter((event) => isSameDay(event.date, day))
                .map((event) => {
                  return (
                    <div
                      className="bg-green-500 w-full text-center font-medium px-2 py-1 rounded-lg text-sm"
                      key={event.title}
                    >
                      {event.title}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
