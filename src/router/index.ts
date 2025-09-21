import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../views/TasksPage.vue'),
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('../views/TimeLine.vue'),
  },
  {
    path: '/mindmap',
    name: 'Mindmap',
    component: () => import('../views/MindMap.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsPage.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
