
$( document ).ready(function() {

  // Div that contains this tube's data
  var TUBE_DATA = {
    'Williams Airway': '#williams-airway-data',
    'Experimental Tube': '#experimental-tube-data'
  };
  // The last selected tube
  var LAST_TUBE = null;

  function updateTube(tubeName) {
    // Don't update if no change in tube
    if (LAST_TUBE === tubeName) return;

    // Store the old params values and data
    // if (LAST_TUBE) {
    //   var oldData = editor.getValue();
    //   $(TUBE_DATA[LAST_TUBE]).text(oldData);
    // }
    
    // Set the editor contents to be what the tubeName now refers to
    var tubeData = $(TUBE_DATA[tubeName]).text();

    editor.setValue(tubeData);
    // Update the jscad (and render)
    gProcessor.setJsCad(editor.getValue());

    // Update last selected tube
    LAST_TUBE = tubeName;
  }

  // Set up on lose focus, trigger switchTube
  $('#tube-list').change(function() {
    updateTube(this.value);
  });

    console.log( "ready!" );
});
