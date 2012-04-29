// vaders

var canvas = document.getElementById('game-canvas'),
	context = canvas.getContext('2d'),
	status = document.getElementById('game-status'),
	you$ = document.getElementById('img-you'),
	vad$ = document.getElementById('img-vad'),
	ym$ = document.getElementById('img-ym'),
	vm$ = document.getElementById('img-vm');

var maxVaders = 11,
	maxMissiles = 3;

var ym = [],
	vm = [],
	vs = [],
	lv,
	score,
	lives,
	x;

var state = {
	left: false,
	right: false,
	space: false,
	theend: false
};

function init() {
	lv = 1;
	score = 0;
	lives = 3;
	x = 40;
	clearScreen();
	for (q = 0; q < maxMissiles; q++) {
		ym[q] = {
			x: 0,
			y: 0
		};
		vm[q] = {
			x: 0,
			y: 0
		};
	}
	for (q = 0; q < maxVaders; q++) {
		vs[q] = {
			x: 20 + (q * 5),
			y: 2 + Math.floor(lv / 3),
			dx: 1
		};
	}

	document.addEventListener('keydown', function(event) {
		if (event.keyCode == 37) {
			state.left = true;
		}
		if (event.keyCode == 39) {
			state.right = true;
		}
		if (event.keyCode == 32) {
			state.space = true;
		}
	});
	document.addEventListener('keyup', function(event) {
		if (event.keyCode == 37) {
			state.left = false;
		}
		if (event.keyCode == 39) {
			state.right = false;
		}
		if (event.keyCode == 32) {
			state.space = false;
		}
	});
	
	status.interval = window.setInterval(drawFrame, 1000 / 20);
	//drawFrame();
}

function drawFrame() {
	if (status.theend) {
		theend();
	}

	status.textContent =  "BLV  Level" + lv + "  Score:" + score + "  Lives:" + lives;
	if (state.left && x >= 3) {
		clearAt(25, x, 3);
		x -= 2;
	}
	if (state.right && x <= 74) {
		clearAt(25, x, 3);
		x += 2;
	}
	if (state.space) {
		// Check for available missiles to fire
		console.log('fire?');
		var m = -1;
		for (q = 0; q < maxMissiles; q++) {
			if (ym[q].x == 0) {
				m = q;
			}
		}
		console.log('fire! ' + m);
		if (m >= 0) {
			ym[m].x = x + 1;
			ym[m].y = 25;
		}
	}
	
	qwerty = 0;
	for (q = 0; q < maxVaders; q++) {
		if (vs[q].x > 0) {
			qwerty = qwerty + 1
			clearAt(vs[q].y, vs[q].x, 3);
			we = Math.round((vs[q].dx * lv) / 2);
			if (we == 0) {
				we = vs[q].dx;
			}
			vs[q].x += we;
			if (vs[q].x < 1) {
				vs[q].x = 1;
				vs[q].dx = 1;
				vs[q].y += 1;
			}
			if (vs[q].x > 75) {
				vs[q].x = 75;
				vs[q].dx = -1;
				vs[q].y += 1;
			}
			if (vs[q].y == 25) {
				lives -= 1;
				if (lives == 0) {
					state.theend = true;
				}
			}
			putImage(vs[q].y, vs[q].x, vad$);
			if (vs[q].x - 1 >= x - 1 && vs[q].x + 3 <= x + 3) {
				m = -1
				for (var qq = 0; q <= 2; q++) {
					if (vm[qq].x == 0) {
						mm = qq
					}
				}
				if (m >= 0) {
					vm[m].x = vs[q].x + 1;
					vm[m].y = vs[q].y + 2;
				}
			}
			for (qq = 0; q < maxMissiles; q++) {
				if (ym[qq].y == vs[q].y && ym[qq].x >= vs[q].x && ym[qq].x <= vs[q].x + 2) {
					clearAt(vs[q].y, vs[q].x, 3);
					vs[q].x = 0;
					score += 10;
					ym[qq].x = 0;
				}
			}
		}
	}
	putImage(25, x, you$);
	for (q = 0; q < maxMissiles; q++) {
		if (ym[q.x] > 0) {
			ym[q].y -= 1;
			if (ym[q].y < 24) {
				putImage(ym[q].y + 1, ym[q].x, f$);
			}
			putImage(ym[q].y, ym[q].x, ym$);
			if (ym[q].y == 1) {
				ym[q].x = 0;
			}
		}
	}
	for (q = 0; q < maxMissiles; q++) {
		if (vm[q].x > 0) {
			vm[q].y += 1;
			putImage(vm[q].y - 1, vm[q].x, f$);
			putImage(vm[q].y, vm[q].x, vm$);
			if (vm[q].y == 25 && vm[q].x >= x && vm[q].x <= x + 2) {
				lives -= 1;
			}
			if (vm[q].y > 24) {
				putImage(25, vm[q].x, f$);
				vm[q].x = 0;
			}
		}
	}
	if (qwerty == 0) {
		lv += 1;
		score += 50;
	}
	if (lives == 0) {
		state.theend = true;
	}
}

function theend() {
	status.textContent = " Sorry, but the 'Vaders won.";
	window.clearInterval(status.interval);
}

function clearScreen() {
	context.fillStyle = 'black';
	context.fillRect(0, 0, 640, 400);
}

function putImage(row, col, image) {
	context.drawImage(image, (col - 1) * 8, (row - 1) * 16);
}

function clearAt(row, col, len) {
	context.fillStyle = "black";
	context.fillRect((col - 1) * 8, (row - 1) * 16, 8 * len, 16);
}

window.addEventListener('load', function() {
	init();
});
