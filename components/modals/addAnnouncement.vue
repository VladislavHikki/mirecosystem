<template>
  <div class="wrap-modal">
    <div class="modal-window__content">
      <div class="container">
        <div class="form__item">
          <InputText type="text" placeholder="Заголовок" />
        </div>
        <div class="form__item">
          <Dropdown placeholder="Выберите категорию" />
        </div>
        <div class="form__item">
          <span class="p-float-label p-float-label_margin">
            <Textarea rows="3" cols="42" />
            <label>Описание</label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.modal-window__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  width: 100%;
}
.p-float-label_margin {
  margin-top: 10px;
}
</style>
