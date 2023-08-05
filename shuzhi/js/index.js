function main(){
	let url = location.href
	let _ = url.indexOf('m=');
	url = url.substring(_ + 2)
	
	let arr = new Array(20);
	for (let i = 0; i < 20; i ++) {
		arr[i] = new Array(20);
		for (let j = 0; j < 20; j ++) {
			arr[i][j] = false;
		}
	}
	
	let eve = new Array(40);
	for (let i = 0; i < 40; i ++) {
		eve[i] = new Array()
	}
	let can = document.querySelector("#mycan");
	let ctx = can.getContext("2d");
	
	draw()
	
	let fn = function (e) {
		let p = getEventPosition(e);
		if (moveset.has(p.x * 100 + p.y) === false) {
			arr[p.x][p.y] = !arr[p.x][p.y];
			draw();
			moveset.add(p.x * 100 + p.y)
			setTimeout(()=>{
				moveset.delete(p.x * 100 + p.y);
			}, 500)
		}
		if (url = 'd') {
			design();
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
	
	function design() {
		for (let i = 0; i < 20; i ++) {
			eve[i] = [];
			for (let j = 0, k = 0;k <= 20; k ++) {
				if (arr[j][i] == true && (k == 20 || arr[k][i] == false)) {
					eve[i].push(k - j);
					j = k;
				}
				if (j != 20 && arr[j][i] == false) {
					j ++;
					if(j == 20) {
						break;
					}
				}
			}
		}
		for (let i = 20; i < 40; i ++) {
			eve[i] = [];
			for (let j = 0, k = 0;k <= 20; k ++) {
				if (arr[i - 20][j] == true && (k == 20 || arr[i - 20][k] == false)) {
					eve[i].push(k - j);
					j = k;
				}
				if (j != 20 && arr[i - 20][j] == false) {
					j ++;
					if(j == 20) {
						break;
					}
				}
			}
		}
		

		for (let i = 0; i < 20; i ++) {
			let str = "";
			for (let j = 0; j < eve[i].length; j ++) {
					str += String(eve[i][j])
					str += " ";
			}
			$("#l" + String(i + 1))[0].innerText = str;
		}
		
		for (let i = 20; i < 40; i ++) {
			let str = "";
			for (let j = 0; j < eve[i].length; j ++) {
					str += String(eve[i][j])
					str += " ";
			}
			// if (str != "") {
			// 	str += " \n"
			// }
			let j = str.length
			$("#c" + String(i - 20 + 1) + " p")[0].innerText = str;
			
		}
	}
	
	$("#ok").click(function() {
		let str = "";
		for (let i = 0; i < 40; i ++) {
			str += eve[i].length;
			for (let j = 0; j < eve[i].length; j ++) {
				str += eve[i][j]
			}
		}
		str += '#'
		$("#code")[0].value = str;
	})
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