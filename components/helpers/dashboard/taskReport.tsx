import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TaskReport() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Recent Task</CardTitle>
          <Button>Create task</Button>
        </div>
      </CardHeader>
      <CardContent>
        {Array(5)
          .fill(0)
          .map((index) => (
            <div key={index} className="w-full rounded-md border-[1px] mb-2 p-2 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold">Task 1</h3>
                <p className="text-xs text-gray-500">Task description</p>
              </div>
              <Button>Edit</Button>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
