<script>
import { convertDateTime } from '@/helpers'
import { mapGetters } from 'vuex'
import DropdownMenu from '@components/Dropdown.vue'

export default {
  name: 'Card',
  components: {
    DropdownMenu
  },
  props: {
    note: { type: Object, required: true }
  },
  data () {
    return {
      actionsList: [
        { name: 'Amend', onClick: () => this.$emit('handleFormDialogOpening') },
        { name: 'Delete', onClick: () => this.$emit('handleDeleting') }
      ]
    }
  },
  computed: mapGetters(['getCategoryById', 'isFavouriteNote']),
  methods: {
    convertDateTime
  }
}
</script>

<template>
<div class="card">
  <div class="d-flex align-start justify-space-between">
    <div class="card-title">{{ note.name }}</div>
    <div class="d-flex align-center">
      <AppButton
        variant="flat"
        :icon="`fa-${isFavouriteNote(note.id) ? 'solid' : 'regular'} fa-heart`"
        class="mr-4"
        @click="$emit('handleFavouriteState')"
      />
      <DropdownMenu :actions="actionsList" />
    </div>
  </div>

  <div class="my-3">{{ note.content }}</div>

  <div class="card-option">Category: {{ getCategoryById(note.category)?.name }}</div>
  <div class="card-option">Created at: {{ convertDateTime(note.createdAt) }}</div>
  <div class="card-option">Last modified at: {{ convertDateTime(note.modifiedAt) }}</div>
</div>
</template>
