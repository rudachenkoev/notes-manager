<script>
import { mapActions, mapState } from 'vuex'
import NotesForm from '@/components/Notes/Form.vue'
export default {
  name: 'Notes',
  components: {
    NotesForm
  },
  computed: mapState({
    notes: state => state.notes.items
  }),
  mounted() {
    this.getNotes()
  },
  methods: {
    ...mapActions(['getNotes']),

    openNotesForm() {
      this.$refs.notesForm.open()
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="d-flex justify-space-between align-center">
      <div>
        Total amount: <span class="fw-700">{{ notes.length }}</span>
      </div>
      <button @click="openNotesForm()">Create note</button>
    </div>

    <div>{{ notes }}</div>
  </div>

  <NotesForm ref="notesForm"/>
</template>
