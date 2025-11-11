import { createRouter, createWebHistory } from 'vue-router'

const WorkspaceView = () => import('../views/WorkspaceView.vue')
const AboutView = () => import('../views/AboutView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/workspace'
    },
    {
      path: '/workspace',
      name: 'workspace',
      component: WorkspaceView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/workspace'
    }
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

export default router

