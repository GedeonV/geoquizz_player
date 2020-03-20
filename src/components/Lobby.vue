<template>
  <div>
     <h1 class="title">
          Geoquizz
        </h1>

        <p class="subtitle">
         Jeu en ligne de géolocalisation
        </p>
  </div>
</template>

<script>
export default {
  name: 'Lobby',
  props: {
    msg: String
  },
  methods :{
    test(){
      alert("test")
    },
  }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
