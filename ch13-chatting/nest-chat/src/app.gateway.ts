import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

// Decorator for WebSocket Server Setting
@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
    // Declare WebSocket server instance
    @WebSocketServer() server: Server;

    // Subscribe to message events
    @SubscribeMessage('message')
    handleMessage(socket: Socket, data: any): void {
        // // Send message to connected clients
        // this.server.emit('message', `client-${socket.id.substring(0, 4)} : ${data}`,);

        // Extract messages and nicknames from data
        const { message, nickname } = data;
        // Send a message with nickname
        socket.broadcast.emit('message', `${nickname}: ${message}`);
    }
}

// Gateway using the room namespace
@WebSocketGateway({ namespace: 'room' })
export class RoomGateway {

    constructor(private readonly chatGateway: ChatGateway) {}
    rooms = [];

    // Declare variables to access server instance
    @WebSocketServer()
    server: Server;

    // createRoom handler method
    @SubscribeMessage('createRoom')
    // recieve data without socket
    handleMessage(@MessageBody() data) {
        const { nickname, room } = data;
        // When creating a room,
        // an event is generated and sent to the client.
        this.chatGateway.server.emit('notice', {
            message: `${nickname} created new chat room, name : ${room}`,
        });

        // Add room from the data.
        this.rooms.push(room);
        // Send chat room list using rooms event.
        this.server.emit('rooms', this.rooms);
    }

    // Handler method executed when entering a room
    @SubscribeMessage('joinRoom')
    handleJoinRoom(socket: Socket, data) {
        const { nickname, room, toLeaveRoom } = data;
        // Leave an existing room first
        socket.leave(toLeaveRoom);
        // Notice event executed
        this.chatGateway.server.emit('notice', {
            message: `${nickname} entered ${room}`,
        });
        // Entering new room
        socket.join(room);
    }

    // Process when a message event comes to RoomGateway
    @SubscribeMessage('message')
    handleMessageToRoom(socket: Socket, data) {
        const { nickname, room, message } = data;
        console.log(data);
        // Send data to the other people
        socket.broadcast.to(room).emit('message', {
            message: `${nickname}: ${message}`,
        });
    }
}