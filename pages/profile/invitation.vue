<template>
  <div class="invitation container">
    <div class="invitation_container">
      <profile />
      <div class="invitation_btns">
        <button>МОИ РЕФЕРАЛЫ</button>
        <button>МОИ РЕФЕРЕРЫ</button>
        <button class="invitation_button">ПРИГЛАСИТЬ НА САЙТ</button>
      </div>
    </div>
    <div class="message">Реферальный код скопирован в буфер, действует 24 часа</div>
  </div>
</template>

<script setup>
import profile from '~/components/Blocks/profile.vue';
</script>

<style lang="scss">
.invitation {
  display: flex;
  flex-direction: column;
  width: 70%;
  .invitation_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 80px;
    margin-bottom: 32px;
    .invitation_btns {
      display: flex;
      justify-content: flex-end;
      gap: 52px;
      button {
        background: linear-gradient(90.25deg, #2c96ea 9.03%, #00d1ff 98.03%);
        box-shadow: 0px 4px 4px rgba(0, 142, 255, 0.1);
        border-radius: 23.5px;
      }
      .invitation_button {
        background: linear-gradient(90.25deg, #01c314 9.03%, #7aea85 98.03%);
      }
    }
  }
  .message {
    align-self: flex-end;
    border: 2px solid transparent;
    border-image: linear-gradient(to bottom, #18af10, #019ec3);
    padding: 12px 14px;
    border-image-slice: 1;
  }
}
@media (max-width: $large) {
  .invitation {
    width: 100%;
    .personalArea {
      padding: 19px 15px !important;
    }
  }
  .invitation_btns {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center !important;
  }
}
</style>
