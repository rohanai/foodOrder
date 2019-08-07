import store from './store/index';
import RestoHeader from './components/resto-header/resto-header';

store.dispatch('fetchProduct');
const restoHeaderInstance = new RestoHeader();

restoHeaderInstance.render();
