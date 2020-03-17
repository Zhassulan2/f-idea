<template>
    <section>
        <v-container>
            <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                            :items="getFilialNames"
                            label="Филиал"
                    ></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                            :items="getBranchNames"
                            label="Отделение"
                    ></v-select>
                </v-col>

            </v-row>
            <div class="jumbotron" v-bind:key="exps.id" v-for="exps in customerExps">
                <div v-if="exps.iAm!='Ревизорро'">
                    <v-row align="center">
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select
                                    :items="types"
                                    label="Выберите вид"
                                    v-model="exps.iAm"
                            ></v-select>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select
                                    :items="getClientData"
                                    label="Операция/Услуга"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <div class="form-group">
                        <label for="FormControlTextarea1">Мой Опыт</label>
                        <textarea class="form-control" id="FormControlTextarea1" rows="3"
                                  v-model="exps.myExp"></textarea>
                        <label for="FormControlTextarea2">Идея</label>
                        <textarea class="form-control" id="FormControlTextarea2" rows="3"
                                  v-model="exps.myIdea"></textarea>
                    </div>
                </div>
                <div v-else>

                    <v-select
                            :items="types"
                            label="Выберите вид"
                            v-model="exps.iAm"
                    ></v-select>
                    <div v-bind:key="qs.id" v-for="qs in getDicDataRevExpData">
                        <table class="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th scope="col" style="width: 10%">№</th>
                                <th scope="col" style="width: 70%">{{qs.name}}</th>
                                <th scope="col" style="width: 20%"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-bind:key="q.id" v-for="q in qs.questions">
                                <th scope="row">{{q.id}}</th>
                                <td>{{q.question}}</td>
                                <td>
                                    <v-switch
                                            v-model="q.switcher"
                                            :label="`Ответ: ${q.switcher?'Да':'Нет'}`"
                                    ></v-switch>`
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <b-button
                    variant="btn btn-outline-success"
                    class="m-1"
                    @click="addAdditionalExp">
                Добавить обращение
            </b-button>
            <b-button
                    variant="btn btn-outline-success"
                    class="m-1">
                Отправить
            </b-button>

        </v-container>

    </section>
</template>

<script>
    /* eslint-disable no-console */
    export default {
        name: "CreateUserExpIssue",
        data() {
            return {
                customerExps: [
                    {
                        id: 0,
                        iAm: "Я Клиент",
                        service: "Операция/Услуга",
                        branch: "Филиал",
                        myExp: "",
                        myIdea: "",

                    }
                ],
                answer1_1: "radio-1",
                types: ['Я Клиент', 'Я Менеджер', 'Ревизорро'],
                operation: [
                    {
                        id: 1,
                        operationText: 'Открытие депозита на любую сумму'
                    }, {
                        id: 2,
                        operationText: 'Пополнение через терминал самообслуживания (ТС)'
                    }, {
                        id: 3,
                        operationText: 'Пополнение в кассе'
                    }, {
                        id: 4,
                        operationText: 'Пополнение через банкомат (АТМ NCR)'
                    }, {
                        id: 5,
                        operationText: 'Заведение заявки на кредит у менеджера'
                    }, {
                        id: 6,
                        operationText: 'Открытие доп. дебетовой именной карты'
                    }, {
                        id: 7,
                        operationText: 'Открытие не именной карты'
                    }, {
                        id: 8,
                        operationText: 'Получение пин - кода через AVR КЦ'
                    }, {
                        id: 9,
                        operationText: 'Получение/замена пин – кода через АТМ'
                    }, {
                        id: 10,
                        operationText: 'Узнать доступный остаток на карте в КЦ'
                    }, {
                        id: 11,
                        operationText: 'Получение справки о наличии остатка на счёте'
                    }, {
                        id: 12,
                        operationText: 'Получение справки об отсутствии задолженности'
                    }, {
                        id: 13,
                        operationText: 'Снятие наличных без карты по коду в АТМ'
                    },
                ],
                fab: false,
                hidden: false,
                tabs: null,


            }
        },
        methods: {
            addAdditionalExp() {
                console.log(this.customerExps[(this.customerExps.length) - 1].id + 1)
                this.customerExps.push({
                    id: this.customerExps[(this.customerExps.length) - 1].id + 1,
                    iAm: "Я Клиент",
                    service: "Операция/Услуга",
                    branch: "Филиал",
                    myExp: "",
                    myIdea: "",
                })
            },

        },
        computed: {
            dicData() {
                console.log(this.$store.getters.dicData);
                return this.$store.getters.computedDicData;
            },
            getFilialNames() {
                let arr = [];
                this.$store.getters.computedDicData.filial.forEach(element => arr.push(element.name));
                return arr
            },
            getBranchNames() {
                let arr = []
                this.$store.getters.computedDicData.branch.forEach(element => arr.push(element.name));
                return arr
            },
            getDicDataRevExpData() {
                return this.$store.getters.computedDicData.revizorroExperienceData;
            },
            getClientData() {
                let arr = []
                this.$store.getters.computedDicData.clientExperienceData.forEach(function (element) {
                    if (element.orderType === 'CLIENT') {//arr.push(element.operationText)
                        element.operation.forEach(oper => arr.push(oper.operationText))
                    }
                });
                return arr
            },
            getDicDataClientExpData() {//get dicData
                return this.$store.getters.computedDicData.clientExperienceData;
            },
            getDicDataManagerExpData() {
                return this.$store.getters.computedDicData.managerExperienceData;
            },
        },
        mounted() {
            // this.axios.get('http://localhost:9292/forteidea/experience/data').then((response) => {
            //     console.log('http://localhost:9292/forteidea/experience/data');
            //     console.log(response.data);
            //     this.$store.commit('updateDicDataBranch', response.data.branches);
            //     this.$store.commit('updateDicDataFilial', response.data.filials);
            //     this.$store.commit('updateDicDataRevExpData', response.data.revizorroExperienceData);
            //     response.data.clientExperienceData.forEach(function (obj) {
            //         if (obj.orderType === "CLIENT") {
            //             this.$store.commit('updateDicDataClientExpData', obj);
            //         } else {
            //             this.$store.commit('updateDicDataManagerExpData', obj);
            //         }
            //     });
            // })
        },
    }
</script>

<style scoped>
    .jumbotron {
        margin-bottom: 5px;
        padding: 15px 15px;
    }

    .form-group {
        margin-bottom: 5px;
    }

</style>