var playerCount = parseInt(readline()); // number of drones in the race. You are always the first drone in the list.
var laps = parseInt(readline()); // number of laps
var boosts = parseInt(readline()); // number of boosts you can use for this race
var checkpointCount = parseInt(readline()); // number of checkpoints for one lap
var checkpoints = []
for (var i = 0; i < checkpointCount; i++) {
    var inputs = readline().split(' ');
    var checkpointX = parseInt(inputs[0]);
    var checkpointY = parseInt(inputs[1]);
    checkpoints.push([checkpointX,checkpointY])
}
var lastCheckpointId = 1;
var startCounter = 0;
var firstCP = true;
var CPCounter = 0;
while (true) {
    startCounter += 1;
    CPCounter += 1;
    for (var i = 0; i < playerCount; i++) {
        var inputs = readline().split(' ');
        var x = parseInt(inputs[0]);
        var y = parseInt(inputs[1]);
        var vx = parseInt(inputs[2]);
        var vy = parseInt(inputs[3]);
        var nextCheckPointId = parseInt(inputs[4]);
        if (i === 0) { // First input is always my racer
            var myX = x;
            var myVx = vx;
            var myY = y;
            var myVy = vy;
            var myNextCheckPointId = nextCheckPointId; //current checkpoint id
            if (myNextCheckPointId != lastCheckpointId) {
                CPCounter = 0;
                firstCP = false;
                var lastCheckpointId = myNextCheckPointId;
            }
        } else if (playerCount == 2) {
            enemyX = x;
            enemyY = y;
            enemyVx = vx;
            enemyVy = vy;
        }
    }

    CP = checkpoints[myNextCheckPointId];
    CP2 = checkpoints[(myNextCheckPointId + 1) % checkpointCount];
    // calculate new point closest to next checkpoint
    newPoint = pointOnCircle(CP[0],CP[1],CP2[0],CP2[1],550);
    //  correction terms are myVx, and myVy
    moveX = newPoint[0] - myVx;
    moveY = newPoint[1] - myVy;

    myDistance = Math.sqrt( ( CP[0]-myX ) * (CP[0]-myX) + (CP[1]-myY) * (CP[1]-myY) );
    if (CPCounter == 4 && myDistance > 5000) {
        var thrust = 'BOOST';
    } else {
        var thrust = '100';
    }

    //Shoving Tactic
    if(startCounter == 1 && playerCount == 2) {
        moveX = enemyX;
        moveY = enemyY;
        thrust = 'BOOST';
        // printErr('EnemyVx: ' + enemyVx)
        // printErr('EnemyVy: ' + enemyVy)
    } else if (startCounter == 2) {
        thrust = 'BOOST';
    }
    print(moveX + ' ' + moveY +  ' ' + thrust);
}

// function angleBetweenVectors(x1,y1,x2,y2) {
//     lastVelocDot = x1 * x2  + y1 * y2
//     return Math.acos(lastVelocDot /  ( Math.sqrt(x2*x2 + y2 * y2) * Math.sqrt(x1*x1 + y1*y1) ) )
// }
function pointOnCircle(x1,y1,x2,y2,r) {
    X = x1 + r*((x2-x1) / (Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) )))
    Y =  y1 + r*((y2-y1) / (Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) )))
    return [parseInt(X),parseInt(Y)]
}
