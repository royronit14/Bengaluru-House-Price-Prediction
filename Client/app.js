function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");
  var loader = document.getElementById("uiLoader");
  var submitBtn = document.querySelector(".submit");

  // --- Show Loading State ---
  estPrice.innerHTML = ""; // Clear previous result
  loader.style.display = "block"; // Show loader
  submitBtn.disabled = true; // Disable button
  submitBtn.innerHTML = "Estimating...";

  var url = "http://127.0.0.1:5000/predict_home_price"; 

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      // --- Hide Loading State ---
      loader.style.display = "none"; // Hide loader
      submitBtn.disabled = false; // Re-enable button
      submitBtn.innerHTML = "Estimate Price";

      // --- Display Result ---
      estPrice.innerHTML = "<h2>₹ " + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  var url = "http://127.0.0.1:5000/get_location_names"; 
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          // Add a default placeholder option first
          $('#uiLocations').append(new Option("Choose a Location", "", true, true));
          
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;