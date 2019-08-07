import Component from '../../lib/component';
import store from '../../store/index';
import RestoGrid from '../resto-grid/resto-grid';
import debounce from '../../lib/debounce';

export default class RestoHeader extends Component {
    constructor() {
        super({
            store,
            elements: document.querySelector('.product-head')
        });
    }

    updateLocalState() {
        this.state = {
            resto: store.state.restaurent
        }
    }

    searchResto(key) {
        if (key) {
            // If Key is present then filter the data
            const newState = this.state.resto.filter((item) => item.name.toLowerCase() == key);
            this.state.resto = newState;
        } else {
            // if key is not present then no filter return the current data
            this.state.resto = store.state.restaurent;
        }   
       // call grid component with constructor and render method
        this.restoGridInstance = new RestoGrid({data: this.state.resto});
        this.restoGridInstance.render();
        this.updateLocalState(); // reset the state
    }

    sortNameResto() {
        const compare = (a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase())
                return 1;
            return 0;
        }
        const sortedName = this.state.resto.sort(compare);
        console.log(sortedName)
        this.restoGridInstance = new RestoGrid({data: sortedName});
        this.restoGridInstance.render();
        //this.updateLocalState(); 
    }

    render() {
        let self = this;
        this.restoGridInstance = new RestoGrid({data: this.state.resto});
        this.restoGridInstance.render();
        this.elements.innerHTML = `<div><input id='restoInput'/> <button id='sortName'>Sort Name</button><div>`;
        const inputSearch = document.getElementById('restoInput');
        const btnNameSort = document.getElementById('sortName');

        // add Event listner to elements
        inputSearch.addEventListener('keyup', (evt) => {
            evt.preventDefault();
            let key = inputSearch.value.trim();
            debounce(() => this.searchResto(key), 100)();
        });

        // Sort by name
        btnNameSort.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.sortNameResto();
        });
    }
}