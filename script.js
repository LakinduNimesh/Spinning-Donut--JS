(function () {
  var preTag = document.getElementById('donut');

  //Angles,Radius and Contants
  var A = 1;
  var B = 1;
  var R1 = 1;
  var R2 = 2;
  var K1 = 150;
  var K2 = 5;


  // function to render ASCII frame
  function renderAsciiFrame() {
    var b = []; //array to stay ascii chars
    var z = []; // array to store depth values

    var width = 280; // width of the frame
    var height = 160; // height of frame 

    A += 0.07;// increament angle a
    B += 0.03;// increament angle b
    // sin and cosine of angles
    var cA = Math.cos(A),
      sA = Math.sin(A),
      cB = Math.cos(B),
      sB = Math.sin(B);


    // Intialize arrays with default angles
    for (var k = 0; k < width * height; k++) {
      // set default ascii char
      b[k] = k % width == width - 1 ? '\n' : ' ';
      //set default depth
      z[k] = 0;

    }
    //generate the ascii frame
    for (var j = 0; j < 6.28; j += 0.07) {
      var ct = Math.cos(j);//cosine of j
      var st = Math.sin(j);// sine of j

      for (var i = 0; i < 6.28; i += 0.02) {
        var sp = Math.sin(i),//sin of i
          cp = Math.cos(i),// cosine of i
          h = ct + 2,// height calculation
          // Distance calculation
          D = 1 / (sp * h * sA + st * cA + 5),
          // tempory variable
          t = sp * h * cA - st * sA;

        // calculate cordinates of ascii char
        var x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
        var y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));

        //calculate index of the array
        var o = x + width * y;
        // calculate the ascii char index
        var N = Math.floor(B * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

        // Update ascii char and depth if the conditions are met
        if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
          z[o] = D;
          // update ascill char based on the index
          b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
        }



      }

    }

    //Update html elemenet with ascii frame
    preTag.innerHTML = b.join('');

  }

  //function to start animation
  function startAsciiAnimation() {
    // Start it by calling renderAsciiAnimaton every 50ms
    window.asciiIntervalID = setInterval(renderAsciiFrame, 50);
  }

  renderAsciiFrame();// render the innitial ascill frame
  //add event listner to start animation when page is loaded
  if (document.all) {
    // for older version of internet explorer
    window.attachEvent('onload', startAsciiAnimation);
  } else {
    // for modern browsers
    window.addEventListener('load', startAsciiAnimation, false);
  }

  //add event listener to update ascii frame when window resized 
  window.addEventListener('resize', renderAsciiFrame);
})();