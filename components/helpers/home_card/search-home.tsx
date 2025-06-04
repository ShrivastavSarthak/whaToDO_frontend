import { Button } from "@/components/ui/button";
import { Combobox } from "../combobox";


export default function SearchHome() {
    return (

        <div className="w-full h-[17.8rem] flex flex-col justify-between items-center py-4">
            <Combobox/>
            <Button className="w-full">Send Request</Button>
        </div>
    )
}