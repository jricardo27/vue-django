import Vue from 'vue';
import Hello from '../vue/Hello.vue';
import HelloYou from '../js/vue/hello-you';


new Vue({  // eslint-disable-line no-new
    el: '#vueApp',
    components: {
        Hello,
        HelloYou,
    },
});
