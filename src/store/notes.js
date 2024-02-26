export default {
  state: () => ({
    items: [],
    categories: [
      { id: 1, name: 'Work tasks' },
      { id: 2, name: 'Personal goals' },
      { id: 3, name: 'Creative ideas' },
      { id: 4, name: 'Learning and self-development' },
      { id: 5, name: 'Travels and places' }
    ]
  }),
  mutations: {
    NOTES_SET_DATA(state, data) {
      Object.entries(data).forEach(([key, value]) => (state[key] = value))
    },
    NOTES_UPDATE_DATA(state, data) {
      Object.entries(data).forEach(([key, value]) => {
        const index = state[key].findIndex(item => item.id === value.id)
        if (index !== -1) state[key].splice(index, 1, value)
      })
    },
    NOTES_DELETE_DATA(state, data) {
      Object.entries(data).forEach(([key, id]) => {
        const index = state[key].findIndex(item => item.id === id)
        if (index !== -1) state[key].splice(index, 1)
      })
    }
  },
  actions: {
    getNotes ({ commit }) {
      const notes = localStorage.getItem('notes')
      if (notes) commit('NOTES_SET_DATA', { items: notes })
    }
  },
  // getters: {
  //   ...
  // }
}
