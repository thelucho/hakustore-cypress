import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { auth } from './auth.module';
import { product } from './product.module';

Vue.use(Vuex);

const dataState = createPersistedState({
  paths: ['product']
})

export default new Vuex.Store({
  modules: {
    auth,
    product
  },
  plugins: [dataState],
});
