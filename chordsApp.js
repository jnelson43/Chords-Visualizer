var chord;
var mod = '';
var displayMod = '';
/*Chords Data*/
/*Get selected chord*/
$(document).ready(function() {
    $('.help-button').on('click', function(){
  $('.help-button-wrapper').toggleClass('expanded');
});
    $(".chordSelect").click(function() {
        chord = $(this).val();
        $('.chord').html(chord);
        $('.mod').html(chord + displayMod);
        return sharpCheck(chord);
    });
    $(".modSelect").click(function() {
        chord = chord.replace(mod,"");
        mod = $(this).val();
        $('.mod').html(chord + $(this).html());
        displayMod = $(this).html();
    });
    $(".clear").click(function() {
        chord = chord.replace(mod,"");
        mod = '';
        displayMod = '';
        $('.mod').html("Select a Modification");
    })

    /*Check if minor*/
    function modCheck(chord) {
        if(chord.indexOf(mod) === -1){
                chord = chord + mod;
            }
        return chord;
    }
    
    function sharpCheck(chord){
        if ($('#sharp').is(":checked")) {
            if(chord.indexOf('#') === -1){
                chord = chord + "#";
            }
        }
        if ($('#sharp').is(":checked")) {
            if(chord.indexOf('#') != -1){
                chord = chord.replace("#","");
                chord = [chord.slice(0,1), '#',chord.slice(1)].join('');
            }
        }
        if (!$('#sharp').is(":checked")) {
                chord = chord.replace("#","");
        }
        return chord;
    }

    /*Adds fret number to chord*/
    $(".fretboard").mouseenter(function() {
            chord = sharpCheck(chord);
            chord = modCheck(chord);
        	var fretNum = this.id;
        	fretNum = fretNum.replace(/\D/g,'');
        	chord = chord+fretNum;
            var fret = this.id;
            getData(chord);
    });

    /*Removes fret number from chord*/
    $(".fretboard").mouseleave(function() {
    	chord = chord.replace(/[0-9]/g, '');
    	removeData();
    })

    /*Retrieves json data*/
    var url = 'http://chordsvisualizer.com/chordsData.json';
    function getData(chord){
	var attemptedTwice = false;
        $.getJSON(url).done(function(result){
            var chordData = JSON.stringify(result[chord]);//result.chord you do it this way because its a variable ig
            //Plot points
            $.each(result[chord], function(key,value){
            	value.forEach(function(element){
            		var active = '<div class="active"></div>';
                	$(key).find('#' + element).html(active);
            	});
            });
        })
        .fail(function(){
	  if(attemptedTwice == true){
            alert("Fail");
	  }
	  else{
	    url = 'http://www.chordsvisualizer.com/chordsData.json';
	    attemptedTwice == true;
	  }
        })
    }
    function removeData(){
    	$('.active').remove();
    }
});