<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit 
        v-if="categories.length"
        :categories="categories"
        :key="categories.length + updateCount"
        @updated="updateCategories"
        />
        <p v-else class="center">There are no categories yet</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/app/CategoryCreate'
import CategoryEdit from '@/components/app/CategoryEdit'
export default {
  name: 'categories',
  
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  async mounted() {
    this.categories =  await this.$store.dispatch('fetchCategories')
    console.log(this.categories);
    this.loading = false
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    }
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  },
}
</script>

<style lang="scss" scoped>
</style>