import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';
import App from '@/App.vue';
import router from '@/router';
import { useDarkModeStore } from '@/stores/darkMode';
import '@/css/main.scss';

// Init Pinia
const pinia = createPinia();

// Create Vue app
createApp(App).use(router).use(pinia).mount('#app');

// Dark mode
// Uncomment, if you'd like to restore persisted darkMode setting, or use `prefers-color-scheme: dark`. Make sure to uncomment localStorage block in src/stores/darkMode.js

const darkModeStore = useDarkModeStore(pinia);

darkModeStore.checkMode();

// Default title tag
const defaultDocumentTitle = 'Test Technique VueJS';

// Set document title from route meta
router.afterEach((to: RouteLocationNormalized) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
