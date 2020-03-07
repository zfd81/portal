<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created: function() {
    this.$router.push("/about");
  }
};
</script>
<style></style>
