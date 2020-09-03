import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Details from '../views/Details.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/details/:id',
        name: 'details',
        component: Details
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router
