Vue.component('search', {
    data:function() {
        return {
            userSearch: '',
        }
    },
    methods: {
        filter: function (userSearch) {
            console.log(this.$parent.$refs.filtered.filter('userSearch'));
        }
    },
    template: `<form action="#" class="search-form" v-on:submit.prevent='$root.$refs.filtered.filter(userSearch)'>
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>`
});


