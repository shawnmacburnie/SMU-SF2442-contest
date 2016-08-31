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
            myCarX = x;
            myCarY = y;
            myCarVx = vx;
            myCarVy = vy;
            myCarNextCheckPointId = nextCheckPointId;
            if (nextCheckPointId != lastCheckpointId) {
                CPCounter = 0;
                lastCheckpointId = nextCheckPointId;
            }
        }
    }

    CP = checkpoints[myCarNextCheckPointId];
    CP2 = checkpoints[(myCarNextCheckPointId + 1) % checkpointCount];
    // calculate new point closest to next checkpoint
    // newPoint = pointOnCircle(CP,CP2,550); // 550 is how far from center of CP
    r = 550;
    pointOnCircleDiffx = CP2[0] - CP[0];
    pointOnCircleDiffy = CP2[1] - CP[1];
    newPoint = [
        parseInt(CP[0] + r*((pointOnCircleDiffx) / (Math.sqrt( (pointOnCircleDiffx)*(pointOnCircleDiffx) + (pointOnCircleDiffy)*(pointOnCircleDiffy) ))) ),
        parseInt(CP[1] + r*((pointOnCircleDiffy) / (Math.sqrt( (pointOnCircleDiffx)*(pointOnCircleDiffx) + (pointOnCircleDiffy)*(pointOnCircleDiffy) ))) )
    ];

    diffx = newPoint[0] - myCarX;
    diffy = newPoint[1] - myCarY;
    // distance from current position to CP position
    myDistance = Math.sqrt( ( diffx ) * (diffx) + (diffy) * (diffy) );

    if (myDistance > 3000) {
        newPoint = CP;
    }

    // Calculate a number between 0-5, where it will be the offset
    // 1000 = 1
    // 2000 = 2
    // 3000 = 4
    // >=4000 = 5
    velocityOffset = 1;
    // if (CPCounter >= 2) { // this may not help anything.
        velocityOffset = myDistance / 1000;
        if (velocityOffset > 5) velocityOffset = 5;
    // }
    myCarVx *= velocityOffset;
    myCarVy *= velocityOffset;
    // try tweaking 5000 a bit, maybe something smaller
    if (CPCounter == 2 && myDistance > 3000) {
        var thrust = 'BOOST';
    } else {
        var thrust = '100';
    }
    if( myDistance > 1000 ) {
        moveX = parseInt(newPoint[0] - myCarVx);
        moveY = parseInt(newPoint[1] - myCarVy);
    } else {
        moveX = parseInt(newPoint[0]);
        moveY = parseInt(newPoint[1]);
    }

    //Shoving Tactic
    // if(startCounter == 1 && playerCount == 2) {
    //     moveX = enemyCarX;
    //     moveY = enemyCarY;
    //     thrust = 'BOOST';
    // } else if (startCounter == 2) {
    //     thrust = 'BOOST';
    // }
    print(moveX + ' ' + moveY +  ' ' + thrust);
}
