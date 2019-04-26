Vue.component('alert-error', {
    template: `
    <div class="alert-error">
      <strong>Ошибка!</strong>
      <slot></slot>
    </div>
  `
});

Vue.component('alert-warning', {
    template: `
    <div class="alert-warning">
      <strong>Упс!</strong>
      <slot></slot>
    </div>
  `
});