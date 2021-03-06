window.addEventListener('load', function(){
	const canvas = document.getElementById('canvas1')
	const ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	// canvas settings
	ctx.fillStyle = 'green';
	ctx.lineCap = 'round';
	ctx.shadowColor = 'rgba(0,0,0,0.7)';
	ctx.shadowOffsetX = 10;
	ctx.shadowOffsetY = 5;
	ctx.shadowBlur = 30;

	// effect settings
	let size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
	const maxLevel = 13;
	const branches = 1;

	let sides = 144;
	let scale = .99;
	let spread = .0;
	let spreadIncrement_number = .0001;
	let random_number = Math.ceil(Math.random() * 360);
	let color_numberDisplay = 1
	let color_number = 1;
	let color_number2 = 1;
	let color = 'hsl('+ random_number +', 100%, 50%)';
	let color2 = 'hsl('+ (55 + random_number) % 360 +', 100%, 50%)';
	let cp1x_number = 1;
	let cp1y_number = 95;
	let scale_number = .9900;
	let scaleIncrement_number = .0001;
	let lineWidth = 13;
	let playing = false;
	let sidesPlaying = false;
	let sidesDecreasePlaying = false;
	let myInterval;
	let myInterval2;
	let myInterval3;
	let rotateAngle = 0.0174533;
	let radian_number = 0.0174533;
	let fractal_radian_number = 2.3998277;
	let fractal_radian_increment_number = 0;
	let fractal_degrees_increment_number = 1;
	let rafReference;
	let textboxSpreadNumber = document.getElementById("spreadBox");
	let textboxSpreadIncrementNumber = document.getElementById("spreadIncrementBox");
	let textboxSidesNumber = document.getElementById("sidesBox");
	let textboxFractalDegreesNumber = document.getElementById("fractal_radianBox");
	let textboxFractalRadianIncrementNumber = document.getElementById("fractal_radian_incrementBox");
	let textboxScaleNumber = document.getElementById("scaleBox");
	let textboxScaleIncrementNumber = document.getElementById("scaleIncrementBox");
	let textboxCp1xNumber = document.getElementById("cp1xBox");
	let textboxCp1yNumber = document.getElementById("cp1yBox");
	let textboxDegreesNumber = document.getElementById("degrees-number");
	const a = 2 * Math.PI / 6;
	const r = 50;
	const image = document.getElementById('source');
	const download = document.getElementById('download');
    var elem = document.documentElement;

   
	// controls
	const randomizeButton = document.getElementById ('randomizeButton');
	const resetButton = document.getElementById ('resetButton');
	const playButton = document.getElementById ('playButton');

	const slider_spread = document.getElementById('spread');
	const label_spread = document.querySelector('[for="spread"]');


	slider_spread.addEventListener('change', function(e){
		spread = parseFloat(e.target.value);
		updateSliders();
		drawFractal();
	});
	slider_spread_increment = document.getElementById('spread_increment');
	label_spread_increment = document.querySelector('[for="spread_increment"]');
	slider_spread_increment.addEventListener('change', function(e){
		spread_increment_number = e.target.value;
		updateSliders();
		drawFractal();
	});
	slider_sides = document.getElementById('sides');
	label_sides = document.querySelector('[for="sides"]');
	slider_sides.addEventListener('change', function(e){
		sides = e.target.value;
		updateSliders();
		drawFractal();
	});
	slider_fractal_radian = document.getElementById('fractal_radian');
	label_fractal_radian = document.querySelector('[for="fractal_radian"]');
	slider_fractal_radian.addEventListener('change', function(e){
		fractal_radian_number = e.target.value;
		console.log(fractal_radian_number);
		updateSliders();
		drawFractal();
	});
	slider_fractal_radian_increment = document.getElementById('fractal_radian_increment');
	label_fractal_radian_increment = document.querySelector('[for="fractal_radian_increment"]');
	slider_fractal_radian_increment.addEventListener('change', function(e){
		fractal_radian_increment_number = e.target.value;
		console.log(fractal_radian_increment_number);
		updateSliders();
		drawFractal();
	});
	slider_hue_1 = document.getElementById('Hue_1');
	label_hue_1 = document.querySelector('[for="Hue_1"]');
	slider_hue_1.addEventListener('change', function(e){
		color_number = parseInt(e.target.value);
		color = 'hsl('+ e.target.value +', 100%, 50%)';
		updateSliders();
		drawFractal();
	});
	slider_hue_2 = document.getElementById('Hue_2');
	label_hue_2 = document.querySelector('[for="Hue_2"]');
	slider_hue_2.addEventListener('change', function(e){
		color2 = 'hsl('+ e.target.value +', 100%, 50%)';
		color_number2 = parseInt(e.target.value);
		updateSliders();
		drawFractal();
	});
	slider_scale_variable = document.getElementById('scale_variable');
	label_scale_variable = document.querySelector('[for="scale_variable"]');
	slider_scale_variable.addEventListener('change', function(e){
		scale_number = e.target.value;
		updateSliders();
		drawFractal();
	});
	slider_scale_increment = document.getElementById('scale_increment');
	label_scale_increment = document.querySelector('[for="scale_increment"]');
	slider_scale_increment.addEventListener('change', function(e){
		scale_increment_number = e.target.value;
		updateSliders();
		drawFractal();
	});
	slider_cp1x = document.getElementById('cp1x');
	label_cp1x = document.querySelector('[for="cp1x"]');
	slider_cp1x.addEventListener('change', function(e){
		cp1x_number = e.target.value;
		cp1x_display = parseInt(e.target.value);
		updateSliders();
		drawFractal();
	});
	slider_cp1y = document.getElementById('cp1y');
	label_cp1y = document.querySelector('[for="cp1y"]');
	slider_cp1y.addEventListener('change', function(e){
		cp1y_number = e.target.value;
		updateSliders();
		drawFractal();
	});
	slider_radian = document.getElementById('radian');
	label_radian = document.querySelector('[for="radian"]');
	slider_radian.addEventListener('change', function(e){
		radian_number = e.target.value;
		console.log(radian_number);
		updateSliders();
		drawFractal();
	});

	let pointX = 0;
	let pointY = size;
	function drawBranch(level){
		if (level > maxLevel) return;
		ctx.beginPath();
		ctx.lineCap = "round";
			//ctx.drawImage(image, pointX/2, pointY/2);
			ctx.beginPath();
			ctx.moveTo(pointX,pointY);
			ctx.bezierCurveTo(cp1x_number,cp1y_number,cp1x_number,cp1y_number, cp1x_number, cp1y_number);
			ctx.stroke();
			//drawHexagon(55, 89);
		for (let i = 0; i < branches; i++){
			ctx.save();
			ctx.translate(pointX,pointY);
			ctx.scale(scale_number, scale_number);

			ctx.save();
			ctx.rotate(spread);
			drawBranch(level +1);
			ctx.restore();

			ctx.restore();
		}
			//ctx.beginPath();
		    //ctx.moveTo(cp1x_number, cp1x_number);
    		//ctx.lineTo(cp1x_number, cp1y_number);
    		//ctx.lineTo(cp1y_number, cp1x_number);
		    //ctx.fill();

		    //ctx.drawImage(image, 25, 25);
		    //ctx.drawImage(image, -233, -233);
		    updateSliders();
	}		

	function drawFractal(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.save();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.translate(canvas.width/2,canvas.height/2);
		ctx.scale(1,1);
		ctx.rotate(rotateAngle);
		for (let i = 0; i < sides; i++){
			ctx.scale(scale_number, scale_number)
			ctx.rotate(fractal_radian_number);
			drawBranch(0);
		}
		ctx.restore();
		randomizeButton.style.backgroundColor = color;
	}
	drawFractal();

	function randomizeFractal(){
		spread = Math.random() * 3 + -1;
		sides = Math.random() * 144 + 1;
		color = 'hsl('+ parseInt(Math.random() * 360) + ', 100%, 50%)';
		color2 = 'hsl('+ parseInt(Math.random() * 360) + ', 100%, 50%)';
		lineWidth = Math.floor(Math.random() * 10 + 5);
		cp1x_number = Math.floor(Math.random() * 200 + 1);
		cp1y_number = Math.floor(Math.random() * 200 + 1);
		drawFractal();
	}
	randomizeButton.addEventListener('click', function(){
		randomizeFractal();
		updateSliders();
		drawFractal();
	});

	function resetFractal(){
		sides = 144;
		scale_number = 0.980;
		spread = 0;
		color = 'hsl(290, 100%, 50%)';
		lineWidth = 13;
		cp1x_number = 1;
		cp1y_number = 66;
		rotateAngle = 0.0174533;
		updateSliders();
	}
	resetButton.addEventListener('click', function(){
		resetFractal();
		updateSliders();
		drawFractal();
	});

	spreadMinusButton.addEventListener('click', function(){
		spread -= .0001
		updateSliders();
		drawFractal();
	});
	spreadPlusButton.addEventListener('click', function(){
		spread += .0001
		updateSliders();
		drawFractal();
	});
	spreadIncrementMinusButton.addEventListener('click', function(){
		spreadIncrement_number -= .0001
		updateSliders();
		drawFractal();
	});
	spreadIncrementPlusButton.addEventListener('click', function(){
		spreadIncrement_number += .0001
		updateSliders();
		drawFractal();
	});
	sidesMinusButton.addEventListener('click', function(){
		sides -= 1
		updateSliders();
		drawFractal();
	});
	sidesPlusButton.addEventListener('click', function(){
		sides += 1
		updateSliders();
		drawFractal();
	});
	fractal_radianMinusButton.addEventListener('click', function(){
		fractal_radian_number -= fractal_radian_increment_number
		updateSliders();
		drawFractal();
	});
	fractal_radianPlusButton.addEventListener('click', function(){
		fractal_radian_number += fractal_radian_increment_number
		updateSliders();
		drawFractal();
	});
	fractalradianIncrementMinusButton.addEventListener('click', function(){
		fractal_radian_increment_number -= 0.000174533
		updateSliders();
		drawFractal();
	});
	fractalradianIncrementPlusButton.addEventListener('click', function(){
		fractal_radian_increment_number += 0.000174533
		updateSliders();
		drawFractal();
	});
	scaleMinusButton.addEventListener('click', function(){
		scale_number -= scaleIncrement_number
		updateSliders();
		drawFractal();
	});
	scalePlusButton.addEventListener('click', function(){
		scale_number += scaleIncrement_number
		updateSliders();
		drawFractal();
	});
	scaleIncrementMinusButton.addEventListener('click', function(){
		scaleIncrement_number -= .0001
		updateSliders();
		drawFractal();
	});
	scaleIncrementPlusButton.addEventListener('click', function(){
		scaleIncrement_number += .0001
		updateSliders();
		drawFractal();
	});
	cp1xMinusButton.addEventListener('click', function(){
		cp1x_number -= 1
		updateSliders();
		drawFractal();
	});
	cp1xPlusButton.addEventListener('click', function(){
		cp1x_number += 1
		updateSliders();
		drawFractal();
	});
	cp1yMinusButton.addEventListener('click', function(){
		cp1y_number -= 1
		updateSliders();
		drawFractal();
	});
	cp1yPlusButton.addEventListener('click', function(){
		cp1y_number += 1
		updateSliders();
		drawFractal();
	});
	radianMinusButton.addEventListener('click', function(){
		radian_number -= 0.0174533
		updateSliders();
		drawFractal();
	});
	radianPlusButton.addEventListener('click', function(){
		radian_number += 0.0174533
		updateSliders();
		drawFractal();
	});

	textboxSpreadNumber.addEventListener('keypress', (event) =>{
		console.log(event);
		if (event.key === 'Enter') {
			spread = document.getElementById("spreadBox").value;
			console.log(sides);
			updateSliders();
			drawFractal();
		}
	})
	textboxSpreadIncrementNumber.addEventListener('keypress', (event) =>{
		console.log(event);
		if (event.key === 'Enter') {
			spreadIncrement_number = document.getElementById("spreadIncrementBox").value;
			console.log(spreadIncrement_number);
			updateSliders();
			drawFractal();
		}
	})
	textboxSidesNumber.addEventListener('keypress', (event) =>{
		console.log(event);
		if (event.key === 'Enter') {
			sides = document.getElementById("sidesBox").value;
			console.log(sides);
			updateSliders();
			drawFractal();
		}
	})
	textboxFractalDegreesNumber.addEventListener('keypress', (event) =>{
		console.log(event);
		if (event.key === 'Enter') {
			fractal_radian_number = (document.getElementById("fractal_radianBox").value) * Math.PI/180;
			console.log(fractal_radian_number);
			console.log(fractal_degrees_number);
			updateSliders();
			drawFractal();
		}
	})
	textboxFractalRadianIncrementNumber.addEventListener('keypress', (event) =>{
		console.log(event);
		if (event.key === 'Enter') {
			fractal_radian_increment_number = (document.getElementById("fractal_radian_incrementBox").value) * Math.PI/180;
			updateSliders();
			drawFractal();
		}
	})
	textboxScaleNumber.addEventListener('keypress', (event) =>{
		console.log(event);
		if (event.key === 'Enter') {
			scale_number = document.getElementById("scaleBox").value;
			console.log(scale_number);
			updateSliders();
			drawFractal();
		}
	})
	textboxScaleIncrementNumber.addEventListener('keypress', (event) =>{
		console.log(event);
		if (event.key === 'Enter') {
			scaleIncrement_number = document.getElementById("scaleIncrementBox").value;
			console.log(scaleIncrement_number);
			updateSliders();
			drawFractal();
		}
	})
	textboxCp1xNumber.addEventListener('keypress', (event) =>{
		console.log(event);
		if (event.key === 'Enter') {
			cp1x_number = document.getElementById("cp1xBox").value;
			console.log(cp1x_number);
			updateSliders();
			drawFractal();
		}
	})
	textboxCp1yNumber.addEventListener('keypress', (event) =>{
		console.log(event);
		if (event.key === 'Enter') {
			cp1y_number = document.getElementById("cp1yBox").value;
			console.log(cp1y_number);
			updateSliders();
			drawFractal();
		}
	})
	textboxDegreesNumber.addEventListener('keypress', (event) =>{
		console.log(event);
		if (event.key === 'Enter') {
			radian_number = (document.getElementById("degrees-number").value) * Math.PI/180;
			console.log(degrees_number);
			updateSliders();
			drawFractal();
		}
	})

	playButton.addEventListener('click', function(){
		if (playing === false){
			playing = true;
			requestAnimationFrame(myTimer)
			function myTimer() {
				spread += spreadIncrement_number
				color_numberDisplay += 1
				rotateAngle += radian_number
				scale_number += scaleIncrement_number
				fractal_radian_number += fractal_radian_increment_number
				color = 'hsl('+ color_numberDisplay +' , 100%, 50%)';
				updateSliders();
				drawFractal();
				rafReference = requestAnimationFrame(myTimer)
			}
		} else {
			myStop();
			function myStop() {
				playing = false;
				cancelAnimationFrame(rafReference)
			}
		}
	});

	download.addEventListener('click', function (e) {
	  const link = document.createElement('a');
	  link.download = 'download.png';
	  link.href = canvas.toDataURL();
	  link.click();
	  link.delete;
	});

	let fullscreenButton = document.getElementById("fullscreenButton");
	fullscreenButton.addEventListener('click', function () {
	  if (elem.requestFullscreen) {
	    elem.requestFullscreen();
	  } else if (elem.webkitRequestFullscreen) { /* Safari */
	    elem.webkitRequestFullscreen();
	  } else if (elem.msRequestFullscreen) { /* IE11 */
	    elem.msRequestFullscreen();
	  }
	});

	function updateSliders(){
		slider_spread.value = spread;
			textboxSpreadNumber.value = Number(spread).toFixed(5);
		slider_spread_increment.value = spreadIncrement_number;
			textboxSpreadIncrementNumber.value = Number(spreadIncrement_number).toFixed(5);
		slider_sides.value = sides;
			textboxSidesNumber.value = Number(sides).toFixed(0);
		slider_fractal_radian.value = fractal_radian_number;
	 		fractal_degrees_number = (fractal_radian_number * (180/Math.PI));
			textboxFractalDegreesNumber.value = Number(fractal_degrees_number).toFixed(1);
		
		slider_fractal_radian_increment.value = fractal_radian_increment_number;
	 		fractal_degrees_increment_number = (fractal_radian_increment_number * (180/Math.PI));
			textboxFractalRadianIncrementNumber.value = Number(fractal_degrees_increment_number).toFixed(2);

		slider_scale_increment.value = scaleIncrement_number;
			textboxScaleIncrementNumber.value = Number(scaleIncrement_number).toFixed(4);
		slider_hue_1.value = color_number;
			label_hue_1.innerText = 'Fill Color: ' + (color);
		slider_hue_2.value = color_number2;
			label_hue_2.innerText = 'Stroke Color: ' + (color2);
		slider_scale_variable.value = scale_number;
			textboxScaleNumber.value = Number(scale_number).toFixed(4);
		slider_scale_increment.value = scaleIncrement_number;
			textboxScaleIncrementNumber.value = Number(scaleIncrement_number).toFixed(4);
		slider_cp1x.value = cp1x_number;
			textboxCp1xNumber.value = Number(cp1x_number).toFixed(2); 
		slider_cp1y.value = cp1y_number;
			textboxCp1yNumber.value = Number(cp1y_number).toFixed(2);
		slider_radian.value = radian_number;
			degrees_number = (radian_number * (180/Math.PI));
			textboxDegreesNumber.value = Number(degrees_number).toFixed(1);
	}

	updateSliders();

	window.addEventListener('resize', function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
		ctx.shadowColor = 'rgba(0,0,0,0.7)';
		ctx.shadowOffsetX = 10;
		ctx.shadowOffsetY = 5;
		ctx.shadowBlur = 10;
		drawFractal();
	});

	ToggleControlsButton.addEventListener('click', function(){
		if (controls.style.display === "none"){
			controls.style.display ="block";
		} else {
			controls.style.display = "none";
		}
	});

	function drawHexagon(x, y) {
  		ctx.beginPath();
  			for (var i = 0; i < 6; i++) {
				ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
			  	}
			  	ctx.fill();
				}

});

