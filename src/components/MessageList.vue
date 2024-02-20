<template>
  <ul>
    <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => ["poop", "peep"]
    }
  }
}
</script>

