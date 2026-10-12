import type { ComponentProps, ComponentType } from "react"

import type { User } from "./Profile"

export const fetchUser: () => User | undefined = () => ({
    email: "foo@bar.com",
    name: "Foo Bar",
})

type WithInjectedProps<T extends object> = <P extends object>(
    Component: ComponentType<P & T>,
) => ComponentType<Omit<P, keyof T>>

export const withUser: WithInjectedProps<{ user: User }> = (Component) => {
    const user = fetchUser()
    if (!user) throw new Error("Must pass user")

    return function WithUser(props) {
        return (
            <Component
                {...(props as ComponentProps<typeof Component>)}
                user={user}
            />
        )
    }
}