Vue.component('search', {
    data:function() {
        return {
            userSearch: '',
        }
    },
    methods: {
        filter: function (userSearch) {
            this.$parent.filter(userSearch);
        }
    },
    mounted() {
        this.$parent.filter();
    },
    template: `<form action="#" class="search-form" v-on:submit.prevent='filter(userSearch)'>
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>`
});


