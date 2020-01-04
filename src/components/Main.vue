<template lang="html">
    <section class="Main">
        <FixedHeader @pageChanged="page=$event"></FixedHeader>



        <table class="table"><!--wrapper fadeInDown"-->
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Тема</th>
                <th scope="col">Описание</th>
                <th scope="col"><font-awesome-icon icon="heart" /></th>
                <th scope="col"><font-awesome-icon :icon="['far', 'heart']" /></th> <!-- <- Заменить на Лайки -->
            </tr>
            </thead>
            <tbody>
            <tr  class="bg-light" v-for="item in items" v-bind:key="item.id" >
                <th scope="row" v-on:click="goIdeaPage(item)">{{item.id}}</th>
                <td v-on:click="goIdeaPage(item)">{{item.title}}</td>
                <td v-on:click="goIdeaPage(item)">{{item.description}}</td>
                <td v-on:click="goIdeaPage(item)">{{item.likeAmount}}</td>
                <td v-on:click="goIdeaPage(item)">{{item.dislikeAmount}}</td>
            </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="js">
    import FixedHeader from "@/components/FixedHeader";

    export default {
        name: "Main",
        components: {
            FixedHeader
        },
        data(){
            return {
                page:"Main",
                items: [
                    {
                        id: 2,
                        recordId: 16,
                        title: 'Lorem-2.',
                        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.' ,
                        likeAmount: 45,
                        dislikeAmount: 853
                    },
                    {
                        id: 1,
                        recordId: 15,
                        title: 'Lorem-1.',
                        description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ' ,
                        likeAmount: 459,
                        dislikeAmount: 852
                    },
                    {
                        id: 3,
                        recordId: 17,
                        title: 'Lorem-3.',
                        description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ' ,
                        likeAmount: 415,
                        dislikeAmount: 851
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>