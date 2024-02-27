<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import NotesForm from '@/components/Notes/Form.vue'
import NotesCard from '@/components/Notes/Card.vue'
import NotesFilter from '@/components/Notes/Filter.vue'
export default {
  name: 'Notes',
  components: {
    NotesForm,
    NotesCard,
    NotesFilter
  },
  computed: {
    ...mapGetters(['isFavouriteNote', 'getFilteredNotes']),
    ...mapState({
      notes: state => state.notes.items
    })
  },
  mounted() {
    this.getNotes()
    this.getFavouriteNotes()
  },
  methods: {
    ...mapActions(['getNotes', 'getFavouriteNotes', 'deleteNote', 'addFavouriteNote', 'deleteFavouriteNote']),

    handleFormDialogOpening(note = null) {
      // Open a dialog window with a form for creating/editing a note
      this.$refs.notesForm.open(note)
    },
    handleDeleting (note) {
      // Deleting a note after confirmation
      if (confirm('Are you sure you want to remove the note?')) this.deleteNote(note.id)
    },
    handleFavouriteState (note) {
      // Add or remove a note from your favorites
      if (this.isFavouriteNote(note.id) && confirm('Are you sure you want to remove the note from favourites?')) {
        this.deleteFavouriteNote(note.id)
      }
      else this.addFavouriteNote(note.id)
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="d-flex justify-space-between align-end">
      <NotesFilter/>
      <AppButton label="Create note" @click="handleFormDialogOpening()"/>
    </div>

    <div class="my-4">
      Total amount: <span class="fw-700">{{ getFilteredNotes().length }}</span>
    </div>

    <div class="row">
      <div :key="note.id" v-for="note in getFilteredNotes()" class="col-3">
        <NotesCard
          :note="note"
          @handleFormDialogOpening="handleFormDialogOpening(note)"
          @handleDeleting="handleDeleting(note)"
          @handleFavouriteState="handleFavouriteState(note)"
        />
      </div>
    </div>
  </div>

  <NotesForm ref="notesForm"/>
</template>
