<template>
  <div class="content-main">
    <div class="content-main__cards">
      <CardSport
        v-for="sport in filteredSports"
        :key="sport.sport_id"
        :sportName="sport.sport_name"
        :sportId="sport.sport_id"
        @select="handleCardSelect"
        @delete="handleDelete"
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
  data () {
    return {
      sports: [],
      deletedSports: JSON.parse(localStorage.getItem('deletedSports') || '[]'), // Список удаленных карточек из localStorage
      favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
      isFavoritesOnly: false // Состояние чекбокса "Показать только избранные"
    }
  },
  computed: {
    filteredSports () {
      let filtered = this.sports.filter(sport => !this.deletedSports.includes(sport.sport_id))
      if (this.isFavoritesOnly) {
        filtered = filtered.filter(sport => this.favorites.includes(sport.sport_id))
      }
      return filtered
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
        this.sports = data.sports
      })
      .catch(error => console.log('error', error))
  },
  methods: {
    handleDelete (itemId) {
      // Добавляется ID удаленного элемента в список deletedSports и сохраняется в localStorage
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
      } else {
        console.error('Invalid sportId or sportName')
      }
    },
    handleToggleFavorite (sportId) {
      const index = this.favorites.indexOf(sportId)
      if (index === -1) {
        this.favorites.push(sportId)
      } else {
        this.favorites.splice(index, 1)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    toggleFavorites (isChecked) {
      this.isFavoritesOnly = isChecked
    }
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
