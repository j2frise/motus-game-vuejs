// This file will be run before each test file
import { createPinia, setActivePinia } from 'pinia';
import { createApp } from 'vue';

import Fixtures from 'app/test/fixtures';
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from '@/router/routes';

const pinia = createPinia();
const app = createApp({});

app.use(pinia);
setActivePinia(pinia);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const fixtures = {
  ...Fixtures.fakeUsers,
};

const fakeResponses = Fixtures.fakeResponses;
export { app, pinia, fixtures, fakeResponses, router };
