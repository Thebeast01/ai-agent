import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog title="New Agent" open={open} onOpenChange={onOpenChange} description="Create a new agent">
      <AgentForm onSuccess={() => onOpenChange(false)} onCancle={() => onOpenChange(false)} />
    </ResponsiveDialog>
  )
}
