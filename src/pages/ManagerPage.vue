<template>
  <div>
    <ManagerNav/>
    <router-view/>
    <MusicPlayer/>
  </div>
</template>

<script>
import ManagerNav from '@/components/ManagerPage/ManagerNav'
import MusicPlayer from '../components/ManagerPage/MusicPlayer'

export default {
  name: 'ManagerPage',
  components: { ManagerNav, MusicPlayer }
}
</script>

<style scoped>

</style>
