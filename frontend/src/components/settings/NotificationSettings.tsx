import { Bell } from "lucide-react";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  NOTIFICATION_CHANNEL_LABELS,
  NOTIFICATION_EVENT_LABELS,
  type NotificationChannel,
  type NotificationEvent,
  type NotificationPreferences,
} from "@/types/settings";

interface NotificationSettingsProps {
  value: NotificationPreferences;
  onChange: (next: NotificationPreferences) => void;
}

const EVENTS = Object.keys(NOTIFICATION_EVENT_LABELS) as NotificationEvent[];
const CHANNELS = Object.keys(NOTIFICATION_CHANNEL_LABELS) as NotificationChannel[];

export function NotificationSettings({ value, onChange }: NotificationSettingsProps) {
  const toggle = (event: NotificationEvent, channel: NotificationChannel) => {
    onChange({
      ...value,
      [event]: { ...value[event], [channel]: !value[event][channel] },
    });
  };

  return (
    <SettingsSection
      id="notifications"
      title="Notifications"
      description="Choose how you're notified for each type of event."
      icon={Bell}
    >
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-subtle-foreground">
                  Event
                </th>
                {CHANNELS.map((channel) => (
                  <th
                    key={channel}
                    className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-subtle-foreground"
                  >
                    {NOTIFICATION_CHANNEL_LABELS[channel]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EVENTS.map((event) => (
                <tr key={event} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {NOTIFICATION_EVENT_LABELS[event]}
                  </td>
                  {CHANNELS.map((channel) => (
                    <td key={channel} className="px-4 py-3 text-center">
                      <Switch
                        checked={value[event][channel]}
                        onCheckedChange={() => toggle(event, channel)}
                        aria-label={`${NOTIFICATION_CHANNEL_LABELS[channel]} notifications for ${NOTIFICATION_EVENT_LABELS[event]}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </SettingsSection>
  );
}
