let stageSchema;
(function (cjs, an) {
  var p; // shortcut to reference prototypes
  var lib = {};
  var ss = {};
  var img = {};
  lib.ssMetadata = [];

  (lib._001 = function () {
    this.initialize(img._001);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 126, 127);

  (lib._002 = function () {
    this.initialize(img._002);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 126, 126);

  (lib._003 = function () {
    this.initialize(img._003);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 108, 108);

  (lib._004 = function () {
    this.initialize(img._004);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 132, 130);

  (lib._005 = function () {
    this.initialize(img._005);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 127, 126);

  (lib._01 = function () {
    this.initialize(img._01);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 1920, 600);

  (lib._02 = function () {
    this.initialize(img._02);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 1920, 600);

  (lib._03 = function () {
    this.initialize(img._03);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 1920, 600);

  (lib.karta1 = function () {
    this.initialize(img.karta1);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 363, 230);

  (lib.karta2 = function () {
    this.initialize(img.karta2);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 363, 230);

  (lib.karta3 = function () {
    this.initialize(img.karta3);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 364, 230);

  (lib.ryki = function () {
    this.initialize(img.ryki);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 537, 537); // helper functions:

  function mc_symbol_clone() {
    var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
    clone.gotoAndStop(this.currentFrame);
    clone.paused = this.paused;
    clone.framerate = this.framerate;
    return clone;
  }

  function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
    var prototype = cjs.extend(symbol, cjs.MovieClip);
    prototype.clone = mc_symbol_clone;
    prototype.nominalBounds = nominalBounds;
    prototype.frameBounds = frameBounds;
    return prototype;
  }

  (lib.Символ21 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2 (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    mask.graphics.p('Ax9R9QncnbAAqiQAAqhHcnbQHdncKgAAQKhAAHdHcQHcHbAAKhQAAKincHbQndHdqhgBQqgABndndg');
    mask.setTransform(246.1, 171.1);

    // Слой_1
    this.instance = new lib.ryki();
    this.instance.parent = this;
    this.instance.setTransform(0, 0, 0.9144, 0.9144);

    var maskedShapeInstanceList = [this.instance];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
  }).prototype = getMCSymbolPrototype(lib.Символ21, new cjs.Rectangle(83.6, 8.6, 325.1, 325.09999999999997), null);

  (lib.Символ19 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2 (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    mask.graphics.p(
      'AgTGQQiBgHhdg9QgyghgjgvQglgxgPg4QgGgfgEgoQgDguADgvQAEgsAOhBQARhDATglQAqhUBXgvQBXgvBcALQAYADAeAIIA0APQBQAXAOAFQA0ASAiAYQBJAyAjBhQAcBQgHBmQgGA6gMAgQgMAlgoA9QgtBHglAiQgxArhHAVQg3APg9AAIgUAAg'
    );
    mask.setTransform(439.9871, 104.718);

    // Слой_1
    this.instance = new lib.ryki();
    this.instance.parent = this;
    this.instance.setTransform(0, 0, 0.9144, 0.9144);

    var maskedShapeInstanceList = [this.instance];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
  }).prototype = getMCSymbolPrototype(lib.Символ19, new cjs.Rectangle(401, 64.7, 78, 80.10000000000001), null);

  (lib.Символ18 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2 (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    mask.graphics.p(
      'AgmG8QhXgDhSgyQhNgug1hNQhDhigNh+QgNh6AphzQAVg3AaglQA6hSBsgpQBWggB2gDQCzgDBeBOQBTBEAaCCQAKAyABBBQAAApgFBJIgFA4QgFAegIAYQggBeh9BUQiPBhh+AAIgKAAg'
    );
    mask.setTransform(43.0562, 104.7001);

    // Слой_1
    this.instance = new lib.ryki();
    this.instance.parent = this;
    this.instance.setTransform(0, 0, 0.9144, 0.9144);

    var maskedShapeInstanceList = [this.instance];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
  }).prototype = getMCSymbolPrototype(lib.Символ18, new cjs.Rectangle(1, 60.3, 84.2, 88.8), null);

  (lib.Символ17 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2 (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    mask.graphics.p(
      'AiIZQQhTgDkcgQQjkgNiLAAQhrACg1gCQhbgChDgMQhUgPhDgjQhLgngvg8Qgsg5gnh6QgriHgdgyQgegzgzgyQgmgmg9gvQhJg3h4hQIjEiEQjligh0iWQiljZg5k6Qgsj2AYlPQAHhnAMhMQAQhgAbhOQAfhaAxhHQA2hOBHgxQBHgxBYgTQBWgTBXANQBVANBPArQBNAqA7BAQBVBdBMC9IA9CaQAkBYAjA8QAXAoAWAZQAdAgAhAOQAgAOAwAAQAcAAA4gEQBKAABLAXQBIAYBAArQA4AmBDBDQAmAmBKBPQBVBVBOA3QBgBCBfAbQA4AQBHAHQAyAFBQABQCKACBagNQB8gSBagyQBbgyCFiSQCLiZBQgyQBHgtCJguQCdg1A4gcQCHhDB6iIQBchnBpioQBeiXAug5QBYhtBkgsQBqgvCkAIQCJAFBPAvQBCAnA0BPQAjA3ApBjQBICsAqCLQA0CqARCYQATCsgaCfQgbCrhNCMQhqDAkQDWQiYB0hLA7QiDBnhSBUQhQBQhrCMQiXDFgcAgQhoB+hkBRQh6BiiAArQhOAbhmAMQg/AHh6AFQkJANiFADQhzADhoAAQhdAAhVgCg'
    );
    mask.setTransform(260.704, 356.4239);

    // Слой_1
    this.instance = new lib.ryki();
    this.instance.parent = this;
    this.instance.setTransform(0, 0, 0.9144, 0.9144);

    var maskedShapeInstanceList = [this.instance];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
  }).prototype = getMCSymbolPrototype(lib.Символ17, new cjs.Rectangle(0, 194.6, 491, 296.4), null);

  (lib.Символ16 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2 (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    var mask_graphics_0 = new cjs.Graphics().p(
      'AkyEdQh2h2AAinQAAimB2h2QB2h2CnAAQCmAAB2B2QB2B2AACmQAACnh2B2Qh2B2imAAQinAAh2h2g'
    );
    var mask_graphics_1 = new cjs.Graphics().p(
      'Ak2E3QiBiBAAi2QAAi1CBiBQCBiBC1AAQC2AACBCBQCBCBAAC1QAAC2iBCBQiBCBi2AAQi1AAiBiBg'
    );
    var mask_graphics_2 = new cjs.Graphics().p(
      'AlRFRQiLiLAAjGQAAjFCLiLQCMiMDFAAQDGAACLCMQCMCLAADFQAADGiMCLQiLCMjGAAQjFAAiMiMg'
    );
    var mask_graphics_3 = new cjs.Graphics().p(
      'AlrFsQiWiXAAjVQAAjUCWiXQCXiWDUAAQDVAACWCWQCXCXAADUQAADViXCXQiWCWjVAAQjUAAiXiWg'
    );
    var mask_graphics_4 = new cjs.Graphics().p(
      'AmFGGQihiiAAjkQAAjjChiiQCiihDjAAQDlAAChChQChCiAADjQAADkihCiQihChjlAAQjjAAiiihg'
    );
    var mask_graphics_5 = new cjs.Graphics().p(
      'AmfGgQisisAAj0QAAjzCsisQCsisDzAAQD0AACsCsQCsCsAADzQAAD0isCsQisCsj0AAQjzAAisisg'
    );
    var mask_graphics_6 = new cjs.Graphics().p(
      'Am5G6Qi3i3AAkDQAAkCC3i3QC3i3ECAAQEDAAC3C3QC3C3AAECQAAEDi3C3Qi3C3kDAAQkCAAi3i3g'
    );
    var mask_graphics_7 = new cjs.Graphics().p(
      'AnUHUQjBjCAAkSQAAkRDBjCQDCjCESAAQETAADBDCQDCDCAAERQAAESjCDCQjBDCkTAAQkSAAjCjCg'
    );
    var mask_graphics_8 = new cjs.Graphics().p(
      'AnuHvQjMjNAAkiQAAkhDMjNQDNjMEhAAQEiAADMDMQDNDNAAEhQAAEijNDNQjMDMkiAAQkhAAjNjMg'
    );
    var mask_graphics_9 = new cjs.Graphics().p(
      'AoIIJQjXjYAAkxQAAkwDXjYQDYjXEwAAQExAADXDXQDYDYAAEwQAAExjYDYQjXDXkxAAQkwAAjYjXg'
    );
    var mask_graphics_10 = new cjs.Graphics().p(
      'AoiIjQjijjAAlAQAAk/DijjQDijjFAAAQFBAADiDjQDiDjAAE/QAAFAjiDjQjiDjlBAAQlAAAjijjg'
    );
    var mask_graphics_11 = new cjs.Graphics().p(
      'Ao8I9QjtjtAAlQQAAlPDtjtQDtjuFPAAQFQAADtDuQDtDtAAFPQAAFQjtDtQjtDulQAAQlPAAjtjug'
    );
    var mask_graphics_12 = new cjs.Graphics().p(
      'ApXJXQj3j4AAlfQAAleD3j4QD5j5FeAAQFfAAD4D5QD4D4AAFeQAAFfj4D4Qj4D5lfAAQleAAj5j5g'
    );
    var mask_graphics_13 = new cjs.Graphics().p(
      'ApxJxQkCkDAAluQAAltECkEQEDkDFuAAQFvAAECEDQEDEEAAFtQAAFukDEDQkCEElvAAQluAAkDkEg'
    );
    var mask_graphics_14 = new cjs.Graphics().p(
      'AqLKMQkNkOAAl+QAAl9ENkOQEOkOF9AAQF+AAENEOQEOEOAAF9QAAF+kOEOQkNEOl+AAQl9AAkOkOg'
    );

    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: mask_graphics_0, x: -42.5252, y: -10.5362 })
        .wait(1)
        .to({ graphics: mask_graphics_1, x: -37.0804, y: -5.2502 })
        .wait(1)
        .to({ graphics: mask_graphics_2, x: -29.4108, y: 0.0359 })
        .wait(1)
        .to({ graphics: mask_graphics_3, x: -21.7413, y: 5.3219 })
        .wait(1)
        .to({ graphics: mask_graphics_4, x: -14.0717, y: 10.608 })
        .wait(1)
        .to({ graphics: mask_graphics_5, x: -6.4021, y: 15.894 })
        .wait(1)
        .to({ graphics: mask_graphics_6, x: 1.2675, y: 21.1801 })
        .wait(1)
        .to({ graphics: mask_graphics_7, x: 8.9371, y: 26.4661 })
        .wait(1)
        .to({ graphics: mask_graphics_8, x: 16.6066, y: 31.7522 })
        .wait(1)
        .to({ graphics: mask_graphics_9, x: 24.2762, y: 37.0383 })
        .wait(1)
        .to({ graphics: mask_graphics_10, x: 31.9458, y: 42.3243 })
        .wait(1)
        .to({ graphics: mask_graphics_11, x: 39.6154, y: 47.6104 })
        .wait(1)
        .to({ graphics: mask_graphics_12, x: 47.285, y: 52.8964 })
        .wait(1)
        .to({ graphics: mask_graphics_13, x: 54.9546, y: 58.1825 })
        .wait(1)
        .to({ graphics: mask_graphics_14, x: 62.75, y: 63.5315 })
        .wait(236)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(1)
    );

    // Слой_1
    this.instance = new lib._005();
    this.instance.parent = this;

    var maskedShapeInstanceList = [this.instance];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true }, 250).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 127, 126);

  (lib.Символ15 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2 (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    var mask_graphics_0 = new cjs.Graphics().p(
      'AkyEdQh2h2AAinQAAimB2h2QB2h2CnAAQCmAAB2B2QB2B2AACmQAACnh2B2Qh2B2imAAQinAAh2h2g'
    );
    var mask_graphics_1 = new cjs.Graphics().p(
      'Ak2E3QiBiBAAi2QAAi1CBiBQCBiBC1AAQC2AACBCBQCBCBAAC1QAAC2iBCBQiBCBi2AAQi1AAiBiBg'
    );
    var mask_graphics_2 = new cjs.Graphics().p(
      'AlRFRQiLiLAAjGQAAjFCLiLQCMiMDFAAQDGAACLCMQCMCLAADFQAADGiMCLQiLCMjGAAQjFAAiMiMg'
    );
    var mask_graphics_3 = new cjs.Graphics().p(
      'AlrFsQiWiXAAjVQAAjUCWiXQCXiWDUAAQDVAACWCWQCXCXAADUQAADViXCXQiWCWjVAAQjUAAiXiWg'
    );
    var mask_graphics_4 = new cjs.Graphics().p(
      'AmFGGQihiiAAjkQAAjjChiiQCiihDjAAQDlAAChChQChCiAADjQAADkihCiQihChjlAAQjjAAiiihg'
    );
    var mask_graphics_5 = new cjs.Graphics().p(
      'AmfGgQisisAAj0QAAjzCsisQCsisDzAAQD0AACsCsQCsCsAADzQAAD0isCsQisCsj0AAQjzAAisisg'
    );
    var mask_graphics_6 = new cjs.Graphics().p(
      'Am5G6Qi3i3AAkDQAAkCC3i3QC3i3ECAAQEDAAC3C3QC3C3AAECQAAEDi3C3Qi3C3kDAAQkCAAi3i3g'
    );
    var mask_graphics_7 = new cjs.Graphics().p(
      'AnUHUQjBjCAAkSQAAkRDBjCQDCjCESAAQETAADBDCQDCDCAAERQAAESjCDCQjBDCkTAAQkSAAjCjCg'
    );
    var mask_graphics_8 = new cjs.Graphics().p(
      'AnuHvQjMjNAAkiQAAkhDMjNQDNjMEhAAQEiAADMDMQDNDNAAEhQAAEijNDNQjMDMkiAAQkhAAjNjMg'
    );
    var mask_graphics_9 = new cjs.Graphics().p(
      'AoIIJQjXjYAAkxQAAkwDXjYQDYjXEwAAQExAADXDXQDYDYAAEwQAAExjYDYQjXDXkxAAQkwAAjYjXg'
    );
    var mask_graphics_10 = new cjs.Graphics().p(
      'AoiIjQjijjAAlAQAAk/DijjQDijjFAAAQFBAADiDjQDiDjAAE/QAAFAjiDjQjiDjlBAAQlAAAjijjg'
    );
    var mask_graphics_11 = new cjs.Graphics().p(
      'Ao8I9QjtjtAAlQQAAlPDtjtQDtjuFPAAQFQAADtDuQDtDtAAFPQAAFQjtDtQjtDulQAAQlPAAjtjug'
    );
    var mask_graphics_12 = new cjs.Graphics().p(
      'ApXJXQj3j4AAlfQAAleD3j4QD5j5FeAAQFfAAD4D5QD4D4AAFeQAAFfj4D4Qj4D5lfAAQleAAj5j5g'
    );
    var mask_graphics_13 = new cjs.Graphics().p(
      'ApxJxQkCkDAAluQAAltECkEQEDkDFuAAQFvAAECEDQEDEEAAFtQAAFukDEDQkCEElvAAQluAAkDkEg'
    );
    var mask_graphics_14 = new cjs.Graphics().p(
      'AqLKMQkNkOAAl+QAAl9ENkOQEOkOF9AAQF+AAENEOQEOEOAAF9QAAF+kOEOQkNEOl+AAQl9AAkOkOg'
    );

    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: mask_graphics_0, x: -42.5252, y: -10.5362 })
        .wait(1)
        .to({ graphics: mask_graphics_1, x: -37.0804, y: -5.2502 })
        .wait(1)
        .to({ graphics: mask_graphics_2, x: -29.4108, y: 0.0359 })
        .wait(1)
        .to({ graphics: mask_graphics_3, x: -21.7413, y: 5.3219 })
        .wait(1)
        .to({ graphics: mask_graphics_4, x: -14.0717, y: 10.608 })
        .wait(1)
        .to({ graphics: mask_graphics_5, x: -6.4021, y: 15.894 })
        .wait(1)
        .to({ graphics: mask_graphics_6, x: 1.2675, y: 21.1801 })
        .wait(1)
        .to({ graphics: mask_graphics_7, x: 8.9371, y: 26.4661 })
        .wait(1)
        .to({ graphics: mask_graphics_8, x: 16.6066, y: 31.7522 })
        .wait(1)
        .to({ graphics: mask_graphics_9, x: 24.2762, y: 37.0383 })
        .wait(1)
        .to({ graphics: mask_graphics_10, x: 31.9458, y: 42.3243 })
        .wait(1)
        .to({ graphics: mask_graphics_11, x: 39.6154, y: 47.6104 })
        .wait(1)
        .to({ graphics: mask_graphics_12, x: 47.285, y: 52.8964 })
        .wait(1)
        .to({ graphics: mask_graphics_13, x: 54.9546, y: 58.1825 })
        .wait(1)
        .to({ graphics: mask_graphics_14, x: 62.75, y: 63.5315 })
        .wait(236)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(1)
    );

    // Слой_1
    this.instance = new lib._004();
    this.instance.parent = this;

    var maskedShapeInstanceList = [this.instance];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true }, 250).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 132, 130);

  (lib.Символ14 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2 (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    var mask_graphics_0 = new cjs.Graphics().p(
      'AkyEdQh2h2AAinQAAimB2h2QB2h2CnAAQCmAAB2B2QB2B2AACmQAACnh2B2Qh2B2imAAQinAAh2h2g'
    );
    var mask_graphics_1 = new cjs.Graphics().p(
      'Ak2E3QiBiBAAi2QAAi1CBiBQCBiBC1AAQC2AACBCBQCBCBAAC1QAAC2iBCBQiBCBi2AAQi1AAiBiBg'
    );
    var mask_graphics_2 = new cjs.Graphics().p(
      'AlRFRQiLiLAAjGQAAjFCLiLQCMiMDFAAQDGAACLCMQCMCLAADFQAADGiMCLQiLCMjGAAQjFAAiMiMg'
    );
    var mask_graphics_3 = new cjs.Graphics().p(
      'AlrFsQiWiXAAjVQAAjUCWiXQCXiWDUAAQDVAACWCWQCXCXAADUQAADViXCXQiWCWjVAAQjUAAiXiWg'
    );
    var mask_graphics_4 = new cjs.Graphics().p(
      'AmFGGQihiiAAjkQAAjjChiiQCiihDjAAQDlAAChChQChCiAADjQAADkihCiQihChjlAAQjjAAiiihg'
    );
    var mask_graphics_5 = new cjs.Graphics().p(
      'AmfGgQisisAAj0QAAjzCsisQCsisDzAAQD0AACsCsQCsCsAADzQAAD0isCsQisCsj0AAQjzAAisisg'
    );
    var mask_graphics_6 = new cjs.Graphics().p(
      'Am5G6Qi3i3AAkDQAAkCC3i3QC3i3ECAAQEDAAC3C3QC3C3AAECQAAEDi3C3Qi3C3kDAAQkCAAi3i3g'
    );
    var mask_graphics_7 = new cjs.Graphics().p(
      'AnUHUQjBjCAAkSQAAkRDBjCQDCjCESAAQETAADBDCQDCDCAAERQAAESjCDCQjBDCkTAAQkSAAjCjCg'
    );
    var mask_graphics_8 = new cjs.Graphics().p(
      'AnuHvQjMjNAAkiQAAkhDMjNQDNjMEhAAQEiAADMDMQDNDNAAEhQAAEijNDNQjMDMkiAAQkhAAjNjMg'
    );
    var mask_graphics_9 = new cjs.Graphics().p(
      'AoIIJQjXjYAAkxQAAkwDXjYQDYjXEwAAQExAADXDXQDYDYAAEwQAAExjYDYQjXDXkxAAQkwAAjYjXg'
    );
    var mask_graphics_10 = new cjs.Graphics().p(
      'AoiIjQjijjAAlAQAAk/DijjQDijjFAAAQFBAADiDjQDiDjAAE/QAAFAjiDjQjiDjlBAAQlAAAjijjg'
    );
    var mask_graphics_11 = new cjs.Graphics().p(
      'Ao8I9QjtjtAAlQQAAlPDtjtQDtjuFPAAQFQAADtDuQDtDtAAFPQAAFQjtDtQjtDulQAAQlPAAjtjug'
    );
    var mask_graphics_12 = new cjs.Graphics().p(
      'ApXJXQj3j4AAlfQAAleD3j4QD5j5FeAAQFfAAD4D5QD4D4AAFeQAAFfj4D4Qj4D5lfAAQleAAj5j5g'
    );
    var mask_graphics_13 = new cjs.Graphics().p(
      'ApxJxQkCkDAAluQAAltECkEQEDkDFuAAQFvAAECEDQEDEEAAFtQAAFukDEDQkCEElvAAQluAAkDkEg'
    );
    var mask_graphics_14 = new cjs.Graphics().p(
      'AqLKMQkNkOAAl+QAAl9ENkOQEOkOF9AAQF+AAENEOQEOEOAAF9QAAF+kOEOQkNEOl+AAQl9AAkOkOg'
    );

    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: mask_graphics_0, x: -42.5252, y: -10.5362 })
        .wait(1)
        .to({ graphics: mask_graphics_1, x: -37.0804, y: -5.2502 })
        .wait(1)
        .to({ graphics: mask_graphics_2, x: -29.4108, y: 0.0359 })
        .wait(1)
        .to({ graphics: mask_graphics_3, x: -21.7413, y: 5.3219 })
        .wait(1)
        .to({ graphics: mask_graphics_4, x: -14.0717, y: 10.608 })
        .wait(1)
        .to({ graphics: mask_graphics_5, x: -6.4021, y: 15.894 })
        .wait(1)
        .to({ graphics: mask_graphics_6, x: 1.2675, y: 21.1801 })
        .wait(1)
        .to({ graphics: mask_graphics_7, x: 8.9371, y: 26.4661 })
        .wait(1)
        .to({ graphics: mask_graphics_8, x: 16.6066, y: 31.7522 })
        .wait(1)
        .to({ graphics: mask_graphics_9, x: 24.2762, y: 37.0383 })
        .wait(1)
        .to({ graphics: mask_graphics_10, x: 31.9458, y: 42.3243 })
        .wait(1)
        .to({ graphics: mask_graphics_11, x: 39.6154, y: 47.6104 })
        .wait(1)
        .to({ graphics: mask_graphics_12, x: 47.285, y: 52.8964 })
        .wait(1)
        .to({ graphics: mask_graphics_13, x: 54.9546, y: 58.1825 })
        .wait(1)
        .to({ graphics: mask_graphics_14, x: 62.75, y: 63.5315 })
        .wait(236)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(1)
    );

    // Слой_1
    this.instance = new lib._003();
    this.instance.parent = this;

    var maskedShapeInstanceList = [this.instance];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true }, 250).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 108, 108);

  (lib.Символ13 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2 (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    var mask_graphics_0 = new cjs.Graphics().p(
      'AkyEdQh2h2AAinQAAimB2h2QB2h2CnAAQCmAAB2B2QB2B2AACmQAACnh2B2Qh2B2imAAQinAAh2h2g'
    );
    var mask_graphics_1 = new cjs.Graphics().p(
      'AktEuQh9h9AAixQAAiwB9h9QB9h9CwAAQCxAAB9B9QB9B9AACwQAACxh9B9Qh9B9ixAAQiwAAh9h9g'
    );
    var mask_graphics_2 = new cjs.Graphics().p(
      'Ak9E+QiEiEAAi6QAAi5CEiEQCDiEC6AAQC7AACDCEQCECEAAC5QAAC6iECEQiDCEi7AAQi6AAiDiEg'
    );
    var mask_graphics_3 = new cjs.Graphics().p(
      'AlOFPQiLiLAAjEQAAjDCLiLQCLiLDDAAQDEAACLCLQCLCLAADDQAADEiLCLQiLCLjEAAQjDAAiLiLg'
    );
    var mask_graphics_4 = new cjs.Graphics().p(
      'AlfFgQiRiSAAjOQAAjNCRiSQCSiRDNAAQDOAACRCRQCSCSAADNQAADOiSCSQiRCRjOAAQjNAAiSiRg'
    );
    var mask_graphics_5 = new cjs.Graphics().p(
      'AlvFwQiZiYAAjYQAAjXCZiYQCYiZDXAAQDYAACYCZQCYCYAADXQAADYiYCYQiYCZjYAAQjXAAiYiZg'
    );
    var mask_graphics_6 = new cjs.Graphics().p(
      'AmAGBQifigAAjhQAAjgCfigQCfifDhAAQDiAACfCfQCfCgAADgQAADhifCgQifCfjiAAQjhAAififg'
    );
    var mask_graphics_7 = new cjs.Graphics().p(
      'AmRGRQimimABjrQgBjqCmimQCninDqAAQDrAACmCnQCmCmAADqQAADrimCmQimCnjrAAQjqAAining'
    );
    var mask_graphics_8 = new cjs.Graphics().p(
      'AmhGiQititAAj1QAAj0CtitQCtitD0AAQD1AACtCtQCtCtAAD0QAAD1itCtQitCtj1AAQj0AAititg'
    );
    var mask_graphics_9 = new cjs.Graphics().p(
      'AmyGzQi0i0AAj/QAAj+C0i0QC0i0D+AAQD/AACzC0QC1C0AAD+QAAD/i1C0QizC0j/AAQj+AAi0i0g'
    );
    var mask_graphics_10 = new cjs.Graphics().p(
      'AnCHDQi7i7AAkIQAAkHC7i7QC6i7EIAAQEJAAC6C7QC7C7AAEHQAAEIi7C7Qi6C7kJAAQkIAAi6i7g'
    );
    var mask_graphics_11 = new cjs.Graphics().p(
      'AnTHUQjBjCAAkSQAAkRDBjCQDCjCERAAQESAADCDCQDBDCABERQgBESjBDCQjCDCkSAAQkRAAjCjCg'
    );
    var mask_graphics_12 = new cjs.Graphics().p(
      'AnkHlQjIjJAAkcQAAkbDIjJQDJjIEbAAQEcAADIDIQDJDJAAEbQAAEcjJDJQjIDIkcAAQkbAAjJjIg'
    );
    var mask_graphics_13 = new cjs.Graphics().p(
      'An0H1QjPjPgBkmQABklDPjPQDPjQElAAQEmAADPDQQDQDPAAElQAAEmjQDPQjPDQkmAAQklAAjPjQg'
    );
    var mask_graphics_14 = new cjs.Graphics().p(
      'AoFIGQjWjXAAkvQAAkuDWjXQDXjWEuAAQEwAADVDWQDXDXAAEuQAAEvjXDXQjVDWkwAAQkuAAjXjWg'
    );

    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: mask_graphics_0, x: -42.5252, y: -10.5362 })
        .wait(1)
        .to({ graphics: mask_graphics_1, x: -37.0786, y: -5.2533 })
        .wait(1)
        .to({ graphics: mask_graphics_2, x: -29.4071, y: 0.0297 })
        .wait(1)
        .to({ graphics: mask_graphics_3, x: -21.7357, y: 5.3126 })
        .wait(1)
        .to({ graphics: mask_graphics_4, x: -14.0643, y: 10.5955 })
        .wait(1)
        .to({ graphics: mask_graphics_5, x: -6.3929, y: 15.8785 })
        .wait(1)
        .to({ graphics: mask_graphics_6, x: 1.2786, y: 21.1614 })
        .wait(1)
        .to({ graphics: mask_graphics_7, x: 8.95, y: 26.4444 })
        .wait(1)
        .to({ graphics: mask_graphics_8, x: 16.6214, y: 31.7273 })
        .wait(1)
        .to({ graphics: mask_graphics_9, x: 24.2929, y: 37.0103 })
        .wait(1)
        .to({ graphics: mask_graphics_10, x: 31.9643, y: 42.2932 })
        .wait(1)
        .to({ graphics: mask_graphics_11, x: 39.6357, y: 47.5762 })
        .wait(1)
        .to({ graphics: mask_graphics_12, x: 47.3071, y: 52.8591 })
        .wait(1)
        .to({ graphics: mask_graphics_13, x: 54.9786, y: 58.1421 })
        .wait(1)
        .to({ graphics: mask_graphics_14, x: 62.75, y: 63.525 })
        .wait(236)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(1)
    );

    // Слой_1
    this.instance = new lib._001();
    this.instance.parent = this;

    var maskedShapeInstanceList = [this.instance];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true }, 250).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 126, 127);

  (lib.Символ12 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2 (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    var mask_graphics_0 = new cjs.Graphics().p(
      'AkyEdQh2h2AAinQAAimB2h2QB2h2CnAAQCmAAB2B2QB2B2AACmQAACnh2B2Qh2B2imAAQinAAh2h2g'
    );
    var mask_graphics_1 = new cjs.Graphics().p(
      'Ak2E3QiBiBAAi2QAAi1CBiBQCBiBC1AAQC2AACBCBQCBCBAAC1QAAC2iBCBQiBCBi2AAQi1AAiBiBg'
    );
    var mask_graphics_2 = new cjs.Graphics().p(
      'AlRFRQiLiLAAjGQAAjFCLiLQCMiMDFAAQDGAACLCMQCMCLAADFQAADGiMCLQiLCMjGAAQjFAAiMiMg'
    );
    var mask_graphics_3 = new cjs.Graphics().p(
      'AlrFsQiWiXAAjVQAAjUCWiXQCXiWDUAAQDVAACWCWQCXCXAADUQAADViXCXQiWCWjVAAQjUAAiXiWg'
    );
    var mask_graphics_4 = new cjs.Graphics().p(
      'AmFGGQihiiAAjkQAAjjChiiQCiihDjAAQDlAAChChQChCiAADjQAADkihCiQihChjlAAQjjAAiiihg'
    );
    var mask_graphics_5 = new cjs.Graphics().p(
      'AmfGgQisisAAj0QAAjzCsisQCsisDzAAQD0AACsCsQCsCsAADzQAAD0isCsQisCsj0AAQjzAAisisg'
    );
    var mask_graphics_6 = new cjs.Graphics().p(
      'Am5G6Qi3i3AAkDQAAkCC3i3QC3i3ECAAQEDAAC3C3QC3C3AAECQAAEDi3C3Qi3C3kDAAQkCAAi3i3g'
    );
    var mask_graphics_7 = new cjs.Graphics().p(
      'AnUHUQjBjCAAkSQAAkRDBjCQDCjCESAAQETAADBDCQDCDCAAERQAAESjCDCQjBDCkTAAQkSAAjCjCg'
    );
    var mask_graphics_8 = new cjs.Graphics().p(
      'AnuHvQjMjNAAkiQAAkhDMjNQDNjMEhAAQEiAADMDMQDNDNAAEhQAAEijNDNQjMDMkiAAQkhAAjNjMg'
    );
    var mask_graphics_9 = new cjs.Graphics().p(
      'AoIIJQjXjYAAkxQAAkwDXjYQDYjXEwAAQExAADXDXQDYDYAAEwQAAExjYDYQjXDXkxAAQkwAAjYjXg'
    );
    var mask_graphics_10 = new cjs.Graphics().p(
      'AoiIjQjijjAAlAQAAk/DijjQDijjFAAAQFBAADiDjQDiDjAAE/QAAFAjiDjQjiDjlBAAQlAAAjijjg'
    );
    var mask_graphics_11 = new cjs.Graphics().p(
      'Ao8I9QjtjtAAlQQAAlPDtjtQDtjuFPAAQFQAADtDuQDtDtAAFPQAAFQjtDtQjtDulQAAQlPAAjtjug'
    );
    var mask_graphics_12 = new cjs.Graphics().p(
      'ApXJXQj3j4AAlfQAAleD3j4QD5j5FeAAQFfAAD4D5QD4D4AAFeQAAFfj4D4Qj4D5lfAAQleAAj5j5g'
    );
    var mask_graphics_13 = new cjs.Graphics().p(
      'ApxJxQkCkDAAluQAAltECkEQEDkDFuAAQFvAAECEDQEDEEAAFtQAAFukDEDQkCEElvAAQluAAkDkEg'
    );
    var mask_graphics_14 = new cjs.Graphics().p(
      'AqLKMQkNkOAAl+QAAl9ENkOQEOkOF9AAQF+AAENEOQEOEOAAF9QAAF+kOEOQkNEOl+AAQl9AAkOkOg'
    );

    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: mask_graphics_0, x: -42.5252, y: -10.5362 })
        .wait(1)
        .to({ graphics: mask_graphics_1, x: -37.0804, y: -5.2502 })
        .wait(1)
        .to({ graphics: mask_graphics_2, x: -29.4108, y: 0.0359 })
        .wait(1)
        .to({ graphics: mask_graphics_3, x: -21.7413, y: 5.3219 })
        .wait(1)
        .to({ graphics: mask_graphics_4, x: -14.0717, y: 10.608 })
        .wait(1)
        .to({ graphics: mask_graphics_5, x: -6.4021, y: 15.894 })
        .wait(1)
        .to({ graphics: mask_graphics_6, x: 1.2675, y: 21.1801 })
        .wait(1)
        .to({ graphics: mask_graphics_7, x: 8.9371, y: 26.4661 })
        .wait(1)
        .to({ graphics: mask_graphics_8, x: 16.6066, y: 31.7522 })
        .wait(1)
        .to({ graphics: mask_graphics_9, x: 24.2762, y: 37.0383 })
        .wait(1)
        .to({ graphics: mask_graphics_10, x: 31.9458, y: 42.3243 })
        .wait(1)
        .to({ graphics: mask_graphics_11, x: 39.6154, y: 47.6104 })
        .wait(1)
        .to({ graphics: mask_graphics_12, x: 47.285, y: 52.8964 })
        .wait(1)
        .to({ graphics: mask_graphics_13, x: 54.9546, y: 58.1825 })
        .wait(1)
        .to({ graphics: mask_graphics_14, x: 62.75, y: 63.5315 })
        .wait(236)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(1)
    );

    // Слой_1
    this.instance = new lib._002();
    this.instance.parent = this;

    var maskedShapeInstanceList = [this.instance];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true }, 250).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 126, 126);

  (lib.Символ9 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2 (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    var mask_graphics_0 = new cjs.Graphics().p(
      'A9kXcQrnptAAtvQAAtuLnptQLnptQbAAQQaAALnJtQLnJtAANuQAANvrnJtQrnJtwaAAQwbAArnptg'
    );
    var mask_graphics_1 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_2 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_3 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_4 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_5 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_6 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_7 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_8 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_9 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_10 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_11 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_12 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_13 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_14 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );

    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: mask_graphics_0, x: -263.6, y: -31.975 })
        .wait(1)
        .to({ graphics: mask_graphics_1, x: -242.7143, y: -21.5571 })
        .wait(1)
        .to({ graphics: mask_graphics_2, x: -211.9286, y: -11.1393 })
        .wait(1)
        .to({ graphics: mask_graphics_3, x: -181.1429, y: -0.7214 })
        .wait(1)
        .to({ graphics: mask_graphics_4, x: -150.3571, y: 9.6964 })
        .wait(1)
        .to({ graphics: mask_graphics_5, x: -119.5714, y: 20.1143 })
        .wait(1)
        .to({ graphics: mask_graphics_6, x: -88.7857, y: 30.5321 })
        .wait(1)
        .to({ graphics: mask_graphics_7, x: -58, y: 40.95 })
        .wait(1)
        .to({ graphics: mask_graphics_8, x: -27.2143, y: 51.3679 })
        .wait(1)
        .to({ graphics: mask_graphics_9, x: 3.5714, y: 61.7857 })
        .wait(1)
        .to({ graphics: mask_graphics_10, x: 34.3571, y: 72.2036 })
        .wait(1)
        .to({ graphics: mask_graphics_11, x: 65.1429, y: 82.6214 })
        .wait(1)
        .to({ graphics: mask_graphics_12, x: 95.9286, y: 93.0393 })
        .wait(1)
        .to({ graphics: mask_graphics_13, x: 126.7143, y: 103.4571 })
        .wait(1)
        .to({ graphics: mask_graphics_14, x: 157.5, y: 113.875 })
        .wait(286)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(1)
    );

    // Слой_1
    this.instance = new lib.karta3();
    this.instance.parent = this;

    var maskedShapeInstanceList = [this.instance];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true }, 300).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 364, 230);

  (lib.Символ8 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2 (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    var mask_graphics_0 = new cjs.Graphics().p(
      'A9kXcQrnptAAtvQAAtuLnptQLnptQbAAQQaAALnJtQLnJtAANuQAANvrnJtQrnJtwaAAQwbAArnptg'
    );
    var mask_graphics_1 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_2 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_3 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_4 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_5 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_6 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_7 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_8 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_9 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_10 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_11 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_12 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_13 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_14 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );

    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: mask_graphics_0, x: -263.6, y: -31.975 })
        .wait(1)
        .to({ graphics: mask_graphics_1, x: -242.7143, y: -21.5571 })
        .wait(1)
        .to({ graphics: mask_graphics_2, x: -211.9286, y: -11.1393 })
        .wait(1)
        .to({ graphics: mask_graphics_3, x: -181.1429, y: -0.7214 })
        .wait(1)
        .to({ graphics: mask_graphics_4, x: -150.3571, y: 9.6964 })
        .wait(1)
        .to({ graphics: mask_graphics_5, x: -119.5714, y: 20.1143 })
        .wait(1)
        .to({ graphics: mask_graphics_6, x: -88.7857, y: 30.5321 })
        .wait(1)
        .to({ graphics: mask_graphics_7, x: -58, y: 40.95 })
        .wait(1)
        .to({ graphics: mask_graphics_8, x: -27.2143, y: 51.3679 })
        .wait(1)
        .to({ graphics: mask_graphics_9, x: 3.5714, y: 61.7857 })
        .wait(1)
        .to({ graphics: mask_graphics_10, x: 34.3571, y: 72.2036 })
        .wait(1)
        .to({ graphics: mask_graphics_11, x: 65.1429, y: 82.6214 })
        .wait(1)
        .to({ graphics: mask_graphics_12, x: 95.9286, y: 93.0393 })
        .wait(1)
        .to({ graphics: mask_graphics_13, x: 126.7143, y: 103.4571 })
        .wait(1)
        .to({ graphics: mask_graphics_14, x: 157.5, y: 113.875 })
        .wait(286)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(1)
    );

    // Слой_1
    this.instance = new lib.karta2();
    this.instance.parent = this;

    var maskedShapeInstanceList = [this.instance];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true }, 300).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 363, 230);

  (lib.Символ7 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2 (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    var mask_graphics_0 = new cjs.Graphics().p(
      'A9kXcQrnptAAtvQAAtuLnptQLnptQbAAQQaAALnJtQLnJtAANuQAANvrnJtQrnJtwaAAQwbAArnptg'
    );
    var mask_graphics_1 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_2 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_3 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_4 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_5 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_6 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_7 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_8 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_9 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_10 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_11 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_12 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_13 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );
    var mask_graphics_14 = new cjs.Graphics().p(
      'A8BXcQrnptAAtvQAAtuLnptQLnptQaAAQQbAALnJtQLnJtAANuQAANvrnJtQrnJtwbAAQwaAArnptg'
    );

    this.timeline.addTween(
      cjs.Tween.get(mask)
        .to({ graphics: mask_graphics_0, x: -263.6, y: -31.975 })
        .wait(1)
        .to({ graphics: mask_graphics_1, x: -242.7143, y: -21.5571 })
        .wait(1)
        .to({ graphics: mask_graphics_2, x: -211.9286, y: -11.1393 })
        .wait(1)
        .to({ graphics: mask_graphics_3, x: -181.1429, y: -0.7214 })
        .wait(1)
        .to({ graphics: mask_graphics_4, x: -150.3571, y: 9.6964 })
        .wait(1)
        .to({ graphics: mask_graphics_5, x: -119.5714, y: 20.1143 })
        .wait(1)
        .to({ graphics: mask_graphics_6, x: -88.7857, y: 30.5321 })
        .wait(1)
        .to({ graphics: mask_graphics_7, x: -58, y: 40.95 })
        .wait(1)
        .to({ graphics: mask_graphics_8, x: -27.2143, y: 51.3679 })
        .wait(1)
        .to({ graphics: mask_graphics_9, x: 3.5714, y: 61.7857 })
        .wait(1)
        .to({ graphics: mask_graphics_10, x: 34.3571, y: 72.2036 })
        .wait(1)
        .to({ graphics: mask_graphics_11, x: 65.1429, y: 82.6214 })
        .wait(1)
        .to({ graphics: mask_graphics_12, x: 95.9286, y: 93.0393 })
        .wait(1)
        .to({ graphics: mask_graphics_13, x: 126.7143, y: 103.4571 })
        .wait(1)
        .to({ graphics: mask_graphics_14, x: 157.5, y: 113.875 })
        .wait(286)
        .to({ graphics: null, x: 0, y: 0 })
        .wait(1)
    );

    // Слой_1
    this.instance = new lib.karta1();
    this.instance.parent = this;

    var maskedShapeInstanceList = [this.instance];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true }, 300).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 363, 230);

  (lib.Символ5 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // шар (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    mask.graphics.p(
      'AnXH7QCzADC0AVQgyDXhVDYQhrAfh1AFgAgOIgQCQAUCTAgQgrA5g2A1QiQCRitBJQBMi7AvjBgAAFG+QAnjDAIjJIGkAAQgLD8h8DOQimgnimgXgAnXGZIAAlnIGrAAQgKC/glDBQi+gWi+gDgAA3gxQABjTgfjbQCVgUCVggQCKDXALELgAnXgxIAAmIQDJgDDKgWQAeDQgDDRgAnXvlQCbAHCLAyQA9DAAhC/QjCAZjCAEgAg7t3QB/BFBwBvQArArAlAuQh9Ach8ATQgbicgrigg'
    );
    mask.setTransform(92.25, -166.95);

    // градиент
    this.shape = new cjs.Shape();
    this.shape.graphics
      .rf(['#8EE934', 'rgba(142,233,52,0)'], [0, 1], 0, 0, 0, 0, 0, 146.6)
      .s()
      .p('Av5P6QmmmmAApUQAApTGmmmQGmmlJTAAQJUAAGmGlQGmGmAAJTQAAJUmmGmQmmGlpUAAQpTAAmmmlg');
    this.shape.setTransform(93.475, -167.85);

    var maskedShapeInstanceList = [this.shape];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask;
    }

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    // шар (mask)
    var mask_1 = new cjs.Shape();
    mask_1._off = true;
    mask_1.graphics.p(
      'AD7PFQhWjagyjZQCzgVC1gCIAAHsQh1gFhrgdgAi2LDQg1g2gsg5QCUghCVgWQAuDFBOC9QixhJiTiTgAnaAzIGqAAQAIDIAmDDQioAYipAmQh7jOgMj7gAAwAzIGrAAIAAFmQi+ADi+AVQgli/gKi/gAAtgxQgDjQAejRQDJAYDKACIAAGHgAnagxQAMkLCLjXQCWAgCYAWQgfDaABDSgABWorQAijCA+jBIADgBQCIgwCagHIAAHWQjDgDjCgYgAkFpqQAkgtArgsQBzhyCDhFQgsCigbCgQh/gUh/geg'
    );
    mask_1.setTransform(-12.875, -167);

    // градиент
    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .rf(['#00F0F6', 'rgba(0,225,241,0)'], [0.278, 1], 0, 0, 0, 0, 0, 146.6)
      .s()
      .p('Av5P6QmmmmAApUQAApTGmmmQGmmlJTAAQJUAAGmGlQGmGmAAJTQAAJUmmGmQmmGlpUAAQpTAAmmmlg');
    this.shape_1.setTransform(-11.825, -167.85);

    var maskedShapeInstanceList = [this.shape_1];

    for (var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
      maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
    }

    this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

    // шар
    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics
      .f('#00A902')
      .s()
      .p(
        'AnXH7QCzADC0AVQgyDXhVDYQhrAfh1AFgAgOIgQCQAUCTAgQgrA5g2A1QiQCRitBJQBMi7AvjBgAAFG+QAnjDAIjJIGkAAQgLD8h8DOQimgnimgXgAnXGZIAAlnIGrAAQgKC/glDBQi+gWi+gDgAA3gxQABjTgfjbQCVgUCVggQCKDXALELgAnXgxIAAmIQDJgDDKgWQAeDQgDDRgAnXvlQCbAHCLAyQA9DAAhC/QjCAZjCAEgAg7t3QB/BFBwBvQArArAlAuQh9Ach8ATQgbicgrigg'
      );
    this.shape_2.setTransform(92.25, -166.95);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics
      .f('#00ACEB')
      .s()
      .p(
        'AD7PFQhWjagyjZQCzgVC1gCIAAHsQh1gFhrgdgAi2LDQg1g2gsg5QCUghCVgWQAuDFBOC9QixhJiTiTgAnaAzIGqAAQAIDIAmDDQioAYipAmQh7jOgMj7gAAwAzIGrAAIAAFmQi+ADi+AVQgli/gKi/gAAtgxQgDjQAejRQDJAYDKACIAAGHgAnagxQAMkLCLjXQCWAgCYAWQgfDaABDSgABWorQAijCA+jBIADgBQCIgwCagHIAAHWQjDgDjCgYgAkFpqQAkgtArgsQBzhyCDhFQgsCigbCgQh/gUh/geg'
      );
    this.shape_3.setTransform(-12.875, -167);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_3 }, { t: this.shape_2 }] })
        .wait(1)
    );
  }).prototype = getMCSymbolPrototype(lib.Символ5, new cjs.Rectangle(-60.3, -266.9, 199.8, 199.79999999999998), null);

  (lib.Символ4 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#000000').s().p('EiV/Au4MAAAhdvMEr/AAAMAAABdvg');
    this.shape.setTransform(960, 300);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = getMCSymbolPrototype(lib.Символ4, new cjs.Rectangle(0, 0, 1920, 600), null);

  (lib.Символ3 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.instance = new lib._03();
    this.instance.parent = this;

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
  }).prototype = getMCSymbolPrototype(lib.Символ3, new cjs.Rectangle(0, 0, 1920, 600), null);

  (lib.Символ2 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.instance = new lib._02();
    this.instance.parent = this;

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
  }).prototype = getMCSymbolPrototype(lib.Символ2, new cjs.Rectangle(0, 0, 1920, 600), null);

  (lib.Символ1 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.instance = new lib._01();
    this.instance.parent = this;

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
  }).prototype = getMCSymbolPrototype(lib.Символ1, new cjs.Rectangle(0, 0, 1920, 600), null);

  (lib.Анимация15 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'ACQDvIAAgsID+mFIj3AAIAAgsIErAAIAAA1Ij6F8IDyAAIAAAsgAhADvIAAguIAuAAIAAmBIguAAIAAguICQAAIAAAuIgvAAIAAGBIAvAAIAAAugAnBDvIAAndICeAAQA/AAAkAiQAlAhAAA3QAAAkgQAZQgQAageAMQApAKAWAdQAXAeAAAyQAAA/gnAlQgmAlhDAAgAmNDDIBzAAQAsAAAagZQAagZAAgrQAAgsgagZQgagZgsAAIhzAAgAmNgiIBwAAQBLAAAAhSQAAglgWgUQgWgVgmAAIhpAAg'
      );
    this.shape.setTransform(0.025, 0.025);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-44.9, -23.8, 89.9, 47.7);

  (lib.Анимация14 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'AIiDEQgsgwAAhcIAAkrIA0AAIAAErQAACNB8AAQA4AAAhglQAhgkAAhEIAAkrIA0AAIAAErQAABbguAwQgtAyhTAAQhYAAgsgxgAViDpIAAl9IigF9IgxAAIiYl7IAAF7Ig1AAIAAncIBBAAICnGhICvmhIA7AAIAAHcgAEHDpIAAguIAuAAIAAmAIguAAIAAguICRAAIAAAuIguAAIAAGAIAuAAIAAAugAB1DpIAAl9IifF9IgxAAIiYl7IAAF7Ig1AAIAAncIBBAAICnGhICumhIA6AAIAAHcgAqIDpIAAncIEKAAIAAArIjXAAIAACnICpAAIAAAqIipAAIAAC1IDZAAIAAArgAsTDpIh4jTIhgAAIAADTIg0AAIAAncICgAAQAsAAAgAQQAhASARAeQASAeAAAnQAAAwgcAiQgdAggwANIB8DYgAvrgUIBlAAQAuAAAZgYQAZgZAAgpQAAgogZgZQgZgZguAAIhlAAgA2UDpIAAncICfAAQBBAAAmAnQAmAnAABFQAABFgnAmQgpAnhCAAIhmAAIAAC3gA1gAHIBkAAQAvAAAZgZQAYgbAAgzQAAgzgYgbQgZgagvAAIhkAAg'
      );

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-142.9, -24.4, 285.9, 48.9);

  (lib.Анимация13 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'AvXDfQgygbghgsIArglQAZAnAnAYQAnAXAugBQAxAAAagVQAagWAAgmQAAgqgcgVQgbgXg8gQQiYglAAhjQAAg/ApghQAogiBJAAQA0AAAqAUQAqATAgApIgpAjQgZgjgegQQgegQgqAAQgsAAgdAUQgbAVAAAjQAAAlAZAWQAaAVA+APQBJATAoAiQAoAiAAA+QAAAngTAdQgUAegkAQQglARgxAAQg1gBgxgagANhDuIAAmxIiXAAIAAgrIFhAAIAAArIiWAAIAAGxgAJtDuIh5jTIhfAAIAADTIg0AAIAAncICgAAQArAAAhAQQAhASARAeQASAeAAAnQAAAwgdAiQgcAggwANIB8DYgAGVgPIBlAAQAuAAAZgYQAZgZAAgpQAAgogZgZQgZgZguAAIhlAAgADwDuIgxiFIjFAAIgsCFIg0AAIConcIAxAAICvHcgAAJA9ICmAAIhVjngAjbDuIAAl9IifF9IgxAAIiZl7IAAF7Ig0AAIAAncIBAAAICoGhICvmhIA6AAIAAHcg'
      );
    this.shape.setTransform(0.025, 0);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-106.7, -24.9, 213.5, 49.9);

  (lib.Анимация12 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'ACKG5IBJi/Ii/ncIBHAAICaGDICWmDIBAAAIj9KbgAmTDhQg1gggeg5Qgfg5AAhJQABhHAdg5QAdg4A1ggQA0ggBEAAQAzAAAqAWQAqAXAdApIAAhGIBFAAIAAHTIhFAAIAAhFQgdAogqAXQgpAWgzAAQhCAAg1gggAlxicQglAYgWArQgUAqAAA1QAAA3AUArQAWArAlAYQAkAYAwAAQAvAAAmgYQAlgYAWgrQAUgrAAg2QAAg1gUgrQgWgrglgYQgmgYgvAAQgwAAgkAYgAVLD7QhGAAgognQgpgnAAhFIAAkMIiwAAIAAg+IGzAAIAAA+Ii/AAIAAERQAAAlAXAVQAXAWAlAAIA8AAIAAA+gAe/DxIAAnTIBEAAIAAHTgAYXDxIAAnTIBDAAIAACfIBvAAQBOAAAqArQAqAqABBEQAABIgtApQgsAqhTAAgAZaCzIBoAAQAtAAAagZQAZgaAAgqQAAgrgZgYQgagYgtAAIhoAAgANrDxIAAjUIkWAAIAADUIhFAAIAAnTIBFAAIAADCIEWAAIAAjCIBDAAIAAHTgAqDDxIikjUIhLAAIAADUIhFAAIAAnTIBFAAIAADCIBLAAICSjCIBNAAIiqDeIC9D1gAxRDxIimjUIhLAAIAADUIhDAAIAAnTIBDAAIAADCIBNAAICSjCIBLAAIiqDeIC9D1gA4XDxIhFi/IkcAAIg/C/IhKAAIDyqpIBGAAID4KpgA9ggLIDsAAIh5lLg'
      );

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-205, -44.1, 410.1, 88.2);

  (lib.Анимация10 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'EAkZAD/QgngYgWgpQgWgrAAg1QAAg1AVgpQAWgqAngZQAngXAxAAQAvAAAmAWQAmAYAVAnQAVAnAAAwIgBAWIkcAAQADA1AfAmQAgAmA3AAQAtAAAdgQQAdgRASgeIAoAbQgZAmgoAWQgoAWg2AAQgzAAgngYgEAkigAOQgfAegIAvIDoAAQgHg3gdgZQgdgbgyAAQgwAAgeAegAhBEBQgngWgWgnQgXgngCgxIAAhTQAAhbAbg2QAbg2A5giQA5giBugkIAPAuQhfAfgxAZQgyAbgYApQgYAogDBEQAWgjAigUQAigUAogBQAxABAmAWQAlAXAVAnQAUAoAAA0QAAAzgWApQgWApgnAWQgmAXgyAAQgwAAgmgWgAhCAEQgiAjAAA+QAAAmAPAeQAQAeAbARQAcARAhAAQAkAAAcgRQAbgRAQgeQAQgeAAgmQAAg7gfgkQgfgkg1AAQg6ABgjAhgAnUD/QgngYgWgqQgWgqAAg2QAAg1AVgpQAWgqAngYQAngXAxAAQAyAAAnAXQAnAZAWAqQAXApAAA1QAAA1gWArQgWApgnAYQgnAYgxAAQgyAAgngYgAm7gaQgbARgQAeQgPAgAAAoQAAApAPAfQAQAgAbATQAbARAjAAQAkAAAcgRQAcgTAPggQAQgfAAgoQAAgogQggQgPgfgcgRQgcgSgkAAQgjAAgbASgA0wD/QgogYgWgqQgWgqAAg2QAAg1AWgpQAVgqAngYQAngXAyAAQAxAAAnAXQAoAZAWAqQAWApAAA1QAAA1gWArQgVApgnAYQgnAYgyAAQgxAAgngYgA0XgaQgcARgPAeQgQAgAAAoQAAApAQAfQAPAgAcATQAbARAjAAQAjAAAcgRQAcgTAQggQAPgfAAgoQAAgogPggQgQgfgcgRQgcgSgjAAQgjAAgbASgA4AESQgzAAgegdQgegcAAg0IAAjGIiDAAIAAgtIFDAAIAAAtIiOAAIAADLQAAAbARAPQARARAbgBIAtAAIAAAugEAhGAELIAAlZIAzAAIAAFZgAcMELIAAlZIAzAAIAAB0IBRAAQA7ABAfAfQAfAgAAAzQAAA1ghAeQghAfg+AAgAc/DdIBNAAQAhAAATgTQASgSAAgfQAAghgSgSQgTgSghAAIhNAAgAZzELIAAidIjOAAIAACdIgzAAIAAlZIAzAAIAACPIDOAAIAAiPIAyAAIAAFZgAQdELIAAlZIAzAAIAAB0IBgAAQA6ABAfAfQAfAgAAAzQAAA1ggAeQghAfg+AAgARQDdIBbAAQAiAAASgTQATgSAAgfQAAghgTgSQgSgSgiAAIhbAAgAOQELIAAksIiCAAIAAAxQAABzgaBEQgZBEhBAAIgVAAIAAguIAXAAQAfAAASg2QARg3AAhvIAAhPIDkAAIAAFZgAIMELIAAkTIjNETIgzAAIAAlZIAzAAIAAEWIDNkWIAyAAIAAFZgAqnELIAAkMIh2DjIghAAIhwjfIAAEIIgzAAIAAlZIA6AAIB9D2ICBj2IA1AAIAAFZgEgg5AELIAAlZICeAAQA1AAAfAYQAfAZAAAnQAAAagNAQQgNAQgbAIQAiAIASAYQASAXAAAkQAAAvggAbQggAag4AAgEggGADdIByAAQAhAAASgOQATgPAAgZQAAgggTgSQgSgSghAAIhyAAgEggGAA8IBwAAQA2AAAAgyQAAgUgPgMQgQgLgcAAIhrAAgEgipAELIg0iNIjRAAIgvCNIg3AAICzn4IA0AAIC4H4gEgmdABQICvAAIhaj0g'
      );
    this.shape.setTransform(0.025, 0);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-258.1, -27.9, 516.3, 55.8);

  (lib.Анимация9 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'A/iFbIAAntIAyAAIAAAzQAWgeAfgRQAfgQAkAAQAyAAAnAYQAnAYAXApQAWAqAAA2QAAA1gWApQgVArgoAXQgmAYgyAAQgmAAgfgQQgfgRgWgfIAADIgA91hfQgcASgPAgQgQAgAAAnQAAAnAQAhQAPAfAcASQAcASAjAAQAjAAAcgSQAbgRAPggQAQgfAAgoQAAgogQggQgPgggbgSQgcgRgjAAQgjAAgcARgEAqCAC7QgogXgWgrQgWgqAAg1QAAg1AWgqQAVgpAngYQAngYAxAAQAvAAAmAXQAmAXAVAnQAVAoABAwIgBAVIkdAAQADA1AgAmQAfAmA3AAQAtAAAdgRQAdgQASgeIAoAaQgZAngoAWQgoAWg2AAQgzAAgmgYgEAqKgBRQgfAegIAvIDoAAQgHg2gdgbQgdgbgyAAQgvAAgfAfgALDC7QgngXgWgrQgWgqAAg1QAAg1AWgqQAVgpAngYQAngYAxAAQAwAAAlAXQAmAXAVAnQAVAoAAAwIgBAVIkcAAQADA1AfAmQAhAmA2AAQAtAAAdgRQAdgQASgeIAoAaQgYAngoAWQgoAWg3AAQgzAAgngYgALMhRQgfAegIAvIDoAAQgHg2gdgbQgdgbgyAAQgvAAgfAfgAg7C7QgngXgWgrQgWgqAAg2QAAg1AVgpQAWgpAngYQAngYAxAAQAlAAAgAQQAfARAWAeIAAgzIAyAAIAAFZIgyAAIAAgzQgWAdgfASQgfAQglAAQgxAAgngYgAgihfQgbASgQAgQgPAfAAAnQAAAoAPAhQAQAfAbASQAbASAjAAQAjAAAcgSQAcgSAQgfQAPghAAgnQAAgngPggQgQgggcgSQgcgRgjAAQgjAAgbARgAsyC7QgogYgWgqQgWgqAAg2QAAg1AWgpQAVgpAngYQAngYAxAAQAyAAAnAYQAnAYAWApQAXAqAAA1QAAA1gWAqQgWArgnAXQgmAYgyAAQgyAAgmgYgAsZhfQgcASgPAgQgQAfAAAnQAAAoAQAhQAPAfAcASQAaASAjAAQAkAAAcgSQAcgSAPgfQAQghAAgnQAAgngQggQgPgggcgSQgcgRgkAAQgjAAgaARgAx9DBQgjgRgWggIAngbQAPAXAYANQAYAMAdAAQAjAAAUgPQATgPAAgdQAAgggTgSQgSgRghgBIgdAAIAAgmIAcAAQA9AAAAg6QAAgbgRgNQgRgOgeAAQgcAAgVANQgVAMgRAaIgkgcQAXghAggSQAggSAnAAQAwAAAfAbQAgAbAAAuQAAAbgPAUQgPATgbAIQAiAKATAWQATAXAAAkQAAAvgiAcQgiAdg9AAQgnAAgjgSgA4GC7QgngXgWgrQgWgqAAg2QAAg1AWgpQAVgpAngYQAngYAxAAQAmAAAgAQQAfARAWAeIAAgzIAyAAIAAFZIgyAAIAAgzQgWAdgfASQgfAQglAAQgyAAgngYgA3thfQgbASgQAgQgPAfAAAnQAAAoAPAhQAQAfAbASQAcASAiAAQAkAAAcgSQAcgSAQgfQAPghAAgnQAAgngPggQgQgggcgSQgcgRgkAAQgiAAgcARgEgksAC9QgngWgWgnQgXgmgCgyIAAhSQAAhcAbg2QAbg2A6giQA5giBugkIAPAuQhfAegyAbQgxAbgZAoQgYApgDBEQAWgkAigUQAjgVAoABQAxgBAmAXQAlAXAVAoQAUAoAAAzQAAAzgWApQgWApgnAWQgmAXgyAAQgxAAgmgWgEgksgA+QgjAiAAA9QAAAmAQAeQAPAeAbARQAcARAiAAQAlAAAbgRQAcgRAPgeQAQgeAAgmQAAg6gfgkQgeglg2AAQg7AAgiAkgEgsUACyQgygigbg9Qgcg7AAhMQABhMAbg8QAbg9AyghQAygiA+ABQA/AAAxAhQAxAhAcA9QAcA9AABMQAABLgcA8QgcA7gxAjQgxAhg/AAQg+AAgyghgEgr2gDuQglAbgUAyQgWAwAAA9QAAA9AWAwQAUAxAlAbQAkAbAuAAQAuAAAkgbQAlgbAVgxQAVgwAAg9QAAg9gVgwQgVgyglgbQgkgcguAAQguAAgkAcgAH0DOQg0AAgegcQgegdAAgzIAAjGIiDAAIAAguIFDAAIAAAuIiOAAIAADJQAAAcARAPQASAQAbABIAsAAIAAAtgEAmuADHIAAlZIAzAAIAAFZgEAh0ADHIAAlZIAzAAIAAB2IBSAAQA6gBAfAfQAfAgAAAyQAAA1ggAgQgiAeg+AAgEAinACZIBNAAQAhAAATgSQASgUAAgfQAAgfgSgTQgTgSghAAIhNAAgAfbDHIAAidIjOAAIAACdIgyAAIAAlZIAyAAIAACQIDOAAIAAiQIAyAAIAAFZgAWGDHIAAlZIAyAAIAAB2IBgAAQA6gBAfAfQAfAgABAyQAAA1ghAgQghAeg+AAgAW4CZIBcAAQAhAAASgSQATgUAAgfQAAgfgTgTQgSgSghAAIhcAAgAT4DHIAAkrIiCAAIAAAwQAABzgaBEQgZBEhBAAIgVAAIAAguIAXAAQAfAAASg2QARg3AAhtIAAhRIDlAAIAAFZgAnjDHIAAlZICeAAQA1AAAfAYQAeAYAAAoQAAAbgMAQQgNAPgbAIQAiAIASAXQARAYAAAkQABAvggAaQggAbg4AAgAmwCZIBxAAQAiAAASgPQATgOAAgZQAAgggTgSQgSgSgiAAIhxAAgAmwgHIBwAAQA2AAAAgzQAAgUgQgLQgPgLgcAAIhrAAg'
      );

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-294.1, -34.7, 588.3, 69.4);

  (lib.Анимация8 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'Av7EqIAAhbIlbAAIAABbIg0AAIAAiJIATAAQAxAAAVhIQAWhHAAifIAAicIEoAAIAAHKIAsAAIAACJgAzniYQAAB5gNBNQgMBOgmAlID7AAIAAmcIi8AAgASPDDQgogXgWgqQgWgrAAg1QAAg0AWgqQAVgqAngYQAngYAyAAQAvAAAlAXQAmAXAVAnQAWAoAAAwIgBAVIkdAAQADA2AgAlQAgAmA3AAQAsAAAdgQQAdgRASgeIAoAbQgYAmgoAWQgoAWg3AAQgyAAgngYgASXhJQgfAegIAuIDoAAQgHg1gdgbQgdgbgxAAQgwAAgfAfgAg8DDQgngXgWgrQgWgqAAg2QAAg0AVgqQAWgpAngYQAngYAwAAQAyAAAnAYQAnAYAWAqQAXAqAAA0QAAA1gWArQgWAqgnAXQgnAYgxAAQgxAAgngYgAgjhWQgbARgQAgQgPAfAAAnQAAApAPAgQAQAgAbASQAbARAiAAQAkAAAcgRQAcgSAPggQAQggAAgoQAAgngQggQgPgggcgRQgcgSgkAAQgiAAgbASgAs8DDQgogXgWgqQgWgrAAg1QAAg0AWgqQAVgqAngYQAngYAyAAQAvAAAlAXQAmAXAVAnQAWAoAAAwIgBAVIkdAAQADA2AgAlQAgAmA3AAQAsAAAdgQQAdgRASgeIAoAbQgYAmgoAWQgoAWg3AAQgyAAgngYgAs0hJQgfAegIAuIDoAAQgHg1gdgbQgdgbgxAAQgwAAgfAfgAO8DPIAAlZIAyAAIAAFZgAKCDPIAAlZIAzAAIAAB2IBRAAQA6AAAfAeQAfAgAAAzQAAA1ggAfQgiAeg9AAgAK1ChIBMAAQAiAAASgSQATgTAAgfQAAgggTgTQgSgSgiAAIhMAAgAETDPIAAlZICeAAQA0AAAfAYQAfAZAAAoQAAAagNAQQgNAPgaAIQAiAIASAYQARAXAAAlQAAAugfAbQggAag5AAgAFGChIBxAAQAiAAASgOQATgPAAgYQAAghgTgSQgSgSgiAAIhxAAgAFGAAIBwAAQA2AAAAgxQAAgVgQgLQgPgLgcAAIhrAAgAkHDPIAAkrIiDAAIAAAxQAABygaBEQgZBEhBAAIgVAAIAAguIAXAAQAfAAASg2QASg2AAhuIAAhRIDkAAIAAFZg'
      );
    this.shape.setTransform(0.025, 0.025);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-141.8, -29.7, 283.70000000000005, 59.5);

  (lib.Анимация7 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'A8vEJIAAgvQhBgFgygcQgygdgbguQgcguAAg6QAAg8AbgvQAcgvAygdQAygdBBgFIAAg0IA3AAIAAA1QBBAFAxAdQAxAeAbAuQAcAwAAA6QAAA6gcAvQgbAugxAcQgxAbhBAFIAAAwgA74CvQAwgGAkgXQAlgXAUgkQAVgkAAgtQAAgsgVgmQgUgmglgXQgkgXgwgGgA+FiKQgkAXgVAmQgVAmAAAtQAAAtAVAkQAVAlAkAXQAmAWAwAGIAAlVQgwAFgmAXgAcQDwQgogXgWgqQgWgrAAg1QAAg1AWgqQAVgqAngYQAngXAyAAQAvAAAlAWQAmAYAVAnQAWAnAAAxIgBAVIkdAAQADA2AgAlQAgAmA3AAQAsAAAdgQQAdgRASgeIAoAaQgYAngoAWQgoAWg3AAQgyAAgngYgAcYgcQgfAdgIAvIDoAAQgHg2gdgaQgdgbgxAAQgwAAgfAfgAJEDwQgngXgWgrQgWgrAAg1QAAg2AVgoQAWgpAngZQAngXAxAAQAyAAAnAXQAnAYAWAqQAXAqAAA1QAAA1gWArQgWAqgnAXQgnAYgxAAQgyAAgngYgAJdgpQgbARgQAeQgPAgAAAoQAAApAPAgQAQAfAbATQAbARAjAAQAkAAAcgRQAcgTAPgfQAQghAAgnQAAgogQggQgPgfgcgRQgcgSgkAAQgjAAgbASgADiDwQgogXgWgqQgWgrAAg1QAAg1AWgqQAVgqAogYQAngXAyAAQAqAAAfASQAgASAaAhIglAdQglg0g5AAQgjAAgcASQgcARgPAfQgQAgAAAoQAAAnAQAhQAPAfAcATQAcARAjAAQAjAAAXgMQAXgNASgXIAoAbQgZAfgkASQgkASgpAAQgyAAgngYgApVDwQgngXgWgqQgWgrAAg2QAAg2AVgoQAWgpAngZQAngXAxAAQAmAAAfAQQAgARAWAfIAAg0IAyAAIAAFZIgyAAIAAgzQgWAdgfASQgfAQglAAQgyAAgngYgAo8gpQgbARgQAeQgPAgAAAoQAAApAPAgQAQAfAbATQAbARAjAAQAkAAAcgRQAcgTAPgfQAQghAAgnQAAgogQggQgPgfgcgRQgcgSgkAAQgjAAgbASgAY9D8IAAlZIAyAAIAAFZgAUDD8IAAlZIAzAAIAAB1IBRAAQA6AAAfAfQAfAgAAAzQAAA0ggAgQgiAeg9AAgAU2DOIBMAAQAiAAASgTQATgSAAgfQAAghgTgSQgSgSgiAAIhMAAgAOUD8IAAlZICeAAQA0AAAfAYQAfAZAAAoQAAAZgNAQQgNAQgaAIQAiAIASAYQARAXAAAkQAAAvgfAaQggAbg5AAgAPHDOIBxAAQAiAAASgOQATgQAAgYQAAgggTgSQgSgSgiAAIhxAAgAPHAtIBwAAQA2AAAAgxQAAgVgQgMQgPgLgcABIhrAAgAAQD8IAAidIjMAAIAACdIgzAAIAAlZIAzAAIAACPIDMAAIAAiPIAyAAIAAFZgAsoD8IAAidIjNAAIAACdIgzAAIAAlZIAzAAIAACPIDNAAIAAiPIAyAAIAAFZgAzCD8IAAkTIjNETIgzAAIAAlZIAzAAIAAEXIDNkXIAyAAIAAFZg'
      );
    this.shape.setTransform(0.025, 0);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-205.9, -26.4, 411.9, 52.9);

  (lib.Анимация6 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'AtbEvIAAhaIkTAAIAAlaIAzAAIAAErICzAAIAAkrIAzAAIAAErIAqAAIAACJgAbGDIQgngXgWgqQgWgrAAg1QAAg0AVgqQAWgqAngYQAngYAxABQAvgBAmAXQAmAYAVAmQAVAoAAAwIgBAVIkcAAQADA2AfAmQAgAlA3ABQAtAAAdgRQAdgRASgdIAoAaQgZAngoAVQgoAXg2AAQgzAAgngZgAbPhEQgfAegIAvIDoAAQgHg2gdgaQgdgbgyAAQgwAAgeAegAkSDIQgngXgWgqQgWgrAAg2QAAg0AVgpQAWgqAngYQAngYAxABQAmAAAfAQQAgAQAWAfIAAg0IAyAAIAAFaIgyAAIAAgzQgWAdgfARQgfARglAAQgyAAgngZgAj5hRQgbARgQAgQgPAfAAAnQAAApAPAgQAQAgAbASQAbASAjAAQAkAAAcgSQAcgSAPggQAQggAAgoQAAgngQggQgPgfgcgSQgcgRgkAAQgjAAgbARgA2+DIQgngXgWgqQgWgrAAg2QAAg0AVgpQAWgqAngYQAngYAxABQAygBAnAYQAnAYAWAqQAXAqAAA0QAAA1gWArQgWAqgnAXQgnAZgxAAQgyAAgngZgA2lhRQgbARgQAgQgPAfAAAnQAAApAPAgQAQAgAbASQAbASAjAAQAkAAAcgSQAcgSAPggQAQggAAgoQAAgngQggQgPgfgcgSQgcgRgkAAQgjAAgbARgA9iDBQgugfgZg8QgYg6AAhRQAAhTAXg8QAZg7AsgfQAtggA+AAQA/AAAsAbQAtAcAZAyIgsAbQgYgsgggTQgfgTguAAQhCAAgmA4QglA5AABlQAABBARAwQARAwAgAZQAgAaAqAAQA0AAAegXQAdgYAZgxIAuAcQgaA5gsAfQgsAeg9ABQg/gBgvgfgAXzDVIAAlaIAzAAIAAFagAS5DVIAAlaIAzAAIAAB2IBRAAQA7AAAfAfQAfAgAAAyQAAA1ghAfQghAfg+AAgATsCmIBNAAQAhAAATgSQASgTAAgfQAAgggSgTQgTgRghgBIhNAAgAQgDVIAAieIjOAAIAACeIgzAAIAAlaIAzAAIAACPIDOAAIAAiPIAyAAIAAFagAHKDVIAAlaIAzAAIAAB2IBgAAQA6AAAfAfQAfAgAAAyQAAA1ggAfQghAfg+AAgAH9CmIBbAAQAiAAASgSQATgTAAgfQAAgggTgTQgSgRgigBIhbAAgAE9DVIAAksIiCAAIAAAxQAABzgaBDQgZBFhBAAIgVAAIAAgvIAXAAQAfAAASg2QARg2AAhuIAAhRIDkAAIAAFagAnlDVIAAkTIjNETIgzAAIAAlaIAzAAIAAEXIDNkXIAyAAIAAFag'
      );
    this.shape.setTransform(0.025, 0);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-198.6, -30.3, 397.29999999999995, 60.6);

  (lib.Анимация5 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'ABmE9Qg1gggeg6Qgcg5AAhIQgBhIAdg4QAeg4A0ggQA0ggBDAAQBDAAA2AgQA1AgAdA5QAeA4AABIQAABIgdA5QgeA5g0AgQg0AghDAAQhDAAg2gggACIhAQglAYgUAqQgWAqAAA2QAAA3AWArQAUArAlAYQAmAYAuAAQAxAAAlgYQAmgYAUgrQAWgrAAg2QAAg2gWgrQgUgqgmgYQglgYgxAAQguAAgmAYgAM9FXQhGAAgognQgpgnAAhFIAAkMIiwAAIAAg+IGzAAIAAA+Ii+AAIAAERQgBAlAXAWQAXAVAlAAIA9AAIAAA+gAWxFNIAAnTIBDAAIAAHTgAQJFNIAAnTIBDAAIAACeIBuAAQBPAAArArQAqArAABEQgBBIgsApQgsAqhUAAgARMEPIBpAAQAsAAAagaQAYgZAAgqQAAgrgYgZQgagYgsAAIhpAAgAlyFNIAAnTIE3AAIAAA+Ij0AAIAAGVgAtAFNIAAnTIBEAAIAACeICCAAQBPAAArArQAqArAABEQgBBIgsApQgsAqhUAAgAr8EPIB9AAQAsAAAagaQAYgZAAgqQAAgrgYgZQgagYgsAAIh9AAgAwaFNIAAprIj+AAIAACFQAACagNBmQgNBmgtBAQgtBAhXAAIgQAAIAAg+IAVAAQAuAAAcgrQAcgqAOhaQANhagBiQIAAjSIGQAAIAAKpg'
      );

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-152.4, -34.9, 304.9, 69.8);

  (lib.Анимация3 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'AO7JmIAAzLIGbAAQClAABjBlQBjBmAACxQAACxhnBjQhoBlirAAIkFAAIAAHWgARCAhIEBAAQB6AAA+hCQA/hEAAiEQAAiDg/hFQg+hEh6AAIkBAAgAIaJmIAAv8IqLP8IiCAAIAAzLICCAAIAAQRIKLwRIB/AAIACTLgAqYJmIAAvUImbPUIh9AAImJvRIAAPRIiHAAIAAzLICmAAIGuQ0IHCw0ICXAAIAATLg'
      );
    this.shape.setTransform(0.025, 0);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-172.8, -61.4, 345.70000000000005, 122.8);

  (lib.Анимация2 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'ALmChQgngYgXgqQgWgqABg1QAAg0AVgqQAVgqAogZQAmgXAyAAQAvAAAmAWQAmAYAVAnQAVAoAAAwIgBAVIkdAAQADA1AgAmQAgAmA3AAQAtAAAdgRQAdgQARgeIApAbQgZAmgoAWQgoAWg2AAQgzAAgngYgALvhsQgfAfgIAvIDnAAQgHg3gdgaQgcgbgyAAQgwAAgeAegAAjChQgmgYgWgqQgWgqAAg1QAAg0AWgqQAVgqAmgZQAogXAxAAQArAAAfASQAfASAbAiIglAcQglg0g6AAQgiAAgcASQgcARgQAgQgPAgAAAnQAAAoAPAfQAQAhAcASQAcARAiAAQAkAAAXgMQAXgMASgYIAoAbQgZAegkATQgkASgpAAQgzAAgngYgArWChQgogYgWgqQgWgqAAg1QAAg0AWgqQAVgqAogZQAmgXAyAAQArAAAfASQAfASAaAiIgkAcQglg0g6AAQgiAAgcASQgcARgPAgQgQAgAAAnQAAAoAQAfQAPAhAcASQAcARAiAAQAkAAAXgMQAXgMASgYIAoAbQgZAegkATQgkASgpAAQgzAAgmgYgAxeChQgngXgXgrQgVgqAAg1QgBg2AWgpQAVgqAngYQAogXAxAAQAyAAAnAXQAnAZAWAqQAXAqAAA0QgBA1gVAqQgWAqgnAYQgnAYgyAAQgxAAgngYgAxFh4QgcARgPAfQgPAggBAoQABAoAPAfQAPAhAcASQAbARAjAAQAkAAAcgRQAbgSAQghQAPgfAAgoQAAgngPggQgQgggbgRQgcgSgkAAQgjAAgbASgA8zCnQgkgTgYgeIAngbQASAYAYAMQAXAMAjAAQAyAAAhgiQAhgiAFg3IizAAIAAgtICxAAQgJgxgggeQghgegtAAQg5AAglA0IglgcQAagiAfgSQAggSAqAAQAyAAAmAXQAoAZAWAqQAVAqAAA0QABA1gXAqQgWAqgnAYQgnAYgzAAQgpAAgkgSgAIXC0Qg0AAgegdQgegcAAg0IAAjGIiDAAIAAgtIFDAAIAAAtIiOAAIAADLQAAAaARARQARAPAcAAIAsAAIAAAugAc+CtIAAlZIAyAAIAAFZgAYECtIAAlZIAzAAIAAB1IBRAAQA6ABAfAfQAfAfABAzQAAA1ghAeQghAfg+AAgAY3B/IBNAAQAhAAATgTQASgTAAgeQAAgggSgTQgTgRghAAIhNAAgAVrCtIAAkMIh3DjIggAAIhxjeIAAEHIgyAAIAAlZIA5AAIB9D2ICBj2IA1AAIAAFZgAitCtIAAkTIjOETIgyAAIAAlZIAyAAIAAEWIDOkWIAyAAIAAFZgA0PCtIh6idIg3AAIAACdIgzAAIAAlZIAzAAIAACPIA3AAIBtiPIA4AAIh+CkICMC1g'
      );

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-190.4, -18.5, 380.9, 37);

  (lib.Анимация1 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFFFFF')
      .s()
      .p(
        'EAg3AGoIBHi4Ii4nIIBEAAICVFzICPlzIA+AAIjzKAgAYvDYQgzgfgcg3Qgdg2AAhGQAAhEAcg2QAcg2AyggQAzgeBAAAQAyAAAoAVQApAWAcAnIAAhCIBBAAIAAG/IhBAAIAAhCQgcAngpAWQgoAVgwAAQhAAAgzgfgAZQiWQgkAYgUAoQgUApAAAzQAAA1AUApQAUApAkAXQAjAYAtAAQAvAAAjgYQAlgXAUgpQAUgpAAg0QAAgzgUgqQgUgoglgYQgjgXgvAAQgtAAgjAXgACbDYQgygfgdg3Qgcg2AAhGQAAhEAbg2QAdg2AyggQAzgeBAAAQAxAAApAVQApAWAbAnIAAhCIBBAAIAAG/IhBAAIAAhCQgcAngoAWQgoAVgwAAQhAAAg0gfgAC9iWQgkAYgVAoQgTApgBAzQABA1ATApQAVApAkAXQAiAYAuAAQAuAAAkgYQAkgXAVgpQATgpAAg0QAAgzgTgqQgVgogkgYQgkgXguAAQguAAgiAXgEglJADYQgzgfgcg3Qgdg3AAhFQAAhEAcg2QAcg2AyggQAzgeBAAAQBBAAAzAeQAzAgAcA2QAdA2AABFQAABFgcA2QgcA3gzAfQgzAfhAAAQhAAAgzgfgEgkogCWQgjAYgVAoQgUApAAAzQAAA1AUApQAVApAjAXQAjAYAtAAQAvAAAjgYQAkgXAVgpQAUgpAAg0QAAgzgUgqQgVgogkgYQgjgXgvAAQgtAAgjAXgEAzIADxQhDAAgnglQgmgmgBhCIAAkBIipAAIAAg7IGjAAIAAA7Ii4AAIAAEGQAAAjAWAVQAWAVAjAAIA6AAIAAA7gA6PDxQhDAAgnglQgngmAAhCIAAkBIiqAAIAAg7IGjAAIAAA7Ii4AAIAAEGQAAAjAXAVQAVAVAkAAIA5AAIAAA7gEA8jADnIAAm/IBBAAIAAG/gEA2LADnIAAm/IBCAAIAACYIBpAAQBMAAApApQAoApAABBQAABFgqAnQgsAohPAAgEA3NACsIBkAAQArAAAYgZQAYgYAAgoQAAgqgYgXQgYgXgrAAIhkAAgEAr7ADnIAAjLIkLAAIAADLIhCAAIAAm/IBCAAIAAC5IELAAIAAi5IBBAAIAAG/gAVKDnIiejLIhJAAIAADLIhBAAIAAm/IBBAAIAAC5IBKAAICLi5IBJAAIijDUIC2DrgAOODnIifjLIhJAAIAADLIhAAAIAAm/IBAAAIAAC5IBKAAICMi5IBJAAIijDUIC1DrgAlLDnIAAlkIkLFkIhBAAIAAm/IBBAAIAAFqIELlqIBBAAIAAG/gAw0DnIAAm/IBAAAIAAG/gA3MDnIAAm/IBBAAIAACYIBqAAQBMAAApApQAoApgBBBQAABFgqAnQgrAohQAAgA2LCsIBkAAQArAAAZgZQAXgYAAgoQAAgqgXgXQgZgXgrAAIhkAAgEgsQADnIAAm/IErAAIAAA7IjqAAIAAGEgEgzKADnIAAm/IBAAAIAACYIB+AAQBMAAAoApQAoApAABBQAABFgrAnQgrAohPAAgEgyKACsIB3AAQAsAAAYgZQAYgYAAgoQAAgqgYgXQgYgXgsAAIh3AAgEg2cADnIAApSIj0AAIAACAQAACVgNBhQgMBigrA9QgsA+hSgBIgRAAIAAg7IAUAAQAuAAAagpQAbgpANhWQANhWgBiLIAAjJIF/AAIAAKNg'
      );

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-394, -42.3, 788, 84.69999999999999);

  (lib.Символ6 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.instance = new lib.Символ5();
    this.instance.parent = this;
    this.instance.setTransform(97.85, 96.85, 0.8919, 0.8919, 0, 0, 0, 40.9, -167.8);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    // Слой_2
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#000000').s().p('AqvKwQkdkdAAmTQAAmSEdkdQEdkdGSAAQGTAAEdEdQEdEdAAGSQAAGTkdEdQkdEdmTAAQmSAAkdkdg');
    this.shape.setTransform(97.3, 97.3);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
  }).prototype = getMCSymbolPrototype(lib.Символ6, new cjs.Rectangle(-77.6, -31.6, 350.79999999999995, 256.8), null);

  (lib.Символ20 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_2
    this.instance = new lib.Символ6();
    this.instance.parent = this;
    this.instance.setTransform(246.95, 171, 0.9661, 0.9661, 0, 0, 0, 97.8, 96.9);

    this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true }, 300).wait(1));

    // Слой_1
    this.instance_1 = new lib.Символ21();
    this.instance_1.parent = this;
    this.instance_1.setTransform(246.9, 171, 1, 1, 0, 0, 0, 246.9, 171);

    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .to({ rotation: 90, x: 246.85, y: 170.95 }, 9)
        .to({ rotation: 180, x: 246.9, y: 170.9 }, 10)
        .to({ rotation: 270, x: 246.95, y: 170.95 }, 10)
        .to({ rotation: 360, x: 246.9, y: 171 }, 10)
        .to({ _off: true }, 261)
        .wait(1)
    );
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-73.1, -149.1, 640.1, 640.1);

  (lib.Символ11 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // звезда_право
    this.instance = new lib.Символ19();
    this.instance.parent = this;
    this.instance.setTransform(436.45, 106.25, 0.3855, 0.3855, 0, 0, 0, 436.4, 106.2);
    this.instance._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .wait(19)
        .to({ _off: false }, 0)
        .to({ scaleX: 1.1528, scaleY: 1.1528, x: 436.4, y: 106.2 }, 10)
        .to({ scaleX: 1, scaleY: 1 }, 5)
        .to({ _off: true }, 266)
        .wait(1)
    );

    // звезда_лево
    this.instance_1 = new lib.Символ18();
    this.instance_1.parent = this;
    this.instance_1.setTransform(53.95, 105.2, 0.4071, 0.4071, 0, 0, 0, 53.9, 105.2);
    this.instance_1._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .wait(14)
        .to({ _off: false }, 0)
        .to({ regX: 54, scaleX: 1.167, scaleY: 1.167, x: 54 }, 10)
        .to({ scaleX: 1, scaleY: 1 }, 5)
        .to({ _off: true }, 271)
        .wait(1)
    );

    // руки
    this.instance_2 = new lib.Символ17();
    this.instance_2.parent = this;
    this.instance_2.setTransform(245.5, 623, 1, 1, 0, 0, 0, 245.5, 491);
    this.instance_2.alpha = 0;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_2).to({ y: 485, alpha: 1 }, 9).to({ y: 491 }, 5).to({ _off: true }, 286).wait(1)
    );

    // шестеренка
    this.instance_3 = new lib.Символ20();
    this.instance_3.parent = this;
    this.instance_3.setTransform(246.1, 313.1, 1, 1, 0, 0, 0, 246.1, 171.1);
    this.instance_3.alpha = 0;
    this.instance_3._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_3)
        .wait(4)
        .to({ _off: false }, 0)
        .to({ y: 165.1, alpha: 1 }, 15)
        .to({ y: 171.1 }, 5)
        .to({ _off: true }, 276)
        .wait(1)
    );
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-66.6, -17.5, 630.6, 667.8);

  // stage content:
  (lib.sistemamir = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // фон_затемнение
    this.instance = new lib.Символ4();
    this.instance.parent = this;
    this.instance.setTransform(960, 300, 1, 1, 0, 0, 0, 960, 300);
    this.instance.alpha = 0;
    this.instance._off = true;

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(589).to({ _off: false }, 0).to({ alpha: 1 }, 10).wait(1));

    // АККАУНТЫ
    this.instance_1 = new lib.Анимация12('synched', 0);
    this.instance_1.parent = this;
    this.instance_1.setTransform(958.25, 181.8);
    this.instance_1.alpha = 0;
    this.instance_1._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .wait(409)
        .to({ _off: false }, 0)
        .to({ y: 115.8, alpha: 1 }, 15)
        .to({ y: 121.8 }, 5)
        .to({ _off: true }, 170)
        .wait(1)
    );

    // ТЕКСТ_1
    this.instance_2 = new lib.Анимация13('synched', 0);
    this.instance_2.parent = this;
    this.instance_2.setTransform(571.8, 313.05);
    this.instance_2.alpha = 0;
    this.instance_2._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_2)
        .wait(424)
        .to({ _off: false }, 0)
        .to({ y: 247.05, alpha: 1 }, 15)
        .to({ y: 253.05 }, 5)
        .to({ _off: true }, 155)
        .wait(1)
    );

    // карта_1
    this.instance_3 = new lib.Символ7();
    this.instance_3.parent = this;
    this.instance_3.setTransform(572.1, 460.5, 0.9256, 0.926, 0, 0, 0, 181.6, 115);
    this.instance_3._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_3).wait(434).to({ _off: false }, 0).to({ y: 420.5 }, 15).to({ _off: true }, 150).wait(1)
    );

    // ТЕКСТ_2
    this.instance_4 = new lib.Анимация14('synched', 0);
    this.instance_4.parent = this;
    this.instance_4.setTransform(960.05, 313.55);
    this.instance_4.alpha = 0;
    this.instance_4._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_4)
        .wait(449)
        .to({ _off: false }, 0)
        .to({ y: 247.55, alpha: 1 }, 15)
        .to({ y: 253.55 }, 5)
        .to({ _off: true }, 130)
        .wait(1)
    );

    // карта_2
    this.instance_5 = new lib.Символ8();
    this.instance_5.parent = this;
    this.instance_5.setTransform(962.2, 460.7, 0.9256, 0.926, 0, 0, 0, 181.7, 115.2);
    this.instance_5._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_5).wait(459).to({ _off: false }, 0).to({ y: 420.7 }, 15).to({ _off: true }, 125).wait(1)
    );

    // ТЕКСТ_3
    this.instance_6 = new lib.Анимация15('synched', 0);
    this.instance_6.parent = this;
    this.instance_6.setTransform(1331.7, 312.95);
    this.instance_6.alpha = 0;
    this.instance_6._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_6)
        .wait(474)
        .to({ _off: false }, 0)
        .to({ y: 246.95, alpha: 1 }, 15)
        .to({ y: 252.95 }, 5)
        .to({ _off: true }, 105)
        .wait(1)
    );

    // карта_3
    this.instance_7 = new lib.Символ9();
    this.instance_7.parent = this;
    this.instance_7.setTransform(1349, 460.6, 0.9231, 0.926, 0, 0, 0, 182, 115.1);
    this.instance_7._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_7).wait(484).to({ _off: false }, 0).to({ y: 420.6 }, 15).to({ _off: true }, 100).wait(1)
    );

    // фон_затемнение
    this.instance_8 = new lib.Символ4();
    this.instance_8.parent = this;
    this.instance_8.setTransform(960, 300, 1, 1, 0, 0, 0, 960, 300);
    this.instance_8._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_8).wait(399).to({ _off: false }, 0).to({ alpha: 0.5 }, 10).to({ _off: true }, 190).wait(1)
    );

    // _3
    this.instance_9 = new lib.Символ3();
    this.instance_9.parent = this;
    this.instance_9.setTransform(960, 300, 1, 1, 0, 0, 0, 960, 300);
    this.instance_9._off = true;

    this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(399).to({ _off: false }, 0).to({ _off: true }, 200).wait(1));

    // фон_затемнение
    this.instance_10 = new lib.Символ4();
    this.instance_10.parent = this;
    this.instance_10.setTransform(960, 300, 1, 1, 0, 0, 0, 960, 300);
    this.instance_10.alpha = 0;
    this.instance_10._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_10).wait(389).to({ _off: false }, 0).to({ alpha: 1 }, 10).to({ _off: true }, 200).wait(1)
    );

    // ЛЬГОТЫ
    this.instance_11 = new lib.Анимация5('synched', 0);
    this.instance_11.parent = this;
    this.instance_11.setTransform(589.45, 201.6);
    this.instance_11.alpha = 0;
    this.instance_11._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_11)
        .wait(209)
        .to({ _off: false }, 0)
        .to({ y: 135.6, alpha: 1 }, 15)
        .to({ y: 141.6 }, 5)
        .to({ _off: true }, 170)
        .wait(201)
    );

    // _01
    this.instance_12 = new lib.Символ13();
    this.instance_12.parent = this;
    this.instance_12.setTransform(355.4, 307.8, 0.898, 0.898, 0, 0, 0, 63.1, 63.6);
    this.instance_12._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_12).wait(224).to({ _off: false }, 0).to({ y: 287.8 }, 15).to({ _off: true }, 160).wait(201)
    );

    // текст_1
    this.instance_13 = new lib.Анимация6('synched', 0);
    this.instance_13.parent = this;
    this.instance_13.setTransform(636.7, 363.25);
    this.instance_13.alpha = 0;
    this.instance_13._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_13)
        .wait(224)
        .to({ _off: false }, 0)
        .to({ y: 297.25, alpha: 1 }, 15)
        .to({ y: 303.25 }, 5)
        .to({ _off: true }, 155)
        .wait(201)
    );

    // _02
    this.instance_14 = new lib.Символ12();
    this.instance_14.parent = this;
    this.instance_14.setTransform(348.2, 450.4, 0.898, 0.898, 0, 0, 0, 63.1, 63.1);
    this.instance_14._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_14).wait(239).to({ _off: false }, 0).to({ y: 430.4 }, 15).to({ _off: true }, 145).wait(201)
    );

    // текст_2
    this.instance_15 = new lib.Анимация7('synched', 0);
    this.instance_15.parent = this;
    this.instance_15.setTransform(644.05, 496.3);
    this.instance_15.alpha = 0;
    this.instance_15._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_15)
        .wait(239)
        .to({ _off: false }, 0)
        .to({ y: 430.3, alpha: 1 }, 15)
        .to({ y: 436.3 }, 5)
        .to({ _off: true }, 140)
        .wait(201)
    );

    // _03
    this.instance_16 = new lib.Символ14();
    this.instance_16.parent = this;
    this.instance_16.setTransform(954.5, 176.75, 0.898, 0.898, 0, 0, 0, 54, 54);
    this.instance_16._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_16)
        .wait(254)
        .to({ _off: false }, 0)
        .to({ y: 156.75 }, 15)
        .to({ _off: true }, 130)
        .wait(201)
    );

    // текст_3
    this.instance_17 = new lib.Анимация8('synched', 0);
    this.instance_17.parent = this;
    this.instance_17.setTransform(1173.7, 227.75);
    this.instance_17.alpha = 0;
    this.instance_17._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_17)
        .wait(254)
        .to({ _off: false }, 0)
        .to({ y: 161.75, alpha: 1 }, 15)
        .to({ y: 167.75 }, 5)
        .to({ _off: true }, 125)
        .wait(201)
    );

    // _04
    this.instance_18 = new lib.Символ15();
    this.instance_18.parent = this;
    this.instance_18.setTransform(958, 316.45, 0.898, 0.898, 0, 0, 0, 66, 65);
    this.instance_18._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_18)
        .wait(269)
        .to({ _off: false }, 0)
        .to({ y: 296.45 }, 15)
        .to({ _off: true }, 115)
        .wait(201)
    );

    // текст_4
    this.instance_19 = new lib.Анимация9('synched', 0);
    this.instance_19.parent = this;
    this.instance_19.setTransform(1328.25, 364.6);
    this.instance_19.alpha = 0;
    this.instance_19._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_19)
        .wait(269)
        .to({ _off: false }, 0)
        .to({ y: 298.6, alpha: 1 }, 15)
        .to({ y: 304.6 }, 5)
        .to({ _off: true }, 110)
        .wait(201)
    );

    // _05
    this.instance_20 = new lib.Символ16();
    this.instance_20.parent = this;
    this.instance_20.setTransform(956.85, 459, 0.898, 0.898, 0, 0, 0, 63.6, 63.1);
    this.instance_20._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_20).wait(284).to({ _off: false }, 0).to({ y: 439 }, 15).to({ _off: true }, 100).wait(201)
    );

    // текст_5
    this.instance_21 = new lib.Анимация10('synched', 0);
    this.instance_21.parent = this;
    this.instance_21.setTransform(1289, 496.8);
    this.instance_21.alpha = 0;
    this.instance_21._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_21)
        .wait(284)
        .to({ _off: false }, 0)
        .to({ y: 430.8, alpha: 1 }, 15)
        .to({ y: 436.8 }, 5)
        .to({ _off: true }, 95)
        .wait(201)
    );

    // фон_затемнение
    this.instance_22 = new lib.Символ4();
    this.instance_22.parent = this;
    this.instance_22.setTransform(960, 300, 1, 1, 0, 0, 0, 960, 300);
    this.instance_22._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_22)
        .wait(199)
        .to({ _off: false }, 0)
        .to({ alpha: 0.5 }, 10)
        .to({ _off: true }, 190)
        .wait(201)
    );

    // _2
    this.instance_23 = new lib.Символ2();
    this.instance_23.parent = this;
    this.instance_23.setTransform(960, 300, 1, 1, 0, 0, 0, 960, 300);
    this.instance_23._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_23).wait(199).to({ _off: false }, 0).to({ _off: true }, 200).wait(201)
    );

    // фон_затемнение
    this.instance_24 = new lib.Символ4();
    this.instance_24.parent = this;
    this.instance_24.setTransform(960, 300, 1, 1, 0, 0, 0, 960, 300);
    this.instance_24.alpha = 0;
    this.instance_24._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_24).wait(189).to({ _off: false }, 0).to({ alpha: 1 }, 10).to({ _off: true }, 200).wait(201)
    );

    // текст_1
    this.instance_25 = new lib.Анимация1('synched', 0);
    this.instance_25.parent = this;
    this.instance_25.setTransform(897.95, 138.05);
    this.instance_25.alpha = 0;
    this.instance_25._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_25)
        .wait(9)
        .to({ _off: false }, 0)
        .to({ y: 72.05, alpha: 1 }, 15)
        .to({ y: 78.05 }, 5)
        .to({ _off: true }, 170)
        .wait(401)
    );

    // текст_2
    this.instance_26 = new lib.Анимация2('synched', 0);
    this.instance_26.parent = this;
    this.instance_26.setTransform(693.9, 231.35);
    this.instance_26.alpha = 0;
    this.instance_26._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_26)
        .wait(14)
        .to({ _off: false }, 0)
        .to({ y: 165.35, alpha: 1 }, 15)
        .to({ y: 171.35 }, 5)
        .to({ _off: true }, 165)
        .wait(401)
    );

    // текст_3
    this.instance_27 = new lib.Анимация3('synched', 0);
    this.instance_27.parent = this;
    this.instance_27.setTransform(677.25, 345.4);
    this.instance_27.alpha = 0;
    this.instance_27._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_27)
        .wait(19)
        .to({ _off: false }, 0)
        .to({ y: 279.4, alpha: 1 }, 15)
        .to({ y: 285.4 }, 5)
        .to({ _off: true }, 160)
        .wait(401)
    );

    // карта_3
    this.instance_28 = new lib.Символ9();
    this.instance_28.parent = this;
    this.instance_28.setTransform(784.95, 508, 0.3407, 0.3435);
    this.instance_28._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_28).wait(54).to({ _off: false }, 0).to({ y: 490 }, 15).to({ _off: true }, 130).wait(401)
    );

    // карта_2
    this.instance_29 = new lib.Символ8();
    this.instance_29.parent = this;
    this.instance_29.setTransform(847, 456.55, 0.3416, 0.3435, 0, 0, 0, 181.7, 115.2);
    this.instance_29._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_29).wait(44).to({ _off: false }, 0).to({ y: 436.55 }, 15).to({ _off: true }, 140).wait(401)
    );

    // карта_1
    this.instance_30 = new lib.Символ7();
    this.instance_30.parent = this;
    this.instance_30.setTransform(502.1, 416.05, 0.7493, 0.7478, 0, 0, 0, 0.2, 0.1);
    this.instance_30._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_30).wait(34).to({ _off: false }, 0).to({ y: 396.05 }, 15).to({ _off: true }, 150).wait(401)
    );

    // руки
    this.instance_31 = new lib.Символ11();
    this.instance_31.parent = this;
    this.instance_31.setTransform(1178.3, 370.5, 1, 1, 0, 0, 0, 245.5, 245.5);
    this.instance_31._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_31).wait(64).to({ _off: false }, 0).to({ _off: true }, 135).wait(401)
    );

    // фон_затемнение
    this.instance_32 = new lib.Символ4();
    this.instance_32.parent = this;
    this.instance_32.setTransform(960, 300, 1, 1, 0, 0, 0, 960, 300);

    this.timeline.addTween(cjs.Tween.get(this.instance_32).to({ alpha: 0.5 }, 9).to({ _off: true }, 190).wait(401));

    // _1
    this.instance_33 = new lib.Символ1();
    this.instance_33.parent = this;
    this.instance_33.setTransform(960, 300, 1, 1, 0, 0, 0, 960, 300);

    this.timeline.addTween(cjs.Tween.get(this.instance_33).to({ _off: true }, 199).wait(401));

    // fon
    this.shape = new cjs.Shape();
    this.shape.graphics.f('#000000').s().p('EiV/Au4MAAAhdvMEr/AAAMAAABdvg');
    this.shape.setTransform(960, 300);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(600));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(876, 300, 1044, 475.29999999999995);
  // library properties:
  lib.properties = {
    id: '358E3F72DD6B9F4C8579F4765AE7ECD7',
    width: 1920,
    height: 600,
    fps: 30,
    color: '#FFFFFF',
    opacity: 1.0,
    manifest: [
      { src: '/images/_001.png', id: '_001' },
      { src: '/images/_002.png', id: '_002' },
      { src: '/images/_003.png', id: '_003' },
      { src: '/images/_004.png', id: '_004' },
      { src: '/images/_005.png', id: '_005' },
      { src: '/images/_01.jpg', id: '_01' },
      { src: '/images/_02.jpg', id: '_02' },
      { src: '/images/_03.jpg', id: '_03' },
      { src: '/images/karta1.png', id: 'karta1' },
      { src: '/images/karta2.png', id: 'karta2' },
      { src: '/images/karta3.png', id: 'karta3' },
      { src: '/images/ryki.png', id: 'ryki' },
    ],
    preloads: [],
  };

  // bootstrap callback support:

  (lib.Stage = function (canvas) {
    createjs.Stage.call(this, canvas);
  }).prototype = p = new createjs.Stage();

  p.setAutoPlay = function (autoPlay) {
    this.tickEnabled = autoPlay;
  };
  p.play = function () {
    this.tickEnabled = true;
    this.getChildAt(0).gotoAndPlay(this.getTimelinePosition());
  };
  p.stop = function (ms) {
    if (ms) this.seek(ms);
    this.tickEnabled = false;
  };
  p.seek = function (ms) {
    this.tickEnabled = true;
    this.getChildAt(0).gotoAndStop((lib.properties.fps * ms) / 1000);
  };
  p.getDuration = function () {
    return (this.getChildAt(0).totalFrames / lib.properties.fps) * 1000;
  };

  p.getTimelinePosition = function () {
    return (this.getChildAt(0).currentFrame / lib.properties.fps) * 1000;
  };

  an.bootcompsLoaded = an.bootcompsLoaded || [];
  if (!an.bootstrapListeners) {
    an.bootstrapListeners = [];
  }

  an.bootstrapCallback = function (fnCallback) {
    an.bootstrapListeners.push(fnCallback);
    if (an.bootcompsLoaded.length > 0) {
      for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
        fnCallback(an.bootcompsLoaded[i]);
      }
    }
  };

  an.compositions = an.compositions || {};
  an.compositions['358E3F72DD6B9F4C8579F4765AE7ECD7'] = {
    getStage: function () {
      return exportRoot.getStage();
    },
    getLibrary: function () {
      return lib;
    },
    getSpriteSheet: function () {
      return ss;
    },
    getImages: function () {
      return img;
    },
  };

  an.compositionLoaded = function (id) {
    an.bootcompsLoaded.push(id);
    for (var j = 0; j < an.bootstrapListeners.length; j++) {
      an.bootstrapListeners[j](id);
    }
  };

  an.getComposition = function (id) {
    return an.compositions[id];
  };

  an.makeResponsive = function (isResp, respDim, isScale, scaleType, domContainers) {
    var lastW,
      lastH,
      lastS = 1;
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    function resizeCanvas() {
		console.log(domContainers[0].parentNode.parentNode.clientWidth);
      var w = lib.properties.width,
        h = lib.properties.height;
      var iw = domContainers[0].parentNode.parentNode.clientWidth || window.innerWidth,
        ih = window.innerHeight;
      var pRatio = window.devicePixelRatio || 1,
        xRatio = iw / w,
        yRatio = ih / h,
        sRatio = 1;
      if (isResp) {
        if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
          sRatio = lastS;
        } else if (!isScale) {
          if (iw < w || ih < h) sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 1) {
          sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 2) {
          sRatio = Math.max(xRatio, yRatio);
        }
      }
      domContainers[0].width = w * pRatio * sRatio;
      domContainers[0].height = h * pRatio * sRatio;
      domContainers.forEach(function (container) {
        container.style.width = w * sRatio + 'px';
        container.style.height = h * sRatio + 'px';
      });
      stageSchema.scaleX = pRatio * sRatio;
      stageSchema.scaleY = pRatio * sRatio;
      lastW = iw;
      lastH = ih;
      lastS = sRatio;
      stageSchema.tickOnUpdate = false;
      stageSchema.update();
      stageSchema.tickOnUpdate = true;
    }
  };
})((createjs = createjs || {}), (AdobeAnSchema = AdobeAnSchema || {}));
var createjs, AdobeAnSchema;
