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
	let random_number = Math.random() * 360;
	let color_numberDisplay = 1
	let color_number = 1;
	let color_number2 = 1;
	let color = 'hsl('+ random_number +', 100%, 50%)';
	let color2 = 'hsl('+ (55 + random_number) % 360 +', 100%, 50%)';
	let cp1x_number = 1;
	let cp1y_number = 95;
	let scale_number = .99;
	let lineWidth = 13;
	let playing = false;
	let sidesPlaying = false;
	let sidesDecreasePlaying = false;
	let myInterval;
	let myInterval2;
	let myInterval3;
	let rotateAngle = 0.0174533;
	let rafReference
	const a = 2 * Math.PI / 6;
	const r = 50;
	const image = document.getElementById('source');
	const download = document.getElementById('download');
	var d = 20; //The Size of the hearting
    var k =150; // The Position of the heart
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
	slider_sides = document.getElementById('sides');
	label_sides = document.querySelector('[for="sides"]');
	slider_sides.addEventListener('change', function(e){
		sides = e.target.value;
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
	slider_scale_variable = document.getElementById('scale_variable');
	label_scale_variable = document.querySelector('[for="scale_variable"]');
	slider_scale_variable.addEventListener('change', function(e){
		scale_number = e.target.value;
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
			//drawHexagon(cp1x_number, cp1y_number);
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
			ctx.rotate(2.3998277);
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
		updateSliders();
	}
	resetButton.addEventListener('click', function(){
		resetFractal();
		updateSliders();
		drawFractal();
	});

	playButton.addEventListener('click', function(){
		if (playing === false){
			playing = true;
			requestAnimationFrame(myTimer)
			function myTimer() {
				spread += 0.0001
				color_numberDisplay += 1
				rotateAngle += 0.0174533
				scale_number += 0.0001
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

	playButtonCcw.addEventListener('click', function(){
		if (playing === false){
			playing = true;
			requestAnimationFrame(myTimer)
			function myTimer() {
				spread -= 0.0001
				color_numberDisplay -= 1
				rotateAngle -= 0.0174533
				scale_number -= 0.0001
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

	sidesButton.addEventListener('click', function(){
		if (sidesPlaying === false){
			sidesPlaying = true;
			myInterval2 = setInterval(myTimer2, 500)
			function myTimer2() {
				sides +=1
				updateSliders();
				drawFractal()
			}
		} else {
			myStop2();
			function myStop2(){
				sidesPlaying = false;
				clearInterval(myInterval2)
			}
		}
	});

	sidesDecreaseButton.addEventListener('click', function(){
		if (sidesPlaying === false){
			sidesPlaying = true;
			myInterval2 = setInterval(myTimer2, 500)
			function myTimer2() {
				sides -=1
				updateSliders();
				drawFractal()
			}
		} else {
			myStop2();
			function myStop2(){
				sidesPlaying = false;
				clearInterval(myInterval2)
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

	let closeFullscreen = document.getElementById("closeFullscreen");
	closeFullscreen.addEventListener('click', function () {
			  if (document.exitFullscreen) {
		    document.exitFullscreen();
		  } else if (document.webkitExitFullscreen) { /* Safari */
		    document.webkitExitFullscreen();
		  } else if (document.msExitFullscreen) { /* IE11 */
		    document.msExitFullscreen();
		  }
		});

	function updateSliders(){
		slider_spread.value = spread;
		label_spread.innerText = 'Spread: ' + Number(spread).toFixed(4);
		slider_sides.value = sides;
		label_sides.innerText = 'sides: ' + Number(sides).toFixed(0);
		slider_hue_1.value = color_number;
		label_hue_1.innerText = 'Fill Color: ' + (color);
		slider_hue_2.value = color_number2;
		label_hue_2.innerText = 'Stroke Color: ' + (color2);
		slider_cp1x.value = cp1x_number;
		label_cp1x.innerText = 'cp1x: ' + Number(cp1x_number).toFixed(2); 
		slider_cp1y.value = cp1y_number;
		label_cp1y.innerText = 'cp1y: ' + Number(cp1y_number).toFixed(2);
		slider_scale_variable.value = scale_number;
		label_scale_variable.innerText = 'scale: ' + Number(scale_number).toFixed(3);
	}

	updateSliders;

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

