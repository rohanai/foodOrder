import Store from '../store/store';

export default class Component {
    constructor(props) {
        let self = this;
        this.render = this.render || {};
        this.updateLocalState = this.updateLocalState || function() {};
        if (props.store instanceof Store) {
            props.store.events.subscribe('updateLocalState', () => {self.updateLocalState()});
            props.store.events.subscribe('changeState', () => {self.render()});
        }
        if (props.hasOwnProperty('elements')) {
            this.elements = props.elements;
        }
    }
}
