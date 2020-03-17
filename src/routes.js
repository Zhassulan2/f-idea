import VueRouter from 'vue-router'
import IdeaDetailed from './components/IdeaDetailed'
import IdeaList from './components/IdeaList'
import CreateUserExpIssue from './components/CreateUserExpIssue'
import ViewUserExp from './components/ViewUserExp'

export default new VueRouter({
    mode:'history',
    routes: [
        {
            path: '',
            component: IdeaList
        },
        {
            path: '/IdeaDetailed',
            component: IdeaDetailed
        },
        {
            path: '/CreateUserExpIssue',
            component: CreateUserExpIssue
        },
        {
            path: '/ViewUserExp',
            component: ViewUserExp
        },
    ],
})
