//Numbers are unitless, but can be interpreted as units in Skeinforge.  Using mm for all these measurements.


// Variables
plateW = 34.925;
plateH = 27.95;
plateT = 3.3;
plateHoleD = 13.46;
wallThickness = 3;
tubeOuterRad = plateHoleD/2+wallThickness;
tubeP1Length = 50.8;
angleRadius = 45.72;

//// Plate
//translate([0,0,0]){
//	difference(){
//		linear_extrude(height = plateT, center = false, scale = 1.0){
//			polygon(points = [[plateW/2, plateH/2], [plateW/2, -plateH/2], [-plateW/2, -plateH/2],[-plateW/2, plateH/2]]);
//		}
//		
//		linear_extrude(height = plateT, center = false, scale = 1.0){
//			circle(plateHoleD/2);
//		}
//	}
//}
//
//// Tube Part 1
//translate([0,0,plateT]){
//	linear_extrude(height = tubeP1Length, center = false, scale = 1.0){
//		difference(){
//			circle(tubeOuterRad);
//			circle(plateHoleD/2);
//		}
//	}
//}


//rotate_extrude(convexity = 100, $fn = 100)
//rotate([0,90,0])
//translate([angleRadius, 0, 0])
//difference(){
//	circle(r = tubeOuterRad, $fn = 100);
//	circle(r = tubeOuterRad-2, $fn = 100);
//}





//// Tube Part 2
//val = angleRadius+tubeOuterRad;
//translate([0,-angleRadius,plateT+tubeP1Length]){
//	difference(){
//		rotate([0,90,0]){
//			rotate_extrude(convexity = 100, $fn = 100)
//			translate([angleRadius, 0, 0])
//			circle(r = tubeOuterRad, $fn = 100);
//		}
//		rotate([0,90,0]){
//			linear_extrude(height = 100, center = true, scale = 1.0){
//					polygon(points = [[0,0], [0, val], [val, val],[val, -val], [-val, -val],[-val, 0]]);
//			}
//		}
//	
//	}
//}






