<template>
  <nuxt-link to="/earnmoney">
    <div id="animation_container_banner-mir" style="background-color: rgba(255, 255, 255, 1); width: 2178px; height: 800px">
      <canvas
        id="canvas_banner-mir"
        width="2178"
        height="800"
        style="display: none; background-color: rgba(255, 255, 255, 1)"
      ></canvas>
      <div
        id="dom_overlay_container_banner-mir"
        style="
          pointer-events: none;
          overflow: hidden;
          width: 2178px;
          height: 800px;
          position: absolute;
          left: 0px;
          top: 0px;
          display: none;
        "
      ></div>
      <div id="_preload_div_banner-mir" style="height: 800px; width: 2178px; text-align: center">
        <span style="display: inline-block; height: 100%; vertical-align: middle"></span>
        <img src="/images/_preloader.gif" style="vertical-align: middle; max-height: 100%" />
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
let canvas, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function init() {
  canvas = document.getElementById('canvas_banner-mir');
  anim_container = document.getElementById('animation_container_banner-mir');
  dom_overlay_container = document.getElementById('dom_overlay_container_banner-mir');
  var comp = AdobeAnMir.getComposition('358E3F72DD6B9F4C8579F4765AE7ECD7');
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
  for (let item of ssMetadata)
    ss[item.name] = new createjs.SpriteSheet({ images: [queue.getResult(item.name)], frames: ssMetadata[i].frames });

  var preloaderDiv = document.getElementById('_preload_div_banner-mir');
  preloaderDiv.style.display = 'none';
  canvas.style.display = 'block';
  exportRoot = new lib.mir2();
  stageMir = new lib.Stage(canvas);
  //Registers the "tick" event listener.
  fnStartAnimation = function () {
    stageMir.addChild(exportRoot);
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener('tick', stageMir);
  };
  //Code to support hidpi screens and responsive scaling.
  AdobeAnMir.makeResponsive(true, 'both', false, 1, [canvas, preloaderDiv, anim_container, dom_overlay_container]);
  AdobeAnMir.compositionLoaded(lib.properties.id);
  fnStartAnimation();
}
onMounted(() => {
  init();
}),
  onUnmounted(() => {
    createjs.Ticker.removeEventListener('tick', stageMir);
  });
</script>
