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
	const maxLevel = 3;
	const branches = 1;

	let sides = 13;
	let scale = .89;
	let spread = 0;
	let random_number = Math.random() * 360;
	let fixed_number = 1
	let color_number = 1;
	let color_number2 = 1;
	let color = 'hsl('+ random_number +', 100%, 50%)';
	let color2 = 'hsl('+ (55 + random_number) % 360 +', 100%, 50%)';
	let lineWidth = 13;
	let playing = false;
	let sidesPlaying = false;
	let sidesDecreasePlaying = false;
	let myInterval;
	let myInterval2;
	let myInterval3;
	let rotateAngle = 0.0174533;
	const a = 2 * Math.PI / 6;
	const r = 50;
	const image = document.getElementById('source');
	var d = 20; //The Size of the hearting
    var k =150; // The Position of the heart

   
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

	let pointX = 0;
	let pointY = size;
	function drawBranch(level){
		if (level > maxLevel) return;
		ctx.beginPath();
		ctx.lineCap = "round";
			//ctx.drawImage(image, pointX/2, pointY/2);
			//drawHexagon(13, 13);
		for (let i = 0; i < branches; i++){
			ctx.save();
			ctx.translate(pointX,pointY);
			ctx.scale(scale, scale);

			ctx.save();
			ctx.rotate(spread);
			drawBranch(level +1);
			ctx.restore();

			ctx.restore();
		}
			//ctx.beginPath();
		    //ctx.moveTo(45, 45);
    		//ctx.lineTo(45, 125);
    		//ctx.lineTo(125, 45);
		    //ctx.fill();
		    ctx.drawImage(image, 233, 233);
		    ctx.drawImage(image, -233, -233);

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
			ctx.scale(0.89,0.89)
			ctx.rotate(2.3998277);
			drawBranch(0);
		}
		ctx.restore();
		randomizeButton.style.backgroundColor = color;
	}
	drawFractal();

	function randomizeFractal(){
		sides = Math.random() * 18 + 2;
		spread = Math.random() * 0.6 -0.3;
		color = 'hsl('+ parseInt(Math.random() * 360) + ', 100%, 50%)';
		color2 = 'hsl('+ parseInt(Math.random() * 360) + ', 100%, 50%)';
		drawFractal();
		lineWidth = Math.floor(Math.random() * 10 + 5);
	}
	randomizeButton.addEventListener('click', function(){
		randomizeFractal();
		updateSliders();
		drawFractal();
	});

	function resetFractal(){
		sides = 15;
		scale = 0.85;
		spread = 0.2;
		color = 'hsl(290, 100%, 50%)';
		lineWidth = 30;
	}
	resetButton.addEventListener('click', function(){
		resetFractal();
		updateSliders();
		drawFractal();
	});

	playButton.addEventListener('click', function(){
		if (playing === false){
			playing = true;
			myInterval = setInterval(myTimer, 100);
			function myTimer() {
				spread += 0.01
				fixed_number += 1
				rotateAngle += 0.0174533
				color = 'hsl('+ fixed_number +' , 100%, 50%)';
				updateSliders();
				drawFractal();
			}
		} else {
			myStop();
			function myStop() {
				playing = false;
				clearInterval(myInterval);
			}
		}
	});

	playButtonCcw.addEventListener('click', function(){
		if (playing === false){
			playing = true;
			myInterval = setInterval(myTimer, 100);
			function myTimer() {
				spread -= 0.01
				fixed_number -= 1
				rotateAngle -= 0.0174533
				color = 'hsl('+ fixed_number +' , 100%, 50%)';
				updateSliders();
				drawFractal();
			}
		} else {
			myStop();
			function myStop() {
				playing = false;
				clearInterval(myInterval);
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
	function updateSliders(){
		slider_spread.value = spread;
		label_spread.innerText = 'Spread: ' + Number(spread).toFixed(2);
		slider_sides.value = sides;
		label_sides.innerText = 'sides: ' + Number(sides).toFixed(0);
		slider_hue_1.value = color_number;
		label_hue_1.innerText = 'Fill Color: ' + (color);
		slider_hue_2.value = color_number2;
		label_hue_2.innerText = 'Stroke Color: ' + (color2);

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