Vue.component('alert-component', {
    template: `
    <div class="alert-error" v-if="$parent.$refs.filtered.products == 0">
      <strong>Ошибка!</strong> Неудалось получить данные с сервера.
    </div>
    <div class="alert-warning" v-else-if="$parent.$refs.filtered.products != 0 && $parent.$refs.filtered.filtered == 0">
      <strong>Упс!</strong> Нам нечего не удалось найти, попробуйте изменить запрос.
    </div>
  `
});