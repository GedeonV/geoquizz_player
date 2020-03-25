<template>
	<div class="container">
		<div class="card">
			<div class="card-content">
				<div class="field is-grouped">
				<label class="label">Nom </label>
				  <div class="control">
				  	<input class="input" v-model="player_name" type="text" placeholder="Pseudonyme">
				  </div>
				</div>
			</div>
		</div>
		<br>
		<div class="card">
			<div class="card-content">
				<div class="field is-grouped">
				<label class="label">Difficulté</label>
				  <p class="control has-icons-left">
				    <span class="select">
				      <select v-model="difficulty">
				        <option selected value="1">Facile</option>
				        <option value="2">Normal</option>
				        <option value="3">Difficile</option>
				      </select>
				    </span>
				    	<span class="icon is-small is-left">
				      		<i class="fas fa-globe"></i>
				    	</span>
				  	</p>
				</div>
			</div>
		</div>
		<br>
		<div class="card">
			<div class="card-content">
				<div class="field is-grouped">
				<label class="label">Série</label>
				  <p class="control has-icons-left">
				    <span class="select">
				      <select v-model="match">
				        <option selected>Nancy</option>
				        <option>Metz</option>
				        <option>Epinal</option>
				      </select>
				    </span>
				    	<span class="icon is-small is-left">
				      		<i class="fas fa-globe"></i>
				    	</span>
				  	</p>

				</div>
			</div>
		</div>
		<br>
	  	<div class="control">
			<div v-if="player_name.length > 0" class="buttons">
				<router-link :to="{
					name: 'gameID', 
					params: { id: gameID  }}">
	  				<button @click="start" class="button is-primary">Jouer</button>
	  			</router-link>
			</div>
		</div>
		<hr>
		<div v-if="this.$store.state.status != 0 && this.$store.state.status != 3" class="control">
			<p>Vous avez quitter votre partie, pour la reprendre cliquer sur le bouton</p>
			<br>
			<div  class="buttons">
				<router-link :to="{
					name: 'gameID', 
					params: { id: gameID  }}">
	  				<button @click="resume" class="button is-primary">Reprendre</button>
	  			</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'Start',
		methods :{
			start(){
				let data = {}
				data.player_name = this.player_name
				data.difficulty = this.difficulty
				data.match = this.match
				this.$store.commit('game_details', data)
			},
			resume(){
				this.$store.commit('resume_game')
			}
		}, 
		data(){
			return {
				gameID : 1234, 
				difficulty: "1",
				match : "Nancy",
				player_name : ""
			}
		},
		watch:{
		    $route (to, from){
		    
		    }
		}, 		
		mounted(){
			axios.get('series')
			.then(response => {
				console.log(response)
			}).catch(error => {
				console.log(error.response)
			})
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	div.card-content{

		&> div.field{

			&> p.control {
				margin: auto;
				width: 75%;
				
				&> span.select {
					width: 100%;

						&> select {
							width: 100%;
						}
				}
			}

			&> div.control{
				margin: auto;
				width: 75%;

				&>input{
					width: 100%;
				}

			}
			
		}
	}
</style>
