<template lang="html">
    <section class="Main">
        <FixedHeader @pageChanged="page=$event"></FixedHeader>

        <IdeaList v-if="NavComponent == 'IdeaList'" @NavComponentChanged="NavComponentChangedMethod($event)"> </IdeaList>
        <IdeaDetailed v-if="NavComponent == 'IdeaDetailed'"></IdeaDetailed>


    </section>
</template>

<script lang="js">

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
                // eslint-disable-next-line no-console
                console.log(this.NavComponent);
                this.NavComponent=event;
            }
        },
        data(){
            return {
                page:"Main",
                NavComponent:""
            }
        },
        mounted(){
            switch(localStorage.getItem("NavComponent")) {
                case null:
                    localStorage.setItem("NavComponent","IdeaList");
                    this.NavComponent = "IdeaList";
                    break;
                case "IdeaList":
                    this.NavComponent = "IdeaList";
                    break;
            }
        }
    }
</script>