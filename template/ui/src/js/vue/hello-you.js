/**
 * A Vue component to say "Hello {{ Your-Name }}"
 */

const _template = `
    <div>
        <p>What's your name:</p>
        <input v-model="name">
        
        <h1 v-if="name">Hello {{name}}</h1>
    </div>
`;


const HelloYou = {
    template: _template,
    data () {
        return {
            name: null,
        };
    },
};


export default HelloYou;
