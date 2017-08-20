import Vue from 'vue';
import Hello from '../vue/Hello.vue';
import HelloYou from '../js/vue/hello-you';


new Vue({
    el: "#vueApp",
    components: {
        Hello,
        HelloYou,
    },
});
