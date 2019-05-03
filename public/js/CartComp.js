Vue.component('cart', {
    data:function() {
        return {
            userSearch: '',
            cartUrl: '/api/cart',
            showCart: false,
            imgCart: 'https://placehold.it/50x100',
            cartItems: [],
        }
    },
    methods: {
        clickCardButton(){
            if(this.showCart){this.showCart = false;
            }else{this.showCart = true}
        },
        getProduct(){
            this.cartItems = [];
            this.$parent.getJson(`${API + this.cartUrl}`)
                .then(data => {
                    for(let el of data.contents){
                        this.cartItems.push(el);
                    }
                });
        },
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`${API + this.cartUrl}/${product.id_product}`,product)
                    .then(data => {
                        this.getProduct()
                    });
            }else{
                product.quantity = 1;
                this.$parent.postJson(`${API + this.cartUrl}`,product)
                    .then(data => {
                       if(data.result){
                           this.cartItems.push(product);
                       }
                    });
            }
        },
        removeProduct(product){
            this.$parent.deleteJson(`${API + this.cartUrl}/${product.id_product}`,product)
                .then(data => {
                    if(data.result){
                        this.getProduct();
                    }
                });
        }
    },
   template: `
                <div class="cart-block" v-if="showCart">
                <p v-if="!cartItems.length">Cart is empty</p>
                <cart-item 
                v-for="product of cartItems"  
                :key="product.id_product"
                :img="imgCart"
                :cart-item="product"></cart-item>
            </div>`,
        mounted(){
            this.getProduct();
    }
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item" >
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                            <p class="product-single-price">$ {{cartItem.price}}</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                        <button class="del-btn" v-on:click.prevent="$root.$refs.cartItems.removeProduct(cartItem)">&times;</button>
                    </div>
                </div>`
});