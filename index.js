var playerCount = parseInt(readline()); // number of drones in the race. You are always the first drone in the list.
var laps = parseInt(readline()); // number of laps
var boosts = parseInt(readline()); // number of boosts you can use for this race
var checkpointCount = parseInt(readline()); // number of checkpoints for one lap
var checkpoints = []
for (var i = 0; i < checkpointCount; i++) {
    var inputs = readline().split(' ');
    var checkpointX = parseInt(inputs[0]);
    var checkpointY = parseInt(inputs[1]);
    checkpoints.push({
        x:checkpointX,
        y:checkpointY
    })
}
var myCar = {
    lastCheckpointId: 1
};
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
            myCar.x = x;
            myCar.y = y;
            myCar.vx = vx;
            myCar.vy = vy;
            myCar.nextCheckPointId = nextCheckPointId;
            if (myCar.nextCheckPointId != myCar.lastCheckpointId) {
                CPCounter = 0;
                myCar.lastCheckpointId = myCar.nextCheckPointId;
            }
        } else if (playerCount == 2) {
            var enemyCar = {
                x: x,
                y: y,
                vx:vx,
                vy:vy
            };
        }
    }

    CP = checkpoints[myCar.nextCheckPointId];
    CP2 = checkpoints[(myCar.nextCheckPointId + 1) % checkpointCount];
    // calculate new point closest to next checkpoint
    newPoint = pointOnCircle(CP,CP2,550); // 550 is how far from center of CP


    diffx = newPoint.x-myCar.x;
    diffy = newPoint.y-myCar.y;
    // distance from current position to CP position
    myDistance = Math.sqrt( ( diffx ) * (diffx) + (diffy) * (diffy) );

    // Calculate a number between 0-5, where it will be the offset
    // 1000 = 1
    // 2000 = 2
    // 3000 = 4
    // >=4000 = 5
    velocityOffset = myDistance / 1000;
    printErr(velocityOffset)
    if (velocityOffset > 5) velocityOffset = 5;
    myCar.vx *= velocityOffset;
    myCar.vy *= velocityOffset;
    // try tweaking 5000 a bit, maybe something smaller
    if (CPCounter == 2 && myDistance > 3000) {
        var thrust = 'BOOST';
    } else {
        var thrust = '100';
    }

    moveX = parseInt(newPoint.x - myCar.vx);
    moveY = parseInt(newPoint.y - myCar.vy);

    //Shoving Tactic
    // if(startCounter == 1 && playerCount == 2) {
    //     moveX = enemyCar.x;
    //     moveY = enemyCar.y;
    //     thrust = 'BOOST';
    // } else if (startCounter == 2) {
    //     thrust = 'BOOST';
    // }
    print(moveX + ' ' + moveY +  ' ' + thrust);
}

// function angleBetweenVectors(p1,p2) {
//     lastVelocDot = p1.x * p2.x  + p1.y * p2.y
//     return Math.acos(lastVelocDot /  ( Math.sqrt(p2.x*p2.x + p2.y * p2.y) * Math.sqrt(p1.x*p1.x + p1.y*p1.y) ) )
// }

// TODO: At final submission, remove this and put inline. Increasing preformance.
function pointOnCircle(p1,p2,r) {
    diffx = p2.x - p1.x;
    diffy = p2.y - p1.y;
    X = p1.x + r*((diffx) / (Math.sqrt( (diffx)*(diffx) + (diffy)*(diffy) )))
    Y =  p1.y + r*((diffy) / (Math.sqrt( (diffx)*(diffx) + (diffy)*(diffy) )))
    return {
        x:parseInt(X),
        y:parseInt(Y)
    };
}
