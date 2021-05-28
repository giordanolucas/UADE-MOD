(function (document, window) {

    const layout = {
        autosize: true,
        xaxis: {
            title: 'x'
        },
        yaxis: {
            title: 'f(x)'
        }
    };

    document.addEventListener("DOMContentLoaded", function () {

        // Para que aparezca el gráfico por default.
        Plotly.newPlot('plot', [{x:[0], y:[0], type: 'scatter'}], layout);

        var btnCalcular = document.getElementById("calcular");

        // Click en "Calcular" 
        btnCalcular.onclick = function () {
            //Montecarlo
        };
    });

})(document, window);