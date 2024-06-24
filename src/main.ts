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

const handleCreateRoomSubmit = (e: SubmitEvent) => {
	e.preventDefault();
	const formData = new FormData(createRoomForm);
	const userId = formData.get('userId');
	if (!userId) return;
	sampleInstance.createRoom(String(userId));
	welcomeContainer.style.display = 'none';
	videoroomContainer.style.display = '';
};

const handleJoinRoomSubmit = (e: SubmitEvent) => {
	e.preventDefault();
	const formData = new FormData(joinRoomForm);
	const roomId = formData.get('roomId');
	const userId = formData.get('userId');
	if (!roomId || !userId) return;
	sampleInstance.joinRoom(String(roomId), String(userId));
	welcomeContainer.style.display = 'none';
	videoroomContainer.style.display = '';
};

createRoomForm.addEventListener('submit', handleCreateRoomSubmit);
joinRoomForm.addEventListener('submit', handleJoinRoomSubmit);

// videoroom
const roomIdLabel = document.getElementById('room-id-label') as HTMLHeadingElement;
roomIdLabel.innerText = sampleInstance.currentRoomId;
console.log('### sampleInstance.currentRoomId', sampleInstance.currentRoomId);
