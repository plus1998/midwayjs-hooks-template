import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';

const routes: any = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '', redirect: '/home/user' },
      { path: 'user', component: () => import('./pages/Home/User.vue') },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
