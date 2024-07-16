import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../components/ui/tooltip";

type DateDisplayProps = {
  relativeDate: string;
  formattedDate: string;
};
function DateDisplay(props: DateDisplayProps) {
  const { relativeDate, formattedDate } = props;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <p>{relativeDate}</p>
        </TooltipTrigger>
        <TooltipContent>
          <p>{formattedDate}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default DateDisplay;
