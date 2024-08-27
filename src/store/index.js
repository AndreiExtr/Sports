import { createStore } from 'vuex'

export default createStore({
  state: {
    items: [],
    favorites: {}
  },
  mutations: {
    SET_ITEMS (state, items) {
      state.items = items
    },
    UPDATE_ITEM (state, updatedItem) {
      state.items = state.items.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    },
    REMOVE_ITEM (state, itemId) {
      state.items = state.items.filter(item => item.sport_id !== itemId)
      localStorage.setItem('items', JSON.stringify(state.items))
    },
    TOGGLE_FAVORITE (state, itemId) {
      if (state.favorites[itemId]) {
        delete state.favorites[itemId]
      } else {
        state.favorites[itemId] = true
      }
    },
    SET_FAVORITES (state, favorites) {
      state.favorites = favorites
    }
  },
  actions: {
    async fetchItems ({ commit }) {
      try {
        const response = await fetch('https://api.apilayer.com/therundown/sports', {
          headers: {
            apikey: 't3crgWqyGOihw8fqKx1VqeIgEUTSCUAu'
          }
        })
        const data = await response.json()
        commit('SET_ITEMS', data.sports)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    },
    toggleFavorite ({ commit, state }, itemId) {
      commit('TOGGLE_FAVORITE', itemId)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    initializeFavorites ({ commit }) {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '{}')
      commit('SET_FAVORITES', savedFavorites)
    },
    initializeItems ({ commit }) {
      const savedItems = JSON.parse(localStorage.getItem('items') || '[]')
      commit('SET_ITEMS', savedItems)
    },
    removeItem ({ commit }, itemId) {
      commit('REMOVE_ITEM', itemId)
    }
  },
  getters: {
    isFavorite: (state) => (itemId) => {
      return !!state.favorites[itemId]
    },
    items (state) {
      return state.items
    }
  }
})
