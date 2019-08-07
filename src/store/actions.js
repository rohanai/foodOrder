export default {
    addProduct: function(context, payload) {
        context.committe("addProduct", payload);
    },
    fetchProduct: function(context) {
        let self = context;
        fetch('http://localhost:3000/restaurent')
            .then(resp => resp.json())
            .then(myJson => {
                console.log(myJson);
                self.committe("addProduct", myJson);
            });
    }
}