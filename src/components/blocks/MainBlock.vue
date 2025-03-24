<template>
  <div class="content-main">
    <div class="content-main__cards">
      <CardSport
        v-for="sport in filteredSports"
        :key="sport.sport_id"
        :sportName="sport.sport_name"
        :sportId="sport.sport_id"
        :isFavorite="Array.isArray(favorites) && favorites.includes(sport.sport_id)"
        @select="handleCardSelect"
        @delete="handleDelete"
        @toggle-favorite="handleToggleFavorite"
      />
    </div>
  </div>
</template>

<script>
import CardSport from '@/components/elements/CardSport.vue'

export default {
  name: 'MainBlock',
  components: {
    CardSport
  },
  props: {
    isFavoritesOnly: Boolean,
    favorites: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      sports: [],
      deletedSports: this.getLocalStorageArray('deletedSports')
    }
  },
  methods: {
    getLocalStorageArray (key) {
      try {
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : []
      } catch (e) {
        console.error(`Error parsing ${key} from localStorage`, e)
        return []
      }
    },

    handleDelete (itemId) {
      this.deletedSports.push(itemId)
      localStorage.setItem('deletedSports', JSON.stringify(this.deletedSports))
    },

    handleCardSelect ({ sportId, sportName }) {
      if (sportId && sportName) {
        this.$router.push({
          name: 'SportPage',
          params: { sportId },
          query: { sportName }
        })
      }
    },

    handleToggleFavorite (sportId) {
      // Создаем копию массива favorites
      const newFavorites = [...this.favorites]
      const index = newFavorites.indexOf(sportId)

      if (index === -1) {
        newFavorites.push(sportId)
      } else {
        newFavorites.splice(index, 1)
      }

      // Отправляем событие родителю для обновления favorites
      this.$emit('update-favorites', newFavorites)
    }
  },
  computed: {
    filteredSports () {
      return this.sports.filter(sport => {
        const notDeleted = !this.deletedSports.includes(sport.sport_id)
        const isFavorite = this.favorites.includes(sport.sport_id)
        return notDeleted && (!this.isFavoritesOnly || isFavorite)
      })
    }
  },
  mounted () {
    fetch('https://api.apilayer.com/therundown/sports', {
      headers: {
        apikey: 't3crgWqyGOihw8fqKx1VqeIgEUTSCUAu'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.sports = data.sports || []
      })
      .catch(error => console.log('error', error))
  },
  created () {
    this.$store.dispatch('initializeFavorites') //  Инициализация - загрузка сохраненные данные из localStorage
  }
}
</script>

<style lang="scss">
.content-main {
  margin-top: 119px;
  padding: 20px 200px;
  height: 100%;

  &__cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    justify-content: flex-start;

    /* Для карточек */
    > * {
      flex: 1 1 calc(33.333% - 20px);
      min-width: 200px;
      max-width: calc(33.333% - 20px);
    }

    /* Для мобильных */
    @media (max-width: 768px) {
      > * {
        flex: 1 1 calc(50% - 20px);
        max-width: calc(50% - 20px);
      }
    }
  }

  @media (max-width: 1280px) {
    padding: 20px;
  }

  @media (max-width: 375px) {
    padding: 10px;
  }
}
</style>
