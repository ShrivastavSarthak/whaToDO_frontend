import { BarChartComponent } from "@/components/helpers/dashboard/barGraph";
import Streaks from "@/components/helpers/dashboard/streaks";
import TaskReport from "@/components/helpers/dashboard/taskReport";

export default function Dashboard() {
  return (
    <>
      <div className=" w-full grid gap-3 mt-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-2">
        <div>
          <BarChartComponent />
        </div>
        <TaskReport/>
      </div>
      <div className=" w-full grid gap-3 mt-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-2">
        <Streaks/>
      </div>
    </>
  );
}
