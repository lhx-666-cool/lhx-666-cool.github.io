let canvas = document.getElementsByClassName("mycan")[0];
canvas.focus();
let ctx = canvas.getContext('2d');
ctx.font = "18px monospace"
ctx.fillStyle = "white"
let eat = 0;
let snakex = [];
let snakey = []
let state = 0; //0 右 1 下 2 左 3 上
let old = 0;
let yummyx = 0;
let yummyy = 0;
let yummyval = 0;
let wallx = [];
let wally = [];
function init() {
	eat = 0;
	snakex = [];
	snakey = [];
	state = 0;
	old = 0;
	yummyx = 0;
	yummyy = 0;
}

function border() {
	ctx.fillRect(0, 0, 1280, 10);
	ctx.fillRect(0, 0, 10, 720);
	ctx.fillRect(1270, 0, 10, 720);
	ctx.fillRect(0, 710, 1280, 10);
}

function draw() {
	ctx.clearRect(10, 10, 1260, 700);
	ctx.fillStyle = "red";
	for(let i = 0; i < 50; i ++) {
		ctx.fillRect(wallx[i] * 10, wally[i] * 10, 10, 10);
	}
	ctx.fillStyle = "white";
	let sco = "当前得分" + " " + String(snakex.length - 5);
	ctx.fillText(sco, 300, 100);
	for (let i = 0; i < snakex.length - 1; i++) {
		ctx.fillText("O", snakex[i] * 10, snakey[i] * 10);
	}
	ctx.fillText("@", snakex[snakex.length - 1] * 10, snakey[snakey.length - 1] * 10);
	if(yummyval == 1) {
		ctx.fillStyle = "white";
	}else if(yummyval == 2) {
		ctx.fillStyle = "lightgreen";
	}else if(yummyval == 3) {
		ctx.fillStyle = "aqua";
	}else {
		ctx.fillStyle = "yellow";
	}
	ctx.fillText("#", yummyx * 10, yummyy * 10);
	ctx.fillStyle = "white";
}

function start_snake() {
	snakex.push(60);
	snakey.push(36);
	snakex.push(61);
	snakey.push(36);
	snakex.push(62);
	snakey.push(36);
	snakex.push(63);
	snakey.push(36);
	snakex.push(64);
	snakey.push(36);
	for(let i = 0; i < 100; i ++) {
		wallx.push(parseInt(Math.random() * 100 + 5));
		wally.push(parseInt(Math.random() * 60 + 5));
	}
}

function yummy() {
	yummyx = parseInt(Math.random() * 100 + 5);
	yummyy = parseInt(Math.random() * 60 + 5);
	let val = parseInt(Math.random() * 100);
	if(val <= 45) {
		yummyval = 1;
	}else if(val <= 75) {
		yummyval = 2;
	}else if(val <= 95) {
		yummyval = 3;
	}else {
		yummyval = 5;
	}
}

function run() {
	canvas.focus();
	if (eat === 0) {
		for (let i = 0; i < snakex.length - 1; i++) {
			snakex[i] = snakex[i + 1];
			snakey[i] = snakey[i + 1];
		}
		if (state == 0) {
			snakex[snakex.length - 1]++;
		} else if (state === 1) {
			snakey[snakey.length - 1]++;
		} else if (state === 2) {
			snakex[snakex.length - 1]--;
		} else {
			snakey[snakey.length - 1]--;
		}
	} else {
		if (state === 0) {
			snakex.push(snakex[snakex.length - 1] + 1);
			snakey.push(snakey[snakey.length - 1]);
		} else if (state === 1) {
			snakex.push(snakex[snakex.length - 1]);
			snakey.push(snakey[snakey.length - 1] + 1);
		} else if (state === 2) {
			snakex.push(snakex[snakex.length - 1] - 1);
			snakey.push(snakey[snakey.length - 1]);
		} else {
			snakex.push(snakex[snakex.length - 1]);
			snakey.push(snakey[snakey.length - 1] - 1);
		}
		eat--;
	}
	old = state;
	console.log(snakex.length);
	if (isdead()) {
		draw();
	} else {
		// alert("dead");
		clearInterval(runclock);
		deadmenu();
	}
	if (isyuumy()) {
		eat += yummyval;
		yummy();
	}
}

function isyuumy() {
	if (snakex[snakex.length - 1] == yummyx && snakey[snakey.length - 1] == yummyy) {
		return true;
	}
	console.log(yummyx, yummyy);
	console.log(snakex[snakex.length - 1], snakey[snakey.length - 1])
	return false;
}

function isdead() {
	let map = new Array(1500);
	for (let i = 0; i < 1500; i++) {
		map[i] = new Array(1500);
	}
	if ((snakex[snakex.length - 1] <= 1 || snakex[snakex.length - 1] >= 128) || (snakey[snakey.length - 1] <= 1 ||
			snakey[snakey.length - 1] >= 72)) {
		console.log(snakex[snakex.length - 1], snakex[snakex.length - 1]);
		return false;
	}
	for(let i = 0; i < 50; i ++) {
		map[wallx[i]][wally[i] + 1] = true;
	}
	for (let i = 0; i < snakex.length; i++) {
		if (map[snakex[i]][snakey[i]] == true) {
			return false;
		} else {
			map[snakex[i]][snakey[i]] = true;
		}
	}
	return true;
}

function when_down(code) {
	if (code === 87) {
		state = 3;
	} else if (code === 65) {
		state = 2;
	} else if (code === 83) {
		state = 1;
	} else if (code === 68) {
		state = 0;
	}
	console.log(old, state);
	if (old === 0 && state === 2) {
		state = 0;
	}
	if (old === 2 && state === 0) {
		state = 2;
	}
	if (old === 1 && state === 3) {
		state = 1;
	}
	if (old === 3 && state === 1) {
		state = 3;
	}
	console.log(old, state);
}
let runclock;

function startgame() {
	init();
	ctx.clearRect(0, 0, 1280, 720);
	border();
	start_snake();
	draw();
	yummy();
	$(".mycan").on("keydown", function(e) {
		console.log(e.keyCode);
		when_down(e.keyCode)
	})
	runclock = setInterval(run, 100);
}

function deadmenu() {
	ctx.clearRect(10, 10, 1260, 700);
	ctx.fillText("你死了，按任意键退出游戏", 400, 300);
	$(".mycan").on("keydown", function(e) {
		location.reload();
	})
}

function menu() {
	ctx.clearRect(0, 0, 1280, 720);
	ctx.fillText("欢迎来到贪吃蛇小游戏", 700, 300);
	ctx.fillText("1. 开始游戏", 700, 330);
	ctx.fillText("2. 还没写", 700, 360);
	$(".mycan").on("keydown", function(e) {
		console.log(e.keyCode);
		if (e.key == 1) {
			startgame();
		}
	})
}

function main() {
	menu();

}

export {
	main
}
