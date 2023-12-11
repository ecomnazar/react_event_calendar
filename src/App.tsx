import { subDays } from "date-fns"
import Calendar from "./components/Calendar"

function App() {
  return (
    <>
      <Calendar events={[
        { date: subDays(new Date(), 6), title: "Finish project eventually." },
        { date: subDays(new Date(), 1), title: "Refactor my luck" },
        { date: subDays(new Date(), 4), title: "Upgrade sleep function" },
      ]} />
    </>
  )
}

export default App
