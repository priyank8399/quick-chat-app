import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        socket = io(ENDPOINT); //Modify this to change target server
        console.log('test');
        setName(name);
        setRoom(room);

        socket.emit('login', { name, room }, (error) => {
            if(error){
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    return (
        <h1>Chat</h1>
    );
}

export default Chat;