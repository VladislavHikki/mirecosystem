<template>
  <form class="resource_form" action="#" method="get">
    <div class="resource_form_item">
      <h1>Ресурсы</h1>
      <div class="find"><input type="text" /><button class="find_btn" type="submit"></button></div>
    </div>
    <div class="resource_form_item">
      <select name="" id=""></select>
      <select name="" id=""></select>
      <select name="" id=""></select>
      <select name="" id=""></select>
      <select name="" id=""></select>
    </div>
  </form>
</template>

<style lang="scss">
.resource_form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
  .resource_form_item {
    display: flex;
    align-items: center;
  }
  .resource_form_item:nth-child(2) {
    gap: 26px;
  }
  .resource_form_item:nth-child(1) {
    gap: 39px;
    .find {
      display: flex;

      input {
        width: 311px;
        padding-left: 15px;
        height: 43px;
        background: #ffffff;
        border-radius: 14px 0 0 14px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
      }
      .find_btn {
        margin: 0 !important;
        padding: 0;
        background: #2c96ea;
        background-image: url(@/assets/images/find.png);
        background-size: 20px 20px;
        background-position: center center;
        background-repeat: no-repeat;
        width: 55px;
        height: 43px;
        border-radius: 0px 14px 14px 0px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
      }
    }
  }
}
</style>
