(function (document, window) {

    const layout = {
        autosize: true,
        xaxis: {
            title: 't'
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
            var funcion = math.parse(document.getElementById("formula").value);
            var t0 = parseFloat(document.getElementById("t0").value);
            var tf = parseFloat(document.getElementById("tf").value);
            var x0 = parseFloat(document.getElementById("x0").value);
            var N = parseFloat(document.getElementById("N").value);
            var h = (tf - t0) / N;

            //Warming Up: Para resultados de tiempo consistentes.
            funcion.evaluate({ t: 0, x: 0 });

            var eulerData = eulerWithTiming(funcion, x0, t0, tf, h);
            var eulerMejoradoData = eulerMejoradoWithTiming(funcion, x0, t0, tf, h);
            var rungeKuttaData = rungeKuttaWithTiming(funcion, x0, t0, tf, h);

            Plotly.newPlot('plot', [eulerData, eulerMejoradoData, rungeKuttaData], layout);
        };
    });

    function eulerWithTiming(funcion, x0, t0, tf, h) {
        var doEuler = document.getElementById("eulerCheck").checked;

        var data = {};
        var time = null;

        if (doEuler) {
            var start = performance.now();
            data = euler(funcion, x0, t0, tf, h);
            var end = performance.now();
            time = "Tiempo: " + (end - start).toFixed(3) + " ms";
        }

        document.getElementById("eulerTiming").textContent = time;

        return data;
    }

    function eulerMejoradoWithTiming(funcion, x0, t0, tf, h) {
        var doEulerMejorado = document.getElementById("eulerMejoradoCheck").checked;

        var data = {};
        var time = null;

        if (doEulerMejorado) {
            var start = performance.now();
            data = eulerMejorado(funcion, x0, t0, tf, h);
            var end = performance.now();
            time = "Tiempo: " + (end - start).toFixed(3) + " ms";
        }

        document.getElementById("eulerMejoradoTiming").textContent = time;

        return data;
    }

    function rungeKuttaWithTiming(funcion, x0, t0, tf, h) {
        var doRungeKutta = document.getElementById("rungeCheck").checked;

        var data = {};
        var time = null;

        if (doRungeKutta) {
            var start = performance.now();
            data = rungeKutta(funcion, x0, t0, tf, h);
            var end = performance.now();
            time = "Tiempo: " + (end - start).toFixed(3) + " ms";
        }

        document.getElementById("rungeTiming").textContent = time;

        return data;
    }

    // Euler
    function euler(funcion, xinicial, tinicial, tfinal, h) {
        var data = { name: 'Euler', x: [], y: [], type: 'scatter' };

        var x = xinicial;
        var t = tinicial;

        data.x.push(t);
        data.y.push(x);

        while (t + h <= tfinal) {
            x = x + h * parseFloat(funcion.evaluate({ t: t, x: x }).toString());
            t = t + h;

            data.x.push(t);
            data.y.push(x);
        }

        return data;
    }

    // Mejorado
    function eulerMejorado(funcion, xinicial, tinicial, tfinal, h) {
        var data = { name: 'Euler Mejorado', x: [], y: [], type: 'scatter' };

        var x = xinicial;
        var t = tinicial;


        data.x.push(t);
        data.y.push(x);

        var predictor;
        while (t + h <= tfinal) {
            xfn = funcion.evaluate({ t: t, x: x });
            xpredictor = x + h * xfn;

            t = t + h;
            x = x + h / 2 * (xfn + funcion.evaluate({ t: t, x: xpredictor }));

            data.x.push(t);
            data.y.push(x);
        }

        return data;
    }

    // Runge Kutta
    function rungeKutta(funcion, xinicial, tinicial, tfinal, h) {
        var data = { name: 'Runge Kutta', x: [], y: [], type: 'scatter' };

        var x = xinicial;
        var t = tinicial;

        data.x.push(t);
        data.y.push(x);

        while (t + h <= tfinal) {
            m1 = parseFloat(funcion.evaluate({ x: x, t: t }).toString());
            m2 = parseFloat(funcion.evaluate({ x: x + m1 * h / 2, t: t + h / 2 }).toString());
            m3 = parseFloat(funcion.evaluate({ x: x + m2 * h / 2, t: t + h / 2 }).toString());
            m4 = parseFloat(funcion.evaluate({ x: x + m3 * h, t: t + h }).toString());
            m = ((m1 + 2 * m2 + 2 * m3 + m4) / 6);

            x = x + m * h;
            t = t + h;

            data.x.push(t);
            data.y.push(x);
        }

        return data;
    }

})(document, window);