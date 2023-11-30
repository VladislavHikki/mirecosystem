<template>
  <div class="referal">
    <div class="referal__container">
      <div>
        <div
          class="referral-code"
          @click="copy($event)"
          v-if="userStore.user?.referral && new Date(userStore.user?.referralExpiration) > new Date()"
        >
          <h4 style="color: black; margin: 5px">Реферальный код</h4>
          <!-- <Chip class="chip" @click="copyCode(userStore.user?.referral)" :label="copyReferalCode? `Скопировано` : userStore.user?.referral" icon="pi pi-copy"></Chip> -->
          <Chip
            class="chip"
            @click="copyCode(userStore.user?.referral)"
            :label="userStore.user?.referral"
            icon="pi pi-copy"
          ></Chip>
          <div class="valid-to" style="color: black">
            Действует до:
            {{ new Date(userStore.user?.referralExpiration).toLocaleString() }}
          </div>
        </div>
        <Button @click="generate" v-else>Сгенерировать реферальный код</Button>
        <div class="messageWhenCopyCode" style="font-weight: bold; margin-top: 10px">
          {{ message }}
        </div>
      </div>
      <div v-if="userStore.user?.isAdminHelper == 1">
        <div
          class="referral-code delete-code"
          @click="copy($event)"
          v-if="adminStore.deleteToken?.deleteToken && new Date(userStore.user?.deleteTokenExpiration) > new Date()"
        >
          <h4 style="color: black; margin: 5px">Токен удаления</h4>
          <Chip
            class="chip"
            @click="copyCode(adminStore.deleteToken?.deleteToken)"
            :label="adminStore.deleteToken?.deleteToken"
            icon="pi pi-copy"
          ></Chip>
          <div class="valid-to" style="color: black">
            Действует до:
            {{ new Date(userStore.user?.deleteTokenExpiration).toLocaleString() }}
          </div>
        </div>
        <Button @click="generateDelToken" v-else>Сгенерировать код удаления</Button>
        <div class="messageWhenCopyCode" style="font-weight: bold; margin-top: 10px">
          {{ tokenMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chip from 'primevue/chip';
import { useUserStore } from '~/store/user';
import { useAdminListStore } from '~/store/adminList';

const userStore = useUserStore();
const adminStore = useAdminListStore();
let copyReferalCode = ref(false);
let copyDelToken = ref(false);
let message = ref(null);
let tokenMessage = ref(null);

await adminStore.requestDelToken();

const copy = (event) => {
  navigator.clipboard.writeText(userStore.user?.referral);
};

const generate = async () => {
  await userStore.requestReferralCode();
  message.value = 'Реферальный код действует 24 часа';
  copyCode(userStore.user?.referral);
};

const generateDelToken = async () => {
  await adminStore.createDelToken();
  tokenMessage.value = 'Токен удаления действует 24 часа';
  copyCode(adminStore.deleteToken?.deleteToken);
};

function copyCode(code) {
  copyReferalCode.value = true;
  navigator.clipboard.writeText(code);
}
</script>

<style lang="scss">
.referal__container {
  display: flex;
  flex-wrap: wrap;
  gap: 52px;
  justify-content: space-between;
}
.valid-to {
  margin-top: 5px;
}
.referral-code {
  cursor: pointer;
  color: white;
}
.delete-code {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.referral-code_margin {
  margin-top: 10px;
}

.myReferal_btns {
  .p-button {
    color: white;
  }
}
</style>
