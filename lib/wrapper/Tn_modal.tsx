import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";

export default function TnModal({
  isOpen,
  handleClose,
  children,
  className,
}: {
  isOpen: boolean;
  handleClose?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose ? () => handleClose(false): ()=>null} >
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
}
