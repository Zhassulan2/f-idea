<template>
  <v-app>
<!--    <fixed-header2/>-->
    <v-content>
      <FixedHeader/>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

import FixedHeader from "@/components/FixedHeader";

export default {
  name: 'App',
  components: {
    FixedHeader,
  },
};
</script>
