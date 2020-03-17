<template>
    <section class="IdeaDetailed">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="jumbotron">
                        <strong>Основная информация</strong>
                        <div class="alert alert-primary" role="alert">
                            <v-select
                                    :items="states"
                                    label="Статус"
                                    v-model="selectedItem.state"
                                    @change="UpdateSelectedItemKeys('state')"
                            ></v-select>
                            <v-select
                                    :items="processesName"
                                    label="Процесс"
                                    v-model="selectedProcessName"
                                    @change="processSelectedMethod"
                            ></v-select>
                            <v-select
                                    :items="processLeanManagers"
                                    label="Lean-manager"
                                    v-model="selectedProcessLeanManager"
                                    @change="UpdateSelectedItemKeys('leanManager')"
                            ></v-select>
                            <v-text-field label="Инициатор" v-model="selectedItem.initiator.username"
                                          disabled></v-text-field>
                        </div>
                    </div>
                    <div class="jumbotron">
                        <strong>Описание проблемы</strong>
                        <div class="alert alert-primary" role="alert">
                            <v-textarea
                                    name="body"
                                    label="Введите текст"
                                    rows="1"
                                    v-model.lazy="selectedItem.body"
                                    hint="Hint text"
                                    @change="UpdateSelectedItemKeys('body')"
                            ></v-textarea>
                        </div>
                    </div>
                    <div class="jumbotron">
                        <strong>Ожидаемый результат</strong>
                        <div class="alert alert-primary" role="alert">
                            <v-textarea
                                    name="expectedResult"
                                    label="Введите текст"
                                    rows="1"
                                    v-model.lazy="selectedItem.expectedResult"
                                    hint="Hint text"
                                    @change="UpdateSelectedItemKeys('expectedResult')"
                            ></v-textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="jumbotron">
                        <strong>План реализации</strong>
                        <div class="alert alert-primary" role="alert">
                            <b-button
                                    variant="btn btn-outline-success"
                                    class="m-1"
                                    @click="checkPostReq">
                                checkPostReq
                            </b-button>
                            <v-text-field
                                    label="Задача"
                                    v-model.lazy="selectedItem.title"
                                    @change="UpdateSelectedItemKeys('title')"
                            ></v-text-field>
                            <v-select
                                    :items="processResponsiblePeople"
                                    label="Исполнитель"
                                    v-model="selectedProcessResponsible"
                                    @change="UpdateSelectedItemKeys('responsible')"
                            ></v-select>
                            <div>
                                <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :return-value.sync="selectedItem.deadLine"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="selectedItem.deadLine"
                                                label="Срок"
                                                readonly
                                                v-on="on"
                                                @change="UpdateSelectedItemKeys('deadLine')"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="selectedItem.deadLine" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(selectedItem.deadLine)">OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="jumbotron">
                        <strong>Эффект</strong>
                        <div class="alert alert-primary" role="alert">
                            <v-text-field
                                    label="Денежный эффект"
                                    v-model.lazy="selectedItem.savedMoney"
                                    hint="Hint text"
                                    @change="UpdateSelectedItemKeys('savedMoney')"
                            ></v-text-field>
                            <v-text-field
                                    label="Экономия в часах"
                                    v-model.lazy="selectedItem.savedHours"
                                    hint="Hint text"
                                    @change="UpdateSelectedItemKeys('savedHours')"
                            ></v-text-field>
                        </div>
                    </div>
                    <div class="jumbotron">
                        <strong>Результаты и как его удалось закрепить</strong>
                        <div class="alert alert-primary" role="alert">
                            <v-textarea
                                    name="achivedResult"
                                    label="Введите текст"
                                    rows="1"
                                    v-model.lazy="selectedItem.achievedResult"
                                    hint="Hint text"
                                    @change="UpdateSelectedItemKeys('achivedResult')"
                            ></v-textarea>
                            <br>
                            пока не привязано, в бэке нужно обновить значения Zhass, [21.02.20 11:25]
                            aimedResult

                            на

                            achivedResult
                            <br>
                            selectedItem = selectedItem{{selectedItem}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
    /* eslint-disable no-console,vue/no-side-effects-in-computed-properties */

    export default {
        name: "IdeaDetailed",
        data() {
            return {
                state: '',
                changeIssue: 'Изменить',
                deleteIssue: 'Удалить',
                message: "",
                states: ['NEW', 'INPROGRESS', 'DONE', 'BACKLOG', 'DECLINE'],
                date: new Date().toISOString().substr(0, 10),
                menu: false,
                selectedProcessName: '',
                selectedProcessResponsible: '',
                selectedProcessLeanManager: '',
            }
        },
        methods: {
            checkPostReq() {

                let buffTmp = {
                    "title": this.$store.getters.computedSelectedItem.title,
                    "initiator": this.$store.getters.computedSelectedItem.initiator.username,
                    "leanManager": this.$store.getters.computedSelectedItem.leanManager.id,
                    "responsible": this.$store.getters.computedSelectedItem.responsible.id,
                    "process": this.$store.getters.computedSelectedItem.process.id,
                    "publicationDate": this.getCurrentDateToString(),
                    "savedHours": this.$store.getters.computedSelectedItem.savedHours,
                    "savedMoney": this.$store.getters.computedSelectedItem.savedMoney,
                    "state": this.$store.getters.computedSelectedItem.state,
                    "aimedResult": this.$store.getters.computedSelectedItem.aimedResult,
                    "expectedResult": this.$store.getters.computedSelectedItem.expectedResult,
                    "deadLine": this.getCurrentDateToString()
                };
                console.log();
                console.log(buffTmp);
                this.axios.post('http://localhost:9292/forteidea/addIdea',buffTmp)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                });

                console.log(this.$store.getters.computedSelectedItem);
            },
            processSelectedMethod() {
                this.selectedProcessResponsible = '';
                this.selectedProcessLeanManager = '';
                this.$store.getters.computedProcesses.forEach(element => {
                    if (this.selectedProcessName === element.name) {
                        this.$store.commit('updateSelectedItemProcess', element);
                    }
                });
                return true;
            },
            getCurrentDateToString() {
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();
                let returnDate = '';
                returnDate = yyyy + '-' + mm + '-' + dd + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                return returnDate
            },
            UpdateSelectedItemKeys(val) {
                let buff = this.$store.getters.computedSelectedItem;

                if (val === 'title') buff.title = this.selectedItem.title;
                if (val === 'expectedResult') buff.expectedResult = this.selectedItem.expectedResult;
                if (val === 'savedMoney') buff.savedMoney = this.selectedItem.savedMoney;
                if (val === 'savedHours') buff.savedHours = this.selectedItem.savedHours;
                if (val === 'achivedResult') buff.achivedResult = this.selectedItem.achivedResult;
                if (val === 'state') buff.state = this.selectedItem.state;
                if (val === 'body') buff.body = this.selectedItem.body;
                if (val === 'deadLine') buff.deadLine = this.selectedItem.deadLine;

                // Update processes
                if (val === 'responsible') {
                    this.selectedItem.process.responsible.forEach(element => {
                        if (this.selectedProcessResponsible === element.fullname) {
                            buff.responsible = element;
                        }
                    })
                }
                if (val === 'leanManager') {
                    this.selectedItem.process.leanManagers.forEach(element => {
                        if (this.selectedProcessLeanManager === element.fullname) {
                            buff.leanManager = element;
                        }
                    })
                }
                console.log(buff);


                this.$store.commit('updateSelectedItem', buff);
            },
        },
        computed: {
            NavComponent() {
                return this.$store.getters.computedNavComponent
            },
            Authorized() {
                return this.$store.getters.computedAuthorizedToggle
            },
            selectedItem() {
                if (this.$store.getters.computedSelectedItem.processId != null) {
                    this.$store.getters.computedProcesses.forEach((element) => {
                        if (element.id === this.$store.getters.computedSelectedItem.processId) {
                            this.$store.commit('updateSelectedItemProcess', element);
                        }
                    })
                }

                console.log('this.$store.getters.computedSelectedItem');
                console.log(this.$store.getters.computedSelectedItem);

                if (this.selectedProcessResponsible === '' && this.$store.getters.computedSelectedItem.responsible != null) {
                    this.selectedProcessResponsible = this.$store.getters.computedSelectedItem.responsible.fullname;
                }

                if (this.selectedProcessLeanManager === '' && this.$store.getters.computedSelectedItem.leanManager != null) {
                    this.selectedProcessLeanManager = this.$store.getters.computedSelectedItem.leanManager.fullname;
                }

                return this.$store.getters.computedSelectedItem
            },
            processes() {
                return this.$store.getters.computedProcesses;
            },
            processesName() {
                let buff = [];
                this.$store.getters.computedProcesses.forEach(element => buff.push(element.name));
                return buff;
            },
            processResponsiblePeople() {
                let buff = [];
                this.$store.getters.computedSelectedItem.process.responsible.forEach(element => buff.push(element.fullname));
                return buff;
            },
            processLeanManagers() {
                let buff = [];
                this.$store.getters.computedSelectedItem.process.leanManagers.forEach(element => buff.push(element.fullname));
                return buff;
            },
        },
        watch: {
            // selectedItem: {
            //     deep: true,
            //     handler: function (newVal) {
            //         if (this.selectedProcessName === '') {
            //             this.selectedProcessName = newVal.process.name;
            //         }
            //     }
            // }
        },
        mounted() {

            if (this.selectedProcessName === '' || this.selectedProcessName == null) {
                this.selectedProcessName = this.$store.getters.computedSelectedItem.process.name;
            }
        },
    }
</script>

<style scoped>
    .alert-primary {
        margin-bottom: 5px;
        padding: 5px 5px 5px 5px;
        font-size: 12px;
    }

    td {
        padding: 5px 5px 5px 5px;
        font-size: 12px;
    }

    .jumbotron {
        margin-bottom: 5px;
        padding: 5px 10px 1px 10px;
        font-size: 12px;
    }

    .col-md-4 {
        padding: 5px 5px 5px 5px;
    }
</style>