<template>
	<div>
		<l-map @click="addMarker"
	      style="height: 90vh; width: 100%":zoom="zoom" :center="center" @update:zoom="zoomUpdated" @update:center="centerUpdated" @update:bounds="boundsUpdated">
			<l-control id="picture" position="bottomright">
				<div class="card">
					<div class="card-image">
						<figure class="image is-4by3">
							<img :src="`./medias/${roundLocation.url}.jpg`" alt="photo">
						</figure>
					</div>
					<footer class="card-footer">
    					<a href="#" @click="getDistance()" class="card-footer-item">Calcul</a>
					</footer>
				</div>
			</l-control>
			<l-control position="topright">
				<div class="card">
					<div class="card-content">
						<p>Round: {{round}} / {{numberOfRound}}</p>
					</div>
				</div>
			</l-control>
			<l-control position="bottomleft">
				<div class="card">
					<div class="card-content">
						<p>Time: {{minutes}}:{{seconds}}</p>
					</div>
				</div>
			</l-control>
			<div v-if="roundEnd" class="card lcenter">
				<div class="card-content">
					<p>Score: {{roundScore}}pt</p> 
					<p>Distance: {{dist}}</p>
				</div>
			</div>
			<div v-if="roundEnd" class="card lmiddle">
				<div class="card-content">
					{{countdown}}
				</div>
			</div>
      		<l-tile-layer :url="url"></l-tile-layer>
      		<l-marker v-for="marker, index in markers" :lat-lng="marker" @click="removeMarker(index)" ></l-marker>
      		<l-polyline v-if="roundEnd" :lat-lngs="markers" ></l-polyline>
    	</l-map>
		<div class="modal" v-bind:class="{'is-active' : isActive }">
			  <div class="modal-background"></div>
			  <div class="modal-content">
			  	<div class="modal-card">
				    <header class="modal-card-head">
				      <p class="modal-card-title">Partie finie !</p>
				    </header>
				    <section class="modal-card-body">
				    	<p>Votre score final est de <span>{{totalScore}}pt</span></p>

				    	<h5 class="title is-5">Résumé de la partie :</h5>
				    	<ul>
				    		<li v-for="(i, index) in this.finalScore">
				    			Round {{index+1}} : {{i}}pt
				    		</li>
				    	</ul>
				    </section>
				    <footer class="modal-card-foot">
				      <button @click="goLeaderboard()" class="button is-success">Envoyer score</button>
				      <button  @click="restart()" class="button is-primary">Rejouer</button>
				    </footer>
				  </div>
			  </div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'Map',
		methods :{
			zoomUpdated (zoom) {
		      this.zoom = zoom;
		    },
		    centerUpdated (center) {
		      this.center = center;
		    },
		    boundsUpdated (bounds) {
		      this.bounds = bounds;
		    },
		    addMarker(event) {
				console.log(event.latlng)
				if(this.markers.length < 1){
					this.markers.push(event.latlng)
				} else if(this.markers.length != 2) {
					this.markers.pop()
					this.markers.push(event.latlng)
				}
			},
			removeMarker(index){
				this.markers.splice(index, 1)
			},
			checkDifficulty(){
				if(this.$store.state.difficulty == 1){
					console.log("Difficulté: FACILE")
					this.currentGame.difficulty = 1
					this.numberOfRound = 10
					this.bestTime = 60
				} else if (this.$store.state.difficulty == 2){
					console.log("Difficulté: NORMAL")
					this.currentGame.difficulty = 2
					this.numberOfRound = 15
					this.bestTime = 40
				} else if (this.$store.state.difficulty == 3){
					console.log("Difficulté DIFFICILE")
					this.currentGame.difficulty = 3
					this.numberOfRound = 20
					this.bestTime = 20
				}
			},
			checkMatchDetail(){
				this.center = [this.$store.state.match.latitude,this.$store.state.match.longitude]
			},
			restart(){
				this.isActive = false
				this.finalScore = []
				this.$store.commit('continue_game')
				this.startRound()
			},
			startRound(){
				this.seconds = 0
				this.minutes = 0
				clearInterval(this.refresh)
				this.timer = setInterval(() => {
					this.seconds += 1
					if(this.seconds == 60){
						this.minutes += 1
						this.seconds = 0
					}  
				}, 1000)
				this.round += 1 
				this.currentGame.round = this.round
				if(this.round == (this.numberOfRound + 1) ){ 
					this.round = 0
					this.getScoreFinal()
					//this.$router.push('/leaderboard')
					this.isActive = true;
					this.$store.commit('finish_game')
					let data = {}
					data.score = this.totalScore
					data.status = 3
					axios.put('game/'+this.$route.params.id,data).then(response => {
						console.log(response.data)
					})
				}

				console.log("Round: " + this.round)
				//let json = require('../json/NancyLocation.json')
				//console.log(json.possibleLocation)
				//this.roundLocation = json.possibleLocation[Math.floor(Math.random() * json.possibleLocation.length)];
				axios.get('serie/'+this.$route.params.id+'/picture')
				.then(response => {
					console.log(response.data)
					this.roundLocation = response.data.photos[Math.floor(Math.random() * response.data.photos.length)]
					this.currentGame.photo = this.roundLocation
				})
				
				this.startTime = new Date()
				console.log(this.startTime)
				
				this.zoom = 12
			    this.center =  [this.$store.state.match.latitude,this.$store.state.match.longitude],
			    this.markers = []
			    this.roundEnd = false 
			    this.roundScore = 0
			    this.countdown = 5


			    this.currentGame.score = this.finalScore
			    if(this.$store.state.status == 1){
			    	this.$store.commit('currentGame', this.currentGame)
			    } 
			    else if(this.$store.state.status == 2){
			    	this.round = this.$store.state.currentRound
			    	this.finalScore = this.$store.state.currentScore
			    	this.roundLocation = this.$store.state.currentPhoto 
			    	this.$store.commit('continue_game')
			    }
			},

			getDistance(){
				if (this.markers.length > 0){
					let position1 = this.markers[0]
					console.log(position1)
					let position2 = {"lat": this.roundLocation.latitude,"lng": this.roundLocation.longitude}
					console.log(position2)
					let distance = position1.distanceTo(position2)
					this.dist = (Math.round(distance*100)/100).toString()
					if(distance > 1000) {
						console.log(position1.distanceTo(position2)/1000 + ' Km')
						this.dist = Math.round((this.dist/1000)*100)/100
						this.dist += " Km"
					} else {
						console.log(position1.distanceTo(position2) + ' Meter')
						this.dist += " Meter"
					}
					this.markers.push(position2)
					this.roundEnd = true
					this.getScore(distance)
				} else {
					alert('Veuillez placer votre point d\'abord')
				}
			},

			getScore(d){
				clearInterval(this.timer)
				let endTime = new Date()
				let timeDiff = endTime - this.startTime
				timeDiff /= 1000
				let timeSeconds = Math.round(timeDiff)
				console.log(timeSeconds + " s")

				let score = Math.round(50*Math.exp(-d/1000))
				if(score > 45){
					score = 50
				}
				console.log(score)

				if(timeSeconds <=  this.bestTime){
					this.roundScore = score * 4
				} else if (timeSeconds <= (this.bestTime*2)){
					this.roundScore = score * 2
				} else if (timeSeconds >= (this.bestTime*2))
					this.roundScore = score
				console.log(this.roundScore)
				if(this.finalScore.length <= this.numberOfRound ){
					this.finalScore.push(this.roundScore)
				}
				this.refresh = setInterval(() => {
					if(this.countdown != 0){
						this.countdown -= 1
					} else {
						this.startRound()
					}
				},1000)
			},
			getScoreFinal(){
				this.finalScore.forEach((item) => {
					this.totalScore += item
				})
			},
			goLeaderboard(){
				this.$router.push('/leaderboard')
			}

		}, 
		data(){
			return {
				url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			    zoom: 12,
			    center: [0,0],
			    bounds: null,
			    markers: [],

			    dist : "",

			    roundEnd : false, 
			    roundLocation :  
			    {
					
				},
				startTime : "",
				round : 0, 
				roundScore : 0,
				finalScore : [],
				totalScore: 0,
				countdown : 5,
				refresh : null,
				isActive: false,
				numberOfRound : 0, 
				bestTime : 0,
				timer: null,
				seconds: 0,
				minutes : 0,
				currentGame: {}
			}
		},
		watch:{
		    $route (to, from){
		    
		    }
		}, 		
		mounted(){
			this.checkDifficulty()
			this.checkMatchDetail()
			if(this.round == 0){
				this.startRound()
			}
		},
		created(){
			window.addEventListener('beforeunload', (e) => {
				e.preventDefault()
				e.returnValue = 'Are you sure about that ?'
				e.return = 'Are you sure about that ?'
			})
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import "../scss/style.scss";

	div.gamescreen {
	    position:fixed;
	    padding:0;
	    margin:0;

	    top:0;
	    left:0;

	    width: 100%;
	    height: 100%;
	    background:rgba(255,255,255,0.5);
	}

	div#picture{
		width: 200px;
		transition: 0.5s;
		&:hover{
			width: 550px;
			transition: 0.5s;
		}
	}

	.card{
		border-radius: 10px;

		.card-footer-item{
			background-color: $color1;
			color: white;
			border-bottom-right-radius: 10px;
			border-bottom-left-radius: 10px;
		}

		.card-footer-item:hover{
			background-color: $color2;
		}
	}

	.lcenter{
		position: absolute;
		left: 50%;
		bottom: 0;
		z-index: 1000;
		margin-bottom: 2em;
		transform: translate(-50%, -50%);
	}

	.lmiddle{
		position: absolute;
		left: 50%;
		bottom: 90%;
		z-index: 1000;
		transform: translate(-50%, 20%);
	}

	.leaflet-grab{
		cursor: crosshair;
	}

	.modal{
		z-index: 1000;
	}

	h5{
		margin-top: 12px;
		margin-bottom: 12px;
	}

</style>
