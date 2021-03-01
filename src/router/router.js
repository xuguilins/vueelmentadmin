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
            },
            {
                name: '学生管理',
                path: '/layout/student',
                meta: {
                    title: '学生管理'
                },
                component: () =>
                    import ('../views/studen.vue')
            },
            {
                name: '老师管理',
                path: '/layout/teacher',
                meta: {
                    title: '老师管理'
                },
                component: () =>
                    import ('../views/teacher.vue')
            }
        ]


    }]

})
NProgress.configure({
    easing: 'ease',
    speed: 500
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    document.title = to.meta.title
    next()
})
router.afterEach(action => {
    NProgress.done()
})
export default router