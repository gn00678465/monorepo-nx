import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminLayout from '../app/AdminLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AdminLayout,
      children: [
        {
          name: 'about-1',
          path: '',
          component: () => import('../views/AboutView.vue')
        }
      ]
    }
  ]
});

export default router;
