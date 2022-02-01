$(() => {
  const formulario = $("#formulario");
  const searchUser = $("#searchUser");
  const showMe = $("#showMe");
  const showMeItem = $("#showMeItem");
  const showImage = $("#showImage");
  const chartContainer = $("#chartContainer")

  //grafico .

  formulario.on("submit", (e) => {
    e.preventDefault();
    // console.log("diste click");
    // console.log(searchUser.val());

    //validacion

    //API
    $.ajax({
      type: "GET",
      url: `https://www.superheroapi.com/api.php/3525635500807579/${searchUser.val()}`,
      dataType: "JSON",
      success(data) {
        console.log(data.image.url);
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

        //data points

        const heroStat = {
            title: {
                text: `Stats para ${data.name}`
            },
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 40,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}",
                dataPoints: [
                    { y: `${data.powerstats.intelligence}`, label: `Inteligencia` },
                    { y: `${data.powerstats.strength}`, label: "Fuerza" },
                    { y: `${data.powerstats.speed}`, label: "Rapidéz" },
                    { y: `${data.powerstats.durability}`, label: "Durabilidad" },
                    { y: `${data.powerstats.power}`, label: "Poder" },
                    { y: `${data.powerstats.combat}`, label: "Combate" },
                ]
            }]
        };
        chartContainer.CanvasJSChart(heroStat);
      },
      error(err) {
        console.log(err);
      },
    });
  });
});
