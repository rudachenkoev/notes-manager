<script>
import DialogWindow from '@/components/DialogWindow.vue'
import { mapState, mapActions } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

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
  computed: mapState({
    noteCategories: state => state.notes.categories
  }),
  setup () {
    return { v$: useVuelidate() }
  },
  validations () {
    return {
      body: {
        name: { required },
        category: { required },
        content: { required }
      }
    }
  },
  methods: {
    ...mapActions(['addNote', 'updateNote']),

    generateRandomKey () {
      /* Most likely a working version of the product would use a unique value as an identifier,
       but for now I'm generating a random key for this one */
      return Math.random().toString(36).substring(2, 15)
    },

    setInitialBodyState () {
      return {
        id: this.generateRandomKey(),
        name: '',
        category: null,
        content: '',
        createdAt: ''
      }
    },

    open (note = null) {
      // Prefill fields for editing a note or set an initial object
      this.body = note
        ? Object.keys(this.body).reduce((t, k) => ({ ...t, [k]: note[k] }), {})
        : this.setInitialBodyState()
      this.isEditing = !!note
      // Open the dialog window
      this.isModalOpen = true
    },

    onSubmit () {
      // Check fields for validity
      if (this.v$.$invalid) return this.v$.$touch()
      // Save changes to the store
      if (this.isEditing) this.updateNote(this.body)
      else this.addNote(this.body)
      // Close the dialog window
      this.isModalOpen = false
      // Clear the input values previously entered to the initial state
      this.onClear()
    },

    onClear () {
      this.body = this.setInitialBodyState()
      this.v$.$reset()
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
      <AppTextField
        v-model="body.name"
        :error-messages="v$.body.name.$errors"
        label="Name"
      />
      <AppSelect
        v-model="body.category"
        :items="noteCategories"
        :error-messages="v$.body.category.$errors"
        label="Category"
        class="mt-3"
      />
      <AppTextField
        v-model="body.content"
        :error-messages="v$.body.content.$errors"
        label="Content"
        class="mt-3"
      />
    </template>
    <template #actions>
      <AppButton label="Clear" variant="outlined" @click="onClear()"/>
      <AppButton label="Save" class="ml-3" @click="onSubmit()"/>
    </template>
  </DialogWindow>
</template>
