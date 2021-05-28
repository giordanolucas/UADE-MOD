(function (document, window) {
    document.addEventListener("DOMContentLoaded", function () {


        Plotly.newPlot('plot', [[{ x: 0, y: 0 }]]);


        var calcular = document.getElementById("calcular");

        // Inicialización del Calculo 
        calcular.onclick = function () {
            var funcionStr = document.getElementById("formula").value;
            var funcion = math.parse(funcionStr);
            var t0 = parseFloat(document.getElementById("t0").value);
            var tf = parseFloat(document.getElementById("tf").value);
            var x0 = parseFloat(document.getElementById("x0").value);
            var N = parseFloat(document.getElementById("N").value);
            var h = (tf - t0) / N;

            var plotData = [
                euler(funcion, x0, t0, tf, h),
                eulerMejorado(funcion, x0, t0, tf, h),
                rungeKutta(funcion, x0, t0, tf, h)
            ];

            console.log(plotData);

            Plotly.newPlot('plot', plotData);

        };
    });

    // Función de Euler
    function euler(funcion, xinicial, tinicial, tfinal, h) {
        var data = { name: 'Euler', x: [], y: [], type: 'scatter' };

        var x = xinicial;
        var t = tinicial;

        data.x.push(t);
        data.y.push(x);

        while (t + h <= tfinal) {
            x = x + h * parseFloat(funcion.evaluate({ t: t, x: x}).toString());
            t = t + h;

            data.x.push(t);
            data.y.push(x);
        }

        return data;
    }

    // Función de Euler Mejorado
    function eulerMejorado(funcion, xinicial, tinicial, tfinal, h) {
        var data = { name: 'Euler Mejorado', x: [], y: [], type: 'scatter' };

        var x = xinicial;
        var t = tinicial;

    
        data.x.push(t);
        data.y.push(x);

        var predictor;
        while (t + h <= tfinal) {
            xpredictor = x + h * funcion.evaluate({t:t, x:x});
            tpredictor = t + h;

            x = x + h/2 * ( funcion.evaluate({t:t, x:x}) + funcion.evaluate({t:tpredictor, x:xpredictor}));

            t = tpredictor;
            
            data.x.push(t);
            data.y.push(x);
        }

        return data;
    }

    // Función de Runge Kutta
    function rungeKutta(funcion, xinicial, tinicial, tfinal, h) {
        var data = { name: 'Runge Kutta', x: [], y: [], type: 'scatter' };

        var x = xinicial;
        var t = tinicial;

        data.x.push(t);
        data.y.push(x);

        while (t + h <= tfinal) {
            m1 = parseFloat(funcion.evaluate({x: x, t:t}).toString()); //evaluar(y, x, funcion);
            m2 = parseFloat(funcion.evaluate({x: x + m1 * h/2, t:t + h/2}).toString());
            m3 = parseFloat(funcion.evaluate({x: x + m2 * h/2, t:t + h/2}).toString());
            m4 = parseFloat(funcion.evaluate({x: x + m3 * h, t:t + h}).toString());
            m = ((m1 + 2 * m2 + 2 * m3 + m4) / 6);

            x = x + m * h;
            t = t + h;

            data.x.push(t);
            data.y.push(x);
        }

        return data;
    }

})(document, window);
