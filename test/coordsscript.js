window.addEventListener('load', function(){
	const canvas = document.getElementById('canvas1')
	const ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx.fillStyle = 'green';

	// effect settings
	let size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
	console.log(size);

	let pointX = 0;
	let pointY = size;

	//ctx.translate(pointX, pointY);
	ctx.fillRect(10, 50, 20, 30)
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillRect(10, 10, 20, 30);
	ctx.save();
	ctx.translate(canvas.width/2,canvas.height/2);
	ctx.scale(1,1);
	ctx.rotate(.15);

});