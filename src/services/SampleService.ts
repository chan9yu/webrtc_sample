import { RTCManager } from '../modules/RTCManager';
import { SocketManager, SocketManagerEvents } from '../modules/SocketManager';

export class SampleService {
	private static instance: SampleService;

	private rtcManager: RTCManager;
	private socketManager: SocketManager;
	private localStream: MediaStream | null = null;
	private remoteStream: MediaStream = new MediaStream();
	private roomId: string;

	get localMediaStream() {
		return this.localStream;
	}

	get remoteMediaStream() {
		return this.remoteStream;
	}

	get currentRoomId() {
		return this.roomId;
	}

	private constructor() {}

	private async startLocalVideoStream() {
		const constraints: MediaStreamConstraints = { video: true, audio: true };
		return await navigator.mediaDevices.getUserMedia(constraints);
	}

	private createPeer(stream: MediaStream) {
		this.rtcManager = new RTCManager();
		this.rtcManager.addTrack(stream);
	}

	private initSocketManagerEvent() {
		this.socketManager.addListener(SocketManagerEvents.ROOM_ID, data => {
			this.roomId = data.roomId;
		});
	}

	private startConnection() {
		this.socketManager = new SocketManager('http://localhost:8080');
		this.initSocketManagerEvent();
	}

	private async startProcess() {
		try {
			const stream = await this.startLocalVideoStream();
			this.localStream = stream;
			this.createPeer(stream);
			this.startConnection();
		} catch (error) {
			console.log(error);
		}
	}

	public static getInstance() {
		if (!SampleService.instance) {
			SampleService.instance = new SampleService();
		}

		return SampleService.instance;
	}

	public async createRoom(identity: string) {
		await this.startProcess();
		this.socketManager.sendCreateRoom(identity);
	}

	public async joinRoom(roomId: string, identity: string) {
		await this.startProcess();
		this.socketManager.sendJoinRoom(roomId, identity);
	}
}
