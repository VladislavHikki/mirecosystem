<template>
  <div class="modal-window__body">
    <div class="modal-window__content">
      <div class="modal-window__container">
        <form method="post" >
          <div class="form__item">
          <Dropdown placeholder="Вид ресурса" />
        </div>
        <div class="form-input upload-file upload-file_indent form__item form-item_indent">
          <label for="">Картинка</label>
          <div class="form-upload">
            <div class="out-choose-image">
              <img loading="lazy"  width="38" height="34" src="@/assets/images/avatar.svg" alt="" />
            </div>
            <FileUpload mode="basic" accept="image/*" id="files" chooseLabel="Загрузить" />
          </div>
        </div>
        <div class="form__item">
          <InputText type="text" placeholder="Название" />
        </div>
        <div class="form__item">
          <InputText type="text" placeholder="Ссылка" />
        </div>
        <div class="form__item">
          <Textarea type="text" style="width: 85%" placeholder="Описание" />
        </div>
        <div class="form__item">
          <InputText type="text" placeholder="TGStart" />
        </div>
        <div class="form__item">
          <Dropdown placeholder="Категория" />
        </div>
        <div class="form__item">
          <Dropdown placeholder="Охват" />
        </div>
        <div class="form__item">
          <Dropdown placeholder="Регион" />
        </div>
        <div class="form__item">
          <Dropdown placeholder="Город" />
        </div>
        <div class="form__item">
          <Dropdown placeholder="Проект" />
        </div>
        <div class="form__item">
          <Dropdown placeholder="Франшиза" />
        </div>
        <div class="form__item">
          <Dropdown placeholder="Команда" />
        </div>
        <div class="form__item form__item_end-flex">
          <Button class="form__button" label="Опубликовать" />
          <Button class="form__button btn-cancel" label="Отмена" />
        </div>
        </form>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    closeModal: {
      type: Function,
    },
  },
};
</script>

<style lang="scss">
// .modal-window__body {
//   padding: 60px 0;
//   position: relative;
//   top: 50%;
//   left: 50%;
//   transform: translateX(-50%) translateY(-50%);
//   z-index: 9999999;
//   max-width: 944px;
//   max-height: 1080px;
//   background-color: #ffffff;
//   .modal-window__title {
//     text-align: center;
//     margin: 40px 0;
//   }
//   .modal-window__close {
//     display: flex;
//     justify-content: flex-end;
//     img {
//       padding: 20px 40px 0 0;
//       cursor: pointer;
//     }
//   }
//   .modal-window__content {
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//   }
// }
// .form__item {
//   display: flex;
//   justify-content: center;
//   margin: 20px 0;
//   input,
//   .p-dropdown {
//     // padding: 0;
//     max-height: 27px;
//     width: 100%;
//     border: none;
//     border-radius: 0;
//     border-bottom: 1px solid #bbbbbb;
//     .p-placeholder {
//       padding-bottom: 5px;
//     }
//   }
//   .p-dropdown {
//     padding: 0;
//     align-items: flex-end;
//   }
//   .form__button {
//     background-color: #2c96ea;
//     margin: 0 10px;
//   }
// }
// .form__item_end-flex {
//   margin-top: 50px;
//   display: flex;
//   justify-content: flex-end;
// }
// .btn-cancel,
// .btn-cancel:hover {
//   background-color: #9b9b9b !important;
//   border: none;
// }
// .btn-cancel:hover {
//   background-color: #838383 !important;
// }
</style>
