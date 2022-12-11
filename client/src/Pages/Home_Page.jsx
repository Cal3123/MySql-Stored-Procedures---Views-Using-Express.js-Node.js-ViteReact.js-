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