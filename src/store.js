import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(reducer);
store.subscribe(render);

function render() {
    console.log('render');
    console.log(store.getState().isAuth);
}

export default store;