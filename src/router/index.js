import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/home.vue'
import ClassifyView from '../views/classify/classify.vue'
import LoginView from '../views/login/login.vue'
import registerView from '../views/register/register.vue'
import detailView from '../views/detail/detail.vue'
import cartView from '../views/cart/cart.vue'
import adminView from '../views/admin/admin.vue'
import searchView from '../views/search/search.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/classify',
        name: 'classify',
        component: ClassifyView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        // from从哪里来 to到哪去 next放行
        beforeEnter: (to, from, next) => {
            // console.log(from, to);
            // next()
            // 拿到登录状态 路由首位
            const { islogin } = localStorage

            islogin ? next({ name: 'home' }) : next()

        }
    },
    {
        path: '/register',
        name: 'register',
        component: registerView,
        // from从哪里来 to到哪去 next放行
        beforeEnter: (to, from, next) => {
            // console.log(from, to);
            // next()
            // 拿到登录状态 路由首位
            const { islogin } = localStorage

            islogin ? next({ name: 'home' }) : next()

        }
    },
    {
        path: '/detail',
        name: 'detail',
        component: detailView
    },
    {
        path: '/cart',
        name: 'cart',
        component: cartView
    },
    {
        path: '/admin',
        name: 'admin',
        component: adminView
    },
    {
        path: '/search',
        name: 'search',
        component: searchView
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router