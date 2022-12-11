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
        usernameOptions.push(<option value={usernames[i]}>{usernames[i]}</option>);
    }

    return <div><select name={props.name} onChange={props.onChange}>{usernameOptions}</select></div>;
}