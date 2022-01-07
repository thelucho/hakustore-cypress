<template>
  <div class="alert alert-primary">
    <font-awesome-icon icon="shopping-bag" />
    <a target="_blank" :href="`https://wa.me/5211234567890?text=${cart}`">Completar pedido ({{ count }} productos)</a>
    <div class="close" @click="removeOrder()">
      <font-awesome-icon icon="trash" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    ordered: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cart() {
      const cart = this.$store.state.product.cart;
      let order = cart.map((item) => {
        return `(${item.quantity}) ${item.product['title']}`
      });
      const orderMessage = JSON.stringify(order).replace(/[\[\]']+/g, '').split(',').join(', ').replaceAll('"', '');

      return orderMessage;
    },

    count() {
      return this.$store.state.product.cart.length;
    }
  },
  methods: {
    removeOrder() {
      this.$store.dispatch('product/removeOrder');
    }
  }
};
</script>

<style scoped>
.fa-shopping-bag {
  color: white;
  margin-right: 9px;
}

.alert-primary {
  background-color: #2b4dab;
  border-color: #2b4dab;
  width: max-content;
  position: sticky;
  bottom: 16px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

a {
  color: white !important;
}

.close {
  width: 36px;
  height: 36px;
  background-color: white;
  box-shadow: 0px 0px 10px rgb(77, 77, 77);
  border-radius: 50%;
  position: absolute;
  right: -30px;
  top: calc(50% - 18px);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.close:hover {
  opacity: 1 !important;
}

.alert-primary:hover .close {
  right: -45px;
  opacity: 1;
  transition: all 0.3s ease-in-out;
}

.fa-trash {
  font-size: 12px;
  color: rgb(219, 55, 55);
}
</style>


