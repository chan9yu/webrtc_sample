import EventEmitter from 'events';
import { io, type Socket } from 'socket.io-client';

enum SocketEvents {
	CONNECT = 'connect',
	CONNECTION_INIT = 'connection_init',
	CONNECTION_PREPARE = 'connection_prepare',
	CONNECTION_SIGNAL = 'connection_signal',
	CREATE_ROOM = 'create_room',
	JOIN_ROOM = 'join_room',
	ROOM_ID = 'room_id',
	ROOM_UPDATE = 'room_update',
	USER_DISCONNECTED = 'user_disconnected'
}

export enum SocketManagerEvents {
	ROOM_ID = 'ROOM_ID'
}

export class SocketManager extends EventEmitter {
	private socket: Socket;

	constructor(server: string) {
		super();
		this.initilize(server);
	}

	private initilize(server: string) {
		console.log('SocketManager create instance');
		this.socket = io(server, { transports: ['websocket'] });
		this.initSocketEvents();
	}

	private initSocketEvents() {
		this.socket.on(SocketEvents.CONNECT, () => {
			const data = { socketId: this.socket.id };
			console.log(`successfully connected with socket io server: ${JSON.stringify(data, null, 2)}`);
		});

		this.socket.on(SocketEvents.ROOM_ID, data => {
			const { roomId } = data;
			console.log(`<<< recv ${SocketEvents.ROOM_ID}: ${JSON.stringify(data, null, 2)}`);
			this.emit(SocketManagerEvents.ROOM_ID, { roomId });
		});
	}

	public sendCreateRoom(identity: string) {
		const data = { identity };
		console.log(`>>> send ${SocketEvents.CREATE_ROOM}: ${JSON.stringify(data, null, 2)}`);
		this.socket.emit(SocketEvents.CREATE_ROOM, data);
	}

	public sendJoinRoom(roomId: string, identity: string) {
		const data = { roomId, identity };
		console.log(`>>> send ${SocketEvents.JOIN_ROOM}: ${JSON.stringify(data, null, 2)}`);
		this.socket.emit(SocketEvents.JOIN_ROOM, data);
	}
}
