import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue } from 'bootstrap-vue'
import { DropdownPlugin } from 'bootstrap-vue'

import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './index.js'
import router from './routes'
import vuetify from './plugins/vuetify';


Vue.use(BootstrapVue);
Vue.use(DropdownPlugin);
Vue.use(VueRouter);

library.add(faThumbsUp);
library.add(faThumbsDown);
library.add(faHeart);
library.add(faHeartBroken);
library.add(faList);
library.add(faComments);
library.add(faCommentSlash);
library.add(faInfo);
Vue.use(VueAxios, axios)

export const eventEmitter = new Vue();

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = true;


new Vue({
  store,
  render: h => h(App),
  vuetify,
  router
}).$mount('#app');

