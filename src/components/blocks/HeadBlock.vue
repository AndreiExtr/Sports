<template>
  <header class="head">
    <BackIcon
    @click="this.$router.go(-1)"
    v-if="isActiveBack"
    v-bind:class="{ active: isActiveBack }"
    />
    <p v-if="showTitle">СПИСОК ВИДОВ СПОРТА</p>
    <p v-if="showSportHeader">КОМАНДЫ ПО {{ sportName }}</p>
    <div class="head_inputСheckbox" v-if="showCheck">
      <input type="checkbox" class="checkbox" id="agreement" >
      <h4>Показать только избранные</h4>
    </div>
  </header>
</template>

<script>
import BackIcon from '@/components/icons/BackIcon.vue'

export default {
  name: 'HeadBlock',
  components: {
    BackIcon
  },
  props: {
    isActiveBack: Boolean,
    sportName: {
      type: String,
      required: true
    },
    showSportHeader: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showCheck: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
.head{
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 200px;
  z-index: 4;
  background-color: #161516;
  gap: 24px;

  &_inputСheckbox{
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #ffffff;
    margin-left: auto;

    .checkbox {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      border: 2px solid #ffffff;
      border-radius: 4px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      cursor: pointer;
      position: relative;

      &:checked {
        background-color: #00c3ff;
        border: none;
      }

      &:checked::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }

  p{
    font-weight: 500;
    font-size: clamp(1em, 4vw, 2em);
    color: #ffffff;
  }

  @media (max-width: 1280px) {
    padding: 20px 40px;
  }
}
</style>
