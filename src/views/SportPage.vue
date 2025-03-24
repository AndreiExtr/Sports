<template>
  <div class="content-teams">
    <HeadBlock
    :isActiveBack="true"
    :showSportHeader="true"
    :sportName="sportName"
    :showTitle="false"
    :showCheck="false"
    />
    <div class="content-teams__cards">
      <CardTeam
        v-for="team in teams"
        :key="team.team_id"
        :team="team"
      />
    </div>
  </div>
</template>

<script>
import HeadBlock from '@/components/blocks/HeadBlock.vue'
import CardTeam from '@/components/elements/CardTeam.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

export default {
  name: 'SportPage',
  components: {
    HeadBlock,
    CardTeam
  },
  setup () {
    const route = useRoute()
    const sportId = route.params.sportId || route.query.sportId
    const sportName = route.query.sportName || 'Default Sport Name'
    const teams = ref([])

    onMounted(() => {
      fetch(`https://api.apilayer.com/therundown/sports/${sportId}/teams`, {
        method: 'GET',
        headers: {
          apikey: 't3crgWqyGOihw8fqKx1VqeIgEUTSCUAu'
        }
      })
        .then(response => response.json())
        .then(result => {
          teams.value = result.teams
        })
        .catch(error => console.log('error', error))
    })

    return { sportName, teams }
  }
}
</script>

<style lang="scss" scoped>
.content-teams{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  &__cards{
    margin-top: 119px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px 200px;

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

    @media (max-width: 1280px) {
      padding: 20px;
    }

    @media (max-width: 375px) {
      padding: 10px;
    }
  }
}
</style>
