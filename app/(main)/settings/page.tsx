"use client"

import { useCurrentUser } from "@/hooks/use-current-user"

const SettingPage = () => {
    const user = useCurrentUser();
    return (
        <div>{JSON.stringify(user)}</div>
    )
}

export default SettingPage