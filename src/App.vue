<template>
  <div id="app">
   <div id="nav">
      <nav class="navbar">
          <div class="navbar-brand">
            <a class="navbar-item">
              <img src="./assets/logo.png" width="64" height="100">
            </a>
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div class="navbar-menu">
            <div class="navbar-start">
              <router-link class="navbar-item" to="/">Accueil</router-link> 
              <router-link  class="navbar-item" to="/play">Jouer</router-link> 
              <router-link  class="navbar-item" to="/leaderboard">Classement</router-link>
           </div> 
          </div>
      </nav>
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
  position: sticky;
  top: 0px;
  border-bottom: 1px solid $color1;
  z-index: 1000000;
}

.navbar-item img {
  max-height: none !important;
}

.navbar-item:hover {
 color: $color1 !important;
}

.router-link-exact-active {
  color: $color1 !important;
}


</style>


