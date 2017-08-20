/**
 * A Vue component to say "Hello {{ Your-Name }}"
 */

let _template = `
    <div>
        <p>What's your name:</p>
        <input v-model="name">
        
        <h1 v-if="name">Hello {{name}}</h1>
    </div>
`;


let HelloYou = {
    template: _template,
    data () {
        return {
            name: null,
        };
    },
};


export default HelloYou;
