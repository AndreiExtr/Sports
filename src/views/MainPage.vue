<template>
  <div class="home">
    <HeadBlock
      :is-favorites-only="isFavoritesOnly"
      @toggle-favorites="isFavoritesOnly = $event"
    />
    <MainBlock
      :is-favorites-only="isFavoritesOnly"
      :favorites="favorites"
      @update-favorites="updateFavorites"
    />
  </div>
</template>

<script>
import HeadBlock from '@/components/blocks/HeadBlock'
import MainBlock from '@/components/blocks/MainBlock'

export default {
  data () {
    return {
      isFavoritesOnly: false,
      favorites: JSON.parse(localStorage.getItem('favorites')) || []
    }
  },
  components: {
    HeadBlock,
    MainBlock
  },
  methods: {
    updateFavorites (newFavorites) {
      this.favorites = newFavorites
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }
  },
  created () {
    this.$store.dispatch('initializeFavorites') //  Инициализация - загрузка сохраненные данные из localStorage
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
