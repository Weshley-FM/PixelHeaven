import PocketBase from 'pocketbase';

// Initialize the PocketBase client with the company's remote URL
const pb = new PocketBase('http://pb4.jobnation.id');

// Disable auto cancellation to prevent request cancellation errors in React Strict Mode
pb.autoCancellation(false);

export default pb;
