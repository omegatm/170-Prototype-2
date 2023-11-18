title = "dance!";

description = `

`;

const g={x:100, y:150};

options={viewSize:{x:g.x,y:g.y},
isReplayEnabled:true};

characters = [];


const pi = 3.1415926;
//const COLORSTRINGS = ['red', 'blue', 'yellow'];

let MAX_CIRCLECOOLDOWN = 90;
let circleCooldowns = [0];
let currMaxCircleCooldown = MAX_CIRCLECOOLDOWN
let CIRCLECENTER = vec(g.x / 2, g.y / 2 -15)
let MIN_CIRCLERADIUS = 5;
let MAX_CIRCLERADIUS = 50;
let CIRCLESTEP = 1;
let CIRCLEHITBOX = 10;

class Circle {
	constructor(newRadius) {
		this.radius = newRadius;
	}
}

let circles = new Array();

class Instrument {
	constructor(newIntervals, newSound) {
		this.intervals = newIntervals;
		this.sound = newSound;
		this.index = 0;
		this.ready = true;
	}
}

let instruments = [
	new Instrument([100, 500], 'laser'),
	//new Instrument([100, 100, 100, 1000, 500], "coin"),
	new Instrument([3000, 100], "jump"),
	new Instrument([50, 50, 100, 200], "powerUp]"),
	new Instrument([1000, 10, 50, 1], 'hit'),
]

function update() {
	if (!ticks) {
		
	}

	color('red');
		for(let i = 0; i < 360; i += 1) {
			let x = (MIN_CIRCLERADIUS + 10) * cos(i * PI / 180);
			let y = (MIN_CIRCLERADIUS + 10) * sin(i * PI / 180);
			box(CIRCLECENTER.x + x, CIRCLECENTER.y + y, 1);
		}

	for (let i = 0; i < circleCooldowns.length; i++) {
		if (circleCooldowns[i] <= 0) {
			circleCooldowns[i] = currMaxCircleCooldown;
			circles.push(new Circle(MAX_CIRCLERADIUS));
			currMaxCircleCooldown--;
		} else {
			circleCooldowns[i]--;
		}
	}

	color('black');
	for (let i = 0; i < circles.length; i++) {
		for(let j = 0; j < 360; j += 1) {
			let x = circles[i].radius * cos(j * PI / 180);
			let y = circles[i].radius * sin(j * PI / 180);
			box(CIRCLECENTER.x + x, CIRCLECENTER.y + y, 1);
		}
		if (circles[i].radius <= MIN_CIRCLERADIUS) {
			circles.splice(i, 1);
			play("explosion");
			end();
		} else {
			circles[i].radius -= CIRCLESTEP;
		}
	}

	if (input.isJustPressed) {
		if (circles[0].radius <= MIN_CIRCLERADIUS + CIRCLEHITBOX) {
			circles.splice(0, 1);
			addScore(1, CIRCLECENTER);
			play("coin");
			play("jump");
		} else {
			play("explosion");
			end();
		}
	}

	for (let i = 0; i < instruments.length; i++) {
		if (instruments[i].ready) {
			play(instruments[i].sound);
			instruments[i].ready = false;
			setTimeout(() => {
				instruments[i].ready = true;
				if (instruments[i].index == instruments[i].intervals.length - 1) {
					instruments[i].index = 0;
				} else {
					instruments[i].index++;
				}
			}, instruments[i].intervals[instruments[i].index]);
		}
	}

	addEventListener("load", onLoad);


}
