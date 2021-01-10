
  window.onload = () => { caricaTable() };
  setTimeout(() => {window.location.reload(true)},90000);
  function caricaTable() {

      $.ajax({
          url: "https://cors-anywhere.herokuapp.com/http://flight.apps.37.187.91.6.nip.io/flights",
          method: 'GET',
          dataType : "json",
          success: function(dati){leggiDati(dati)}, 
          error: function(err){console.log(err)},
      });

  }

  function leggiDati(dati) {
      let dataHtml = ''

      for (let volo of dati) {
          dataHtml += `<tr>
      <td>${volo.id}</td>
      <td>${volo.code}</td>
      <td>${volo.status}</br><button class='${volo.status}' onclick="cancel(${volo.id})"> Cancel </button></td>
      <td>${volo.departure.date}</br>${volo.departure.airport}</td>
      <td>${volo.arrival.date}</br>${volo.arrival.airport}</td>
      </tr>`;
      }
      $("#corpo").html(dataHtml)

      $(".CANCELLED").hide()
      $(".ARRIVED").hide()
      $(".FLYING").hide()
  }

  function cancel(id) {
      $.ajax({
          url: `https://cors-anywhere.herokuapp.com/http://flight.apps.37.187.91.6.nip.io/flights/${id}/cancel`,
          method: 'PUT',
          success: () => {window.location.reload(true)}, 
          error: function(err){console.error(err)},

      });
  }