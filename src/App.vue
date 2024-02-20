<template>
  <div id="app">
    <h1>AIDS</h1>
    <message-list :messages="messages" />
  </div>
</template>

<script>
import MessageList from './components/MessageList.vue';
//import axios from 'axios';

export default {
  name: 'App',
  components: {
    MessageList
  },
  data() {
    return {
      messages: []
    };
  },
  mounted() {
    this.setupSSE();
  },
  methods: {
    setupSSE() {
      const eventSource = new EventSource(`http://192.168.178.115:3000/stream`);
      eventSource.onmessage = event => {
        this.messages.push(event.data);
      };
      eventSource.onerror = error => {
        console.error('EventSource failed:', error);
        eventSource.close();
      };
    }
  }
};
</script>

