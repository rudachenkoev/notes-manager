<script>
import DialogWindow from '@/components/DialogWindow.vue'
export default {
  name: 'Form',
  components: {
    DialogWindow
  },
  data () {
    return {
      body: this.setInitialBodyState(),
      isModalOpen: false,
      isEditing: false
    }
  },
  methods: {
    setInitialBodyState () {
      return {
        name: '',
        category: null,
        content: ''
      }
    },

    open (note = null) {
      if (note) this.body = Object.keys(this.body).reduce((t, k) => ({ ...t, [k]: note[k] }), {})
      this.isEditing = !!note
      this.isModalOpen = true
    }
  }
}
</script>

<template>
  <DialogWindow
    v-model="isModalOpen"
    :title="isEditing ? 'Editing an existing note' : 'Adding a new note'"
  >
    <template #content>
      Content is here
    </template>
  </DialogWindow>
</template>
