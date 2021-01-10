  window.onload = caricaDati()
  window.setInterval(caricaDati, 1000 )

  function caricaDati() {
      $.ajax({
          url: "https://cors-anywhere.herokuapp.com/http://flight.apps.37.187.91.6.nip.io/flights",
          method: 'GET',
          dataType : "json",
          success: function(resp){
              if($("#corpo").html()===parsaDati(resp)){
                  console.log("Dati sincronizzati")
              }else{
                  console.log("Aggiornamento dati")
                  $("#corpo").html(parsaDati(resp))
            }
            }, 
          error: function(err){console.log(err)},
      });

  }

  function parsaDati(dati) {
      let dataHtml = ""

      for (let volo of dati) {
          dataHtml += `<tr>
      <td>${volo.id}</td>
      <td>${volo.code}</td>
      <td>${volo.status}`;

      if(volo.status==="SCHEDULED"){
        dataHtml += `<br><button onclick="cancel(${volo.id})"> Cancel </button>`
      }

      dataHtml +=`</td><td>${volo.departure.date}<br>${volo.departure.airport}</td>
      <td>${volo.arrival.date}<br>${volo.arrival.airport}</td>
      </tr>`;
      }
      return dataHtml;
  }

  function cancel(id) {
      $.ajax({
          url: `https://cors-anywhere.herokuapp.com/http://flight.apps.37.187.91.6.nip.io/flights/${id}/cancel`,
          method: 'PUT',
          success: function() {console.log(`Cancellato volo:${id}`)},
          error: function(err){console.error(err)},
      });
  }