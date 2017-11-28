var valorPositivo = 0;
var valorNegativo = 0;
var valorNeutro = 0;

var chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  theme: "light2",
  title: {
      text: "Analise"
  }
  , axisY: {
      title: "Tweets"
  }
  , data: [{
      type: "column"
      , showInLegend: true
      , legendMarkerColor: "grey"
      , legendText: ""
      , dataPoints: [
          {
              y: valorPositivo
              , label: "Positive"
          }
          , {
              y: valorNegativo
              , label: "Negative"
          },
          {
            y: valorNeutro
            , label: "Neutro"
          }
      ]
  }]
});

function getAllSenadores()
{
  $.ajax({
    url: '',
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'},
    method: 'GET',
    success: function (data)
    {
      $.each(data, function (i, item) {
        $("#senador").append($('<option>', {
          value: item.nome,
          text: item.nome
        }));
      });
    },
    error: function (e) {
      console.log(e);
    }
  });
};

function analiseDeputado() {

  var text = "";

  $("#deputado option:selected" ).each(function() {
     text += $( this ).text();
   });

  $.ajax({
    url: 'http://titecnologiasbd.azurewebsites.net/deputado/analise/' + text,
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'},
    method: 'GET',
    success: function (data)
    {
      data = JSON.parse(data);

      if(typeof data.data !== 'string')
      {
        chart.options.title.text = text;
        chart.data[0].dataPoints[0].y = data.positivos;
        chart.data[0].dataPoints[1].y = data.negativos;
        chart.data[0].dataPoints[2].y = data.neutros;
        chart.render();
      }
      else
      {
        chart.options.title.text = text;
        chart.data[0].dataPoints[0].y = 0;
        chart.data[0].dataPoints[1].y = 0;
        chart.data[0].dataPoints[2].y = 0;
        chart.render();
      }
    },
    error: function (e) {
      console.log(e);
    }
  });
}

function analiseSenador(text) {
  var text = "";

  $("#senador option:selected" ).each(function() {
     text += $( this ).text();
   });

  $.ajax({
    url: 'http://titecnologiasbd.azurewebsites.net/senador/analise/' + text,
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'},
    method: 'GET',
    success: function (data)
    {
      data = JSON.parse(data);
      if(typeof data.data !== 'string')
      {
        chart.options.title.text = text;
        chart.data[0].dataPoints[0].y = data.positivos;
        chart.data[0].dataPoints[1].y = data.negativos;
        chart.data[0].dataPoints[2].y = data.neutros;
        chart.render();
      }
      else
      {
        chart.options.title.text = text;
        chart.data[0].dataPoints[0].y = 0;
        chart.data[0].dataPoints[1].y = 0;
        chart.data[0].dataPoints[2].y = 0;
        chart.render();
      }
    },
    error: function (e) {
      console.log(e);
    }
  });
}

$(document).ready(function ()
{
    new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('trigger'));
    chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
          text: "Analise"
      }
      , axisY: {
          title: "Tweets"
      }
      , data: [{
          type: "column"
          , showInLegend: true
          , legendMarkerColor: "grey"
          , legendText: ""
          , dataPoints: [
              {
                  y: valorPositivo,
                  label: "Positive",
                  color: "green"
              }
              , {
                  y: valorNegativo,
                  label: "Negative",
                  color: "red"
              },
              {
                y: valorNeutro,
                label: "Neutro",
                color: "grey"
              }
          ]
      }]
    });
    chart.render();
});
