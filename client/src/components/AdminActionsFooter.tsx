import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminActionsFooterProps {
  approving: boolean;
  rejecting: boolean;
  onApprove: () => void;
  onReject: () => void;
}

export function AdminActionsFooter({ approving, rejecting, onApprove, onReject }: AdminActionsFooterProps) {
  const navigate = useNavigate();
  return (
    <Card className="p-6 bg-gradient-card shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold mb-2">Review Actions</h3>
          <p className="text-sm text-muted-foreground">
            Approve this article to publish it, or reject it to send feedback to the author.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin-dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button 
            variant="default" 
            onClick={onApprove}
            disabled={approving}
          >
            <Check className="h-4 w-4 mr-2" />
            {approving ? "Approving..." : "Approve Article"}
          </Button>
          <Button 
            variant="destructive" 
            onClick={onReject}
            disabled={rejecting}
          >
            <X className="h-4 w-4 mr-2" />
            {rejecting ? "Rejecting..." : "Reject Article"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
