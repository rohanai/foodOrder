import Component from '../../lib/component';
import store from '../../store/index';
import RestoCards from '../resto-cards/resto-cards';

import debounce from '../../lib/debounce';
import './resto-grid.css';

export default class RestoGrid extends Component {
    constructor(props) {
        super({
            store,
            elements: document.querySelector('.product-list')
        });
        this.props = props;
    }

    render() {
        this.elements.innerHTML = `
        <div class='grid-container'>
            ${this.props.data.map((item) => `${RestoCards(item)}`).join('')}
        </div>`;
    }
}