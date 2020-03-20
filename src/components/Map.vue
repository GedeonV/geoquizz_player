<template>
	<div>
		<l-map @click="addMarker"
	      style="height: 90vh; width: 100%":zoom="zoom" :center="center" @update:zoom="zoomUpdated" @update:center="centerUpdated" @update:bounds="boundsUpdated">
			<l-control id="picture" position="bottomright">
				<div class="card">
					<div class="card-image">
						<figure class="image is-4by3">
							<img :src="`./medias/${roundLocation.img}`" alt="photo">
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
						<p>Round: {{round}} / 10</p>
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
				      <button class="delete" @click="closeModal" aria-label="close"></button>
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
				      <button @click="goLeaderboard()" class="button is-success">Classement</button>
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
				} else {
					this.markers.pop()
					this.markers.push(event.latlng)
				}
			},
			removeMarker(index){
				this.markers.splice(index, 1)
			},

			startRound(){
				clearInterval(this.refresh)
				this.round += 1 
				if(this.round == 3){ 
					this.round = 0
					this.getScoreFinal()
					//this.$router.push('/leaderboard')
					this.isActive = true;
				}

				console.log("Round: " + this.round)
				let json = require('../json/NancyLocation.json')
				console.log(json.possibleLocation)
				this.roundLocation = json.possibleLocation[Math.floor(Math.random() * json.possibleLocation.length)];
				this.startTime = new Date()
				console.log(this.startTime)
				this.zoom = 12
			    this.center =  [48.68852651517118, 6.174659729003907],
			    this.markers = []
			    this.roundEnd = false 
			    this.roundScore = 0
			    this.countdown = 20

			},

			getDistance(){
				if (this.markers.length > 0){
					let position1 = this.markers[0]
					console.log(position1)
					let position2 = this.roundLocation
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
					this.markers.push(this.roundLocation)
					this.roundEnd = true
					this.getScore(distance)
				} else {
					alert('Veuillez placer votre point d\'abord')
				}
			},

			getScore(d){
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

				if(timeSeconds <=  50){
					this.roundScore = score * 4
				} else if (timeSeconds <= 100){
					this.roundScore = score * 2
				} else if (timeSeconds >= 100)
					this.roundScore = score
				console.log(this.roundScore)
				if(this.finalScore.length <= 10 ){
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
			closeModal(){
				this.isActive = false
			},
			goLeaderboard(){
				this.$router.push('/leaderboard')
			}

		}, 
		data(){
			return {
				url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			    zoom: 12,
			    center: [48.68852651517118, 6.174659729003907],
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
				countdown : 20,
				refresh : null,
				isActive: false, 
			}
		},
		watch:{
		    $route (to, from){
		    
		    }
		}, 		
		mounted(){
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
