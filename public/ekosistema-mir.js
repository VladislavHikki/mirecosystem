var stage;
(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:



(lib.fon = function() {
	this.initialize(img.fon);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1920,800);


(lib.lemon = function() {
	this.initialize(img.lemon);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,293,291);


(lib.money = function() {
	this.initialize(img.money);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,344,205);// helper functions:

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


(lib.Символ1089 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.lemon();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ1089, new cjs.Rectangle(0,0,293,291), null);


(lib.Символ110 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.money();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ110, new cjs.Rectangle(0,0,344,205), null);


(lib.Символ98 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.fon();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ98, new cjs.Rectangle(0,0,1920,800), null);


(lib.Символ9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#00F0F6","rgba(0,225,241,0)"],[0.278,1],0,0,0,0,0,146.6).s().p("Av5P5QmmmlAApUQAApTGmmmQGmmmJTAAQJUAAGmGmQGmGmAAJTQAAJUmmGlQmmGmpUABQpTgBmmmmg");
	this.shape.setTransform(143.975,143.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ9, new cjs.Rectangle(0,0,288,287.9), null);


(lib.Символ8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#8EE934","rgba(142,233,52,0)"],[0,1],0,0,0,0,0,146.6).s().p("Av5P5QmmmlAApUQAApTGmmmQGmmmJTAAQJUAAGmGmQGmGmAAJTQAAJUmmGlQmmGmpUABQpTgBmmmmg");
	this.shape.setTransform(143.975,143.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ8, new cjs.Rectangle(0,0,288,287.9), null);


(lib.Символ6копия = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// шар (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AnXH7QCzADC0AVQgyDXhVDYQhrAfh1AFgAgOIgQCQAUCTAgQgrA5g2A1QiQCRitBJQBMi7AvjBgAAFG+QAnjDAIjJIGkAAQgLD8h8DOQimgnimgXgAnXGZIAAlnIGrAAQgKC/glDBQi+gWi+gDgAA3gxQABjTgfjbQCVgUCVggQCKDXALELgAnXgxIAAmIQDJgDDKgWQAeDQgDDRgAnXvlQCbAHCLAyQA9DAAhC/QjCAZjCAEgAg7t3QB/BFBwBvQArArAlAuQh9Ach8ATQgbicgrigg");
	mask.setTransform(92.25,-166.95);

	// градиент
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#8EE934","rgba(142,233,52,0)"],[0,1],0,0,0,0,0,146.6).s().p("Av5P6QmmmmAApUQAApTGmmmQGmmlJTAAQJUAAGmGlQGmGmAAJTQAAJUmmGmQmmGlpUAAQpTAAmmmlg");
	this.shape.setTransform(93.475,-167.85);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// шар (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AD7PFQhWjagyjZQCzgVC1gCIAAHsQh1gFhrgdgAi2LDQg1g2gsg5QCUghCVgWQAuDFBOC9QixhJiTiTgAnaAzIGqAAQAIDIAmDDQioAYipAmQh7jOgMj7gAAwAzIGrAAIAAFmQi+ADi+AVQgli/gKi/gAAtgxQgDjQAejRQDJAYDKACIAAGHgAnagxQAMkLCLjXQCWAgCYAWQgfDaABDSgABWorQAijCA+jBIADgBQCIgwCagHIAAHWQjDgDjCgYgAkFpqQAkgtArgsQBzhyCDhFQgsCigbCgQh/gUh/geg");
	mask_1.setTransform(-12.875,-167);

	// градиент
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#00F0F6","rgba(0,225,241,0)"],[0.278,1],0,0,0,0,0,146.6).s().p("Av5P6QmmmmAApUQAApTGmmmQGmmlJTAAQJUAAGmGlQGmGmAAJTQAAJUmmGmQmmGlpUAAQpTAAmmmlg");
	this.shape_1.setTransform(-11.825,-167.85);

	var maskedShapeInstanceList = [this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// шар
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00A902").s().p("AnXH7QCzADC0AVQgyDXhVDYQhrAfh1AFgAgOIgQCQAUCTAgQgrA5g2A1QiQCRitBJQBMi7AvjBgAAFG+QAnjDAIjJIGkAAQgLD8h8DOQimgnimgXgAnXGZIAAlnIGrAAQgKC/glDBQi+gWi+gDgAA3gxQABjTgfjbQCVgUCVggQCKDXALELgAnXgxIAAmIQDJgDDKgWQAeDQgDDRgAnXvlQCbAHCLAyQA9DAAhC/QjCAZjCAEgAg7t3QB/BFBwBvQArArAlAuQh9Ach8ATQgbicgrigg");
	this.shape_2.setTransform(92.25,-166.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#00ACEB").s().p("AD7PFQhWjagyjZQCzgVC1gCIAAHsQh1gFhrgdgAi2LDQg1g2gsg5QCUghCVgWQAuDFBOC9QixhJiTiTgAnaAzIGqAAQAIDIAmDDQioAYipAmQh7jOgMj7gAAwAzIGrAAIAAFmQi+ADi+AVQgli/gKi/gAAtgxQgDjQAejRQDJAYDKACIAAGHgAnagxQAMkLCLjXQCWAgCYAWQgfDaABDSgABWorQAijCA+jBIADgBQCIgwCagHIAAHWQjDgDjCgYgAkFpqQAkgtArgsQBzhyCDhFQgsCigbCgQh/gUh/geg");
	this.shape_3.setTransform(-12.875,-167);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ6копия, new cjs.Rectangle(-60.3,-266.9,199.8,199.79999999999998), null);


(lib.Анимация33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFDB00").s().p("AX/FdQg6gjghhAQghg/AAhPQAAhPAgg9QAhg+A5gkQA7gjBJAAQBJAAA7AjQA7AjAgBAQAiA8gBBQQAABPggA/QggA/g6AjQg6AjhKAAQhJAAg7gjgAYlhGQgpAagXAuQgXAuAAA8QAAA8AXAvQAXAwApAbQAoAaA0AAQA1AAApgaQApgbAYgwQAWgvAAg7QAAg7gWgvQgYgvgpgaQgpgag1AAQg0AAgoAagA7sFdQg6gjghhAQgig/AAhPQABhPAgg9QAgg+A6gkQA6gjBJAAQBKAAA6AjQA7AjAgBAQAiA8AABQQAABPghA/QggA/g6AjQg5AjhKAAQhKAAg6gjgA7HhGQgoAagYAuQgXAuAAA8QAAA8AXAvQAYAwAoAbQAoAaA0AAQA2AAApgaQApgbAXgwQAXgvAAg7QAAg7gXgvQgXgvgpgaQgpgag2AAQg0AAgoAagEApeAFmQgSgSAAgZQAAgYASgSQARgRAYAAQAZAAARARQARASAAAZQAAAYgRASQgRARgZAAQgYAAgRgRgEAluAFuIAAjpIkxAAIAADpIhLAAIAAoBIBLAAIAADUIExAAIAAjUIBLAAIAAIBgATGFuIAAmOIiwFSIgwAAIiolLIAAGHIhKAAIAAoBIBUAAIC6FvIDAlvIBOAAIAAIBgAIOFuIAAmZIkxGZIhLAAIAAoBIBLAAIAAGeIExmeIBMAAIAAIBgAhHFuIAAm9IjCAAIAABJQAACqgmBmQgmBkhgAAIgfAAIAAhDIAjAAQAtAAAbhRQAahSAAikIAAh3IFSAAIAAIBgAt9FuIAAmZIkxGZIhMAAIAAoBIBMAAIAAGeIExmeIBLAAIAAIBgEgg4AFuIAApWIj7JWIhMAAIjwpUIAAJUIhSAAIAArtIBkAAIEHKRIEUqRIBcAAIAALtgEApgACiIAAohIBLAAIAAIhgAyOkBQgqgdAAgxIBKAAQAAA0BSAAQBTAAAAg0IBLAAQAAAxgrAdQgrAchIABQhHgBgrgcg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-275.4,-38.4,550.9,76.8);


(lib.Анимация32 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AjwDNIAAmPIAoAAIAAApQASgYAZgOQAagNAdAAQApAAAfATQAfATATAjQARAiAAAsQAAArgRAhQgSAigfATQgfATgpAAQgeAAgagOQgZgNgSgZIAACigAiXiZQgXAPgNAaQgNAZAAAhQAAAgANAZQANAaAXAOQAWAPAcAAQAdAAAWgPQAWgOANgaQAMgYAAggQAAgigMgZQgNgagWgPQgWgOgdAAQgcAAgWAOgAxsDNIAAmPIAoAAIAAApQASgYAZgOQAZgNAeAAQAoAAAgATQAgATASAjQARAiABAsQgBArgRAhQgRAiggATQggATgoAAQgfAAgZgOQgZgNgSgZIAACigAwUiZQgXAPgMAaQgNAZAAAhQAAAgANAZQAMAaAXAOQAXAPAcAAQAcAAAXgPQAWgOANgaQAMgYAAggQAAgigMgZQgNgagWgPQgXgOgcAAQgcAAgXAOgATXBMQgfgTgSgjQgSghAAgsQAAgrASgiQARgiAggTQAfgTAoAAQAfAAAZANQAaAOARAYIAAgpIAqAAIAAEXIgqAAIAAgpQgRAYgZANQgaAOgdAAQgoAAghgTgATsiZQgWAPgMAZQgOAaAAAgQAAAhAOAZQAMAaAWAOQAWAPAcAAQAeAAAWgPQAWgOANgaQAMgZAAggQAAghgMgZQgNgagWgPQgWgOgeAAQgcAAgWAOgACRBMQgfgTgTgjQgRghgBgsQAAgrASgiQARgiAhgTQAfgTAoAAQAeAAAaANQAaAOARAYIAAgpIApAAIAAEXIgpAAIAAgpQgRAYgZANQgaAOgdAAQgpAAgggTgACliZQgWAPgMAZQgNAaAAAgQAAAhANAZQAMAaAWAOQAXAPAcAAQAdAAAWgPQAXgOAMgaQANgZAAggQAAghgNgZQgMgagXgPQgWgOgdAAQgcAAgXAOgArqBMQgggTgSgjQgSgiAAgrQAAgrARgiQASgiAggTQAfgTAoAAQAoAAAgATQAhATARAjQATAigBArQAAArgSAhQgRAjgfATQggATgoAAQgpAAgfgTgArWiZQgWAPgNAZQgMAaAAAgQAAAhAMAZQANAaAWAOQAWAPAcAAQAeAAAWgPQAWgOANgaQAMgZAAggQAAghgMgZQgNgagWgPQgWgOgeAAQgcAAgWAOgAQtBVIAAjZIhgC4IgaAAIhbi0IAADVIgqAAIAAkXIAuAAIBmDHIBojHIAsAAIAAEXgAKyBVIAAjZIhgC4IgaAAIhbi0IAADVIgqAAIAAkXIAuAAIBmDHIBpjHIArAAIAAEXgAnaBVIAAkXIC7AAIAAAlIiTAAIAADygAzmBVIAAjyIibAAIAADyIgpAAIAAkXIDtAAIAAEXg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-145,-20.5,290.1,41.1);


(lib.Анимация31 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AmIEJIAAmQIApAAIAAApQARgYAagNQAZgOAeAAQAoAAAgATQAfAUATAiQARAiAAArQAAArgRAiQgSAigfATQggATgoAAQgfAAgZgNQgagOgRgYIAACigAkvhdQgXAOgNAaQgMAaAAAfQAAAhAMAZQANAaAXAPQAWAOAdAAQAcAAAWgOQAXgPAMgZQANgaAAggQAAgggNgaQgMgagXgOQgWgOgcAAQgdAAgWAOgAu8EJIAAh1QgsAAgigSQgigSgUggQgTghAAgrQAAgrATggQAUggAigSQAigSAsAAIAAh9IApAAIAAB9QArAAAiASQAjASATAgQATAgAAArQAAArgTAhQgTAggjASQgiASgrAAIAAB1gAuTBxQAwAAAfgeQAegeAAgxQAAgwgegeQgfgdgwAAgAwMhKQgeAeAAAwQAAAxAeAeQAfAeAxAAIAAjYQgxAAgfAdgA7MEJIAAmQIAoAAIAAApQASgYAZgNQAZgOAeAAQAoAAAgATQAgAUASAiQASAiAAArQAAArgSAiQgRAiggATQgfATgpAAQgeAAgagNQgZgOgSgYIAACigA50hdQgWAOgNAaQgNAaAAAfQAAAhANAZQANAaAWAPQAXAOAcAAQAdAAAWgOQAWgPANgZQAMgaAAggQAAgggMgaQgNgagWgOQgWgOgdAAQgcAAgXAOgATbCHQgfgTgSgiQgSgjAAgrQAAgrARghQASgiAggUQAfgTAoAAQAfAAAZAOQAaANARAZIAAgqIApAAIAAEYIgpAAIAAgqQgRAYgZAOQgaANgdAAQgpAAgggTgATwhdQgWAOgNAaQgNAZAAAgQAAAhANAZQANAaAWAPQAWAOAcAAQAdAAAXgOQAWgPANgaQAMgZAAghQAAgfgMgaQgNgagWgOQgXgOgdAAQgcAAgWAOgAgGCHQgfgTgSgiQgSgjAAgrQAAgrARghQASgiAggUQAegTAoAAQAfAAAZAOQAaANARAZIAAgqIApAAIAAEYIgpAAIAAgqQgRAYgZAOQgaANgdAAQgpAAgfgTgAAOhdQgVAOgNAaQgNAZAAAgQAAAhANAZQANAaAVAPQAWAOAcAAQAdAAAXgOQAWgPANgaQAMgZAAghQAAgfgMgaQgNgagWgOQgXgOgdAAQgcAAgWAOgAqRCHQgggTgSgiQgSgjAAgrQAAgqASgiQARgiAggUQAggTAoAAQAmAAAeATQAfATARAgQARAgAAAnIAAARIjnAAQACArAaAeQAaAfAsAAQAkAAAYgNQAYgOAOgYIAgAWQgTAfghASQggARgsAAQgpAAgggTgAqKhSQgZAYgHAmIC9AAQgGgsgYgVQgXgWgoAAQgnAAgZAZgA1KCHQgggTgSgiQgSgjAAgrQAAgqASgiQARgiAggUQAggTAoAAQAmAAAeATQAfATARAgQARAgAAAnIAAARIjnAAQACArAaAeQAaAfAsAAQAkAAAYgNQAYgOAOgYIAgAWQgTAfghASQggARgsAAQgpAAgggTgA1DhSQgZAYgHAmIC9AAQgGgsgYgVQgXgWgoAAQgnAAgZAZgAalCRIAAhmIhDAAIhBBmIgyAAIBHhuQgagKgPgWQgQgVAAgcQAAgqAbgXQAbgYAxAAIBpAAIAAEYgAY5hUQgPAOAAAYQAAAXARARQARAPAWAAIBDAAIAAhrIhDAAQgbAAgOAOgAQwCRIAAh/IimAAIAAB/IgpAAIAAkYIApAAIAAB0ICmAAIAAh0IApAAIAAEYgAJMCRIAAkYIApAAIAABfIBOAAQAvAAAZAaQAaAZAAApQAAArgbAZQgbAZgyAAgAJ1BsIBKAAQAbAAAPgQQAPgPAAgZQAAgagPgPQgPgNgbAAIhKAAgAHZCRIAAjzIhpAAIAAAoQAABcgVA4QgVA3g0AAIgRAAIAAglIASAAQAaAAAOgsQAOgtAAhZIAAhBIC5AAIAAEYg");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-174.1,-26.4,348.29999999999995,52.9);


(lib.Анимация30 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-220.3,-26.4,440.6,52.9);


(lib.Анимация29 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFDB00").s().p("AebFVQg+gygjhaQgkhZAAhwQAAhvAkhbQAjhZA9gyQA9gyBKAAQBJAAA+AyQA9AyAjBZQAjBbAABvQAABwgjBZQgjBag9AyQg8AzhKAAQhKAAg9gzgAfDkXQgqAogXBJQgXBJAABdQAABdAXBJQAXBJAqApQApAoA1AAQA0AAApgoQApgpAXhJQAXhJAAhdQAAhdgXhJQgXhJgpgoQgpgog0AAQg1AAgpAogAUyFVQg+gygjhaQgkhZAAhwQAAhvAkhbQAjhZA9gyQA9gyBKAAQBJAAA+AyQA9AyAjBZQAjBbAABvQAABwgjBZQgjBag9AyQg8AzhKAAQhKAAg9gzgAVakXQgqAogXBJQgXBJAABdQAABdAXBJQAXBJAqApQApAoA1AAQA0AAApgoQApgpAXhJQAXhJAAhdQAAhdgXhJQgXhJgpgoQgpgog0AAQg1AAgpAogALJFVQg+gygjhaQgkhZAAhwQAAhvAkhbQAjhZA9gyQA9gyBKAAQBJAAA+AyQA9AyAjBZQAjBbAABvQAABwgjBZQgjBag9AyQg8AzhKAAQhKAAg9gzgALxkXQgqAogXBJQgXBJAABdQAABdAXBJQAXBJAqApQApAoA1AAQA0AAApgoQApgpAXhJQAXhJAAhdQAAhdgXhJQgXhJgpgoQgpgog0AAQg1AAgpAogAiVFVQg+gygjhaQgjhZAAhwQAAhvAjhbQAjhZA+gyQA9gyBJAAQBJAAA9AyQA9AyAjBZQAkBbAABvQAABwgkBZQgjBag8AyQg9AzhJAAQhJAAg+gzgAhtkXQgpAogXBJQgXBJAABdQAABdAXBJQAXBJApApQAqAoA0AAQA0AAApgoQApgpAXhJQAXhJAAhdQAAhdgXhJQgXhJgpgoQgpgog0AAQg0AAgqAogAr+FVQg+gygjhaQgjhZAAhwQAAhvAjhbQAjhZA+gyQA9gyBJAAQBKAAA9AyQA9AyAjBZQAkBbAABvQAABwgkBZQgjBag8AyQg9AzhKAAQhJAAg+gzgArWkXQgpAogXBJQgXBJAABdQAABdAXBJQAXBJApApQAqAoA0AAQA1AAApgoQApgpAXhJQAXhJAAhdQAAhdgXhJQgXhJgpgoQgpgog1AAQg0AAgqAogA1nFVQg+gygjhaQgjhZAAhwQAAhvAjhbQAjhZA+gyQA9gyBJAAQBKAAA9AyQA9AyAjBZQAkBbAABvQAABwgkBZQgjBag8AyQg9AzhKAAQhJAAg+gzgA0/kXQgpAogXBJQgXBJAABdQAABdAXBJQAXBJApApQAqAoA0AAQA1AAApgoQApgpAXhJQAXhJAAhdQAAhdgXhJQgXhJgpgoQgpgog1AAQg0AAgqAogEgwrAFqQgqgagYguQgYguAAg6QAAg5AYgtQAXguAqgZQAqgYA2gBQA1ABArAYQAqAZAYAvQAYAsAAA6QAAA6gYAuQgXAtgqAaQgqAag2AAQg1AAgrgagEgwPAA4QgeAUgRAiQgRAhAAArQAAAsARAjQARAiAeAUQAdATAmAAQAmAAAegTQAegUARgiQARgiAAgsQAAgrgRgiQgRgigegUQgegTgmAAQgmAAgdATgEgnlAF/Qg4AAgggfQghggAAg3IAAjXIiNAAIAAgxIFdAAIAAAxIiZAAIAADbQAAAdASASQASARAeAAIAwAAIAAAygEAqtAF2IAAiOIhTAAIAAhDIBTAAIAAhOIhTAAIAAhDIBTAAIAAmLID7AAQBlAAA9A+QA8A+AABsIAAAGIAAAGIAAACQgEBgg5A5IgCACQg/A9hpAAIifAAIAABOICIAAIAABDIiIAAIAACOgEAsAAAUICdAAQA8AAAkgaQAJgHAHgIQAngpAAhRQAAhQgngqQgmgqhKAAIidAAgA+/F2IAApyIizCwIgqgpIDdkCIBKAAIAALtg");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-320.5,-39.2,641.1,78.4);


(lib.Анимация28 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-216.4,-30.9,432.9,61.9);


(lib.Анимация27 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("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");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-269.3,-29.1,538.7,58.2);


(lib.Анимация19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AO7JmIAAzLIGbAAQClAABjBlQBjBlAACyQAACxhnBjQhoBlirAAIkFAAIAAHWgARCAhIEBAAQB6AAA+hDQA/hDAAiEQAAiDg/hFQg+hEh6AAIkBAAgAIaJmIAAv8IqLP8IiCAAIAAzLICCAAIAAQSIKLwSIB/AAIACTLgAqYJmIAAvUImbPUIh9AAImJvQIAAPQIiHAAIAAzLICmAAIGuQ0IHCw0ICXAAIAATLg");
	this.shape.setTransform(48.025,-14.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124.8,-75.5,345.7,122.8);


(lib.Анимация17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A89DpQgsgegbg6IAvgcQAZAyAeAXQAdAYA0AAQA/AAAmg3QAmg3ABhgIjSAAIAAgtIDRAAQgIhUgkguQgkgug7AAQguAAggATQggATgYAsIgsgaQAZgyAtgcQAtgcA/AAQA9AAAtAgQAtAfAXA8QAZA7AABSQAABSgZA7QgZA7guAfQguAghAAAQg9AAgsgfgAaBDsQgngXgWgqQgWgrAAg2QAAg1AVgpQAWgpAngYQAngYAxAAQAmAAAfARQAgAQAWAfIAAg0IAyAAIAAFZIgyAAIAAgzQgWAegfARQgfAQglAAQgyAAgngYgAaagtQgbARgQAfQgPAfAAAoQAAApAPAgQAQAgAbASQAbARAjAAQAkAAAcgRQAcgSAPggQAQggAAgoQAAgogQggQgPgfgcgRQgcgSgkAAQgjAAgbASgAMqDsQgogXgWgqQgWgrAAg1QAAg1AWgpQAVgqAngYQAngYAyAAQAvAAAlAXQAmAXAVAnQAWAnAAAxIgBAVIkdAAQADA2AgAlQAgAmA3AAQAsAAAdgQQAdgRASgeIAoAbQgYAmgoAWQgoAWg3AAQgyAAgngYgAMyggQgfAegIAuIDoAAQgHg1gdgbQgdgbgxAAQgwAAgfAfgABnDsQgngXgWgqQgWgrAAg1QAAg1AVgpQAWgqAngYQAngYAyAAQAqAAAgASQAfASAaAiIglAcQgkg0g6AAQgjAAgbASQgcARgQAfQgPAgAAAoQAAAoAPAgQAQAgAcASQAbARAjAAQAkAAAWgMQAYgMASgYIAnAbQgYAfgkASQgkASgpAAQgzAAgngYgAqTDsQgngXgWgqQgWgrAAg1QAAg1AVgpQAWgqAngYQAngYAyAAQAqAAAgASQAfASAaAiIglAcQgkg0g6AAQgjAAgbASQgcARgQAfQgPAgAAAoQAAAoAPAgQAQAgAcASQAbARAjAAQAkAAAWgMQAYgMASgYIAnAbQgYAfgkASQgkASgpAAQgzAAgngYgAwaDsQgogXgWgrQgWgqAAg2QAAg1AWgpQAVgpAngYQAngYAyAAQAxAAAnAYQAoAYAWAqQAWApAAA1QAAA1gWArQgVAqgnAXQgnAYgyAAQgxAAgngYgAwBgtQgcARgPAfQgQAfAAAoQAAApAQAgQAPAgAcASQAbARAjAAQAjAAAcgRQAcgSAQggQAPggAAgoQAAgogPggQgQgfgcgRQgcgSgjAAQgjAAgbASgAJaD/QgzAAgegcQgegdAAgzIAAjGIiDAAIAAguIFDAAIAAAuIiOAAIAADKQAAAbARAQQARAQAbAAIAtAAIAAAtgAWuD4IAAkMIh2DjIghAAIhwjeIAAEHIgzAAIAAlZIA6AAIB9D2ICBj2IA1AAIAAFZgAhpD4IAAkTIjOETIgzAAIAAlZIAzAAIAAEXIDOkXIAyAAIAAFZgAzLD4Ih6idIg4AAIAACdIgyAAIAAlZIAyAAIAACPIA4AAIBsiPIA5AAIh+CjICMC2g");
	this.shape.setTransform(-61.575,26.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-254,-0.2,384.9,52.7);


(lib.Анимация16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AsmEvIAAhbIkTAAIAAlYIAyAAIAAEqIC0AAIAAkqIAzAAIAAEqIAqAAIAACJgAUoDJQgogYgWgqQgWgqAAg2QAAg1AWgqQAVgpAngYQAngXAxgBQAnAAAfARQAfARAWAeIAAgzIAyAAIAAFYIgyAAIAAgzQgWAegfARQgfAQglAAQgyABgmgYgAVAhRQgbARgPAgQgQAgAAAnQAAAoAQAgQAPAgAbASQAcARAiAAQAkAAAcgRQAcgSAPggQAQggAAgnQAAgogQgfQgPgggcgSQgcgRgkgBQgiABgcARgAjdDJQgngYgXgqQgVgqgBg2QAAg1AWgqQAVgpAngYQAogXAxgBQAmAAAfARQAfARAXAeIAAgzIAwAAIAAFYIgwAAIAAgzQgXAegeARQggAQglAAQgxABgngYgAjEhRQgbARgQAgQgPAgAAAnQAAAoAPAgQAQAgAbASQAbARAjAAQAkAAAbgRQAcgSAQggQAPggABgnQgBgogPgfQgQgggcgSQgbgRgkgBQgjABgbARgA2JDJQgogYgVgrQgXgqAAg1QAAg1AWgqQAWgpAmgYQAngXAygBQAxABAoAXQAnAYAWAqQAXAqgBA1QAAA1gVAqQgWAqgnAYQgnAYgygBQgxABgngYgA1whRQgbARgQAgQgPAgAAAnQAAAoAPAgQAQAgAbASQAbARAjAAQAjAAAcgRQAcgSAQggQAQggAAgnQAAgogQgfQgQgggcgSQgcgRgjgBQgjABgbARgA8tDBQgugggZg6QgYg7gBhSQAAhTAYg7QAZg7AsggQAtgfA9AAQA/AAAtAcQAtAbAZAzIgtAZQgXgsgggSQgfgTgvAAQhCAAglA5QgmA4ABBlQAABBARAwQARAwAgAaQAfAZAqAAQA1AAAdgYQAdgXAZgyIAvAdQgaA5gsAfQgtAeg8AAQg/ABgvgggAdbDUIAAh9IhSAAIhRB9Ig+AAIBZiHQgggMgTgbQgUgbAAgiQAAgzAigdQAggdA+AAICCAAIAAFYgAbWhFQgSARgBAdQAAAbAWAVQAUAUAcAAIBSAAIAAiEIhSAAQghAAgSASgARUDUIAAicIjNAAIAACcIgzAAIAAlYIAzAAIAACOIDNAAIAAiOIAzAAIAAFYgAH/DUIAAlYIAyAAIAAB1IBhAAQA6AAAfAeQAfAhAAAyQAAA1ggAfQgiAeg9AAgAIxCmIBcAAQAhABATgTQASgTAAgfQAAgggSgSQgTgTghABIhcAAgAFyDUIAAkrIiCAAIAAAxQAABygaBFQgaBEhAgBIgWAAIAAguIAYAAQAeABASg2QASg3AAhuIAAhQIDkAAIAAFYgAmwDUIAAkTIjNETIg0AAIAAlYIA0AAIAAEWIDNkWIAyAAIAAFYg");
	this.shape.setTransform(85.45,6.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-107.9,-23.5,386.70000000000005,60.6);


(lib.Анимация15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ASFDuIAohnIhnkAIAmAAIBTDQIBRjQIAiAAIiIFngAMzDuIAAlnIAlAAIAAAlQAQgWAXgMQAWgMAbAAQAlAAAcARQAdARAQAfQAQAfAAAmQAAAngQAfQgPAegdASQgcARglAAQgbAAgXgMQgXgMgQgWIAACRgAODhUQgUANgLAXQgMAYAAAcQAAAdAMAXQALAXAUAOQAUAMAaAAQAaAAATgMQAVgOALgXQALgXAAgdQAAgcgLgYQgLgXgVgNQgTgNgaAAQgaAAgUANgALaDEIAAhCIjAAAIAABCIgiAAIAAhjIAOAAQAwAAAAigIAAg6ICoAAIAADaIAeAAIAABjgAJZg0QAABsggApICAAAIAAi5IhgAAgAd2B6QgcgSgRgeQgPgfAAgnQAAgmAPgfQAQgfAcgRQAdgRAkAAQAiAAAbARQAdAQAPAdQAQAdAAAkIgBAOIjQAAQACAnAYAcQAWAbApAAQAgAAAWgMQAUgMAOgVIAdATQgSAcgdAQQgdAQgoAAQglAAgdgRgAd8hKQgWAWgGAiICqAAQgGgngUgUQgWgUgkAAQgjAAgXAXgAZYB6QgdgSgQgfQgQgfAAgnQAAgmAQgeQAPgfAdgRQAcgRAlAAQAkAAAdARQAcARAQAfQARAfAAAmQAAAngQAfQgQAegdASQgcARgkAAQglAAgcgRgAZrhUQgUANgMAXQgLAXAAAcQAAAeALAXQAMAXAUAOQATAMAaAAQAaAAAUgMQAUgOALgXQAMgXAAgdQAAgcgMgYQgLgXgUgNQgUgNgaAAQgaAAgTANgACmB6QgdgSgQgeQgQgfAAgnQAAgmAQgfQAPgfAdgRQAcgRAlAAQAhAAAcARQAcAQAPAdQAQAdAAAkIgBAOIjPAAQABAnAYAcQAXAbAoAAQAhAAAVgMQAVgMAOgVIAdATQgTAcgcAQQgeAQgnAAQgmAAgcgRgACshKQgWAWgHAiICqAAQgFgngVgUQgVgUgkAAQgkAAgWAXgAh3B6QgdgSgQgfQgQgfgBgnQABgmAQgeQAPgfAdgRQAcgRAkAAQAkAAAcARQAdARAPAfQARAfAAAmQAAAngQAfQgQAegcASQgbARglAAQgkAAgcgRgAhlhUQgUANgMAXQgLAXAAAcQAAAeALAXQAMAXAUAOQATAMAaAAQAaAAAUgMQATgOAMgXQAMgXAAgdQAAgcgMgYQgMgXgTgNQgUgNgaAAQgaAAgTANgAptB6QgcgSgRgfQgQgfAAgnQAAgmAQgeQAQgfAcgRQAdgRAkAAQAkAAAdARQAcARAQAfQARAfAAAmQAAAngQAfQgQAegcASQgdARgkAAQgkAAgdgRgApahUQgUANgLAXQgMAXAAAcQAAAeAMAXQALAXAUAOQATAMAaAAQAaAAAUgMQAUgOAMgXQALgXAAgdQAAgcgLgYQgLgXgVgNQgUgNgaAAQgaAAgTANgAVXCCIAAj7ICpAAIAAAhIiEAAIAADagAl4CCIAAj7ICoAAIAAAhIiDAAIAADagAsHCCIAAhyIiWAAIAAByIglAAIAAj7IAlAAIAABoICWAAIAAhoIAlAAIAAD7gAwxCCIAAjDIhXClIgYAAIhSihIAAC/IglAAIAAj7IAqAAIBbCzIBeizIAnAAIAAD7gA4HCCIAAkxIjDExIgnAAIAAlvIAnAAIAAE4IDDk4IAnAAIAAFvgEgguAANIAAgeIB7AAIAAAeg");
	this.shape.setTransform(-236.55,6.575);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-446,-17.2,418.9,47.599999999999994);


(lib.Анимация14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ATODuIAAlnIAlAAIAAAlQAQgWAWgMQAXgMAbAAQAkAAAdARQAcARARAfQAPAfAAAmQAAAngPAfQgQAegcASQgdARgkAAQgbAAgXgMQgYgMgPgWIAACRgAUdhUQgTANgMAXQgMAYABAcQgBAdAMAXQAMAXATAOQAVAMAaAAQAaAAATgMQAUgOAMgXQALgXAAgdQAAgcgLgYQgMgXgUgNQgTgNgaAAQgaAAgVANgAgkB6QgdgSgQgeQgQgfAAgnQAAgmAQgfQAQgfAdgRQAcgRAjAAQAfAAAXANQAWANATAZIgbAVQgagngqAAQgaAAgSANQgVANgLAXQgMAYAAAcQAAAdAMAXQALAXAVAOQASAMAaAAQAaAAARgIQAQgJAOgSIAcAUQgRAWgbAOQgZANgfAAQgjAAgdgRgAk/B6QgcgSgRgeQgPgfAAgnQAAgmAPgfQAQgfAcgRQAdgRAkAAQAiAAAbARQAcAQAQAdQAQAdAAAkIgBAOIjQAAQACAnAXAcQAXAbAoAAQAhAAAVgMQAWgMANgVIAdATQgSAcgdAQQgdAQgoAAQglAAgdgRgAk5hKQgWAWgGAiICqAAQgGgngUgUQgVgUglAAQgjAAgXAXgAtaB+QgagMgQgYIAdgUQAKARASAJQARAJAWAAQAaAAAOgKQANgLAAgWQAAgXgNgNQgOgNgXAAIgVAAIAAgcIAUAAQAsAAAAgqQAAgUgMgKQgNgKgVAAQgWAAgPAKQgOAJgNATIgagUQARgZAXgNQAXgNAdAAQAjAAAXAUQAXATAAAiQAAAUgLAOQgMAPgTAGQAZAGAOAQQAOARAAAaQgBAjgYAUQgZAVgsAAQgcAAgagNgAblCCIAAj7IAlAAIAAD7gAYACCIAAj7IAlAAIAABVIA7AAQArAAAXAYQAXAWgBAlQAAAmgYAXQgXAWgtAAgAYlBhIA5AAQAYAAANgOQAOgOAAgWQAAgYgOgNQgNgMgYAAIg5AAgAP6CCIAAj7ICpAAIAAAhIiEAAIAADagAOLCCIAAjIIiWDIIglAAIAAj7IAlAAIAADLICWjLIAlAAIAAD7gAHnCCIAAjIIiWDIIglAAIAAj7IAlAAIAADLICWjLIAlAAIAAD7gAnZCCIAAhyIiVAAIAAByIgmAAIAAj7IAmAAIAABoICVAAIAAhoIAlAAIAAD7gAvkCCIAAjIIiWDIIglAAIAAj7IAlAAIAADLICWjLIAlAAIAAD7gA3NCCIAAlvIDZAAIAAAiIixAAIAAB7IBWAAQA7AAAeAdQAeAcAAAwQAAAxgdAcQgeAcg0AAgA2lBhIBYAAQAjAAAUgUQATgTAAghQAAghgTgTQgUgTgjAAIhYAAgA8JANIAAgeIB6AAIAAAeg");
	this.shape.setTransform(27.3,-55.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-152.9,-79.2,360.4,47.6);


(lib.Анимация13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ANJDuIAAlnIAkAAIAAAlQAQgWAXgMQAXgMAbAAQAkAAAcARQAdARAQAfQAQAfAAAmQAAAngQAfQgPAegdASQgcARgkAAQgcAAgXgMQgXgMgQgWIAACRgAOYhUQgUANgLAXQgMAYAAAcQAAAdAMAXQALAXAUAOQAVAMAaAAQAZAAAUgMQAUgOALgXQAMgXAAgdQAAgcgMgYQgLgXgUgNQgUgNgZAAQgaAAgVANgAbbB6QgdgSgQgeQgQgfAAgnQAAgmAPgfQAQgfAdgRQAdgRAkAAQAeAAAXANQAXANATAZIgbAVQgagngqAAQgaAAgUANQgUANgLAXQgMAYAAAcQAAAdAMAXQALAXAUAOQAUAMAaAAQAaAAAQgIQARgJAOgSIAcAUQgSAWgaAOQgaANgeAAQglAAgcgRgAJaB6QgcgSgRgeQgQgfAAgnQAAgmAQgfQAQgfAcgRQAdgRAkAAQAiAAAbARQAcAQAQAdQAPAdAAAkIAAAOIjQAAQACAnAXAcQAXAbAoAAQAhAAAVgMQAVgMAOgVIAdATQgSAcgdAQQgeAQgnAAQglAAgdgRgAJghKQgWAWgGAiICqAAQgGgngVgUQgVgUgkAAQgjAAgXAXgAFYB6QgdgSgQgeQgQgfAAgnQAAgmAPgfQAQgfAdgRQAdgRAkAAQAeAAAXANQAXANATAZIgbAVQgagngqAAQgaAAgUANQgUANgLAXQgMAYAAAcQAAAdAMAXQALAXAUAOQAUAMAaAAQAaAAAQgIQARgJAOgSIAcAUQgSAWgaAOQgaANgeAAQglAAgcgRgAw3B6QgdgSgQgfQgQgfAAgnQAAgmAQgeQAPgfAdgRQAcgRAkAAQAlAAAcARQAdARAQAfQAQAfAAAmQAAAngQAfQgQAegcASQgcARglAAQgkAAgcgRgAwlhUQgUANgLAXQgMAXAAAcQAAAeAMAXQALAXAUAOQAUAMAZAAQAaAAAVgMQAUgOALgXQAMgXAAgdQAAgcgMgYQgLgXgUgNQgVgNgaAAQgZAAgUANgAqvCIQgmAAgWgVQgWgVAAgmIAAiQIhfAAIAAghIDrAAIAAAhIhnAAIAACTQAAAUAMALQANAMAUAAIAgAAIAAAigEAiZACCIAAj7IAkAAIAAD7gAezCCIAAj7IAlAAIAABVIA8AAQAqAAAXAYQAXAWAAAlQAAAmgYAXQgYAWgtAAgAfYBhIA5AAQAYAAANgOQAOgOAAgWQAAgYgOgNQgNgMgYAAIg5AAgAZCCCIAAjIIiWDIIglAAIAAj7IAlAAIAADLICWjLIAlAAIAAD7gAR7CCIAAj7IBzAAQAmAAAXARQAXASAAAdQAAAUgKALQgJAMgTAGQAYAGANAQQANARAAAaQAAAigXAUQgXATgpAAgASgBhIBTAAQAYAAAOgLQANgLAAgSQAAgXgNgNQgOgNgYAAIhTAAgASggUIBSAAQAnAAAAglQAAgPgLgIQgMgIgUAAIhOAAgABGCCIAAjIIiVDIIglAAIAAj7IAlAAIAADLICVjLIAlAAIAAD7gAlcCCIAAj7IAkAAIAAD7gApCCCIAAj7IAlAAIAABVIA8AAQAqAAAXAYQAXAWAAAlQAAAmgYAXQgYAWgtAAgAodBhIA5AAQAYAAANgOQAOgOAAgWQAAgYgOgNQgNgMgYAAIg5AAgA04CCIAAj7ICpAAIAAAhIiEAAIAADagA4wCCIAAj7IAkAAIAABVIBHAAQAqAAAXAYQAXAWAAAlQAAAmgYAXQgYAWgtAAgA4MBhIBDAAQAZAAANgOQAOgOAAgWQAAgYgOgNQgNgMgZAAIhDAAgA6mCCIAAlOIiJAAIAABIQAABUgHA2QgIA3gYAjQgYAigvAAIgJAAIAAghIALAAQAaAAAPgXQAPgXAHgxQAHgvAAhPIAAhxIDYAAIAAFvgEgi8AANIAAgeIB6AAIAAAeg");
	this.shape.setTransform(-177.225,-40.375);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-400.9,-64.2,447.4,47.7);


(lib.Анимация12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AJ3F4IAAhdIljAAIAABdIg2AAIAAiMIATAAQAyAAAXhKQAWhKAAijIAAigIEvAAIAAHXIAtAAIAACMgAGFhWQAAB7gMBQQgOBQgnAnIEDAAIAAmoIjCAAgAVdEEQgzgigcg+Qgcg9AAhOQAAhNAcg/QAcg9AzgjQAzgiBAAAQBBAAAyAiQAzAjAcA9QAdA/AABNQAABPgdA9QgcA9gzAiQgyAjhBAAQhAAAgzgjgAV7imQglAcgVAyQgWAyAAA/QAAA/AWAxQAVAzAlAbQAnAcAugBQAwABAlgcQAlgbAWgzQAVgxABg/QgBg/gVgyQgWgyglgcQglgcgwAAQguAAgnAcgAiwEEQgzgigcg+Qgcg9AAhOQAAhNAcg/QAcg9AzgjQAzgiBAAAQBAAAAyAiQAzAjAdA9QAcA/AABNQAABPgcA9QgdA9gzAiQgyAjhAAAQhAAAgzgjgAiRimQgmAcgVAyQgWAyABA/QgBA/AWAxQAVAzAmAbQAmAcAugBQAwABAkgcQAlgbAWgzQAVgxABg/QgBg/gVgyQgWgyglgcQgkgcgwAAQguAAgmAcgA8KEHQgwghgZg8QgZg9AAhUQgBhUAZg9QAZg9AughQAugfA/AAQBAAAAvAcQAtAcAaA0IgtAbQgYgugigSQgggUgvAAQhEAAgmA6QgnA6AABnQAABDASAyQARAxAhAaQAhAaArAAQA2AAAegXQAegYAag0IAvAdQgbA8gtAfQgtAfg/AAQhBAAgvgggEAjXAEbIAAmdIiuGdIg1AAIilmbIAAGbIg5AAIAAoGIBFAAIC3HGIC+nGIBAAAIAAIGgARSEbIAAj3IkRAAIAAD3Ig5AAIAAoGIA5AAIAADhIERAAIAAjhIA5AAIAAIGgAtnEbIAAoGICrAAQBFAAAoAlQAoAkAAA8QAAAmgRAcQgSAcghAMQAtAMAYAgQAZAhAAA1QAABFgqAoQgqAohJAAgAstDsIB7AAQAxAAAcgcQAbgbABgvQgBgvgbgbQgcgbgxAAIh7AAgAstgNIB4AAQBSAAAAhZQAAgpgYgVQgXgXgqAAIhxAAgA2OEbIAAoGIEiAAIAAAwIjqAAIAAC1IC3AAIAAAuIi3AAIAADEIDsAAIAAAvgEgkPAEbIAAoGICrAAQBFAAAoAlQAoAkAAA8QAAAmgRAcQgSAcghAMQAtAMAYAgQAZAhAAA1QAABFgqAoQgqAohJAAgEgjVADsIB7AAQAxAAAcgcQAbgbAAgvQAAgvgbgbQgcgbgxAAIh7AAgEgjVgANIB4AAQBRAAAAhZQAAgpgWgVQgYgXgqAAIhxAAgAzIkxQgLgMAAgRQAAgRALgMQANgMARAAQARAAAMAMQANALAAASQAAARgNAMQgMANgRAAQgRAAgNgNgA1ckxQgMgMAAgRQAAgRAMgMQAMgMASAAQAQAAAMAMQANALAAASQAAARgNAMQgMANgQAAQgSAAgMgNg");
	this.shape.setTransform(117.95,-133.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114,-171.5,463.9,75.2);


(lib.Анимация7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#042206").s().p("ApahDIS1pmIy1VTg");
	this.shape.setTransform(-928.025,257.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#051B06").s().p("AsiHEIT1uHIFQOHg");
	this.shape_1.setTransform(664.625,515.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#062307").s().p("AugHEIAdhTIAAABIcks1Iz1OHg");
	this.shape_2.setTransform(618.425,515.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#011603").s().p("At6HzIP/vlIL2Plg");
	this.shape_3.setTransform(-818.025,511.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#052807").s().p("EAtcAh6IBgsNIN2MNgEg8xgh5IS3JvIy3Jmg");
	this.shape_4.setTransform(-599.35,343.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#083E0C").s().p("A4VJNIh4nLISJopMAiSgClMggrASZg");
	this.shape_5.setTransform(247.225,502.075);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0A430E").s().p("Akyy1IQ2WzI4HO4g");
	this.shape_6.setTransform(345.35,-389.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0C5D11").s().p("AzXotMAmvAGqI9QKyg");
	this.shape_7.setTransform(356.225,99.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0D590F").s().p("A01GCMANHglOIJeRdMATGAs8g");
	this.shape_8.setTransform(281.675,243.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#0D6511").s().p("A2hHmMAtDgaMMgNHAlNg");
	this.shape_9.setTransform(87.975,163);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#0B5C10").s().p("Av2toIftIyImySfg");
	this.shape_10.setTransform(-353.325,59.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#0C4E10").s().p("AnmgKIH1ttIHYbvg");
	this.shape_11.setTransform(146.825,370.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#093F0D").s().p("ApETnMASIgt4MgAlA0jg");
	this.shape_12.setTransform(-353.3,314.725);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#0B5C0F").s().p("AyqGVIUl20MAQwAg/g");
	this.shape_13.setTransform(-175.75,106.025);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#0F6212").s().p("AvkKMIWg7gMAIpAipg");
	this.shape_14.setTransform(-63.725,-64.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#0B5810").s().p("AlRwfIfJHJIuaZ2gAzEsJINzkWI0mW0g");
	this.shape_15.setTransform(-129.65,106.025);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#0C510E").s().p("ALXz5MgHSAlsIvbCHg");
	this.shape_16.setTransform(242,-382.425);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#0C5F11").s().p("AEyKcIgBgCIAAACMgm/ABlIRm5/IVZYYMgBtgnuIfMbbIozfPg");
	this.shape_17.setTransform(-49.85,-242.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#0C5911").s().p("AoaujIPbiHIKMV/MgiaALXg");
	this.shape_18.setTransform(223.25,-161.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#115D12").s().p("AoHlBIMCvzISnPdMgtDAaMg");
	this.shape_19.setTransform(87.975,78.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#0D6710").s().p("AqVxTIABgDIUqS5IsCPzg");
	this.shape_20.setTransform(46.875,-64.9);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#0B4D0F").s().p("AoWEDIo68VMAihAIcMgL8AoJg");
	this.shape_21.setTransform(-565.375,73.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#08450D").s().p("A5gE7IOKu+MAk3gM4MgSJAt3g");
	this.shape_22.setTransform(-458.575,293.375);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#093D0C").s().p("AfUd7IBx4uIb3RjIB4HLgEg+zgd6IcWH+IuLO/g");
	this.shape_23.setTransform(-310.625,369.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#042506").s().p("AuVPtIAAvpIS21TMAJ1Aqeg");
	this.shape_24.setTransform(-896.55,325.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#051F06").s().p("AMmd7ISJy4IkmS4gAwV96IOMW9I8lVSg");
	this.shape_25.setTransform(-608.05,369.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#083C0C").s().p("EA3yAGYMAibgLVIv0aygEhaMgEQIWtxkIAAX+g");
	this.shape_26.setTransform(-243.925,-95.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#0D5911").s().p("Au3jnIdvnKI9CVig");
	this.shape_27.setTransform(-364.175,-96.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#0C530F").s().p("Aw6q/MAh1AO2I9vHJg");
	this.shape_28.setTransform(-377.275,-190.625);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#042009").s().p("AjfhfIG/AAIl1C+g");
	this.shape_29.setTransform(-579.175,-551.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#010F02").s().p("Aq8mRIUeAAIBbMig");
	this.shape_30.setTransform(-918.275,-520.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#041203").s().p("Aq8ugIV5MjIvgPdImZBBg");
	this.shape_31.setTransform(-918.275,-468);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#031D04").s().p("AGxnuIB/MoIxfC1g");
	this.shape_32.setTransform(-891.475,-431.125);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#041E05").s().p("EAdFBWKIN1sNIhfMNgEgq5hMlMAnsgJkMgltAWNg");
	this.shape_33.setTransform(-573.575,9.575);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#08320A").s().p("EgvpBXpIEly3IRkGrIt1MMgEAQfhDRIZz0XIEiAAMAA2Avyg");
	this.shape_34.setTransform(-135.7,0.025);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#093B0A").s().p("EhghAjIMAmSgSCMgFwAoogEBI+g5uIHLAAIQZH/MgWuAn0g");
	this.shape_35.setTransform(-303.075,-191.45);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#052706").s().p("Amdj/IM7AAIqkH+g");
	this.shape_36.setTransform(340.95,-535.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#09500E").s().p("EgkaAF0MAn5gYQILiNIIxlZ/gAPBlUITtvWMABtAnvgAPBlUg");
	this.shape_37.setTransform(-252.45,-298.225);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#06520A").s().p("AvnlcIfPiOIztPVg");
	this.shape_38.setTransform(-130.175,-381.425);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#073809").s().p("EgqiALSIUW2kIIzAAICFUXI/PCOIABgBgAaLrSIOCAAICXH/g");
	this.shape_39.setTransform(42.275,-488.6);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#062C07").s().p("AFO3JIC/FuMAAAAlbIwZDJg");
	this.shape_40.setTransform(935.85,-234.55);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#021003").s().p("AueLQIKO2fISvIhIAAN+g");
	this.shape_41.setTransform(895.65,488.95);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#0A5510").s().p("EhEiAV2IdD1jICreVgEAsbgPvIYIu4MgN8Ak4g");
	this.shape_42.setTransform(-16.15,-167.775);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#052309").s().p("AkrlCIJXoEIAAaNg");
	this.shape_43.setTransform(958.325,272.6);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#09420D").s().p("Eh8rAjpIOpsSINtUQgEBU7gMtIa5+5MAM4Al8g");
	this.shape_44.setTransform(85.35,-50.125);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#06300A").s().p("AhamdIGGo2IAAWjIpXIEg");
	this.shape_45.setTransform(958.325,142.275);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#0A560E").s().p("Eg8lgPUMAlXAKLIYGYsI+yFKgAfUt6IdSqyIkHN8g");
	this.shape_46.setTransform(92.5,244.65);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#06330A").s().p("EB6WgNXMAbZAleMguPACrgEiVuAGaMAAAghLIKjSkIITYWg");
	this.shape_47.setTransform(-30.025,85.975);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#051804").s().p("ApXJjIJX7mIJYSJIAAR+g");
	this.shape_48.setTransform(928.35,355.875);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#031102").s().p("EB9xBXpIlPuJIYhoXIqOWggEiRDBXpIAA1JIcsFjIwAPmgEh8khXoMAn+AAAIBJC/MgnsAJkg");
	this.shape_49.setTransform(-60,0.025);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#073608").s().p("EA1YBF5MAh+gdCMgQQAuJgEhFqhW/IFFAAIRKWmMgn6AYRg");
	this.shape_50.setTransform(73.425,-4.125);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#09440C").s().p("EAzzgIHIZLDJMgGFApygEhBBgkzIY8bSMgk4AM2g");
	this.shape_51.setTransform(-38.625,207.6);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#0A4A0D").s().p("EAprAVGIEHt8IZhj2IhwejgEhHSggRMAnBgBlIAAADI2hbhg");
	this.shape_52.setTransform(187.275,40.725);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#0D4E0C").s().p("ApsvGITZUmIxGJng");
	this.shape_53.setTransform(690.925,-34.8);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#0C6110").s().p("ATyNDIP06yMAW8AhdgEg6hgTtIQgZ+It0EWg");
	this.shape_54.setTransform(105.625,-39.675);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#0B480C").s().p("Eg0JAFkMAerAoCI/QMigARJawMApsAZLMgiUACkgEBeigHpIRGpnMgS2AoJgEAuEglRMAi5gGcMgL8An6gEhvngeIIAA4AIdvj/IEGWBIAtOag");
	this.shape_55.setTransform(38.55,110.925);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#094B0E").s().p("EgxGAgmIf+LBIn2NtgEAZtg5TIXaOOIidQPg");
	this.shape_56.setTransform(258.025,3.025);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#0A450D").s().p("EAIcA9XIPNODIyJIqgEhwfgJOII5cUIupMTgEBSignCMAjugI0I65e5gEgNshUDIb4AAI5zUYg");
	this.shape_57.setTransform(44.15,-22.9);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#0A410A").s().p("AloFNICdwPII0WEg");
	this.shape_58.setTransform(592.75,-202.15);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#0D5410").s().p("Agzz8ILRF2ICSeNI5fD2g");
	this.shape_59.setTransform(561.9,-41.175);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#083A09").s().p("EhMvAzHIezlKIi7WtgEAk/ggXMAnxAHDI0YNkgEAEwhEpIU9ecMgi4AGcg");
	this.shape_60.setTransform(392.2,75.675);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#0A400C").s().p("AvUhDIUWtkIKTdPg");
	this.shape_61.setTransform(851.125,7.225);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#062908").s().p("EBG8AjKIb4MxMgh+AdCgECKCgFyIQZjJIAAXjImHI1gEiabgFoMAAAgs5MAaIAm/IvlYcgEiCig2vMAltgWNMgMxAv2g");
	this.shape_62.setTransform(0,-49.3);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#041A05").s().p("Eg7iBVlMAgsgSZIRuRGIgdBTgEAvQhVkIMTXYI6HItg");
	this.shape_63.setTransform(586.95,13.25);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#042208").s().p("Aw4LXIepPsIjRVzgEgJZgoIIaHotIALAWMgNaAuTg");
	this.shape_64.setTransform(861.1,-72.3);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#052307").s().p("Eh4fBXpIr3vmIcl1TMAg5ASCIyJS3gEBmehXoIKlAAITUEIMgN1AgFg");
	this.shape_65.setTransform(42.325,0.025);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#072F0A").s().p("A0nITMAnPgezICAAAMgR2AtAg");
	this.shape_66.setTransform(554.55,-416.85);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#021A04").s().p("AqiiDIVFAAIhyEHg");
	this.shape_67.setTransform(833.3,-547.675);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#07310B").s().p("EhkyAhYIYOhxMgOZAsQgEBT9hL2IN0AAIDCW1g");
	this.shape_68.setTransform(-222.575,-24.325);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#07340B").s().p("EhtAAV+MgCPgrMIY8ZoI2tRkIWtGcMgmRASBgEg2HguaIPPAAMgRrAu1gEBSSgmbMAkQgH/IGDAAMgnQAezg");
	this.shape_69.setTransform(-123.525,-263.775);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#062F07").s().p("EA4eBW/MAQPguIMAuPgCrIpXbmI4iIYI8lM2gEh27hUAIF1i/INmAAMgCdAu3gEhPNhW/MAliAAAI0XWlIgBABgEAqEhW/IfEAAMgkPAH/g");
	this.shape_70.setTransform(167.05,-4.1);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#083709").s().p("EgSNBXpIt3sMIfQsiIhwYugEiBPAFNMAgiAWnI4OBwgEiLyg6OIAAgYIGahCIRfi0MACPArNgEhOMhUpMAQ/Ar3I9wD/gEB56hXoIB0AAMAQEAkNMgjuAI0gEA/0hPpIKkn/IIbAAIlLH/g");
	this.shape_71.setTransform(-93.7,0.025);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#021704").s().p("AEvKnIAIgdIgTAHIsS3XIPdjNMAAAAgng");
	this.shape_72.setTransform(938.875,-450.575);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#011202").s().p("Al8iDINrAAIAAA7IvdDMg");
	this.shape_73.setTransform(938.875,-547.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-988.3,-560.9,1976.6999999999998,1121.9);


(lib.Анимация5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EiV/AfQMAAAg+fMEr/AAAMAAAA+fg");
	this.shape.setTransform(0,-100);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-960,-300,1920,400);


(lib.Символ65766767 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.instance = new lib.Символ110();
	this.instance.parent = this;
	this.instance.setTransform(49.65,-196.25,0.6622,0.6622,0,0,0,172,102.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ65766767, new cjs.Rectangle(-64.2,-264.1,227.8,135.70000000000002), null);


(lib.Символ5676767 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("Ap/KAIAAz/IT/AAIAAT/g");
	this.shape.setTransform(272.075,-252.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(300));

	// шар
	this.instance = new lib.Символ65766767();
	this.instance.parent = this;
	this.instance.setTransform(191.45,304.35,1.1754,1.1754,0,0,0,40.9,-167.8);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:40.8,regY:-167.7,scaleX:0.8025,scaleY:0.8025,x:191.35,y:78.5,alpha:1},15).to({y:89.5},5).to({y:79.5},5).to({y:84.5},5).wait(270));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(67.8,-316,268.3,666.7);


(lib.Символ6576 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.instance = new lib.Символ1089();
	this.instance.parent = this;
	this.instance.setTransform(39.2,-167.1,0.6486,0.6486,0,0,0,146.5,145.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ6576, new cjs.Rectangle(-55.8,-261.5,190.10000000000002,188.7), null);


(lib.Символ567 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("Ap/KAIAAz/IT/AAIAAT/g");
	this.shape.setTransform(272.075,-252.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(300));

	// шар
	this.instance = new lib.Символ6576();
	this.instance.parent = this;
	this.instance.setTransform(191.45,304.35,1.1754,1.1754,0,0,0,40.9,-167.8);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:40.8,regY:-167.7,scaleX:0.8025,scaleY:0.8025,x:191.35,y:78.5,alpha:1},15).to({y:89.5},5).to({y:79.5},5).to({y:84.5},5).wait(270));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(77.8,-316,258.3,732);


(lib.Символ57 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.instance = new lib.Анимация7("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(1114.85,472.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#0B5C0F","#062F07"],[0,1],0,0,0,0,0,1165.1).s().p("EitwA9QMAAAh6gMFbgAAAMAAAB6gg");
	this.shape.setTransform(1112.05,487.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ57, new cjs.Rectangle(0,-88,2224.1,1121.9), null);


(lib.Символ56 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("Ap/KAIAAz/IT/AAIAAT/g");
	this.shape.setTransform(272.075,-252.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(300));

	// шар
	this.instance = new lib.Символ6копия();
	this.instance.parent = this;
	this.instance.setTransform(191.45,304.35,1.1754,1.1754,0,0,0,40.9,-167.8);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:40.8,regY:-167.7,scaleX:0.8025,scaleY:0.8025,x:191.35,y:78.5,alpha:1},15).to({y:89.5},5).to({y:79.5},5).to({y:84.5},5).wait(270));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.8,-316,462.3,789.5);


(lib.Символ11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// маска (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AEFPMQickdrSpDIihiJQnCnGA8oqQBjpnMrmQQrULcGKJHQDTEcJOFzQOyI4AKGhQBdLCxIG8QGqnzlLpGg");
	mask.setTransform(-80.0356,-67.7);

	// градиент
	this.instance = new lib.Символ8();
	this.instance.parent = this;
	this.instance.setTransform(-73.25,-50.4,1,1,0,0,0,144,144);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// лево
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00A902").s().p("AEFPMQickdrSpDIihiJQnCnGA8oqQBjpnMrmQQrULcGKJHQDTEcJOFzQOyI4AKGhQBdLCxIG8QGqnzlLpGg");
	this.shape.setTransform(-80.0356,-67.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ11, new cjs.Rectangle(-197.6,-273,235.2,410.6), null);


(lib.Символ10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// маска (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AyQOHQAKmhOyo4QJOlzDTkcQGKpHrUrcQMrGQBjJnQA8IqnCHGIihCJQrSJDicEdQlLJGGqHzQxIm8BdrCg");
	mask.setTransform(160.3856,-67.7);

	// градиент
	this.instance = new lib.Символ9();
	this.instance.parent = this;
	this.instance.setTransform(157.7,-50.4,1,1,0,0,0,144,144);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// право
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00ACEB").s().p("AyQOHQAKmhOyo4QJOlzDTkcQGKpHrUrcQMrGQBjJnQA8IqnCHGIihCJQrSJDicEdQlLJGGqHzQxIm8BdrCg");
	this.shape.setTransform(160.3856,-67.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ10, new cjs.Rectangle(42.8,-273,235.2,410.6), null);


(lib.Символ6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// лево
	this.instance = new lib.Символ11();
	this.instance.parent = this;
	this.instance.setTransform(-73.3,-67.7,1,1,0,0,0,-73.3,-67.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// право
	this.instance_1 = new lib.Символ10();
	this.instance_1.parent = this;
	this.instance_1.setTransform(157.65,-67.7,1,1,0,0,0,157.7,-67.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Символ6, new cjs.Rectangle(-217.2,-273,518.8,410.6), null);


(lib.Символ56копия = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("Ap/KAIAAz/IT/AAIAAT/g");
	this.shape.setTransform(272.075,-252.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(300));

	// маска (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EgaWAzqQq6q6gBvcQABvcK6q6QK7q7PbAAQPcAAK7K7QK6K6AAPcQAAPcq6K6Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_1 = new cjs.Graphics().p("EgaWAyGQq6q7gBvcQABvcK6q6QK7q6PbAAQPcAAK7K6QK6K6AAPcQAAPcq6K7Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_2 = new cjs.Graphics().p("EgaWAwiQq6q7gBvcQABvcK6q6QK7q6PbAAQPcAAK7K6QK6K6AAPcQAAPcq6K7Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_3 = new cjs.Graphics().p("EgaWAu9Qq6q6gBvcQABvcK6q6QK7q7PbAAQPcAAK7K7QK6K6AAPcQAAPcq6K6Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_4 = new cjs.Graphics().p("EgaWAtZQq6q6gBvcQABvcK6q6QK7q7PbAAQPcAAK7K7QK6K6AAPcQAAPcq6K6Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_5 = new cjs.Graphics().p("EgaWAr1Qq6q7gBvcQABvcK6q6QK7q6PbAAQPcAAK7K6QK6K6AAPcQAAPcq6K7Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_6 = new cjs.Graphics().p("EgaWAqRQq6q7gBvcQABvcK6q6QK7q6PbAAQPcAAK7K6QK6K6AAPcQAAPcq6K7Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_7 = new cjs.Graphics().p("EgaWAosQq6q6gBvcQABvbK6q7QK7q7PbAAQPcAAK7K7QK6K7AAPbQAAPcq6K6Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_8 = new cjs.Graphics().p("EgaWAnIQq6q6gBvcQABvbK6q7QK7q7PbAAQPcAAK7K7QK6K7AAPbQAAPcq6K6Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_9 = new cjs.Graphics().p("EgaWAlkQq6q7gBvcQABvbK6q7QK7q6PbAAQPcAAK7K6QK6K7AAPbQAAPcq6K7Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_10 = new cjs.Graphics().p("EgaWAkAQq6q7gBvcQABvbK6q7QK7q6PbAAQPcAAK7K6QK6K7AAPbQAAPcq6K7Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_11 = new cjs.Graphics().p("EgaWAibQq6q6gBvcQABvbK6q7QK7q7PbAAQPcAAK7K7QK6K7AAPbQAAPcq6K6Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_12 = new cjs.Graphics().p("EgaWAg3Qq6q6gBvcQABvbK6q7QK7q7PbAAQPcAAK7K7QK6K7AAPbQAAPcq6K6Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_13 = new cjs.Graphics().p("A6WfTQq6q7gBvcQABvbK6q7QK7q6PbAAQPcAAK7K6QK6K7AAPbQAAPcq6K7Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_14 = new cjs.Graphics().p("A6WdvQq6q7gBvcQABvbK6q7QK7q6PbAAQPcAAK7K6QK6K7AAPbQAAPcq6K7Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_15 = new cjs.Graphics().p("A6WcKQq6q6gBvcQABvbK6q7QK7q7PbAAQPcAAK7K7QK6K7AAPbQAAPcq6K6Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_16 = new cjs.Graphics().p("A6WamQq6q6gBvcQABvbK6q7QK7q7PbAAQPcAAK7K7QK6K7AAPbQAAPcq6K6Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_17 = new cjs.Graphics().p("A6WaXQq6q7gBvcQABvbK6q7QK7q6PbAAQPcAAK7K6QK6K7AAPbQAAPcq6K7Qq7K7vcAAQvbAAq7q7g");
	var mask_graphics_18 = new cjs.Graphics().p("A6WaWQq6q6gBvcQABvbK6q7QK7q7PbABQPcgBK7K7QK6K7AAPbQAAPcq6K6Qq7K8vcAAQvbAAq7q8g");
	var mask_graphics_19 = new cjs.Graphics().p("A6WaXQq6q7gBvcQABvbK6q7QK7q7PbAAQPcAAK7K7QK6K7AAPbQAAPcq6K7Qq7K6vcAAQvbAAq7q6g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:190.6,y:400.525}).wait(1).to({graphics:mask_graphics_1,x:190.6,y:390.4987}).wait(1).to({graphics:mask_graphics_2,x:190.6,y:380.4724}).wait(1).to({graphics:mask_graphics_3,x:190.6,y:370.4461}).wait(1).to({graphics:mask_graphics_4,x:190.6,y:360.4197}).wait(1).to({graphics:mask_graphics_5,x:190.6,y:350.3934}).wait(1).to({graphics:mask_graphics_6,x:190.6,y:340.3671}).wait(1).to({graphics:mask_graphics_7,x:190.6,y:330.3408}).wait(1).to({graphics:mask_graphics_8,x:190.6,y:320.3145}).wait(1).to({graphics:mask_graphics_9,x:190.6,y:310.2882}).wait(1).to({graphics:mask_graphics_10,x:190.6,y:300.2618}).wait(1).to({graphics:mask_graphics_11,x:190.6,y:290.2355}).wait(1).to({graphics:mask_graphics_12,x:190.6,y:280.2092}).wait(1).to({graphics:mask_graphics_13,x:190.6,y:270.1829}).wait(1).to({graphics:mask_graphics_14,x:190.6,y:260.1566}).wait(1).to({graphics:mask_graphics_15,x:190.6,y:250.1303}).wait(1).to({graphics:mask_graphics_16,x:190.6,y:240.104}).wait(1).to({graphics:mask_graphics_17,x:190.6,y:221.6053}).wait(1).to({graphics:mask_graphics_18,x:190.6,y:201.5526}).wait(1).to({graphics:mask_graphics_19,x:190.6,y:181.5}).wait(281));

	// линии
	this.instance = new lib.Символ6();
	this.instance.parent = this;
	this.instance.setTransform(190.95,164.7,0.8025,0.8025,0,0,0,40.3,-67.8);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(300));

	// маска (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_15 = new cjs.Graphics().p("AqzPCQmOmOAAo0QAAozGOmOQGPmOIyAAQI0AAGOGOQGPGOAAIzQAAI0mPGOQmOGPo0AAQoyAAmPmPg");
	var mask_1_graphics_16 = new cjs.Graphics().p("AqzPCQmOmOAAo0QAAozGOmOQGPmOIyAAQI0AAGOGOQGPGOAAIzQAAI0mPGOQmOGPo0AAQoyAAmPmPg");
	var mask_1_graphics_17 = new cjs.Graphics().p("AqzPCQmOmOAAo0QAAozGOmOQGPmOIygBQI0ABGOGOQGPGOAAIzQAAI0mPGOQmOGPo0AAQoyAAmPmPg");
	var mask_1_graphics_18 = new cjs.Graphics().p("AqzPCQmOmPAAozQAAozGOmOQGPmOIygBQI0ABGOGOQGPGOAAIzQAAIzmPGPQmOGPo0AAQoyAAmPmPg");
	var mask_1_graphics_19 = new cjs.Graphics().p("AqzPCQmOmPAAozQAAoyGOmPQGPmOIygBQI0ABGOGOQGPGPAAIyQAAIzmPGPQmOGOo0ABQoygBmPmOg");
	var mask_1_graphics_20 = new cjs.Graphics().p("AqzPCQmOmPAAozQAAoyGOmPQGPmOIygBQI0ABGOGOQGPGPAAIyQAAIzmPGPQmOGOo0ABQoygBmPmOg");
	var mask_1_graphics_21 = new cjs.Graphics().p("AqzPCQmOmPAAozQAAoyGOmPQGPmOIygBQI0ABGOGOQGPGPAAIyQAAIzmPGPQmOGOo0ABQoygBmPmOg");
	var mask_1_graphics_22 = new cjs.Graphics().p("AqzPCQmOmPAAozQAAoyGOmPQGPmOIygBQI0ABGOGOQGPGPAAIyQAAIzmPGPQmOGOo0ABQoygBmPmOg");
	var mask_1_graphics_23 = new cjs.Graphics().p("AqzPCQmOmPAAozQAAoyGOmPQGPmOIygBQI0ABGOGOQGPGPAAIyQAAIzmPGPQmOGOo0ABQoygBmPmOg");
	var mask_1_graphics_24 = new cjs.Graphics().p("AqzPCQmOmPAAozQAAoyGOmPQGPmPIyAAQI0AAGOGPQGPGPAAIyQAAIzmPGPQmOGOo0ABQoygBmPmOg");
	var mask_1_graphics_25 = new cjs.Graphics().p("AqzPCQmOmOAAo0QAAozGOmOQGPmPIyAAQI0AAGOGPQGPGOAAIzQAAI0mPGOQmOGOo0ABQoygBmPmOg");
	var mask_1_graphics_26 = new cjs.Graphics().p("AqzPCQmOmOAAo0QAAozGOmOQGPmPIyAAQI0AAGOGPQGPGOAAIzQAAI0mPGOQmOGOo0AAQoyAAmPmOg");
	var mask_1_graphics_27 = new cjs.Graphics().p("AqzPCQmOmOAAo0QAAozGOmOQGPmPIyAAQI0AAGOGPQGPGOAAIzQAAI0mPGOQmOGOo0AAQoyAAmPmOg");
	var mask_1_graphics_28 = new cjs.Graphics().p("AqzPCQmOmPAAozQAAozGOmOQGPmPIyAAQI0AAGOGPQGPGOAAIzQAAIzmPGPQmOGOo0AAQoyAAmPmOg");
	var mask_1_graphics_29 = new cjs.Graphics().p("AqzPCQmOmPAAozQAAozGOmOQGPmPIyAAQI0AAGOGPQGPGOAAIzQAAIzmPGPQmOGOo0AAQoyAAmPmOg");
	var mask_1_graphics_30 = new cjs.Graphics().p("AvBPCQmOmPAAozQAAozGOmOQGOmPIzAAQI0AAGOGPQGPGOAAIzQAAIzmPGPQmOGOo0AAQozAAmOmOg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(15).to({graphics:mask_1_graphics_15,x:163.075,y:6.05}).wait(1).to({graphics:mask_1_graphics_16,x:163.075,y:8.7167}).wait(1).to({graphics:mask_1_graphics_17,x:163.075,y:11.3833}).wait(1).to({graphics:mask_1_graphics_18,x:163.075,y:14.05}).wait(1).to({graphics:mask_1_graphics_19,x:163.075,y:16.7167}).wait(1).to({graphics:mask_1_graphics_20,x:163.075,y:19.3833}).wait(1).to({graphics:mask_1_graphics_21,x:163.075,y:22.05}).wait(1).to({graphics:mask_1_graphics_22,x:163.075,y:24.7167}).wait(1).to({graphics:mask_1_graphics_23,x:163.075,y:27.3833}).wait(1).to({graphics:mask_1_graphics_24,x:163.075,y:30.05}).wait(1).to({graphics:mask_1_graphics_25,x:163.075,y:32.7167}).wait(1).to({graphics:mask_1_graphics_26,x:163.075,y:35.3833}).wait(1).to({graphics:mask_1_graphics_27,x:163.075,y:38.05}).wait(1).to({graphics:mask_1_graphics_28,x:163.075,y:40.7167}).wait(1).to({graphics:mask_1_graphics_29,x:163.075,y:43.3833}).wait(1).to({graphics:mask_1_graphics_30,x:190.1,y:46.05}).wait(270));

	// шар
	this.instance_1 = new lib.Символ6копия();
	this.instance_1.parent = this;
	this.instance_1.setTransform(191.45,304.35,1.1754,1.1754,0,0,0,40.9,-167.8);
	this.instance_1._off = true;

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(15).to({_off:false},0).to({regX:40.8,regY:-167.7,scaleX:0.8025,scaleY:0.8025,x:191.35,y:78.5},15).to({y:89.5},5).to({y:79.5},5).to({y:84.5},5).wait(255));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.7,-316,416.3,645.5);


// stage content:
(lib.ekosistemamir = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// заглушка_на_фон
	this.instance = new lib.Анимация5("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(960,200,1,1,0,0,0,0,-100);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(494).to({_off:false},0).to({alpha:1},10).wait(1));

	// текст_1
	this.instance_1 = new lib.Анимация27("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(752.15,135.25);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(379).to({_off:false},0).to({y:100.25,alpha:1},15).to({y:105.25},5).wait(106));

	// текст_2
	this.instance_2 = new lib.Анимация28("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(698.55,207.4);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(384).to({_off:false},0).to({y:172.4,alpha:1},15).to({y:177.4},5).wait(101));

	// текст_3
	this.instance_3 = new lib.Анимация29("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(794.8,310.15);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(389).to({_off:false},0).to({y:275.15,alpha:1},15).to({y:280.15},5).wait(96));

	// logo
	this.instance_4 = new lib.Символ5676767();
	this.instance_4.parent = this;
	this.instance_4.setTransform(1282.2,198.9,1.9098,1.9098,0,0,0,191.5,84.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(404).to({_off:false},0).wait(101));

	// fon2
	this.instance_5 = new lib.Символ57();
	this.instance_5.parent = this;
	this.instance_5.setTransform(959.95,285.7,1.1034,1.1034,0,0,0,1112,560.9);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(364).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},15).wait(126));

	// текст_1
	this.instance_6 = new lib.Анимация30("synched",0);
	this.instance_6.parent = this;
	this.instance_6.setTransform(722.6,117.65);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(249).to({_off:false},0).to({y:82.65,alpha:1},15).to({y:87.65},5).to({_off:true},110).wait(126));

	// текст_2
	this.instance_7 = new lib.Анимация31("synched",0);
	this.instance_7.parent = this;
	this.instance_7.setTransform(675.45,175.65);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(254).to({_off:false},0).to({y:140.65,alpha:1},15).to({y:145.65},5).to({_off:true},105).wait(126));

	// текст_3
	this.instance_8 = new lib.Анимация32("synched",0);
	this.instance_8.parent = this;
	this.instance_8.setTransform(646.75,237.6);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(259).to({_off:false},0).to({y:202.6,alpha:1},15).to({y:207.6},5).to({_off:true},100).wait(126));

	// текст_4
	this.instance_9 = new lib.Анимация33("synched",0);
	this.instance_9.parent = this;
	this.instance_9.setTransform(775.75,330.95);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(264).to({_off:false},0).to({y:295.95,alpha:1},15).to({y:300.95},5).to({_off:true},95).wait(126));

	// lemon
	this.instance_10 = new lib.Символ567();
	this.instance_10.parent = this;
	this.instance_10.setTransform(1282.2,198.9,1.9098,1.9098,0,0,0,191.5,84.5);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(279).to({_off:false},0).to({_off:true},100).wait(126));

	// заглушка_на_фон
	this.instance_11 = new lib.Анимация5("synched",0);
	this.instance_11.parent = this;
	this.instance_11.setTransform(960,200,1,1,0,0,0,0,-100);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(244).to({_off:false},0).to({alpha:0.5},10).to({_off:true},125).wait(126));

	// fon
	this.instance_12 = new lib.Символ98();
	this.instance_12.parent = this;
	this.instance_12.setTransform(960,368,1,1,0,0,0,960,400);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(244).to({_off:false},0).to({alpha:1},10).to({_off:true},125).wait(126));

	// заглушка_на_фон
	this.instance_13 = new lib.Анимация5("synched",0);
	this.instance_13.parent = this;
	this.instance_13.setTransform(960,200,1,1,0,0,0,0,-100);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(234).to({_off:false},0).to({alpha:1},10).to({_off:true},10).wait(251));

	// текст_1
	this.instance_14 = new lib.Анимация12("synched",0);
	this.instance_14.parent = this;
	this.instance_14.setTransform(574.35,257.25);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(124).to({_off:false},0).to({y:222.25,alpha:1},15).to({y:227.25},5).to({_off:true},101).wait(260));

	// текст_2
	this.instance_15 = new lib.Анимация13("synched",0);
	this.instance_15.parent = this;
	this.instance_15.setTransform(862.1,261.5);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(129).to({_off:false},0).to({y:226.5,alpha:1},15).to({y:231.5},5).to({_off:true},96).wait(260));

	// текст_3
	this.instance_16 = new lib.Анимация14("synched",0);
	this.instance_16.parent = this;
	this.instance_16.setTransform(613.8,344.45);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(134).to({_off:false},0).to({y:309.45,alpha:1},15).to({y:314.45},5).to({_off:true},91).wait(260));

	// текст_4
	this.instance_17 = new lib.Анимация15("synched",0);
	this.instance_17.parent = this;
	this.instance_17.setTransform(906.6,349.95);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(139).to({_off:false},0).to({y:314.95,alpha:1},15).to({y:319.95},5).to({_off:true},86).wait(260));

	// logo
	this.instance_18 = new lib.Символ56копия();
	this.instance_18.parent = this;
	this.instance_18.setTransform(1263.05,185.6,0.8857,0.8857,0,0,0,192.5,149.3);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(154).to({_off:false},0).to({_off:true},91).wait(260));

	// fon2
	this.instance_19 = new lib.Символ57();
	this.instance_19.parent = this;
	this.instance_19.setTransform(959.95,285.7,1.1034,1.1034,0,0,0,1112,560.9);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(109).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},15).to({_off:true},121).wait(260));

	// текст_1
	this.instance_20 = new lib.Анимация16("synched",0);
	this.instance_20.parent = this;
	this.instance_20.setTransform(567.65,95.95);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(4).to({_off:false},0).to({y:60.95,alpha:1},15).to({y:65.95},5).to({_off:true},100).wait(381));

	// текст_2
	this.instance_21 = new lib.Анимация17("synched",0);
	this.instance_21.parent = this;
	this.instance_21.setTransform(712.7,163.95);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(9).to({_off:false},0).to({y:128.95,alpha:1},15).to({y:133.95},5).to({_off:true},95).wait(381));

	// текст_4
	this.instance_22 = new lib.Анимация19("synched",0);
	this.instance_22.parent = this;
	this.instance_22.setTransform(584.25,342.05);
	this.instance_22.alpha = 0;
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(14).to({_off:false},0).to({y:307.05,alpha:1},15).to({y:312.05},5).to({_off:true},90).wait(381));

	// logo
	this.instance_23 = new lib.Символ56();
	this.instance_23.parent = this;
	this.instance_23.setTransform(1262.2,198.9,1.9098,1.9098,0,0,0,191.5,84.5);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(29).to({_off:false},0).to({_off:true},95).wait(381));

	// заглушка_на_фон
	this.instance_24 = new lib.Анимация5("synched",0);
	this.instance_24.parent = this;
	this.instance_24.setTransform(960,200,1,1,0,0,0,0,-100);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).to({alpha:0.5},9).to({_off:true},115).wait(381));

	// fon
	this.instance_25 = new lib.Символ98();
	this.instance_25.parent = this;
	this.instance_25.setTransform(960,368,1,1,0,0,0,960,400);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).to({_off:true},124).wait(381));

	// fon2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EiV/Au4MAAAhdvMEr/AAAMAAABdvg");
	this.shape.setTransform(960,200.0015,1,0.6667);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},124).wait(381));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(693,-366.1,1494.1,1307.9);
// library properties:
lib.properties = {
	id: '358E3F72DD6B9F4C8579F4765AE7ECD7',
	width: 1920,
	height: 400,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/fon.jpg", id:"fon"},
		{src:"images/lemon.png", id:"lemon"},
		{src:"images/money.png", id:"money"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['358E3F72DD6B9F4C8579F4765AE7ECD7'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}


})(createjs = createjs||{}, AdobeAnEco = AdobeAnEco||{});
var createjs, AdobeAnEco;