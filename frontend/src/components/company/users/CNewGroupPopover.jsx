import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Info, X } from "lucide-react";

const CNewGroupPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="pl-4 text-muted-foreground">
          <Info size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 max-h-44 p-2">
        <ScrollArea className="h-80">
          <div className="grid gap-4">
            <div className="grid gap-2 text-xs tracking-wider text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum a
              rerum illo. Ut quisquam maiores tenetur eum architecto. Illum esse
              deleniti sequi alias possimus, mollitia laudantium pariatur
              delectus eos sunt maxime saepe, repellat nam modi ducimus
            </div>
            <button type="button" className="bg-primary">
              Add group
            </button>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
export default CNewGroupPopover;
