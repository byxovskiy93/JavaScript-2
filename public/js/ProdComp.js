Vue.component('products', {
    data: function(){
      return{
              filtered: [],
              products: [],
              imgCatalog: 'https://placehold.it/200x150',
              catalogUrl: '/api/products'
      };
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products">
            <product 
            v-for="product of filtered" 
            :key="product.id_product"
            :img="imgCatalog"
            :product="product"></product>
        </div>`,
    mounted(){
        //console.log(this.$parent.$refs.cartItems.test());
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    }
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{ product.product_name }}</h3>
                    <p>{{ product.price }} $</p>
                    <button class="buy-btn" v-on:click="$root.$refs.cartItems.addProduct(product)">Купить</button>
                </div>
            </div>`
});