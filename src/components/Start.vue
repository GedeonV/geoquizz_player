<template>
	<div class="container">
		<div class="card">
			<div class="card-content">
				<div class="field is-grouped">
				  <p class="control has-icons-left">
				    <span class="select">
				      <select>
				        <option selected>Nancy</option>
				        <option>Metz</option>
				        <option>Epinal</option>
				      </select>
				    </span>
				    	<span class="icon is-small is-left">
				      		<i class="fas fa-globe"></i>
				    	</span>
				  	</p>

				  	<div class="control">
						<div class="buttons">
							<router-link :to="{
								name: 'gameID', 
								params: { id: gameID  }}">
				  				<button class="button is-primary">Start</button>
				  			</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		name: 'Start',
		methods :{

		}, 
		data(){
			return {
				gameID : 1234, 
			}
		},
		watch:{
		    $route (to, from){
		    
		    }
		}, 		
		mounted(){

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
					width: 75%;

						&> select {
							width: 100%;
						}
				}
			}

			&> div.control{
				margin: auto;
			}
			
		}
	}
</style>
