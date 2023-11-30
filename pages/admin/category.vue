<template>
  <div class="category container">
    <div class="admin_btns">
      <Button label="Primary" severity="info" style="width: 109px">
        <span style="margin-right: 5px" class="pi pi-search"></span>НАЙТИ</Button
      >
      <Button
        @click="(visible = true), changeCurrAction('Добавить', 'addCategory')"
        label="Success"
        severity="success"
        style="margin-top: 15px"
        ><span style="margin-right: 5px" class="pi pi-plus"></span>ДОБАВИТЬ</Button
      >
    </div>

    <!-- Модалка Добавить категорию -->
    <Dialog
      v-model:visible="visible"
      v-if="currentDialog == 'addCategory'"
      modal
      :draggable="false"
      :header="currentAction"
      :style="{ width: '50vw' }"
    >
      <div class="wrap-modal">
        <div class="modal-window__container">
          <form method="post">
            <div class="form__item">
              <InputText type="text" v-model.trim="nameCategory" placeholder="Наименование категории" />
            </div>
          </form>
        </div>
      </div>
      <template #footer>
        <Button label="Сохранить" icon="pi pi-check" @click="addCategoryFunction()" />
        <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
      </template>
    </Dialog>

    <!-- Модалка Изменить категорию -->
    <Dialog
      v-model:visible="visible"
      v-if="currentDialog == 'editCategory'"
      modal
      :draggable="false"
      :header="currentAction"
      :style="{ width: '50vw' }"
    >
      <div class="wrap-modal">
        <div class="modal-window__content">
          <div class="container">
            <div class="form__item">
              <InputText type="text" v-model="nameCategory" placeholder="Наименование категории" />
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button label="Сохранить" icon="pi pi-check" @click="visible = false" />
        <Button label="Отмена" icon="pi pi-times" @click="visible = false" />
      </template>
    </Dialog>

    <div class="category_container">
      <h2>Категории</h2>
      <!-- <div class="category_elements"> -->
      <draggable
        :list="categoryCount"
        class="category_elements"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ index }">
          <div class="category_item">
            <button class="move_object"></button>
            <div class="category_item_content">
              <div class="category_content_item">
                <button></button>
                <div class="name">Корпоративные каналы {{ index + 1 }}</div>
              </div>
              <div class="category_content_btns">
                <button @click="(visible = true), changeCurrAction('Редактировать', 'editCategory')" class="red"></button>
                <button class="pause"></button>
                <button class="delete"></button>
              </div>
            </div>
          </div>
        </template>
      </draggable>

      <!-- <div class="category_item" 
                    v-for="(value, index) in categoryCount"
                    :key="index"
                    :style="{order: GetStartOrder(index)}"
                >
                    <button class="move_object" @click="SetOrderObject(index)"></button>
                    <div class="category_item_content">
                        <div class="category_content_item">
                            <button> </button>
                            <div class="name">Корпоративные каналы {{ index + 1 }}</div>
                        </div>
                        <div class="category_content_btns">
                            <button @click="visible = true, changeCurrAction('Редактировать', editCategory)" class="red"></button>
                            <button class="pause"></button>
                            <button class="delete"></button>
                        </div>
                    </div>
                </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { useCategoryStore } from '~/store/category';

const categoryStore = useCategoryStore();

const categoryCount = ref([{ id: 1 }, { id: 2 }, { id: 3 }]);
const visible = ref(false);
const currentAction = ref(null);
const currentDialog = ref();

const changeCurrAction = (name, dialog) => {
  currentAction.value = name + ' категорию';
  currentDialog.value = dialog;
};

const orderCategories = [];
let ind = 1;
let currentInd = null;
let dragging = false;

const GetStartOrder = (value) => {
  if (!orderCategories[value]) {
    orderCategories[value] = value + 1;
  }
  return orderCategories[value];
};

const SetOrderObject = (value) => {
  orderCategories[value] = orderCategories[value] - 1;
  for (let i = 0; i < orderCategories.length - 1; ++i) {
    if (i == value) {
      continue;
    } else {
      orderCategories[i]++;
    }
  }
};

const OpenDialog = () => {
  visible.value = !visible.value;
};

const nameCategory = ref('');
async function addCategoryFunction() {
  const data = new FormData();

  data.append('label', nameCategory.value);

  await categoryStore.createCategory(data);

  nameCategory.value = '';
  visible.value = false;
}
</script>

<style lang="scss">
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.category {
  display: flex;
  flex-direction: column;
  gap: 41px;
  button {
    margin: 0;
  }
  .admin_btns {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    align-items: flex-end;
  }

  .category_container {
    background: #ffffff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    border-radius: 7px;
    padding: 23px 28px 110px 36px;
    h1 {
      margin-bottom: 41px;
    }
    .category_elements {
      width: 100%;
      display: flex;
      flex-direction: column;
      .category_item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        .move_object {
          padding: 0;
          height: 64px;
          width: 5%;
          border-radius: none;
          background: #f6f6f6;
          border-top: 1px;
          border-bottom: 1px;
          border-style: solid;
          border-color: #d9d9d9;
          box-shadow: none;
          border-radius: 0;
          background-image: url(~/assets/images/arrow_move_object_category.png);
          background-repeat: no-repeat;
          background-position: center center;
        }
        .category_item_content {
          display: flex;
          justify-content: space-between;
          width: 95%;
          padding: 15px;
          background: #f6f6f6;
          border-top: 1px;
          border-bottom: 1px;
          border-style: solid;
          border-color: #d9d9d9;
          align-items: center;
          .category_content_item {
            display: flex;
          }
          .category_content_btns {
            display: flex;
            gap: 10px;
            button {
              width: 32px;
              height: 32px;
              border-radius: 5px;
              padding: 0;
            }
            .red {
              background: #ff8a00;
              background-image: url(~/assets/images/pen.png);
              background-position: center center;
              background-repeat: no-repeat;
            }
            .pause {
              background: #2ca8ff;
              background-image: url(~/assets/images/pause.png);
              background-position: center center;
              background-repeat: no-repeat;
            }
            .delete {
              background: #f81111;
              background-image: url(~/assets/images/delete.png);
              background-position: center center;
              background-repeat: no-repeat;
            }
          }
        }
      }
    }
    // .category_elements .category_item:nth-child(2n) {
    //     .category_item_content {
    //         background: white;
    //         border: none;
    //     }
    //     .move_object {
    //         background: white;
    //         box-shadow: none;
    //         background-image: url(~/assets/images/arrow_move_object_category.png);
    //         background-repeat: no-repeat;
    //         background-position: center center;
    //         border: none;
    //     }
    // }
  }
}
.category_content_item {
  button {
    background: transparent;
    box-shadow: none;
    background-image: url(~/assets/images/arrow_category.png);
    background-repeat: no-repeat;
    background-position: center center;
  }
}
</style>
