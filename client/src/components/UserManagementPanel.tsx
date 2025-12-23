import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Users } from "lucide-react";

export function UserManagementPanel() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Export Users
        </Button>
      </div>
      <Card className="p-6 bg-gradient-card shadow-soft">
        <div className="text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">User Administration</h3>
          <p className="text-muted-foreground">
            Manage user accounts, permissions, and moderation
          </p>
          <Button variant="outline" className="mt-4">
            View All Users
          </Button>
        </div>
      </Card>
    </>
  );
}
