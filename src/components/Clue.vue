<template>
  <div class="clue">
    <p>Меньше</p>
    <div class="day-cell">
      <div class="white cell">
        <div class="info">
          <p class="count">No contributions</p>
        </div>
      </div>
    </div>
    <div class="day-cell">
      <div class="lightGray cell">
        <div class="info">
          <p class="count">1-9 contributions</p>
        </div>
      </div>
    </div>
    <div class="day-cell">
      <div class="lightBlue cell">
        <div class="info">
          <p class="count">10-19 contributions</p>
        </div>
      </div>
    </div>
    <div class="day-cell">
      <div class="blue cell">
        <div class="info">
          <p class="count">20-29 contributions</p>
        </div>
      </div>
    </div>
    <div class="day-cell">
      <div class="darkBlue cell">
        <div class="info">
          <p class="count">30+ contributions</p>
        </div>
      </div>
    </div>
    <p>Больше</p>
  </div>
</template>

<script setup></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.clue {
  max-width: 1372px;
  display: flex;
  padding-top: 15px;
}
.clue > p {
  padding-right: 6.45px;
  padding-left: 6.45px;
  margin: 0;
}
.cell {
  width: 20px;
  height: 20px;
}
</style>
