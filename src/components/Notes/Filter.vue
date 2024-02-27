<script>
import { mapState } from 'vuex'

export default {
  name: 'Filter',
  data () {
    return {
      filter: this.setInitialFilters(),
      isFavouriteList: [
        { value: 'true', name: 'Only favourites' },
        { value: 'false', name: 'All' }
      ]
    }
  },
  computed: {
    ...mapState({
      noteCategories: state => state.notes.categories
    })
  },
  mounted () {
    this.autocompleteFilter()
  },
  watch: {
    filter: {
      handler () {
        const query = Object.keys(this.filter)
          .filter(item => this.filter[item])
          .reduce((a, k) => ({ ...a, [k]: this.filter[k] }), {})
        this.$router.replace({ query })
      },
      deep: true
    }
  },
  methods: {
    setInitialFilters () {
      return {
        category: null,
        isFavourite: 'false'
      }
    },
    autocompleteFilter () {
      // Fill the filter fields with the applied values
      const parseNumericalString = value => !isNaN(value) ? Number(value) : value // Check if string value is number
      const query = { ...this.$route.query }
      Object.keys(query).map(key => query[key] = parseNumericalString(query[key]))
      Object.assign(this.filter, query)
    },
    onClear () {
      this.filter = this.setInitialFilters()
    }
  }
}
</script>

<template>
  <div class="d-flex align-end">
    <AppSelect
      v-model="filter.category"
      :items="noteCategories"
      class="mw-200 w-100"
      label="Category"
    />
    <AppSelect
      v-model="filter.isFavourite"
      :items="isFavouriteList"
      item-value="value"
      class="mw-200 w-100 ml-3"
      label="Favourites"
    />
    <AppButton label="Clear filters" class="ml-3" @click="onClear()"/>
  </div>
</template>
