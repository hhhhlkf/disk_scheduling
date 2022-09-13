import { createRouter, createWebHashHistory } from 'vue-router'
const main = () => import("@/pages/main.vue")
const lineChart = () => import("@/components/lineChart.vue");
const pineChart = () => import("@/components/pineChart.vue");

const routes = [{
    path: '/main',
    component: main,
    name: 'main',
    children: [
        { path: '/lineChart', name: 'lineChart', component: lineChart },
        { path: '/pineChart', name: 'pineChart', component: pineChart }
    ]
}]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})


export default router