<template>
  <div>
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <Navbar @click="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>
  
      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Add new record'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  components: {
    Navbar,
    Sidebar,
  },
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  computed: {
    error() {
      return this.$store.getters.error
    },
  },
  watch: {
      error(fbError) {
          this.$error(messages[fbError.code] || 'Something went wrong')
      }
  },

  /* do all async functions in mounter hook because actions performed in mounted happen after the whole tree of code has been loaded ? */
  async mounted() {
    /* Object.keys wraps the getter into object and then we can check that objects length or used it with lodash */
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
}
</script>

<style lang="scss" scoped>
</style>