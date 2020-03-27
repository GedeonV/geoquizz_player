<template>
  <div>
    <h1 class="title" style="margin-top: 1em">Classement des Joueurs</h1>
    <table class="table is-hoverable  is-fullwidth is-striped" >
      <thead>
        <tr>
          <th><abbr title="Position">Classement</abbr></th>
          <th><abbr title="Position">Joueur</abbr></th>
          <th><abbr title="Position">Score</abbr></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th><abbr title="Position">Classement</abbr></th>
          <th><abbr title="Position">Joueur</abbr></th>
          <th><abbr title="Position">Score</abbr></th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="(player, index) in leaderboard">
          <th>#{{index +1}}</th>
          <td>{{player.pseudo}}</td>
          <td>{{player.score}}</td>
        </tr>      
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Result',
  methods :{
    sort(a,b){
      if(a.score < b.score) return -1
      else if (a.score == b.nom) return 0
      else return 1
    }
  }, 
  data(){
    return {
      leaderboard : null
    }
  },
  mounted(){
    axios.get('games').then(response => {
      console.log(response.data)
      this.leaderboard = response.data.series
      this.leaderboard.sort(this.sort)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
  table{
    border: 2px solid $color1;
  }
</style>
