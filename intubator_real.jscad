function main(params)
{
    var intubator = trache(
        params.plateHoleD,
    	params.tubeP1Length
	);
	return intubator;
}


// Here we define the user editable parameters: 
function getParameterDefinitions() {
  return [
    { name: 'plateHoleD', type: 'float', initial: 13.46, caption: "Hole diameter:" },
    { name: 'tubeP1Length', type: 'float', initial: 50.8, caption: "Tube length:" }

  ];
}


function trache(plateHoleD, tubeP1Length){
	// Variables
	plateW = 34.925;
	plateH = 27.95;
	plateT = 3.3;
	wallThickness = 3;
	tubeOuterRad = plateHoleD/2+wallThickness;
	angleRadius = 45.72;
	partialAngle = 90;


	// Front Plate
	var plateRounded = CAG.roundedRectangle({center: [0, 0], radius: [plateW/2, plateH/2], roundradius: 1, resolution: 24});
	var plateHole = CAG.circle({center: [0, 0], radius: plateHoleD/2, resolution: 20});
	var frontPlate = plateRounded.subtract(plateHole);
	var extrudedFrontPlate = linear_extrude({ height: plateT }, frontPlate);

	


	// Tube Part 1
	var outerCyl = CSG.cylinder({
        start: [0, 0, plateT],
        end: [0, 0, tubeP1Length],
        radius: tubeOuterRad,
        resolution: 30        // optional
	});
	var innerCyl = CSG.cylinder({
        start: [0, 0, plateT],
        end: [0, 0, tubeP1Length],
        radius: plateHoleD/2,
        resolution: 30        // optional
	});
	var tube1 = outerCyl.subtract(innerCyl);





	// Tube Part 2
 //    var tube21 = torus({ ri: 1.5, ro: 3 }).rotateY(90).translate([0, 0, tubeP1Length]);
 // 	var tube22 = torus({ ri: 1.5, ro: 3 }).rotateY(90).translate([0, 0, tubeP1Length]);
	// var finalTube = union(tube1, extrudedFrontPlate, tube2);


	// var finalTube = rotate_extrude( translate([0,0,0], circle({r: 1, fn: 30, center: true}) ) );
	var extrudeShape = difference(circle({r: 1, fn: 30, center: true}), translate([1 0 0], circle({r: 1, fn: 30, center: true})) );
	var finalTube = rotate_extrude( translate([0,0,0], extrudeShape) );


	return finalTube;

    // var final = tube.union(extrudedFrontPlate);
    // return final;
}

/******* MODULES *******/

// function pie_slice(radius, angle, step) {
//     for(theta = 0; theta < (angle-step);  theta++) {
//             polygon( points = [[0,0],[radius * cos(theta+step) ,radius * sin(theta+step)],[radius*cos(theta),radius*sin(theta)]]).linear_extrude(height = radius*2, center=true).rotate([0,0,0]);
//     }
// }

// function partial_rotate_extrude(angle, radius, convex) {
//     rotate_extrude(convexity=convex).translate([radius,0,0]).intersect ( pie_slice(radius*2, angle, angle/5) _;
// }

