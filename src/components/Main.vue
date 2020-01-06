<template lang="html">
    <section class="Main">
        <FixedHeader
                @pageChanged="page=$event"
                :NavComponent="NavComponent"
        ></FixedHeader>

        <IdeaList
                v-if="NavComponent == 'IdeaList'"
                @NavComponentChanged="NavComponentChangedMethod($event)"
                @PageChanged="PageChangedMethod($event)"
        ></IdeaList>
        <IdeaDetailed v-if="NavComponent == 'IdeaDetailed'"></IdeaDetailed>


    </section>
</template>

<script lang="js">
    /* eslint-disable no-console */


    import FixedHeader from "@/components/FixedHeader";
    import IdeaList from "@/components/IdeaList";
    import IdeaDetailed from "@/components/IdeaDetailed";

    export default {
        name: "Main",
        components: {
            IdeaDetailed,
            FixedHeader,
            IdeaList
        },
        methods:{
            NavComponentChangedMethod(event){

                console.log("Собитые NavComponentChangedMethod")
                console.log(this.NavComponent);
                this.NavComponent=event;
            },
            PageChangedMethod(event){
                console.log("Собитые PageChangedMethod")
                console.log(this.page);
                this.NavComponent=event;
            },
        },

        props:{
                page:String,
                NavComponent:String

        },
        mounted(){
            console.log("mounted Main" + this.page)
        }
    }
</script>