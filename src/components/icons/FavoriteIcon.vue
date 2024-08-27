<template>
  <svg
    class="favorite-icon"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    xmlns="http://www.w3.org/2000/svg"
    @click="toggleActive"
    :class="{ active: isActive }">
    <circle class="favorite-icon-circle" cx="15" cy="15" r="14.5" />
    <path class="favorite-icon-path" d="M15 4.5L17.15 11.2H24.3L18.575 14.8L20.725 21.5L15 17.9L9.275 21.5L11.425 14.8L5.7 11.2H12.85L15 4.5Z" />
  </svg>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FavoriteIcon',
  props: {
    itemId: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    ...mapGetters(['isFavorite']),
    isActive () {
      return this.isFavorite(this.itemId)
    }
  },
  methods: {
    ...mapActions(['toggleFavorite']),
    toggleActive () {
      this.toggleFavorite(this.itemId)
    }
  },
  created () {
    this.$store.dispatch('initializeFavorites')
  }
}
</script>

<style lang="scss" scoped>
.favorite-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;

  .favorite-icon-circle {
    fill: none;
    stroke: #00c3ff;
    stroke-width: 1;
    transition: stroke 0.2s ease, fill 0.2s ease;
  }

  .favorite-icon-path {
    fill: #00c3ff;
    transition: fill 0.2s ease;
  }

  &.active {
    .favorite-icon-circle {
      fill: #00c3ff; /* Круг становится активным */
      stroke: none;
    }

    .favorite-icon-path {
      fill: #ffffff; /* Звезда становится белой */
    }
  }

  &:hover {
    .favorite-icon-circle {
      fill: #00c3ff;
      stroke: none;
    }

    .favorite-icon-path {
      fill: #ffffff;
    }
  }
}
</style>
