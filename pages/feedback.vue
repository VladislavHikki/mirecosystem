<template>
  <div class="feedback container">
    <div class="form feedback__form">
      <form class="form__container">
        <Toast />
        <div class="title feedback-form__title">
          <h1>Связаться с нами</h1>
        </div>
        <div class="form__item">
          <InputText
            name="username"
            v-model.trim="dataValue['username']"
            :class="{ 'p-invalid': $v['username'].$error }"
            placeholder="Ваше имя"
            @change="$v['username'].$touch"
            id="username"
          />
          <span class="error" v-if="$v['username'].$error">
            {{ $v['username'].$errors[0].$message }}
          </span>
        </div>
        <div class="form__item">
          <InputMask
            name="whatsapp"
            v-model="dataValue['whatsapp']"
            :class="{ 'p-invalid': $v['whatsapp'].$error }"
            @change="$v['whatsapp'].$touch"
            date="phone"
            mask="+7 (999) 999-99-99"
            placeholder="WhatsApp"
            id="whatsapp"
          />
          <span class="error" v-if="$v['whatsapp'].$error">
            {{ $v['whatsapp'].$errors[0].$message }}
          </span>
          <!-- <InputText
                        name="whatsapp"
                        v-model="dataValue['whatsapp']"
                        :class="{ 'p-invalid': $v['whatsapp'].$error }"
                        placeholder="WhatsApp"
                        @change="$v['whatsapp'].$touch"
                        id="whatsapp"
                        />
                    <span class="error" v-if="$v['whatsapp'].$error">
                        {{ $v["whatsapp"].$errors[0].$message }}
                    </span> -->
        </div>
        <div class="form__item">
          <InputText name="url" v-model.trim="dataValue['url']" placeholder="Ссылка на профиль" id="url" />
          <!-- <span class="error" v-if="$v['url'].$error">
                        {{ $v["url"].$errors[0].$message }}
                    </span> -->
        </div>
        <div class="form__item">
          <Textarea
            name="message"
            v-model.trim="dataValue['message']"
            class="input-textarea"
            rows="2"
            placeholder="Сообщение"
            id="message"
          />
          <!-- <span class="error" v-if="$v['message'].$error">
                        {{ $v["message"].$errors[0].$message }}
                    </span> -->
        </div>
        <div class="form__item">
          <Button class="form__btn" @click="addLetter()" label="Отправить" />
        </div>
        <div id="successfully" class="result-message" v-if="message" v-html="message"></div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useLetterStore } from '@/store/letter.js';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const letterStore = useLetterStore();
const dataValue = reactive({
  username: null,
  whatsapp: null,
  url: '',
  message: '',
});
// const message = ref(null);

const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage('Введите имя', required),
    },
    whatsapp: {
      required: helpers.withMessage('Введите номер телефона', required),
    },
    /* url:{
            required: helpers.withMessage("Введите ссылку на профиль", required),
        },
        message:{
            required: helpers.withMessage("Введите сообщение", required),
        } */
  };
});

const $v = useVuelidate(rules, dataValue);

async function addLetter() {
  $v.value.$validate();
  if ($v.value.$errors == 0) {
    const data = new FormData();
    data.append('username', dataValue['username']);
    data.append('whatsapp', dataValue['whatsapp']);
    data.append('url', dataValue['url']);
    data.append('message', dataValue['message']);

    const result = await letterStore.createLetter(data);

    toast.add({
      severity: errorValidate(result).toastType,
      summary: errorValidate(result).summary,
      detail: errorValidate(result).message,
      life: 3000,
    });

    dataValue.value = {};
    /* if (result == 201) {
            message.value = "<p class='result-message_success'>Заявка успешно отправлена!</p>";
        } else {
            message.value = "<p class='result-message_error'>Не удалось отправить заявку!</p>";
        } */
  }
}
</script>

<style lang="scss">
.error {
  color: #e24c4c;
  font-size: 14px;
  margin-left: 20px;
  margin-top: 4px;
}
.feedback__form {
  flex-direction: column;
  .form__container {
    padding: 20px;
    max-width: 500px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
    .form__item {
      flex-direction: column;
      & input {
        max-width: 100%;
      }
    }
  }
  .feedback-form__title,
  .result-message {
    display: flex;
    justify-content: center;
  }
  .result-message_success {
    color: rgb(22, 164, 77);
  }
  .result-message_error {
    color: rgb(241, 57, 57);
  }
  .input-textarea {
    // max-width: 370px;
    width: 100%;
  }
}
</style>
