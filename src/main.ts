import { SampleService } from './services/SampleService';
import './styles/style.css';

const serviceInstance = SampleService.getInstance();
serviceInstance.startProcess();

const videoContainerElement = document.getElementById('video-container');
videoContainerElement?.appendChild(serviceInstance.localVideoElement);
