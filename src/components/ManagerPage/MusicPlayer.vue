<template>
  <div class="back">
    <audio ref="audio" autoplay :src="audio.src"/>
  </div>
</template>

<script>

export default {
  name: 'MusicPlayer',
  data () {
    return {
      audio: {
        src: null
      }
    }
  },
  mounted () {
    this.bus.$on('play_event', (url) => {
      this.audio.src = url
    })
  }
}
</script>

<style scoped>

</style>
