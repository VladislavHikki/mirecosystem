<template>
  <div class="finances container">
    <div class="finance__container">
      <div class="tabs finances__tabs">
        <div class="tabs__buttons finances__buttons">
          <Button
            @click="setCurrentTab('myLemon')"
            :class="{ tab__button_active_type__lemon: isActiveLemon }"
            class="tab__button_type--lemon"
            label="Мои лимоны"
          />
          <Button
            @click="setCurrentTab('myPoints')"
            :class="{ tab__button_active: isActivePoints }"
            class="tab__button"
            label="Мои роллары"
          />
          <Button
            @click="setCurrentTab('myMoney')"
            :class="{ tab__button_active: isActiveMoney }"
            class="tab__button"
            label="Мои деньги"
          />
        </div>
      </div>
      <component @openModal="openModal()" :is="currentTab"></component>
    </div>
    <div v-show="showModal">
      <component @closeModal="closeModal()" :is="modalWindow"></component>
    </div>
  </div>
</template>

<script>
import myPoints from '@/components/Blocks/myPoints.vue';
import transferPoints from '@/components/modals/transferPoints.vue';
import myLemon from '~/components/Blocks/myLemon.vue';
const currentTab = ref('myPoints');
const isActivePoints = ref(false);
const isActiveLemon = ref(true);
const isActiveMoney = ref(false);
const showModal = ref(false);
const modalWindow = ref('transferPoints');

const setCurrentTab = (tabName) => {
  currentTab.value = tabName;
  if (currentTab.value == myPoints) {
    isActivePoints.value = true;
    isActiveMoney.value = false;
    isActiveLemon.value = false;
  } else if (currentTab.value == myMoney) {
    isActivePoints.value = false;
    isActiveMoney.value = true;
    isActiveLemon.value = false;
  } else if (currentTab.value == myLemon) {
    isActivePoints.value = false;
    isActiveMoney.value = false;
    isActiveLemon.value = true;
  }
};

const openModal = () => {
  showModal.value = true;
  modalWindow.value = transferPoints;
};

const closeModal = () => {
  showModal.value = false;
  modalWindow.value = null;
};
export default {
  components: {
    myPoints,
    myLemon,
    transferPoints,
  },
  data() {
    return {
      currentTab: 'myLemon',
      isActivePoints: false,
      isActiveMoney: false,
      isActiveLemon: true,
      showModal: false,
      modalWindow: null,
    };
  },
  methods: {
    setCurrentTab(tabName) {
      this.currentTab = tabName;
      if (this.currentTab == 'myPoints') {
        this.isActivePoints = true;
        this.isActiveMoney = false;
        this.isActiveLemon = false;
      } else if (this.currentTab == 'myLemon') {
        this.isActivePoints = false;
        this.isActiveMoney = false;
        this.isActiveLemon = true;
      } else if (this.currentTab == 'myMoney') {
        this.isActivePoints = false;
        this.isActiveMoney = true;
        this.isActiveLemon = false;
      }
    },
    openModal() {
      this.showModal = true;
      this.modalWindow = 'transferPoints';
    },
    closeModal() {
      this.showModal = false;
      this.modalWindow = null;
    },
  },
};
</script>
