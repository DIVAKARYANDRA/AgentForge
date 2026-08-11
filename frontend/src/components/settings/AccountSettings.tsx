import { UserCircle } from "lucide-react";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { AccountInfo } from "@/types/settings";

interface AccountSettingsProps {
  account: AccountInfo;
}

export function AccountSettings({ account }: AccountSettingsProps) {
  const fields: { label: string; value: string }[] = [
    { label: "Role", value: account.role },
    { label: "Organization", value: account.organization },
    { label: "Workspace ID", value: account.workspaceId },
    { label: "Member Since", value: account.memberSince },
  ];

  return (
    <SettingsSection
      id="account"
      title="Account"
      description="Your profile within this workspace."
      icon={UserCircle}
    >
      <Card className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarFallback className="text-base">{account.avatarInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-medium text-foreground">{account.name}</p>
            <p className="text-sm text-muted-foreground">{account.email}</p>
          </div>
        </div>

        <Separator />

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-4">
          {fields.map((field) => (
            <div key={field.label}>
              <dt className="text-xs text-subtle-foreground">{field.label}</dt>
              <dd className="mt-0.5 font-medium text-foreground">{field.value}</dd>
            </div>
          ))}
        </dl>

        <Separator />

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
          <Button variant="outline" size="sm">
            Change Password
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Export Data
          </Button>
        </div>
      </Card>
    </SettingsSection>
  );
}
