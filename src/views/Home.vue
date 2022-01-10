<template>
  <div class="container">
    <header data-cy="hero" class="jumbotron text-center mt-4">
      <h2>HakuStore</h2>
      <div v-if="currentUser">
        <p>Bienvenidos al store de Hakuna</p>
      </div>
      <div v-else>
        <p class="text-danger">
          Contenido disponible solo para usuarios logueados!
        </p>
      </div>
    </header>

    <div class="row d-flex justify-content-center my-5 py-5" v-if="isLoading">
      <div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="row" v-if="products && !isLoading">
      <div
        data-cy="products"
        class="col-12 col-sm-8 col-md-6 col-lg-3 mb-4"
        v-for="(prod, idx) in products"
        :key="idx"
      >
        <div data-cy="item" class="card">
          <div class="box-img">
            <img class="card-img my-3" :src="prod.image" />
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ prod.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ prod.category }}</h6>
            <div class="buy d-flex justify-content-between align-items-center">
              <div class="price">
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
      <cart v-show="currentUser && ordered" :ordered="ordered"></cart>
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
      isLoading: false
    };
  },
  created() {
    this.isLoading = !this.isLoading;
    UserService.getProducts().then(
      response => {
        this.isLoading = !this.isLoading;
        this.products = response.data;
      },
      error => {
        this.isLoading = !this.isLoading;
        this.error = `Error: ${error}`;
      },
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

.price {
  color: #2b4dab;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(66px);
  opacity: 0;
}
</style>