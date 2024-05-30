import type { RouteRecordRaw } from 'vue-router';
import routeNames from '@/router/routerNames';

export interface Meta {
  /**
   * @description The previous page from which the user had browse to the current page.
   */
  section?: string;
}

declare module 'vue-router' {
  interface RouteMeta extends Meta {
    transition?: {
      enterActiveClass: string;
      leaveActiveClass: string;
    };
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/PageLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.HOME.name,
        component: () => import('@/pages/home/HomeResumePage.vue'),
      },
    ],
  },
  {
    path: '/error',
    component: () => import('@/layouts/ErrorLayout.vue'),
    children: [
      {
        name: routeNames.ERROR404.name,
        path: '404',
        component: () => import('@/pages/anonymous/AnonymousNotFoundPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: (): {
      path: string;
    } => {
      return { path: '/error/404' };
    },
  },
];

export default routes;
