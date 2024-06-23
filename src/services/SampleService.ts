import default_avatar_img from '../assets/images/avatar.jpg';
import { RTCManager } from '../modules/RTCManager';
import { SocketManager } from '../modules/SocketManager';

export class SampleService {
	private static instance: SampleService;

	private rtcManager: RTCManager;
	private socketManager: SocketManager;
	private localVideo = document.createElement('video');
	private remoteVideo = document.createElement('video');

	get localVideoElement() {
		return this.localVideo;
	}

	get remoteVideoElement() {
		return this.remoteVideo;
	}

	private constructor() {
		this.initVideo();
	}

	private initVideo() {
		this.localVideo.muted = true;
		this.localVideo.autoplay = true;
		this.localVideo.playsInline = true;
		this.localVideo.poster = default_avatar_img;
	}

	private async startLocalVideoStream() {
		const constraints: MediaStreamConstraints = {
			video: {
				width: { ideal: 640 },
				height: { ideal: 360 }
			},
			audio: true
		};

		return await navigator.mediaDevices.getUserMedia(constraints);
	}

	private createPeer(stream: MediaStream) {
		this.rtcManager = new RTCManager();
		this.rtcManager.addTrack(stream);
	}

	private startConnection() {
		this.socketManager = new SocketManager('http://localhost:8080');
	}

	public static getInstance() {
		if (!SampleService.instance) {
			SampleService.instance = new SampleService();
		}

		return SampleService.instance;
	}

	public async startProcess() {
		try {
			const stream = await this.startLocalVideoStream();
			this.localVideo.srcObject = stream;
			this.createPeer(stream);
			this.startConnection();
		} catch (error) {
			console.log(error);
		}
	}

	public createRoom(userId: string) {
		console.log('### createRoom: ', userId);
	}

	public joinRoom(roomId: number, userId: string) {
		console.log('### joinRoom', roomId);
		console.log('### joinRoom', userId);
	}
}
