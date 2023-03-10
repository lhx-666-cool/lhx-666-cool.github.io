function min(x, y) {
	if (x < y) {
		return x;
	}
	return y;
}

function main() {
	let canvas = document.querySelector("#mycan");
	let high = window.innerHeight;
	let wide = window.innerWidth;
	$("#mycan").css("height", min(high, wide));
	let ctx = canvas.getContext('2d');
	ctx.lineWidth = 1;

	function line() {
		for (let i = 0; i <= 1000; i += 10) {
			ctx.moveTo(i, 0);
			ctx.lineTo(i, 999);
			ctx.stroke();
		}
		for (let i = 0; i <= 1000; i += 10) {
			ctx.moveTo(0, i);
			ctx.lineTo(999, i);
			ctx.stroke();
		}
	}
	let live = new Array(101)
	for (let i = 0; i < live.length; ++i) {
		live[i] = new Array(101)
	}

	function draw() {
		for (let i = 0; i <= 100; i++) {
			for (let j = 0; j <= 100; j++) {
				if (live[i][j] === true) {
					ctx.fillRect(i * 10 + 1, j * 10 + 1, 8, 8);
				} else {
					ctx.clearRect(i * 10 + 1, j * 10 + 1, 8, 8);
				}
			}
		}
	}
	let seed = 1500;

	function ref() {
		ctx.clearRect(0, 0, 1000, 1000);
		line();
		for (let i = 0; i <= 100; i++) {
			for (let j = 0; j <= 100; j++) {
				live[i][j] = false;
			}
		}
		for (let i = 0; i <= seed; i++) {
			let x = parseInt(Math.random() * 100);
			let y = parseInt(Math.random() * 100);
			live[x][y] = true;
		}
		console.log(live);
		draw();
	}
	ref();
	$("#ref").click(function () {
		ref();
	})

	function run() {
		let dx = [-1, 0, 1, -1, 1, -1, 0, 1];
		let dy = [-1, -1, -1, 0, 0, 1, 1, 1];
		let sumt = 0,
			sumf = 0;
		let cnt = 0;
		let btx = [];
		let bty = [];
		let bfx = [];
		let bfy = [];
		for (let i = 0; i <= 100; i++) {
			for (let j = 0; j <= 100; j++) {
				for (let k = 0; k < 8; k++) {
					let nx = i + dx[k],
						ny = j + dy[k];
					if (nx >= 0 && nx <= 100 && ny >= 0 && ny <= 100) {
						if (live[nx][ny] == true) {
							cnt++;
						}
					}
				}
				if (live[i][j] == false && cnt == 3) {
					btx.push(i);
					bty.push(j);
					sumt++;
				} else if (live[i][j] == true && cnt < 2) {
					// live[i][j] = false;
					bfx.push(i);
					bfy.push(j);
					sumf++;
				} else if (live[i][j] == true && cnt > 3) {
					// live[i][j] = false;
					bfx.push(i);
					bfy.push(j);
					sumf++;
				}
				cnt = 0;
			}
		}
		// console.log(btx, bty, bfx, bfy);
		for (let i = 0; i < sumt; i++) {
			live[btx[i]][bty[i]] = true;
		}
		for (let i = 0; i < sumf; i++) {
			live[bfx[i]][bfy[i]] = false;
		}
		draw();
	}

	let runfun = setInterval(() => {
		run();
		console.log("ok");
	}, 50);
	$("#con").click(() => {
		runfun = setInterval(() => {
			run();
			console.log("ok");
		}, 50);
	});
	$("#run").click(() => {
		run();
		console.log("ok");
	});
	$("#stop").click(function () {
		clearInterval(runfun);
	});
	$("#ok").click(() => {
		seed = $("#seed")[0].value;
		console.log($("#seed")[0].value);
		ref();
	});
}
export {
	main,
}