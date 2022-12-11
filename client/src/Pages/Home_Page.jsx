const Home_Page = () => {
    function Item(props) {
        return <div>
            <a href={props.path}>
                <button>{props.text}</button>
            </a>
        </div>
    }

    function Items() {
        const items = [
            {"path": "/add_drone", "text": "Add Drone"},
            {"path": "/add_employee", "text": "Add Employee"},
            {"path": "/add_ingredient", "text": "Add Ingredient"},
            {"path": "/add_location", "text": "Add Location"},
            {"path": "/add_owner", "text": "Add Owner"},
            {"path": "/add_pilot_role", "text": "Add Pilot Role"},
            {"path": "/add_restaurant", "text": "Add Restaurant"},
            {"path": "/add_service", "text": "Add Delivery Service"},
            {"path": "/add_worker_role", "text": "Add Worker Role"},
            {"path": "/display_employee_view", "text": "Display Employee View"},
            {"path": "/display_location_view", "text": "Display Location View"},
            {"path": "/display_ingredient_view", "text": "Display Ingredient View"},
            {"path": "/display_owner_view ", "text": "Display_owner_view "},
            {"path": "/display_pilot_view", "text": "Display_pilot_view"},
            {"path": "/display_service_view", "text": "Display_service_view"},
            {"path": "/fire_employee", "text": "Fire_employee"},
            {"path": "/fly_drone ", "text": "Fly_drone "},
            {"path": "/hire_employee", "text": "Hire_employee"},
            {"path": "/join_swarm", "text": "Join_swarm"},
            {"path": "/leave_swarm", "text": "Leave_swarm"},
            {"path": "/load_drone", "text": "Load_drone"},
            {"path": "/manage_service", "text": "Manage_service"},
            {"path": "/purchase_ingredient", "text": "Purchase_ingredient"},
            {"path": "/refuel_drone", "text": "Refuel_drone"},
            {"path": "/remove_drone", "text": "Remove_drone"},
            {"path": "/remove_ingredient", "text": "Remove_ingredient"},
            {"path": "/remove_pilot_role", "text": "Remove_pilot_role"},
            {"path": "/start_funding", "text": "Start Funding"}
        ];

        const itemObjects = [];
        for (let i = 0; i < items.length; i++) {
            itemObjects.push(<Item path={items[i]["path"]} text={items[i]["text"]} key={items[i]["path"]} />)
        }

        return itemObjects;
    }

    return (
        <div className="App">
            <h1>Restaurant Manager</h1>
            <h2>Select Operation</h2>
            <Items />
        </div>
    )
}

export default Home_Page