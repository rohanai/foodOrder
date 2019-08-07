export default {
    addProduct: function(state, payload) {
        let reviseState = state.restaurent.concat(payload);
        state.restaurent = reviseState;
        return reviseState;
    }
}