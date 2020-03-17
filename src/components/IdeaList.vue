<template>
    <section class="IdeaList">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="alert alert-primary h-100"
                         role="alert">
                        <h4>Есть идея Forte?</h4>
                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div>
                        <div class="row ">
                            <div class="col">
                                <div class="alert alert-primary h-100" role="alert">
                                    <h6><i>{{savedMoney}} &#8376; сэкономлено</i></h6>
                                </div>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col">
                                <div class="alert alert-primary h-100" role="alert">
                                    <h6><i>{{savedHours}} в часах сэкономлено</i></h6>
                                </div>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col">
                                <div class="alert alert-primary h-100" role="alert">
                                    <h6><i>{{visitCounts}} Посещении</i></h6>
                                </div>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col">
                                <div class="alert alert-primary h-100" role="alert">
                                    <h6><i>{{stNewAmount}} новых</i></h6>
                                </div>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col">
                                <div class="alert alert-primary h-100" role="alert">
                                    <h6><i>{{stInProgressAmount}} в работе</i></h6>
                                </div>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col">
                                <div class="alert alert-primary h-100" role="alert">
                                    <h6><i>{{stDoneAmount}} закончено</i></h6>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col">
                    <div class="alert alert-primary h-100"
                         role="alert">
                        <div v-if="!Authorized">
                            <h4>Авторизация</h4>
                            <v-text-field label="Логин"
                                          hide-details="auto"
                                          v-model="login"
                                          hint="Hint text"
                            ></v-text-field>
                            <v-text-field label="Пароль"
                                          hide-details="auto"
                                          v-model="password"
                                          hint="Hint Пароль"
                            ></v-text-field>
                            <br>
                            <v-btn outlined text color="success" @click="checkForm">Принять</v-btn>
                        </div>
                        <div v-else>
                            <h4>Новая Инициатива</h4>
                            <v-select
                                    :items="selectAction"
                                    label="Выберите действие"
                                    v-model="actionText"
                                    @change="changeAction"
                            ></v-select>
                            <div v-if="viewIdeas===1">
                                <v-text-field hide-details="auto"
                                              label="Наименование"
                                              v-model="createNewIdeaData.title"
                                              hint="Hint text"></v-text-field>
                                <br>
                                <v-text-field hide-details="auto"
                                              label="Описание проблемы"
                                              v-model="createNewIdeaData.body"
                                              hint="Hint text"></v-text-field>
                                <br>
                                <v-text-field hide-details="auto"
                                              label="Ожидаемый результат"
                                              v-model="createNewIdeaData.aimedResult"
                                              hint="Hint text"></v-text-field>
                                <br>
                                <v-select
                                        :items="processesName"
                                        label="Выберите процесс"
                                        v-model="createNewIdeaData.processName"
                                ></v-select>
                                <div>
                                    <b-button
                                            variant="btn btn-outline-success"
                                            class="m-1"
                                            @click="gotoCreateIssue">
                                        Создать идею
                                    </b-button>
                                </div>
                            </div>
                            <div v-if="viewIdeas===2">
                                <b-button
                                        variant="btn btn-outline-success"
                                        class="m-1"
                                        @click="gotoCreateUserExp">
                                    Создать заявку
                                </b-button>
                                <br>
                                {{clientExperience}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Таблица Фильтр-->
        <table class="table" v-if="viewIdeas===1">
            <tbody>
            <tr class="bg-light">
                <td scope="col">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button
                                type="button"
                                class="btn btn-outline-success"
                                :class="(!showMyIdea)?'active':''"
                                @click="selectIdea(false)"
                        >Все идеи
                        </button>
                        <button
                                type="button"
                                class="btn btn-outline-success"
                                :class="(showMyIdea)?'active':''"
                                @click="selectIdea(true)"
                        >Только Мои
                        </button>
                    </div>
                </td>
                <td scope="col">
                    <v-text-field label="Инициатор" hide-details="auto"
                                  v-model="searchByIdeaInit"
                                  hint="Hint text"></v-text-field>
                </td>
                <td scope="col">
                    <b-dropdown id="dropdown-left" text="Выберите Статус" variant="outline-success" class="m-2">
                        <b-dropdown-item v-bind:key="s" @click="searchByIdeaState=s" v-for="s in stateList">{{s}}
                        </b-dropdown-item>
                    </b-dropdown>
                </td>
                <td scope="col">
                    <v-text-field label="Идея" hide-details="auto"
                                  v-model="searchByIdeaTitle"
                                  hint="Hint text"></v-text-field>
                </td>
            </tr>
            </tbody>
        </table>

        <!-- Таблица Идей-->
        <table class="table" v-if="viewIdeas===1">
            <thead class="thead-dark">
            <tr>
                <th scope="col">Идея</th>
                <th scope="col">Инициатор</th>
                <th scope="col">Исполнитель</th>
                <th scope="col">Опубликовано</th>
                <th scope="col">Статус</th>
                <th scope="col">Экономия в часах</th>
                <th scope="col">Денежный эффект</th>
                <th scope="col">Нравится</th>
                <th scope="col">Не нравится</th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-light" v-for="item in filteredIdeaNames" v-bind:key="item.id">
                <th v-on:click="updateNavComponent(item)" scope="row">{{item.title}}</th>
                <td v-on:click="updateNavComponent(item)">{{item.initiator.username}}</td>
                <td v-on:click="updateNavComponent(item)">{{item.leanManager.username}}</td>
                <td v-on:click="updateNavComponent(item)">{{item.publicationDate}}</td>
                <td v-on:click="updateNavComponent(item)">{{getStateLabel(item.state)}}</td>
                <td v-on:click="updateNavComponent(item)">{{item.savedHours}}</td>
                <td v-on:click="updateNavComponent(item)">{{item.savedMoney}} &#8376;</td>
                <td v-on:click="updateNavComponent(item)">{{item.likeAmount}}</td>
                <td v-on:click="updateNavComponent(item)">{{item.dislikeAmount}}</td>
            </tr>
            </tbody>
        </table>


        <!-- Таблица Клиентский опыт-->
        <table class="table" v-if="viewIdeas===2">
            <thead class="thead-dark">
            <tr>
                <th scope="col">Операция</th>
                <th scope="col">Вид</th>
                <th scope="col">Филиал</th>
                <th scope="col">Отделение</th>
                <th scope="col">Инициатор</th>
                <th scope="col">Дата создания</th>
            </tr>
            </thead>
            <tbody>
            <tr v-on:click="viewUserExp(item)" class="bg-light" v-for="item in clientExperience" v-bind:key="item.id">
                <td scope="row">
                    {{item.operation.name}}
                </td>
                <td>
                    {{item.orderType === 'CLIENT'? 'Я Клиент':'Я Менеджер'}}
                </td>
                <td>{{item.filial.name}}</td>
                <td>{{item.branch.name}}</td>
                <td>{{item.initiator.username}}</td>
                <td>{{item.initDate}}</td>
            </tr>
            <tr v-on:click="viewRevizorroExp(item)" class="bg-light" v-for="item in revizorroExperience"
                v-bind:key="item.id">
                <td scope="row" class="">
                    -
                </td>
                <td>
                    Ревизорро
                </td>
                <td>{{item.filial.name}}</td>
                <td>{{item.branch.name}}</td>
                <td>{{item.initiator.username}}</td>
                <td>{{item.initDate}}</td>
            </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
    /* eslint-disable no-console */

    export default {
        name: "IdeaList",
        data() {
            return {
                visitAmout: 50,
                showMyIdea: false,
                searchByIdeaTitle: '',
                searchByIdeaInit: '',
                searchByIdeaState: '',
                inputRules: [
                    value => !!value || 'Обязательно.',
                    value => (value && value.length >= 3) || 'Длина ввода меньше 4',
                ],
                loginRules: [
                    value => !!value || 'Обязательно.',
                    value => (value && value.length >= 3) || 'Длина ввода меньше 4',
                ],
                stateList: ['NEW', 'INPROGRESS', 'DONE', 'BACKLOG', 'DECLINE'],
                createNewIdeaData: {
                    title: null,
                    body: null,
                    aimedResult: null,
                    processName: '',
                    process: {
                        // id(int), name(String), responsible[], leanManagers[]
                    },
                    publicationDate: '',
                    state: '',
                    initiator: '',
                    newIdea: 0,
                },
                login: "",
                password: "",
                ideaType: ['Я менеджер', 'Я клиент', 'Ревизорро'],
                viewIdeas: 0,
                selectAction: ['Улучшить текущий бизнес-процесс', 'Оставить отзыв клиентского опыта'],
                actionText: '',
                dialog: false,
            }
        },
        methods: {
            viewRevizorroExp(item) {
                this.$store.commit('updateSelectedRevizorroExp', item);
                this.$store.commit('updateSelectedClientExp', {});
                this.$router.push('/ViewUserExp')
            },
            viewUserExp(item) {
                this.$store.commit('updateSelectedRevizorroExp', {});
                this.$store.commit('updateSelectedClientExp', item);
                this.$router.push('/ViewUserExp')
            },
            getCurrentDateToString() {
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                return today
            },
            gotoCreateIssue() {
                if (
                    (this.createNewIdeaData.title.length > 0) &&
                    (this.createNewIdeaData.body.length > 0) &&
                    (this.createNewIdeaData.aimedResult.length > 0) &&
                    (this.createNewIdeaData.process.length > 0)
                ) {
                    this.createNewIdeaData.state = 'NEW';
                    this.createNewIdeaData.initiator = {
                        username: this.$store.getters.computedUserData.login,
                        fullname: 'Байгожа Жасулан Аронулы'
                    };
                    this.createNewIdeaData.newIdea = 1;

                    this.createNewIdeaData.publicationDate = this.getCurrentDateToString();

                    this.$store.getters.computedProcesses.forEach(element => {
                        if (element.name === this.createNewIdeaData.processName) this.createNewIdeaData.process = element
                    });
                    console.log(this.createNewIdeaData);

                    this.$store.commit('updateSelectedItem', this.createNewIdeaData);
                    this.$router.push({path: '/IdeaDetailed'});
                }
            },
            gotoCreateUserExp() {
                this.$router.push({path: '/CreateUserExpIssue'});
            },
            updateNavComponent(item) {
                this.$store.commit('updateSelectedItem', item);

                this.$store.commit('changeNavComponent', "IdeaDetailed")
                this.$router.push('/IdeaDetailed')
            },

            checkForm() {
                this.$store.commit('updateUserData', {login: this.login, password: this.password})
                this.$store.commit('switchAuthorizedToggle', true)
            },
            selectIdea(bool) {
                if (!bool == this.showMyIdea) this.showMyIdea = !this.showMyIdea
                if (this.showMyIdea) {
                    this.searchByIdeaInit = this.$store.getters.computedUserData.login;
                    this.searchByIdeaState = '';
                    this.searchByIdeaTitle = '';
                } else {
                    this.searchByIdeaInit = '';
                    this.searchByIdeaState = '';
                    this.searchByIdeaTitle = '';
                }
            },
            getStateLabel(state) {
                let stateTranslate = "";
                switch (state) {
                    case 'INPROGRESS':
                        stateTranslate = "in Progress";
                        break;
                    default:
                        stateTranslate = state;
                        break;
                }
                return stateTranslate;
            },
            changeAction() {
                if (this.actionText === 'Улучшить текущий бизнес-процесс') {
                    this.viewIdeas = 1;
                } else {
                    this.viewIdeas = 2;
                }
            },
        },
        computed: {
            filteredIdeaNames() {//searchByIdeaState
                return this.items.filter(item => {
                    return (
                        (item.title.toLowerCase().indexOf(this.searchByIdeaTitle.toLowerCase()) !== -1)
                        && (item.initiator.username.toLowerCase().indexOf(this.searchByIdeaInit.toLowerCase()) !== -1)
                        && (item.state.toLowerCase().indexOf(this.searchByIdeaState.toLowerCase()) !== -1)
                    )
                })
            },
            NavComponent() {
                return this.$store.getters.computedNavComponent
            },
            Authorized() {
                return this.$store.getters.computedAuthorizedToggle
            },
            savedHours() {
                let tmpSavedHours = 0;

                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].state == "DONE") {
                        tmpSavedHours += this.items[i].savedHours;
                    }
                }

                return tmpSavedHours;
            },
            savedMoney() {
                let tmpSavedMoney = 0;

                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].state == "DONE") {
                        tmpSavedMoney += this.items[i].savedMoney;
                    }
                }

                return tmpSavedMoney;
            },
            stNewAmount() {
                let tmpStNewAmount = 0;

                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].state == "NEW") tmpStNewAmount++;
                }

                return tmpStNewAmount;

            },
            stInProgressAmount() {
                let tmpStInProgressAmount = 0;

                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].state == "INPROGRESS") tmpStInProgressAmount++;
                }

                return tmpStInProgressAmount;

            },
            stDoneAmount() {
                let tmpStDoneAmount = 0;

                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].state == "DONE") tmpStDoneAmount++;
                }

                return tmpStDoneAmount;
            },
            items() {
                return this.$store.getters.computedIdeaListitems
            },
            processes() {
                return this.$store.getters.computedProcesses
            },
            processesName() {
                let buff = [];
                this.$store.getters.computedProcesses.forEach(element => buff.push(element.name));
                return buff;
            },
            visitCounts() {
                return this.$store.getters.computedVisitCounts;
            },
            clientExperience() {
                return this.$store.getters.computedClientExperience
            },
            revizorroExperience() {
                console.log('this.$store.getters.computedRevizorroExperience');
                console.log(this.$store.getters.computedRevizorroExperience);
                return this.$store.getters.computedRevizorroExperience
            },
        },
        mounted() {


            this.axios.get('http://localhost:9292/forteidea/main')
                .then((response) => {
                    this.createNewIdeaData.process = response.data.processes;
                    this.$store.commit('changeVisitCounts', response.data.visitCounts);
                    this.$store.commit('updateIdeaListitems', response.data.ideas);
                    this.$store.commit('updateprocesses', response.data.processes);
                })
                .then(() => {
                    this.axios.get('http://localhost:9292/forteidea/experience/data').then((responseFromExperinceData) => {
                        this.axios.get('http://localhost:9292/forteidea/experience/client').then((responseFromExperinceClient) => {
                            let operationsTmp = [];
                            responseFromExperinceData.data.clientExperienceData.forEach((obj) => {
                                obj.operations.forEach((tmp) => {
                                    operationsTmp.push(tmp);
                                })
                            });
                            responseFromExperinceClient.data.clientExperience.forEach(function (clientExperienceObject) {
                                    responseFromExperinceData.data.branches.forEach(function (obj) {
                                        if (obj.id === clientExperienceObject.branch) {
                                            clientExperienceObject.branch = obj;
                                        }
                                    });
                                    responseFromExperinceData.data.filials.forEach(function (obj) {
                                        if (obj.id === clientExperienceObject.filial) {
                                            clientExperienceObject.filial = obj;
                                        }
                                    })
                                    operationsTmp.forEach(function (obj) {
                                        if (obj.id === clientExperienceObject.operation) {
                                            clientExperienceObject.operation = obj;
                                        }
                                    })
                                }
                            );
                            // console.log('http://localhost:9292/forteidea/experience/client');
                            // console.log(responseFromExperinceClient.data.clientExperience);
                            this.$store.commit('updateClientExperience', responseFromExperinceClient.data.clientExperience);
                        });
                        this.axios.get('http://localhost:9292/forteidea/experience/revizorro').then((responseFromExperinceRevizorro) => {
                            responseFromExperinceRevizorro.data.revizorroExperience.forEach(function (revizorroExperienceObject) {
                                    responseFromExperinceData.data.branches.forEach(function (obj) {
                                        if (obj.id === revizorroExperienceObject.branch) {
                                            revizorroExperienceObject.branch = obj;
                                        }
                                    });
                                    responseFromExperinceData.data.filials.forEach(function (obj) {
                                        if (obj.id === revizorroExperienceObject.filial) {
                                            revizorroExperienceObject.filial = obj;
                                        }
                                    })
                                    responseFromExperinceData.data.revizorroExperienceData.forEach(function (obj){
                                        obj.questions.forEach(function(objQuestions){
                                            console.log('responseFromExperinceData.data.revizorroExperienceData.Questions')
                                            console.log(objQuestions.question + ' ' + objQuestions.id)
                                        })

                                    })
                                }
                            );
                            // console.log('responseFromExperinceRevizorro.data.revizorroExperience');
                            // console.log(responseFromExperinceRevizorro.data.revizorroExperience);
                            this.$store.commit('updateRevizorroExperience', responseFromExperinceRevizorro.data.revizorroExperience);
                        });
                        this.$store.commit('updateDicDataBranch', responseFromExperinceData.data.branches);
                        this.$store.commit('updateDicDataFilial', responseFromExperinceData.data.filials);
                        this.$store.commit('updateDicDataRevExpData', responseFromExperinceData.data.revizorroExperienceData);
                        this.$store.commit('updateDicDataClientExpData', responseFromExperinceData.data.clientExperienceData)
                        console.log('http://localhost:9292/forteidea/experience/data');
                        console.log(responseFromExperinceData.data);
                    })
                })
        },
        // watch: {
        //     actionText: function () {
        //         if (this.actionText === 'Улучшить текущий бизнес-процесс'){
        //             this.viewIdeas = 1;
        //         } else {
        //             this.viewIdeas = 2;
        //         }
        //     },
        // },
    }

</script>

<style scoped>
    .alert {
        margin-bottom: 1px;
        margin: 0px 0px;
        font-size: 12px;
    }

    div.col {
        margin-bottom: 1px;
        padding-left: 1px;
        padding-right: 1px;
    }

    th.col {
        border: #6a737d 1px;
    }

    b-dropdown-item {
        color: black;
    }

    input[type=text] {
        padding: 5px 5px 5px 5px;
    }

    td {
        padding: 5px;
        vertical-align: middle;
    }

    h4 {
        margin: 0px 0px 0px;
    }

    div.col {
        padding: 3px 3px 3px 3px;
    }

    div.row {
        margin: 0px 0px 0px 0px;
    }

    .operation-idealist {
        padding-left: 5px;
    }

</style>