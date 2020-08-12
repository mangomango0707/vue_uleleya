import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入vue组件
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Register from '../components/Register.vue'
import Manage from '../components/admin/Manage.vue'
import Users from '../components/admin/users/Users.vue'
import Articles from '../components/admin/articles/Articles.vue'
import AddArticles from '../components/admin/articles/AddArticles.vue'
import ArticlesHome from '../components/home/ArticlesHome.vue'
import ArticleDetail from '../components/home/ArticleDetail.vue'
import AboutUser from '../components/home/AboutUser.vue'
import AllArticles from '../components/home/AllArticles.vue'
import StaffArticles from '../components/home/StaffArticles.vue'
import StudyArticles from '../components/home/StudyArticles.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/home/login' },
    { path: '/home/login', component: Login },
    { path: '/home/register', component: Register },
    {
        path: '/admin/manage',
        component: Manage,
        children: [
            { path: '/admin/users', component: Users },
            { path: '/admin/articles', component: Articles },
            { path: '/admin/addArticles', component: AddArticles }
        ]
    },
    {
        path: '/home',
        component: Home,
        redirect: '/home/articlesHome',
        children: [
            { path: '/home/articlesHome', component: ArticlesHome },
            { path: '/home/articleDetail/:id', component: ArticleDetail },
            { path: '/home/allArticles', component: AllArticles },
            { path: '/home/aboutUser', component: AboutUser },
            { path: '/home/staffArticles', component: StaffArticles },
            { path: '/home/studyArticles', component: StudyArticles }
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router