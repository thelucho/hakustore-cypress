<template>
  <div class="container">
    <header class="jumbotron text-center mt-4">
      <h2>HakuStore</h2>
      <p>Bienvenidos al store de Hakuna</p>
    </header>

    <div class="row">
      <div
        class="col-12 col-sm-8 col-md-6 col-lg-3 mb-4"
        v-for="(prod, idx) in products"
        :key="idx"
      >
        <div class="card">
          <div class="box-img">
            <img class="card-img my-3" :src="prod.image" />
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ prod.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ prod.category }}</h6>
            <div class="buy d-flex justify-content-between align-items-center">
              <div class="price text-success">
                <h5 class="mt-4">${{ prod.price }}</h5>
              </div>
              <a @click.prevent="addToCart(prod)" class="btn btn-danger mt-3">
                Agregar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="slide-fade">
      <cart
        v-show="currentUser && ordered"
        :ordered="ordered"
      ></cart>
    </transition>

  </div>
</template>

<script>
import UserService from '../services/user.service';
import cart from '../components/cart.vue';

export default {
  name: 'Home',
  components: {
    cart
  },
  data() {
    return {
      products: [],
      error: '',
    };
  },
  created() {
    UserService.getProducts().then(
      response => {
        this.products = response.data;
      },
      error => {
        this.error = `Error: ${error}`;
      }
    );
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    ordered() {
      return this.$store.state.product.cart.length > 0;
    }
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('product/addToCart', product);
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 25px;
  font-weight: 700;
}

.jumbotron {
  background-color: #e8f7f4;
}

.jumbotron p {
  margin: 0;
}

.btn-danger {
  color: #fff !important;
  background-color: #389d88;
  border-color: #389d88;
}

.btn-danger:hover {
  background-color: #2d8f7b;
  border-color: #2d8f7b;
}

.box-img {
  width: 100%;
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-img {
  width: 100%;
  width: fit-content;
  max-width: 150px;
  max-height: 150px;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(66px);
  opacity: 0;
}
</style>