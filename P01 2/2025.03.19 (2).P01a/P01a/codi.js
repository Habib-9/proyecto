import { App } from './src/App.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Game initialized successfully.');
  Vue.createApp(App).mount('#app');
  console.log('Vue.js App initialized successfully.');
});
