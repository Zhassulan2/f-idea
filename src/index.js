/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        counter: 10,
        NavComponent: 'IdeaList',
        Authorized: true,
        IdeaListitems: [],
        selectedItem: {
            id: null,
            recordId: null,
            title: null,
            initiator: {
                username: '',
                firstname: '',
                lastname: '',
                employeeId: '',
                fullname: '',
            },
            leanManager: {},
            responsible: {},
            publicationDate: '',
            savedHours: 0,
            savedMoney: 0,
            deadLine: 0,
            state: "",
            likeAmount: 0,
            dislikeAmount: 0,
            body: null,
            expectedResult: "",
            newIdea: 0,
            process: {},
            processId: null,
            achivedResult: "",
            aimedResult: null,
        },
        processes: [],
        visitCounts: 0,
        userData: {
            login: "zbayghozha",
            password: "Addadd!@#123"
        },
        dicData: {
            branch: [],
            filial: [],
            revizorroExperienceData:[],
            clientExperienceData: [],
            managerExperienceData:[],
        },
        clientExp: [
            {
                id: 0,
                branch: {
                    id: 0,
                    name: 'Отделение 1'
                },
                filial: {
                    id: 0,
                    name: 'Головной банк',
                },
                orderType: 'CLIENT',
                operation: {
                    id: 0,
                    name: 'Услуга 1',
                },
                experience: 'Тут описана моя идея',
                problem: 'Мой опыта тут описано',
                initDate: '',
                initiator: {
                    username: 'zbayghozha',
                    fullname: 'Байгожа Жасулан'
                }
            }, {
                id: 1,
                branch: {
                    id: 0,
                    name: 'Отделение 2'
                },
                filial: {
                    id: 0,
                    name: 'Головной банк г. Нур-Султан',
                },
                orderType: 'CLIENT',
                operation: {
                    id: 0,
                    name: 'Услуга 1',
                },
                experience: 'Тут описана моя идея',
                problem: 'Мой опыта тут описано',
                initDate: '',
                initiator: {
                    username: 'zbayghozha',
                    fullname: 'Байгожа Жасулан'
                }
            }],
        managerExp: [{
            branch: {
                id: 0,
                name: ''
            },
            filial: {
                id: 0,
                name: ''
            },
            orderType: '',
            operation: {
                name: '', //один из них
                id: 0
            },
            experience: '',
            problem: '',
            initDate:'',
            initiator: {
                username: '',
                fullname: ''
            }
        }],
        clientExperience:[],
        selectedClientExp:{},
        revizorroExperience:[],
        selectedRevizorroExp:{},
    },
    mutations: {
        updateSelectedClientExp(state, payload){
            state.selectedClientExp = payload
        },
        updateSelectedRevizorroExp(state, payload){
            state.selectedRevizorroExp = payload
        },
        updateRevizorroExperience(state, payload){
            state.revizorroExperience = payload
        },
        updateClientExperience(state, payload){
            state.clientExperience = payload
        },
        updateUserData(state, payload) {
            state.userData = payload
        },
        changeVisitCounts(state, payload) {
            state.visitCounts = payload
        },
        changeNavComponent(state, payload) {
            state.NavComponent = payload
        },
        switchAuthorizedToggle(state, payload) {
            state.Authorized = payload
        },
        updateIdeaListitems(state, payload) {
            state.IdeaListitems = payload
        },
        updateSelectedItem(state, payload) {
            state.selectedItem = payload
        },
        updateSelectedItemProcess(state, payload) {
            state.selectedItem.process = payload
        },
        updateprocesses(state, payload) {
            state.processes = payload;
        },
        updateDicData(state, payload) {
            state.dicData = payload
        },
        updateDicDataBranch(state, payload) {
            state.dicData.branch = payload
        },
        updateDicDataFilial(state, payload) {
            state.dicData.filial = payload
        },
        updateDicDataRevExpData(state, payload) {
            state.dicData.revizorroExperienceData = payload
        },
        updateDicDataClientExpData(state, payload) {
            state.dicData.clientExperienceData = payload
        },
        updateDicDataManagerExpData(state, payload) {
            state.dicData.managerExperienceData = payload
        },
    },
    getters: {
        computedSelectedClientExp(state){
            return state.selectedClientExp
        },
        computedSelectedRevizorroExp(state){
            return state.selectedRevizorroExp
        },
        computedClientExperience(state){
            return state.clientExperience
        },
        computedRevizorroExperience(state){
            return state.revizorroExperience
        },
        computedUserData(state) {
            return state.userData
        },
        computedVisitCounts(state) {
            return state.visitCounts
        },
        computedNavComponent(state) {
            return state.NavComponent
        },
        computedAuthorizedToggle(state) {
            return state.Authorized
        },
        computedIdeaListitems(state) {
            return state.IdeaListitems
        },
        computedSelectedItem(state) {
            return state.selectedItem
        },
        computedProcesses(state) {
            return state.processes
        },
        computedDicData(state) {
            return state.dicData
        },
        computedClientExp(state) {
            return state.clientExp
        },
    },
})
