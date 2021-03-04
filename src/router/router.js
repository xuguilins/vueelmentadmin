import {
    createRouter,
    createWebHistory
} from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import LayOut from '../views/layout.vue'
import store from '../store/index.js';
import mutationModel from "../store/mutationType";
const router = createRouter({
    history: createWebHistory(),
    routes: [{
            name: 'layout',
            path: '/',
            component: LayOut,
            redirect: '/login',
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
        },
        {
            name: 'login',
            path: '/login',
            meta: {
                title: '用户登录'
            },
            component: () =>
                import ('../views/login.vue')
        }

    ]

})
NProgress.configure({
    easing: 'ease',
    speed: 500
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    document.title = to.meta.title
    let json = {
        name: to.meta.title,
        path: to.path,
        isClose: true
    }
    if (to.meta.title !== '用户登录')
        store.dispatch(mutationModel.SET_TABPAGE, json)
    next()
})
router.afterEach(action => {
    NProgress.done()
})
export default router