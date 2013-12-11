


function main() {

	var h_t = 20;
	var r_tor = 50.8;
	var r_o = 19.5;
	var wall_thickness = 3;
	var r_i = r_o - wall_thickness;
	var fineness = 15;

    var largeRing = rotate_extrude(translate([r_tor,0,0],circle({r: r_o, fn: fineness, center: true})));
    var smallRing = rotate_extrude(translate([r_tor,0,0],circle({r: r_i, fn: fineness, center: true})));
    var donut = largeRing.subtract(smallRing);

    var r_oe = r_tor + r_o;

    var TWOD_block = CAG.fromPoints([ [0,r_oe],[-r_oe,r_oe],[-r_oe,-r_oe],[r_oe,-r_oe],[r_oe,0.5*r_oe-h_t],[0,0.5*r_oe-h_t] ]); 
	var THREED_block = linear_extrude({ height: 2*r_o }, TWOD_block);

   return donut.subtract(THREED_block);
}

