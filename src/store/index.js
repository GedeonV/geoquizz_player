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
		player_name : '',
		difficulty : null,
		match : '',
		status : 0,

		currentRound : 0, 
		currentPhoto : null, 
		currentDifficulty : 0, 
		currentScore : [],
	},

	mutations: {
		game_details(state, data){
			state.player_name = data.player_name
			state.difficulty = data.difficulty
			state.match = data.match
			state.status = 1
		},
		currentGame(state, data){
			state.currentRound = data.round
			state.currentPhoto = data.photo
			state.currentDifficulty = data.difficulty
			state.currentScore = data.score
		},
		resume_game(state){
			state.status = 2
		},

		continue_game(state){
			state.status = 1
		},
		finish_game(state){
			state.currentRound = 0
			state.currentPhoto = null
			state.currentDifficulty = 0,
			state.currentScore = []
			state.status = 3
		}
	},

	actions: {

	},

	modules: {
		
	}
})
