import { createRouter, createWebHashHistory } from 'vue-router';
import routes from '@/router/routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
