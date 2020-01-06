<template>
    <section class="IdeaList">
        <table class="table"><!--wrapper fadeInDown"-->
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Тема</th>
                <th scope="col">Описание</th>
                <th scope="col">
                    <font-awesome-icon icon="thumbs-up"/>
                </th>
                <th scope="col">
                    <font-awesome-icon icon="thumbs-down"/>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-light" v-for="item in items" v-bind:key="item.id">
                <th scope="row" v-on:click="goIdeaList(item)">{{item.id}}</th>
                <td v-on:click="goIdeaList(item)">{{item.title}}</td>
                <td v-on:click="goIdeaList(item)">{{item.description}}</td>
                <td v-on:click="goIdeaList(item)">{{item.likeAmount}}</td>
                <td v-on:click="goIdeaList(item)">{{item.dislikeAmount}}</td>
            </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
    export default {
        name: "IdeaList",
        props: {
            NavComponent: String,
            page: String
        },
        data() {
            return {
                items: [],
            }
        },
        methods: {
            goIdeaList(item) {
                localStorage.setItem("IdeaData", JSON.stringify(item));
                this.NavComponent = "IdeaDetailed";
                this.$emit('NavComponentChanged', this.NavComponent);
                this.$emit('PageChanged', this.page);
            }
        },
        mounted() {

            this.items = [
                {
                    id: 2,
                    recordId: 16,
                    title: 'Lorem-2.',
                    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
                    likeAmount: 45,
                    dislikeAmount: 853
                },
                {
                    id: 1,
                    recordId: 15,
                    title: 'Lorem-1.',
                    description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ',
                    likeAmount: 459,
                    dislikeAmount: 852
                },
                {
                    id: 3,
                    recordId: 17,
                    title: 'Lorem-3.',
                    description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ',
                    likeAmount: 415,
                    dislikeAmount: 851
                }
            ];

            localStorage.setItem("IdeaList", JSON.stringify(this.items));

        }
    }
</script>

<style scoped>

</style>