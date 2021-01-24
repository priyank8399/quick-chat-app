import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        socket = io('localhost:3000'); //Modify this to change target server
        
        setName(name);
        setRoom(room);

        socket.emit('login', {name, room}, ({error}) => {
            alert(error);
        });
    }, [location.search]);

    return (
        <h1>Chat</h1>
    );
}

export default Chat;