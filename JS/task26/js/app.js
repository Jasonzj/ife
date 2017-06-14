var Animate = (() => {

    const canvas = document.getElementById('planet'),
          ctx = canvas.getContext("2d"),
		  canvas2 = document.getElementById('ship'),
          ctx2 = canvas2.getContext("2d"),
          centerX = Math.floor(canvas.width / 2),
          centerY = Math.floor(canvas.height / 2);

    for (var i = 0; i < 4; i++) {
        ctx.strokeStyle = "#3e4059";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(350, 350, 200 + 45 * i, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.stroke();
    }

    const circle = (color, x, y, w) => {    
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, w, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    circle('#ec5d4a', 350, 350, 150);
    circle('#c83b38', 380, 440, 40);
    circle('#c83b38', 320, 320, 25);
    circle('#c83b38', 280, 250, 15);

	var spaceships = [],
        vr = 0.05,
        angle = 0,
     	radius = 235,
		cos = Math.cos(vr),
		sin = Math.sin(vr),
		time = 1;

    function Spaceship(x, y, radius, speed) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.angle = 0;
		this.speed = speed;
    }

	var spaceshipImg = new Image(); //创建飞船贴图
        spaceshipImg.src = "./img/min-iconfont-rocket-active.png";
	
	function animation () {
		
		ctx2.clearRect(0, 0, canvas.width, canvas.height);
			ctx2.save();
			ctx2.translate(centerX, centerY);
			ctx2.rotate(angle * 8 * Math.PI / 180);
			ctx2.beginPath();
			ctx2.drawImage(spaceshipImg, 223, 0, 40, 40); 
			ctx.closePath();
			ctx2.restore();
			angle = angle - vr;
		requestAnimationFrame(animation);
	}

	window.onload = function() {
		spaceships.push(new Spaceship(centerX - 50,centerY - 50,10));
		animation();
	};
    
})();