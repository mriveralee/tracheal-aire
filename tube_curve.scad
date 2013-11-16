// USAGE: MODIFY SCALE TO MATCH THE Curvature
tbScaleX = 1.0;
tbScaleY = 1.0;
tbScaleZ = 1.0;

// Draw Curve Module
tubeCurve(tbScaleX, tbScaleY, tbScaleZ);







/* Create Tube Curve */
module tubeCurve(sX, sY, sZ) {
	cylHeight = 15;
	cylRadius = 100;
	scale([sX, sY, sZ])
	difference() {
		    difference()  {
				// INNER RADIUS CUT-OUT
				translate([0, 16, 0])
				scale(1.2, 1.0, 1.5)
				difference() {
					cylinder(r = cylRadius, h = cylHeight, center = true);
					translate([0, cylRadius/10, 0])	
					cylinder(r = cylRadius, h = cylHeight, center = true );	
			     }
				// MAIN CYLINDER Curvature
				difference() {
					cylinder(r = cylRadius, h = cylHeight, center = true);
					translate([0, cylRadius/10, 0])	
					cylinder(r = cylRadius, h = cylHeight, center = true );	
			     }
		    }
		    // Clip Tube Curve via cube
		    rotate([0, 0, -45])
		    translate([-1.5 * cylRadius, -0.6 * cylRadius, -cylHeight])
		    cube([3 * cylRadius, 2*cylRadius, 2 * cylHeight]);
			
			// Clips flat edge on end
		    rotate([0, 0, -39])
		    translate([-2.15 * cylRadius, -0.98 * cylRadius, -cylHeight])
		    cube([2 * cylRadius, 0.7 * cylRadius, 2 * cylHeight]);
		    // Smooths bottom edge
			for (i=[50:68]) {
		   	 	rotate([0, 0, -1*i])
			    translate([-0.5 * cylRadius, -1.70 * cylRadius, -cylHeight])
			    cube([cylRadius, 0.7 * cylRadius, 2 * cylHeight]);
			}

	}
}