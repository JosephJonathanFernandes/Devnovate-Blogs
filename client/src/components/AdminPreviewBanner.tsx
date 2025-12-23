import { Button } from "../components/ui/button";
import { AlertCircle, ArrowLeft, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminPreviewBannerProps {
  approving: boolean;
  rejecting: boolean;
  onApprove: () => void;
  onReject: () => void;
}

export function AdminPreviewBanner({ approving, rejecting, onApprove, onReject }: AdminPreviewBannerProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-orange-100 dark:bg-orange-900/20 border-b border-orange-200 dark:border-orange-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
            <AlertCircle className="h-4 w-4" />
            <span className="font-medium">Admin Preview Mode</span>
            <span className="text-sm">This article is pending approval</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/admin-dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={onApprove}
              disabled={approving}
            >
              <Check className="h-4 w-4 mr-2" />
              {approving ? "Approving..." : "Approve"}
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onReject}
              disabled={rejecting}
            >
              <X className="h-4 w-4 mr-2" />
              {rejecting ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
