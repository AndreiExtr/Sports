<template>
  <div class="home">
    <HeadBlock />
    <MainBlock />
  </div>
</template>

<script>
import HeadBlock from '@/components/blocks/HeadBlock'
import MainBlock from '@/components/blocks/MainBlock'

export default {
  name: 'MainPage',
  components: {
    HeadBlock,
    MainBlock
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
