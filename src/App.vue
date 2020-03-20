<template>
  <div id="app">
    <div id="nav">
      <router-link  to="/">Home</router-link> |
      <router-link  to="/play">Play</router-link> |
      <router-link  to="/leaderboard">Leaderboard</router-link> | 
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script type="text/javascript">
  export default{
    
    mounted(){
      let header = document.createElement('script')
      header.setAttribute('src', 'https://use.fontawesome.com/releases/v5.3.1/js/all.js')
      document.head.appendChild(header)
    },

  }
</script>



<style lang="scss">

@import "scss/style.scss";
@import "../node_modules/bulma/bulma.sass";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>


