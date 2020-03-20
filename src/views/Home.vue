<template>
  <div class="container">
    <Lobby/>
  </div>
</template>

<script>
// @ is an alias to /src
import Lobby from '@/components/Lobby.vue'

export default {
  name: 'Home',
  components: {
    Lobby
  }
}
</script>
