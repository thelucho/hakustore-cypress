<template>
  <div class="container">
    <header class="jumbotron text-center mt-4">
      <h1>Gestión</h1>
      <p>Gestioná los productos del store</p>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Manage',
  data() {
    return {
      products: [],
      error: ''
    };
  },
  created() {
    UserService.getProducts().then(
      response => {
        console.log('getProducts: ', response);
        this.products = response.data;
      },
      error => {
        console.log('error');
        this.error =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
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
</style>