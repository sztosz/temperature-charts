var smoothie = new SmoothieChart({
    grid: {
      strokeStyle: 'rgb(125, 0, 0)',
      fillStyle: 'rgb(60, 0, 0)',
      lineWidth: 1,
      millisPerLine: 500,
      verticalSections: 20
    },
    labels: {
      precision: 3
    },
    timestampFormatter: SmoothieChart.timeFormatter,
    maxValue: 35,
    minValue: 15,
  }
);
smoothie.streamTo(document.getElementById('mycanvas'), 1000);
// Data
var line1 = new TimeSeries();

// Add a random value to each line every second
setInterval(dataFromApi,
  //line1.append(new Date().getTime(), dataFromApi());
  //line1.append(new Date().getTime(), Math.random());
  500);

// Add to SmoothieChart
smoothie.addTimeSeries(line1, {
  strokeStyle: 'rgb(0, 255, 0)',
  fillStyle: 'rgba(0, 255, 0, 0.4)',
  lineWidth: 3
});

function dataFromApi() {
  var address = 'http://sztosz.tk:9876/api/v1/reading/sensor/1/?page_size=1';
  $.getJSON(address, function(data) {
    //console.log(data);
    //console.log(data.results[0].reading);
    var temp = data.results[0].reading;
    line1.append(new Date().getTime(), parseFloat(temp));
    $('#cur-temp').html(temp);
  })
}
