import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import Message from '../Message/Message';
let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]); // Messages array
    const [message, setMessage] = useState(''); // Each individual message
    const ENDPOINT = 'localhost:5000';
    
    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        socket = io(ENDPOINT); //Modify this to change target server
        console.log('test');
        setName(name);
        setRoom(room);

        socket.emit('login', { name, room }, () => {
            //error
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    //sending message (sendMessage())
    const sendMessage = event => {
        event.preventDefault(); // Prevent a full refresh
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name}/>
                <Input message = {message} setMessage = {setMessage} sendMessage = {sendMessage} />
                {/*<input value = {message}
                onChange = {(event) => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />*/}
            </div>
        </div>
    );
}

export default Chat;