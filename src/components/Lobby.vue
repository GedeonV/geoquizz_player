<template>
  <div>
     <h1 class="title" style="margin-top: 1em;">
          Geoquizz
        </h1>

        <p class="subtitle">
         Jeu en ligne de géolocalisation
        </p>
         <section class="section">
          <div class="container">
            <h2 class="subtitle has-text-white">
              Bienvenue sur Geoquizz un jeu où vous devez vous repérer sur une carte du monde à l'aide d'une série de photo, faite le meilleur score possible en étant le plus proche de la localisation de la photo. Choissisez parmi plusieurs séries qui ont chacune leurs villes, pays différents. 
            </h2>
            <p class="subtitle has-text-white">Les <strong>règles</strong> sont simples celon votre niveau de difficulté choisie vous devrez faire un certain nombre de manche (allant de 10 à 20) Chaque manche, une photo vous sera proposez, vous devrez placer un point sur la carte, celon la distance de ce point par rapport à la localisation de la photo un score sera calculé. En plus de la distance la rapidité est importante plus vous serez rapide plus le multiplicateur de point sera élévé afin d'avoir le maximum de score qui est de 200 par manche</p>
          </div>
        </section>

        <section class="section">
          <div class="container">
            <h2 class="subtitle has-text-white"><strong>Score</strong></h2>
            <p class="subtitle has-text-white"> 
              <ul>
                <li>Moins de 50 mètres: 50pt</li>
              </ul>
            </p>
            <h2 class="subtitle has-text-white"><strong>Multiplicateur</strong></h2>
            <p class="subtitle has-text-white">
              FACILE
              <ul>
                <li>En dessous de 60sec: x4</li>
                <li>En dessous de 120sec: x2</li>
                <li>Au dessus de 120sec: x1</li>
              </ul>
            </p>
            <p class="subtitle has-text-white">
               NORMAL
              <ul>
                <li>En dessous de 40sec: x4</li>
                <li>En dessous de 80sec: x2</li>
                <li>Au dessus de 80sec: x1</li>
              </ul>
            </p>
            <p class="subtitle has-text-white"> 
               DIFFICILE
              <ul>
               <li>En dessous de 20sec: x4</li>
                <li>En dessous de 40sec: x2</li>
                <li>Au dessus de 40sec: x1</li>
              </ul>
            </p>
          </div>
        </section>
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
<style scoped lang="scss">
  @import "../scss/style.scss";
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


  section:first-of-type{
    border-radius: 5px;
    background-color: $color1;
  }

  section:nth-of-type(2){
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    border-radius: 5px;
    background-color: $color2;
  }

</style>
