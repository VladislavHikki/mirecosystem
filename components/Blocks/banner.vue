<template>
  <div class="banner-container">
    <nuxt-link
      :style="{ width: link_width + 'px' }"
      class="banner-container_link"
      :to="current_link"
      @click="toAnchorLink()"
    >
    </nuxt-link>
    <div
      id="animation_container_banner-about"
      style="background-color: rgba(255, 255, 255, 1); width: 1920px; height: 400px"
    >
      <canvas
        id="canvas_banner-about"
        width="1920"
        height="400"
        :on-load="init"
        style="display: none; background-color: rgba(255, 255, 255, 1)"
      ></canvas>
      <div
        id="dom_overlay_container"
        style="
          pointer-events: none;
          overflow: hidden;
          width: 1920px;
          height: 400px;
          position: absolute;
          left: 0px;
          top: 0px;
          display: none;
        "
      ></div>
      <div id="_preload_div_banner-about" style="height: 400px; width: 1920px; text-align: center">
        <span style="display: inline-block; height: 100%; vertical-align: middle"></span>
        <img src="/images/_preloader.gif" style="vertical-align: middle; max-height: 100%" />
      </div>
    </div>
  </div>
  <!-- to="/about-project" -->
</template>

<script setup>
const emit = defineEmits(['toAnchorLink']);
let canvas, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;

function toAnchorLink() {
  emit('toAnchorLink', 'privileges');
}

function init() {
  canvas = document.getElementById('canvas_banner-about');
  anim_container = document.getElementById('animation_container_banner-about');
  dom_overlay_container = document.getElementById('dom_overlay_container');
  var comp = AdobeAnEco.getComposition('358E3F72DD6B9F4C8579F4765AE7ECD7');
  var lib = comp.getLibrary();
  var loader = new createjs.LoadQueue(false);
  loader.addEventListener('fileload', function (evt) {
    handleFileLoad(evt, comp);
  });
  loader.addEventListener('complete', function (evt) {
    handleComplete(evt, comp);
  });
  var lib = comp.getLibrary();
  loader.loadManifest(lib.properties.manifest);
}
function handleFileLoad(evt, comp) {
  var images = comp.getImages();
  if (evt && evt.item.type == 'image') {
    images[evt.item.id] = evt.result;
  }
}
function handleComplete(evt, comp) {
  //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
  var lib = comp.getLibrary();
  var ss = comp.getSpriteSheet();
  var queue = evt.target;
  var ssMetadata = lib.ssMetadata;
  for (let value of ssMetadata)
    ss[value.name] = new createjs.SpriteSheet({
      images: [queue.getResult(value.name)],
      frames: value.frames,
    });

  var preloaderDiv = document.getElementById('_preload_div_banner-about');
  preloaderDiv.style.display = 'none';
  canvas.style.display = 'block';
  exportRoot = new lib.ekosistemamir();
  stage = new lib.Stage(canvas);
  //Registers the "tick" event listener.
  fnStartAnimation = function () {
    stage.addChild(exportRoot);
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener('tick', stage);
    setInterval(() => {
      switch (current_link.value) {
        case 'https://earn.mirecosystem.ru/moy_limon':
          current_link.value = '/about-project';
          break;
        case '/about-project':
          current_link.value = 'https://earn.mirecosystem.ru/moy_limon';
          break;
        default:
          current_link.value = '/about-project';
          break;
      }
    }, 9500);
  };
  //Code to support hidpi screens and responsive scaling.
  AdobeAnEco.makeResponsive(true, 'both', false, 1, [canvas, preloaderDiv, anim_container, dom_overlay_container]);
  AdobeAnEco.compositionLoaded(lib.properties.id);
  fnStartAnimation();
}

let current_link = ref('/about-project');
let link_width = ref(0);
onMounted(() => {
  init();
  link_width.value = canvas.width;
  window.onresize = () => (link_width.value = canvas.clientWidth);
}),
  onUnmounted(() => {
    createjs.Ticker.removeEventListener('tick', stage);
  });
</script>

<style lang="scss" scoped>
.banner-container {
  display: flex;
  position: relative;
  &_link {
    position: absolute;
    height: 100%;
    z-index: 2;
  }
}
</style>
