<template>
  <div class="card" >
    <p class="card_title" @click="handleClick">{{ sportName }}</p>
    <div class="card_icons">
      <FavoriteIcon :itemId="sportId" :isFavorite="isFavorite" @click="toggleFavorite" />
      <DeleteIcon @delete="deleteCard"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FavoriteIcon from '../icons/FavoriteIcon.vue'
import DeleteIcon from '../icons/DeleteIcon.vue'

export default {
  name: 'CardSport',
  components: {
    FavoriteIcon,
    DeleteIcon
  },
  props: {
    sportName: {
      type: String,
      required: true
    },
    sportId: {
      type: [String, Number],
      required: true
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions(['removeItem']),
    handleClick () {
      this.$emit('select', { sportName: this.sportName, sportId: this.sportId })
    },
    deleteCard () {
      console.log('Deleting card with ID:', this.sportId)
      this.$emit('delete', this.sportId)
    },
    toggleFavorite () {
      this.$emit('toggleFavorite', this.sportId)
    }
  }
}
</script>

<style lang="scss">
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 350px;
  height: 120px;
  padding: 16px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.301);
  border-radius: 4px;
  cursor: pointer;

  &_title{
    font-weight: 400;
    font-size: 1em;
    text-align: left;
    color: #ffffff;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
    max-width: 100%;
    max-height: 64px;

    &:hover {
      color: #00c3ff;
    }
  }

  &_icons{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 16px;
  }

  &:hover {
    box-shadow: 0px 10px 17px #00c3ff2e;
  }
}
</style>
