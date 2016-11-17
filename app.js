var BASE_URL = 'http://api.openweathermap.org/data/2.5/group';

var query = {
  units: 'imperial',
  appid: "4ff7297df1f3ec7c3571266d62a57785",
  id: "5368361,5128581"
}

var state = {};

function getDataFromApi(searchTerm, callback) {
  $.getJSON(BASE_URL, query, callback);
}

function calculateData(data) {

  if (data.list[0]) {
    var laTemp = (data.list[0].main.temp);
    var nyTemp = (data.list[1].main.temp);
    var laSky = (data.list[0].weather[0].main);
    var nySky = (data.list[1].weather[0].main);
    console.log(laTemp, nyTemp, laSky, nySky);
  }
  else {
    console.log('<p>No results</p>');
  }

  if (laSky === nySky) {

      if ((laTemp - nyTemp) <= 2 && (nyTemp - laTemp) <= 2) {
        state.result = "Yes.";
      }
      else if ((laTemp - nyTemp) <= 6 && (nyTemp - laTemp) <= 6) {
        state.result = "Pretty close.";
      }
      else if ((laTemp - nyTemp) <= 10 && (nyTemp - laTemp) <= 10) {
        state.result = "Sort of.";
      }
      else if ((laTemp - nyTemp) > 14 || (nyTemp - laTemp) > 14) {
        state.result = "Not really.";
      }
      else {
        state.result = "Nope.";
      }
   }  
   else {
     state.result = "Nope.";
   }
  $('.js-answer').text(state.result);
};

$(document).ready(function() {
  getDataFromApi(query, calculateData);
//  console.log(state.result);
//  $('.js-answer').text(state.result);
});
