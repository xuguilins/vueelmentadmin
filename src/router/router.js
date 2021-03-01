import {
    createRouter,
    createWebHistory
} from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import LayOut from '../views/layout.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [{
        name: 'layout',
        path: '/',
        component: LayOut,
        redirect: '/layout/home',
        children: [{
            name: 'home',
            path: '/layout/home',
            meta: {
                title: '首页'
            },
            component: () =>
                import ('../views/home.vue')
        }]


    }]

})
NProgress.configure({
    easing: 'ease',
    speed: 500
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})
router.afterEach(action => {
    NProgress.done()
})
export default router