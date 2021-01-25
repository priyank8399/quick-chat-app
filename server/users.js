const users = [];

const addUser = ({ id, name, room}) => {
    //if username has spaces/uppercase, remove space and convert to lowercase
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //Check for duplicate users
    const existingUser = users.find((user) => user.room === room && user.name ===name);
    
    if(existingUser){
        return {error: 'This username is already taken, please change your name.'};
    }

    const user = { id, name, room };
    users.push(user);
    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex((user => user.id === id));

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    return users.find(user => user.id === id);
}

const getUsersInRoom = (room) => {
    return users.filter(user => user.room === room);
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom};