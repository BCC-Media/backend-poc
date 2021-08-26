import { createRouter, createWebHistory } from 'vue-router'
import FrontPage from '/src/components/FrontPage.vue'
import MediaView from '/src/components/MediaView.vue'
const routes = [
    {
        path: '/',
        name: 'FrontPage',
        component: FrontPage,
    },
    {
        path: '/media/:id',
        name: 'Media',
        component: MediaView,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router