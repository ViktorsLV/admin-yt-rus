<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitForm">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >
            Введите название
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.title.minValue }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.limit.minValue"
            >Минимальная величина {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      title: '',
      limit: 100,
    }
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  methods: {
    async submitForm() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        })
        console.log(category);
        this.title = ""
        this.limit = 100
        this.$v.$reset()
        this.$message('Category was made')
        this.$emit('created', category)
        /* eslint-disable */
      } catch (err) {}
    },
  },
  mounted() {
    window.M.updateTextFields()
  },
}
</script>

<style lang="scss" scoped>
</style>