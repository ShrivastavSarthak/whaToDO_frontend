import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Streaks() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Streaks 🔥</CardTitle>
          <CardContent className="w-full  flex justify-between items-start mt-3 gap-3 ">
            <div className="p-2 w-full border-[1px] rounded-md mt-2 shadow-sm">
              <h6 className="font-semibold">Current Streaks</h6>
              <h2>20🔥</h2>
            </div>
            <div className=" p-2 w-full border-[1px] rounded-md mt-2 shadow-sm">
              <h6>Maximum Streaks</h6>
              <h2>200🔥</h2>
            </div>
          </CardContent>
        </CardHeader>
      </Card>   
    </>
  );
}
