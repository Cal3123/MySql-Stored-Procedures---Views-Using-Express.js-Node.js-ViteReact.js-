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
            {"path": "/start_funding", "text": "Start Funding"},
            {"path": "/add_owner", "text": "Add Owner"}
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