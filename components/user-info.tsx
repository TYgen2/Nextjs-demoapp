import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600]px mx-12 mt-4 shadow-md">
      <CardHeader>
        <p className="text-center text-2xl font-bold">{label}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded border p-3">
          <p className="max-w-[180px] truncate text-sm font-medium">ID</p>
          <p>{user?.id}</p>
        </div>

        <div className="flex flex-row items-center justify-between rounded border p-3">
          <p className="max-w-[180px] truncate text-sm font-medium">Name</p>
          <p>{user?.name}</p>
        </div>

        <div className="flex flex-row items-center justify-between rounded border p-3">
          <p className="max-w-[180px] truncate text-sm font-medium">Email</p>
          <p>{user?.email}</p>
        </div>

        <div className="flex flex-row items-center justify-between rounded border p-3">
          <p className="max-w-[180px] truncate text-sm font-medium">Role</p>
          <p>{user?.role}</p>
        </div>

        <div className="flex flex-row items-center justify-between rounded border p-3">
          <p className="max-w-[180px] truncate text-sm font-medium">
            Is 2FA Enabled
          </p>
          <p>{user?.isTwoFactorEnabled ? "ON" : "OFF"}</p>
        </div>
      </CardContent>
    </Card>
  );
};
