export const product = {
  namespaced: true,
  state: {
    cart: []
  },
  actions: {
    addToCart({ commit, state }, product) {
      const cartItem = state.cart.find(item => item.product.id === product.id);
      if (!cartItem) {
        commit('setProductToCart', product);
      } else {
        cartItem.quantity++;
      }
    },
    removeOrder({ commit }) { 
      commit('emptyCart');
    }
  },
  mutations: {
    setProductToCart(state, product) { 
      state.cart.push({
        product: product,
        quantity: 1
      });
    },
    emptyCart(state) { 
      state.cart = [];
    }
  }
};
