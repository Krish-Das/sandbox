import { ProfileWithUser as Profile } from "./hoc/Profile"

function Dashboard() {
    return <Profile title="Welcome" />
}
function Settings() {
    return <Profile title="Hi," />
}

function App() {
    return (
        <section className="max-w-xl mx-auto pt-5 space-y-2">
            <div className="flex gap-1 flex-col items-start [&_button]:px-2">
                <Dashboard />
                <Settings />
            </div>
        </section>
    )
}

export default App