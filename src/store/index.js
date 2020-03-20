import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vp = new VuexPersist({
	key: 'store',
	storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
	plugins : [vp.plugin],
	state: {

	},

	mutations: {

	},

	actions: {

	},

	modules: {
		
	}
})
