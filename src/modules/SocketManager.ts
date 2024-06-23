import { io, type Socket } from 'socket.io-client';

export class SocketManager {
	private socket: Socket;

	constructor(server: string) {
		this.initilize(server);
	}

	private initilize(server: string) {
		console.log('SocketManager create instance');
		this.socket = io(server, { transports: ['websocket'] });
		this.initSocketEvents();
	}

	private initSocketEvents() {}
}
