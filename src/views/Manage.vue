<template>
  <div class="container">
    <header class="jumbotron text-center mt-4">
      <h1>Gestión</h1>
      <p>Gestioná los productos del store</p>
    </header>

    <div class="row">
      <div class="col-md-4">
        <h6 class="mb-4">Agregar producto</h6>
        <form @submit.prevent="addProduct()">
          <div class="form-group">
            <input v-model="item.title" type="text" class="form-control" name="title" placeholder="Titulo" />
          </div>
          <div class="form-group">
            <input v-model="item.price" type="number" class="form-control" name="price" placeholder="Precio" />
          </div>
          <div class="form-group">
            <input v-model="item.description" type="text" class="form-control" name="description" placeholder="Descripción..." />
          </div>
          <div class="form-group">
            <input v-model="item.category" type="text" class="form-control" name="category" placeholder="Categoría" />
          </div>
          <div class="form-group">
            <input v-model="item.image" type="text" class="form-control" name="image" placeholder="URL de imagen" />
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100"
          >Agregar</button>
        </form>
      </div>

      <div class="col-md-8">
        <h6 class="mb-4">Lista de productos</h6>

        <div class="row d-flex justify-content-center my-5" v-if="isLoading">
          <div class="spinner-border text-info" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <ul class="list-group" v-if="products && !isLoading">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="(product, idx) in products.slice().reverse()" :key="idx">

            <div class="thumb mr-4">
              <img :src="product.image" width="30px" />
            </div>

            <div class="title mr-4">
              {{ product.title }}
            </div>

            <div class="category font-weight-light text-secondary mr-auto">
              <small><span>{{ product.category }}</span></small>
            </div>

            <span class="badge badge-secondary badge-pill">
              ${{ product.price }}
            </span>

            <div class="remove text-danger ml-4" @click.prevent="deleteProduct(product.id)">
              <h4>&times;</h4>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Manage',
  data() {
    return {
      products: [],
      item: {
        title: '',
        price: null,
        description: '',
        category: '',
        image: ''
      },
      isLoading: false
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      UserService.getProducts().then(
      response => {
        this.isLoading = false;
        this.products = response.data;
      },
      error => { 
        this.isLoading = false;
        throw new Error(error)
      }
    );
    },

    addProduct() {
      UserService.createProduct(this.item).then(
        () => {
          this.getProducts();
          Object.assign(this.$data, this.$options.data.call(this));
        },
        error => { throw new Error(error) }
      );
    },

    deleteProduct(id) {
      UserService.deleteProduct(id)
        .then(
        response => {
          if (response.status === 200) {
            this.removeItemFromStore(id);
          }
        },
        error => { throw new Error(error) }
      );
    },

    removeItemFromStore(id) {
      for (var i = this.products.length - 1; i >= 0; --i) {
          if (this.products[i].id == id) {
              this.products.splice(i,1);
          }
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 25px;
  font-weight: 700;
}

.jumbotron {
  background-color: #e8f7f4;
}

.jumbotron p {
  margin: 0;
}

.btn-primary {
  color: #fff !important;
  background-color: #389d88;
  border-color: #389d88;
}

.btn-primary:hover {
  background-color: #2d8f7b;
  border-color: #2d8f7b;
}

.title {
  min-width: 170px;
}

.category span {
  color: #389d88 !important;
}

.remove {
  cursor: pointer;
  transform: scale(1);
  transition: all 0.1s ease-in-out;
}

.remove:hover {
  transform: scale(1.3);
  transition: all 0.1s ease-in-out;
}

.remove h4 {
  margin-bottom: 0;
}
</style>