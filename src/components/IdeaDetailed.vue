<template>
    <section class="IdeaDetailed">
        <table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col" class="navbar">
                    <div>
                        Тема: {{IdeaData.title}}
                    </div>
                    <div>
                        <button type="button" class="btn btn-outline-light">{{issueDetails}}</button>&nbsp;
                        <button type="button" class="btn btn-outline-light">{{changeIssue}}</button>&nbsp;
                        <button type="button" class="btn btn-outline-light">{{deleteIssue}}</button>&nbsp;
                    </div>

                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="col">Описание: {{IdeaData.description}}</th>
            </tr>
            </tbody>
        </table>

        <div class="alert alert-dark navbar" role="alert">
            <div></div>
            <div>
                <button type="button" class="btn btn-dark">
                    <font-awesome-icon icon="thumbs-up"/>
                    {{comments.length}}
                </button>&nbsp;
                <button v-if="pageConfig.showCommentDetails"
                        v-on:click="showCommentDetailsFn"
                        type="button" class="btn btn-dark"
                >
                    <font-awesome-icon icon="list"/>
                    <font-awesome-icon icon="comments"/>
                </button>&nbsp;

                <button
                        v-if="!pageConfig.showCommentDetails"
                        v-on:click="showCommentDetailsFn"
                        type="button"
                        class="btn btn-dark"
                >
                    <font-awesome-icon icon="list"/>
                    <font-awesome-icon icon="comment-slash"/>
                </button>&nbsp;
                <button v-if="pageConfig.ShowComments"
                        v-on:click="showComment"
                        type="button" class="btn btn-dark"
                >
                    <font-awesome-icon icon="comments"/>
                </button>&nbsp;
                <button v-if="!pageConfig.ShowComments"
                        v-on:click="showComment"
                        type="button" class="btn btn-dark"
                >
                    <font-awesome-icon icon="comment-slash"/>
                </button>&nbsp;
            </div>
        </div>
        <div v-if="pageConfig.ShowComments">
            <div class="alert alert-dark navbar" role="alert">
                <div>
                    Добавить комментарий
                </div>
                <div>
                    <div class="input-group mb-3 ">
                        <input style="width: 400px;"
                               type="text"
                               class="form-control"
                               placeholder="Добавить комментарии"
                               v-model="message">
                    </div>
                </div>
                <div>
                    <button
                            type="button"
                            class="btn btn-dark"
                            v-on:click="addComment"
                    >{{sendComment}}
                    </button>&nbsp;
                </div>
            </div>
            <div class="alert alert-dark" role="alert">
                <table class="table">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" v-if="pageConfig.showCommentDetails">Автор</th>
                        <th scope="col">Комментарии</th>
                        <th scope="col">Голосование</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="comment in comments" v-bind:key="comment.id">
                        <th scope="row">{{comment.id}}</th>
                        <td v-if="pageConfig.showCommentDetails">{{comment.owner}}</td>
                        <td>{{comment.text}}</td>
                        <td v-on:click="likeComment(comment.id)">
                            <div v-if="comment.like ">
                                <font-awesome-icon icon="thumbs-up"/>
                            </div>
                            <div v-else>
                                <font-awesome-icon icon="thumbs-down"/>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </section>
</template>

<script>
    /* eslint-disable no-console */

    //var _ = require('lodash');

    export default {
        name: "IdeaDetailed",
        data() {
            return {
                changeIssue: 'Изменить',
                deleteIssue: 'Удалить',
                sendComment: 'Отправить',
                issueDetails: "Детали",

                likeAmount: "9",
                message: "",
                IdeaData: {
                    id: 0,
                    recordId: 0,
                    title: '',
                    description: '',
                    like: 0
                },
                pageConfig: {
                    ShowComments:true,
                    showCommentDetails: false
                },
                comments: [
                    {
                        id: 1,
                        recordId: 15,
                        owner: 'Байгожа Жасулан Аронулы-1',
                        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ' +
                            'Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. ',
                        like: true
                    },
                    {
                        id: 2,
                        recordId: 16,
                        owner: 'Байгожа Жасулан Аронулы-2',
                        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ' +
                            'Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. ',
                        like: false
                    },
                    {
                        id: 3,
                        recordId: 17,
                        owner: 'Байгожа Жасулан Аронулы-3',
                        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ' +
                            'Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. ',
                        like: false
                    }
                ]
            }
        },
        methods: {
            goCreateIdea() {
                this.record = JSON.parse(localStorage.getItem('comment'));
            },
            likeComment: function (commentId) {
                for (let i = 0; i < this.comments.length; i++) {
                    if (this.comments[i].id == commentId) {
                        if (this.comments[i].like == 0) {
                            this.comments[i].like = 1
                        } else {
                            this.comments[i].like = 0
                        }
                        break;
                    }
                }
            },
            showComment: function(){
                this.pageConfig.ShowComments = !this.pageConfig.ShowComments;
            },
            showCommentDetailsFn: function () {
                this.pageConfig.showCommentDetails = !this.pageConfig.showCommentDetails;
            },
            addComment: function () {
                let maxId = this.comments[0].id;
                for (let i = 0; i < this.comments.length; i++) {
                    if (this.comments[i].id >= maxId) {
                        maxId = this.comments[i].id + 1;
                    }
                }

                this.comments.push(
                    {
                        id: maxId,
                        recordId: 16,
                        owner: 'Байгожа Жасулан Аронулы-1',
                        text: this.message,
                        like: 1
                    }
                )
                localStorage.setItem("comments", JSON.stringify(this.comments));
            }
        },
        mounted() {
            this.IdeaData = JSON.parse(localStorage.getItem('IdeaData'));
        }
    }
</script>

<style scoped>

</style>