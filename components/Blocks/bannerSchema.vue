<template>
  <NuxtLink to="/benefits">
    <div id="animation_container_schema-banner" style="background-color: rgba(255, 255, 255, 1); width: 1920px; height: 600px">
      <canvas
        id="canvas_schema-banner"
        width="1920"
        height="600"
        style="display: none; background-color: rgba(255, 255, 255, 1)"
      ></canvas>
      <div
        id="dom_overlay_container_schema-banner"
        style="
          pointer-events: none;
          overflow: hidden;
          width: 1920px;
          height: 600px;
          position: absolute;
          left: 0px;
          top: 0px;
          display: none;
        "
      ></div>
      <div id="_preload_div_schema-banner" style="height: 600px; width: 1920px; text-align: center">
        <span style="display: inline-block; height: 100%; vertical-align: middle"></span> <img src=/images/_preloader.gif
        style='vertical-align: middle; max-height: 100%'/>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
var canvas, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function init() {
  canvas = document.getElementById('canvas_schema-banner');
  anim_container = document.getElementById('animation_container_schema-banner');
  dom_overlay_container = document.getElementById('dom_overlay_container_schema-banner');
  var comp = AdobeAnSchema.getComposition('358E3F72DD6B9F4C8579F4765AE7ECD7');
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
  for (let item of ssMetadata) {
    ss[item.name] = new createjs.SpriteSheet({
      images: [queue.getResult(item.name)],
      frames: item.frames,
    });
  }
  var preloaderDiv = document.getElementById('_preload_div_schema-banner');
  preloaderDiv.style.display = 'none';
  canvas.style.display = 'block';
  exportRoot = new lib.sistemamir();
  stageSchema = new lib.Stage(canvas);
  //Registers the "tick" event listener.
  fnStartAnimation = function () {
    stageSchema.addChild(exportRoot);
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener('tick', stageSchema);
  };
  //Code to support hidpi screens and responsive scaling.
  AdobeAnSchema.makeResponsive(true, 'both', false, 1, [canvas, preloaderDiv, anim_container, dom_overlay_container]);
  AdobeAnSchema.compositionLoaded(lib.properties.id);
  fnStartAnimation();
}

onMounted(() => {
  init();
}),
  onUnmounted(() => {
    createjs.Ticker.removeEventListener('tick', stageSchema);
  });
</script>
