import { withUser } from "./withUser"

export type User = { email: string; name: string }

export type ProfileProps = { user: User; title: string }

function Profile({ user, title }: ProfileProps) {
    return (
        <p>
            {title} {user.name}
        </p>
    )
}

export const ProfileWithUser = withUser(Profile)