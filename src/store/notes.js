import router from '@/router'

export default {
  state: () => ({
    items: [],
    favourites: [],
    categories: [
      { id: 1, name: 'Work tasks' },
      { id: 2, name: 'Personal goals' },
      { id: 3, name: 'Creative ideas' },
      { id: 4, name: 'Learning and self-development' },
      { id: 5, name: 'Travels and places' }
    ]
  }),
  mutations: {
    SET_NOTES(state, payload) {
      state.items = payload
    },
    ADD_NOTE(state, payload) {
      state.items.push(payload)
    },
    UPDATE_NOTE(state, payload) {
      const index = state.items.findIndex(item => item.id === payload.id)
      if (index !== -1) state.items.splice(index, 1, payload)
    },
    DELETE_NOTE(state, id) {
      state.items = state.items.filter(item => item.id !== id)
    },
    SET_FAVOURITE_NOTES(state, payload) {
      state.favourites = payload
    },
    ADD_FAVOURITE_NOTES(state, payload) {
      state.favourites.push(payload)
    },
    DELETE_FAVOURITE_NOTE(state, id) {
      state.favourites = state.favourites.filter(noteId => noteId !== id)
    }
  },
  actions: {
    getNotes ({ commit }) {
      const notes = localStorage.getItem('notes')
      if (notes) commit('SET_NOTES', JSON.parse(notes))
    },
    addNote ({ commit, state }, body) {
      const currentTime = new Date().toISOString()
      const note = { ...body, createdAt: currentTime, modifiedAt: currentTime }
      commit('ADD_NOTE', note)
      localStorage.setItem('notes', JSON.stringify(state.items))
    },
    updateNote ({ commit, state }, body) {
      const currentTime = new Date().toISOString()
      const note = { ...body, modifiedAt: currentTime }
      commit('UPDATE_NOTE', note)
      localStorage.setItem('notes', JSON.stringify(state.items))
    },
    deleteNote ({ commit, dispatch, state }, id) {
      commit('DELETE_NOTE', id)
      localStorage.setItem('notes', JSON.stringify(state.items))
      dispatch('deleteFavouriteNote', id)
    },

    // FAVOURITE NOTES
    getFavouriteNotes ({ commit }) {
      const favourites = localStorage.getItem('favourites')
      if (favourites) commit('SET_FAVOURITE_NOTES', JSON.parse(favourites))
    },
    addFavouriteNote ({ commit, state }, id) {
      commit('ADD_FAVOURITE_NOTES', id)
      localStorage.setItem('favourites', JSON.stringify(state.favourites))
    },
    deleteFavouriteNote ({ commit, state }, id) {
      commit('DELETE_FAVOURITE_NOTE', id)
      localStorage.setItem('favourites', JSON.stringify(state.favourites))
    }
  },
  getters: {
    getCategoryById: state => id => state.categories.find(item => item.id === id),
    isFavouriteNote: state => id => state.favourites.some(noteId => noteId === id),
    getFilteredNotes: state => () => {
      let items = state.items
      const { category, isFavourite } = router.currentRoute.value.query
      if (category) items = items.filter(item => item.category === +category)
      if (isFavourite) {
        const isFav = isFavourite === 'true'
        items = items.filter(item => isFav ? state.favourites.includes(item.id) : !state.favourites.includes(item.id))
      }
      return items
    }
  }
}
