<template>
  <div class="modal-window__body">
    <div class="modal-window__close">
      <img loading="lazy"  @click="$emit('closeModal')" src="~/assets/images/close.png" />
    </div>
    <div class="modal-window__title">
      <h2>Редактировать франшизу</h2>
    </div>
    <div class="modal-window__content">
      <div class="container">
        <div class="form__item">
          <InputText type="text" placeholder="Введите название" />
        </div>
      </div>
      <div class="form__item form__item_end-flex">
        <Button class="form__button" label="Сохранить" />
        <Button @click="$emit('closeModal')" class="form__button btn-cancel" label="Отмена" />
      </div>
    </div>
  </div>
</template>

<script></script>

<style>
.btn-cancel {
  border: none;
}
</style>
