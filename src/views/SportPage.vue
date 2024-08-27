<template>
  <div class="content_teams">
    <HeadBlock
    :isActiveBack="true"
    :showSportHeader="true"
    :sportName="sportName"
    :showTitle="false"
    :showCheck="false"
    />
    <div class="content_teams_cards">
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
    const teams = ref([]) // объявляем реактивную переменную teams

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
.content_teams{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  &_cards{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    margin: 130px 200px;
  }

  @media (max-width: 1280px) {
    margin: 0px 40px;
  }
}
</style>
