$(() => {
  const formulario = $("#formulario");
  const searchUser = $("#searchUser");
  const showMe = $("#showMe");
  const showMeItem = $("#showMeItem");
  const showImage = $("#showImage");
  const chartContainer = $("#chartContainer");
  const msjError = $("#msjError");
  const superHeroSucces = $("#superHeroSucces");

  //grafico .

  formulario.on("submit", (e) => {
    e.preventDefault();
    // console.log("diste click");
    // console.log(searchUser.val());

    //validacion
    const regExpLetras = /^[0-9]+$/;
    msjError.html("");
    if (!searchUser.val()) {
      console.log("No se ingreso nada");
      msjError.append(`
        <p>No se ingreso nada &#9888 </p>
        `);

      return;
    }
    if (!regExpLetras.test(searchUser.val())) {
      msjError.append(`
        <p>Solo se aceptan numeros &#9888 </p>
        `);
      return;
    }

    //API
    $.ajax({
      type: "GET",
      url: `https://www.superheroapi.com/api.php/3525635500807579/${searchUser.val()}`,
      dataType: "JSON",
      success(data) {
        superHeroSucces.html("");

        superHeroSucces.append(`SuperHero encontrado !`);

        showMe.html("");

        showMe.append(`
        <h5 class="card-title">Nombre: ${data.name}</h5>
        <p class="card-text">Conexiones : ${data.connections["group-affiliation"]} </p>
        `);
        showMeItem.html("");

        showMeItem.append(`
        <li class="list-group-item">Publicado por : ${data.biography["publisher"]} </li>
        <li class="list-group-item">Ocupación : ${data.work["occupation"]} </li>
        <li class="list-group-item">Primera aparición : ${data.biography["first-appearance"]}</li>
        <li class="list-group-item">Altura : ${data.appearance.height} </li>
        <li class="list-group-item">Peso : ${data.appearance.weight} </li>
        <li class="list-group-item">Alianzas: ${data.biography.aliases}</li>
        `);
        showImage.html("");

        showImage.append(`
        <img src="${data.image.url}" class="img-fluid" alt="">
        `);

        

        const heroStat = {
          title: {
            text: `Stats para ${data.name}`,
          },
          animationEnabled: true,
          data: [
            {
              type: "pie",
              startAngle: 40,
              toolTipContent: "<b>{label}</b>: {y}",
              showInLegend: "true",
              legendText: "{label}",
              indexLabelFontSize: 16,
              indexLabel: "{label} - {y}",
              dataPoints: [
                {
                  y: `${
                    data.powerstats.intelligence !== "null"
                      ? data.powerstats.intelligence
                      : 0
                  }`,
                  label: `Inteligencia`,
                },
                {
                  y: `${
                    data.powerstats.strength !== "null"
                      ? data.powerstats.strength
                      : 0
                  }`,
                  label: "Fuerza",
                },
                {
                  y: `${
                    data.powerstats.speed !== "null" ? data.powerstats.speed : 0
                  }`,
                  label: "Rapidéz",
                },
                {
                  y: `${
                    data.powerstats.durability !== "null"
                      ? data.powerstats.durability
                      : 0
                  }`,
                  label: "Durabilidad",
                },
                {
                  y: `${
                    data.powerstats.power !== "null" ? data.powerstats.power : 0
                  }`,
                  label: "Poder",
                },
                {
                  y: `${
                    data.powerstats.combat !== "null"
                      ? data.powerstats.combat
                      : 0
                  }`,
                  label: "Combate",
                },
              ],
            },
          ],
        };
        chartContainer.CanvasJSChart(heroStat);
      },
      error(err) {
        console.log(err);
      },
    });
  });
});
