(function (document, window) {

    const layout = {
        autosize: true,
        xaxis: {
            title: 'f(x)'
        },
        yaxis: {
            title: 'x'
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        // Para que aparezca el gráfico por default.
        Plotly.newPlot('plot', [[{ x: 0, y: 0 }]]);

        var btnCalcular = document.getElementById("calcular");

        // Click en "Calcular" 
        btnCalcular.onclick = function () {
            //Montecarlo
        };
    });

})(document, window);