<template>
  <div class="gamescreen">
    <Map/>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue'

export default {
  name: 'Game',
  components: {
    Map
  },
}
</script>
