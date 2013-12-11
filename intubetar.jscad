

function main(params)
{
    var intubator = trache(
        params.plateHoleD,
        params.tubeP1Length,
        params.h_t,
        params.r_tor
    );
    return intubator;
}

// Here we define the user editable parameters: 
function getParameterDefinitions() {
  return [
    { name: 'plateHoleD',   type: 'float', initial: 13.46,  caption: "Hole diameter:" },
    { name: 'tubeP1Length', type: 'float', initial: 50.8,   caption: "Tube length:" },
    { name: 'h_t',          type: 'float', initial: 20,     caption: "Tube height:" },
    { name: 'r_tor',        type: 'float', initial: 50.8,   caption: "Curvature:" }
  ];
}


function trache(plateHoleD, tubeP1Length, h_t, r_tor){

    // Variables
    plateW = 34.925;
    plateH = 27.95;
    plateT = 3.3;
    wallThickness = 3;
    tubeOuterRad = plateHoleD/2+wallThickness;
    fineness = 30;

    // Front Plate
    var front_plate = make_front_plate(plateHoleD, plateW, plateH, plateT, wallThickness);

    // Tube Part 1
    var tube1       = make_tube1(plateT, tubeP1Length, tubeOuterRad, fineness, plateHoleD);

    // Tube Part 2
    var tube2       = make_tube2(r_tor, h_t, wallThickness, fineness, plateT, tubeP1Length, tubeOuterRad, plateHoleD);

    // Union the three pieces together
    var finalTube   = union(front_plate, tube1, tube2);

    return finalTube;
}



function make_front_plate(plateHoleD, plateW, plateH, plateT, wallThickness){

    var plateRounded        = CAG.roundedRectangle({center: [0, 0], radius: [plateW/2, plateH/2], roundradius: 1, resolution: 24});
    var plateHole           = CAG.circle({center: [0, 0], radius: plateHoleD/2, resolution: fineness});
    var frontPlate          = plateRounded.subtract(plateHole);
    var extrudedFrontPlate  = linear_extrude({ height: plateT }, frontPlate);

    return extrudedFrontPlate;
}

function make_tube1(plateT, tubeP1Length, tubeOuterRad, fineness, plateHoleD){
    var outerCyl = CSG.cylinder({
        start: [0, 0, plateT],
        end: [0, 0, tubeP1Length],
        radius: tubeOuterRad,
        resolution: fineness        // optional
    });
    var innerCyl = CSG.cylinder({
        start: [0, 0, plateT],
        end: [0, 0, tubeP1Length],
        radius: plateHoleD/2,
        resolution: fineness        // optional
    });
    var tube1 = outerCyl.subtract(innerCyl);

    return tube1;
}


function make_tube2(r_tor, h_t, wallThickness, fineness, plateT, tubeP1Length, tubeOuterRad, plateHoleD) {

    var r_o         = tubeOuterRad;
    var r_i         = r_o - wallThickness;
    var r_oe        = r_tor + r_o;

    var largeRing   = rotate_extrude(translate([r_tor,0,0],circle({r: r_o, fn: fineness, center: true})));
    var smallRing   = rotate_extrude(translate([r_tor,0,0],circle({r: r_i, fn: fineness, center: true})));
    var donut       = largeRing.subtract(smallRing);

    var TWOD_block  = CAG.fromPoints([ [0,r_oe], [-r_oe,r_oe], [-r_oe,-r_oe], [r_oe,-r_oe], [r_oe,r_oe-h_t], [0,r_oe-h_t] ]); 
    var THREED_block= linear_extrude({ height: 2*r_o }, TWOD_block);

    var tube2       = rotate([0,0,90],rotate([0,-90,0],rotate([-90,0,0], donut.subtract(translate([0,0,-r_o],THREED_block)) )));
    tube2           = translate([0,-r_tor,tubeP1Length], tube2);

   return tube2;
}



