import { SampleService } from './services/SampleService';
import './styles/global.css';

// init
const sampleInstance = SampleService.getInstance();
const welcomeContainer = document.getElementById('welcome-container') as HTMLDivElement;
const videoroomContainer = document.getElementById('videoroom-container') as HTMLDivElement;
videoroomContainer.style.display = 'none';

// welcome
const createRoomForm = document.getElementById('create-room-form') as HTMLFormElement;
const joinRoomForm = document.getElementById('join-room-form') as HTMLFormElement;

createRoomForm.addEventListener('submit', (e: SubmitEvent) => {
	e.preventDefault();
	const formData = new FormData(createRoomForm);
	const userId = formData.get('userId');
	if (!userId) return;
	sampleInstance.createRoom(String(userId));
});

joinRoomForm.addEventListener('submit', e => {
	e.preventDefault();

	const formData = new FormData(joinRoomForm);
	const roomId = formData.get('roomId');
	const userId = formData.get('userId');
	if (!roomId || !userId) return;
	if (isNaN(Number(roomId))) return;
	sampleInstance.joinRoom(Number(roomId), String(userId));
});
