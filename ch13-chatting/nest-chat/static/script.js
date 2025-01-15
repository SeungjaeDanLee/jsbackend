// create socket.io instance
const socket = io('http://localhost:3000/chat');
// create namespace for chat room
const roomSocket = io('http://localhost:3000/room');
// Enter nickname
const nickname = prompt('Enter your nickname.')
// initail value of chat room
let currentRoom = '';

// Event for server connection
socket.on('connect', () => {
    console.log('connected');
});

// When the [Send] button is clicked,
// the entered text is sent as a message event.
function sendMessage() {
    // There is error, if no room was chosen.
    if (currentRoom === '') {
        alert('Please choose a room.');
        return;
    }

    const message = $('#message').val();
    const data = { message, nickname, room: currentRoom };
    // My message
    $('#chat').append(`<div>Me : ${message}</div>`);
    // Send a message with nickname
    // socket.emit('message', { message, nickname });

    // Send a message to RoomGateway
    roomSocket.emit('message', data);
    return false;
}

// Processing when a message event occurs on the server
socket.on('message', (message) => {
    $('#chat').append(`<div>${message}</div>`);
});

// Function executed when clicking the chat room creation button 
function createRoom() {
    const room = prompt('Please enter the name of the room to be created.')
    roomSocket.emit('createRoom', { room, nickname });
}

// Receive and process notice event
socket.on('notice', (data) => {
    $('#notice').append(`<div>${data.message}</div>`);
});


// Event used when having a conversation within a chat room
roomSocket.on('message', (data) => {
    console.log(data);
    $('#chat').append(`<div>${data.message}</div>`);
});

// Function to add a chat room on the client side
roomSocket.on("rooms", (data) => {
    console.log(data);
    // When updating a chat room, empty the list first.
    $('#rooms').empty();
    // Loop and add data given by the server
    data.forEach((room) => {
        $('#rooms').append(`<li>${room} <button onclick="joinRoom('${room}')">Join</button></li>`);
    });
});

// When entering a room, leave the existing room
function joinRoom(room) {
    // Generates server-side joinRoom event.
    roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
    // Deleting existing messages when moving to a chat room
    $('#chat').html('')
    // Change the value of the room you are currently in
    currentRoom = room;
}