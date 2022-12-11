import { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";

export function UsernameSelect(props) {
    const [usernames, setUsernames] = useState([]);
    const options = [];
    const getUsernames = () => {
        Axios.get("http://localhost:3001/getUsernames").then((response) => {
            setUsernames(response.data);
        });
    };

    useEffect(() => {
        getUsernames()
    }, []);

    const usernameOptions = [];
    for (let i = 0; i < usernames.length; i++) {
        usernameOptions.push(<option key={usernames[i]['username']} value={usernames[i]['username']}>{usernames[i]['name']}</option>);
    }

    return <div><select name={props.name} onChange={props.onChange}>{usernameOptions}</select></div>;
}

export function RestaurantSelect(props) {
    const [restaurants, setRestaurants] = useState([]);
    const options = [];
    const getRestaurants = () => {
        Axios.get("http://localhost:3001/getRestaurants").then((response) => {
            setRestaurants(response.data);
        });
    };

    useEffect(() => {
        getRestaurants()
    }, []);

    const restaurantOptions = [];
    for (let i = 0; i < restaurants.length; i++) {
        restaurantOptions.push(<option key={restaurants[i]} value={restaurants[i]}>{restaurants[i]}</option>);
    }

    return <div><select name={props.name} onChange={props.onChange}>{restaurantOptions}</select></div>;
}