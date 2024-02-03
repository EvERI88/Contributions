<template>
  <div class="wrapper">
    <Contribution />
    <Clue />
  </div>
  
</template>

<script>
import Contribution from "./components/Contribution.vue";
import Clue from "./components/Clue.vue";

export default {
  name: "App",
  components: {
    Contribution,
    Clue,
  },
};
</script>

<style>
@import url("../public/style/style.css");
body {
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #959494;
}
.wrapper{
  max-width: 1372px;
  margin: 0 auto;
}
#app {
  margin-top: 60px;
}
</style>
