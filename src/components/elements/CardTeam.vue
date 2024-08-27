<template>
  <div class="card_team">
    <!-- <p class="card_team_abbrev">сокращ. название</p>
    <p class="card_team_name">полное название</p>
    <p class="card_team_record">6-7-6</p> -->
    <ul class="card_team_list">
      <li class="card_team_item">Сокращенное название: {{ team.abbreviation }}</li>
      <li class="card_team_item">Полное название: {{ team.name }}</li>
      <li class="card_team_item">Рекорд: {{ team.record }}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'CardTeam',
  components: {},
  props: {
    team: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card_team {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #ffffff;
  width: 350px;
  height: auto;
  padding: 16px;
  gap: 16px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.301);
  border-radius: 4px;
  cursor: pointer;

  &_list {
    list-style: none;
    padding-left: 0;
    margin: 0;
    position: relative;
    line-height: 2.2;
  }

  &_item {
    position: relative;
    font-size: 1em;
    font-weight: 400;
    padding-left: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: calc(100% - 16px);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      background-color: #00c3ff;
      border-radius: 50%;
    }
  }

  &:hover {
    box-shadow: 0px 10px 17px #00c3ff2e;
  }
}
</style>
