title="Fish!";

description=`[Hold] to reel up 
[release] to go down`;
characters=[
	`rrr
rrr`,
`
  l   
  l   
 l    
 l    
 l  l 
  ll  
`,
`
  bb  
 bblb 
 bbbb
 bbbb
  bb  
 bbbb 
`,
`
      
      
    yy
   yyy
    PP
    PP
`,
`
      
      
y     
yy   l
l   l 
P  l  
`,
`
   ppp
   ppp
   ppp
YYYYYY
YYYYYY
 YYYYY
`,
`
  l   
pl    
p     
YYYYY 
YYYYY 
YYYY  
`,
];
const g={x:100, y:150};

options={viewSize:{x:g.x,y:g.y},
isPlayingBgm:true,
theme:"crt",
isReplayEnabled:true,
seed:33};

let py;
let fy;

let MAX_SPEEDRATIO = 0.4;
let speedRatio;
let fishspeed;

const FDIR_COOLDOWN = 25;
let fDir_cooldown = 0;
let fDir = false;

let hold = 20;

function update(){
    if(!ticks){
        speedRatio=0;
        fishspeed=0;
        fy=g.y*.45;
        py=g.y*.5;
       
        //player.pos.clamp(0,g.x,0,g.y);
       // fishbar.pos.clamp(0,g.x,0,g.y);
    }

	/*color('black');
	for (let i = py - 2; i--; i > g.y * 0.1) {
		rect(vec(g.x * 0.53, i), 1);
	}*/


	color('light_cyan');
	for (let i = 0; i < g.y * 0.1; i++) {
		for (let j = 0; j < g.x; j++) {
			rect(vec(j, i), 1);
		}
	}

	let drawIndex = 0;

	drawIndex = py - 2;
	while (drawIndex > g.y * 0.06) {
		drawIndex--;
		color('black');
		box(vec(g.x * 0.53, drawIndex), 1);
	}

	color('black');
	char('d', vec(g.x * 0.43, g.y * 0.05));
	char('e', vec(g.x * 0.49, g.y * 0.05));
	char('f', vec(g.x * 0.43, g.y * 0.09));
	char('g', vec(g.x * 0.49, g.y * 0.09));

    color('light_black');
	char("b", vec(g.x*.53,py));

	color('black');
	char("c", vec(g.x*.54,fy));

    
    if(input.isPressed)
    {
        if(input.isJustPressed){
            play('select');
            }
        speedRatio-=.02;

    }
    else{
            speedRatio+=.02;
    }

	py += Math.min(Math.max(speedRatio, -MAX_SPEEDRATIO), MAX_SPEEDRATIO);

    fishspeed+=rnd(-.02,.02);
    fy+=fishspeed;

    if(fDir)
    {
        fishspeed-=rnd(0,.02);
    } else
    {
        fishspeed+=rnd(0,.02);
    }

	if (fy >= g.y * 0.9) {
		fishspeed-=rnd(0,0.2);
	}

	fDir_cooldown--;

	if (fDir_cooldown <= 0) {
		let rand = rnd(0, 1);
		if (rand < 0.5) {
			fDir = true;
		} else {
			fDir = false;
		}

		fDir_cooldown = FDIR_COOLDOWN;
	}

	if (py < fy - 10 || py > fy + 10) {
		hold--;
	} else if (hold < 50) {
		hold++;
	}

    if(hold < 0)
    {
        play('lucky');
        end();
    }

	if (fy < g.y * 0.1)  {
		play('powerUp');
        addScore(1, vec(g.x * 0.5, fy));
		
		speedRatio=0;
        fishspeed=0;
        fy=g.y*.45;
        py=g.y*.5;
		hold = 20;
	}


}
addEventListener("load", onLoad);