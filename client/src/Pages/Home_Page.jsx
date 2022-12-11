import Add_pilot_role from "./Add_pilot_role"

const Home_Page = () => {
    return (
        <div className="App">
            <h1>Restaurant Manager</h1>
            <h2>Select Operation</h2>
            <a href="/add_pilot_role">
                <button>Add Pilot Role</button>
            </a>
        </div>
    )
}

export default Home_Page