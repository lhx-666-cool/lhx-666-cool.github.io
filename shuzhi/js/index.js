function main(){
	let arr = new Array(20);
	for (let i = 0; i < 20; i ++) {
		arr[i] = new Array(20);
		for (let j = 0; j < 20; j ++) {
			arr[i][j] = false;
		}
	}
	let can = document.querySelector("#mycan");
	
	let ctx = can.getContext("2d");
	// ctx.fillStyle = "black";
	// ctx.fillRect(0, 0, 500, 500)
	draw()
	console.log(can)
	let fn = function (e) {
		let p = getEventPosition(e);
		console.log(p)

		console.log(moveset.has(p.x * 100 + p.y))
		console.log(moveset)
		if (moveset.has(p.x * 100 + p.y) === false) {
			arr[p.x][p.y] = !arr[p.x][p.y];
			console.log(1);
			draw();
			moveset.add(p.x * 100 + p.y)
		}
				
	}
	let moveset = new Set();
	moveset.clear();
	can.addEventListener('mousedown', function(e){
		fn(e);
		can.addEventListener('mousemove', fn);
	})
	document.addEventListener('mouseup', ()=>{
		can.removeEventListener('mousemove', fn)
		moveset.clear();
		console.log(2)
	})

	function draw() {
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, 400, 400)
		ctx.fillStyle = 'black';
		for (let i = 0; i <= 400; i += 20) {
			ctx.fillRect(i - 1, 0, 1, 400);
			ctx.fillRect(i, 0, 1, 400)
			ctx.fillRect(0, i - 1, 400, 1);
			ctx.fillRect(0, i, 400, 1)
		}
		for (let i = 0; i < 20; i ++) {
			for (let j = 0; j < 20; j ++) {
				if (arr[i][j] === true) {
					ctx.fillRect(i * 20, j * 20, 20, 20);
				}
			}
		}
	}
}

function getEventPosition(e) {
	return {x: parseInt((e.offsetX) / 20), y: parseInt((e.offsetY) / 20)};
}
function abs(x) {
	if (x < 0) {
		x = -x;
	}
	return x;
}


export {
	main,
}