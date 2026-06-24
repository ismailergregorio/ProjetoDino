export function linhaDotempo(infoDinoS) {

    const registros = infoDinoS?.dadosOcorrenciasPBDB?.records ?? [];

    if (registros.length === 0) {
        console.warn("Nenhuma ocorrência encontrada.");
        return;
    }

    // Descobre todo o intervalo do dinossauro
    const inicio = Math.max(...registros.map(r => Number(r.eag)));
    const fim = Math.min(...registros.map(r => Number(r.lag)));

    const nome =
        registros[0].tna ||
        registros[0].idn ||
        "Dinossauro";

    const intervalo =
        registros[0].oei || "";

    // Descobre o período automaticamente
    function descobrirPeriodo(ma) {

        if (ma >= 201) {

            return {
                nome: "Triássico",
                cor: "#7C3AED"
            };

        }

        if (ma >= 145) {

            return {
                nome: "Jurássico",
                cor: "#0F766E"
            };

        }

        return {

            nome: "Cretáceo",
            cor: "#2563EB"

        };

    }

    const periodo = descobrirPeriodo(inicio);

    Highcharts.chart("linhaDoTempo", {

        chart: {

            type: "xrange",

            backgroundColor: "transparent"

        },

        title: {

            text: "ERA MESOZOICA",

            style: {

                color: "#FFFFFF",

                fontWeight: "bold"

            }

        },

        xAxis: {

            reversed: true,

            min: 66,

            max: 252,

            tickInterval: 20,

            gridLineColor: "#203445",

            lineColor: "#203445",

            labels: {

                style: {

                    color: "#A9B4BF"

                },

                formatter() {

                    return this.value + " Ma";

                }

            }

        },

        yAxis: {

            title: {
                text: ""
            },

            categories: [

                nome,

                "Cretáceo",

                "Jurássico",

                "Triássico"

            ],

            reversed: true,

            gridLineWidth: 0,

            labels: {

                style: {

                    color: "#FFFFFF",

                    fontWeight: "600"

                }

            }

        },

        tooltip: {

            backgroundColor: "#101D29",

            borderColor: "#69b51c",

            style: {

                color: "#FFFFFF"

            },

            formatter() {

                if (this.point.custom?.tipo === "periodo") {

                    return `<b>${this.point.custom.nome}</b>`;

                }

                return `
                    <b>${nome}</b><br>
                    <b>Intervalo:</b> ${intervalo}<br>
                    <b>Período:</b> ${periodo.nome}<br>
                    <b>Início:</b> ${inicio} Ma<br>
                    <b>Fim:</b> ${fim} Ma<br>
                    <b>Duração:</b> ${(inicio - fim).toFixed(1)} milhões de anos
                `;

            }

        },

        plotOptions: {

            xrange: {

                borderRadius: 8,

                pointWidth: 24

            }

        },

        series: [{

            data: [

                // Dinossauro

                {

                    x: fim,

                    x2: inicio,

                    y: 0,

                    color: "#69b51c",

                    custom: {

                        tipo: "dino"

                    }

                },

                // Cretáceo

                {

                    x: 66,

                    x2: 145,

                    y: 1,

                    color: "#2563EB",

                    custom: {

                        tipo: "periodo",

                        nome: "Cretáceo"

                    }

                },

                // Jurássico

                {

                    x: 145,

                    x2: 201,

                    y: 2,

                    color: "#0F766E",

                    custom: {

                        tipo: "periodo",

                        nome: "Jurássico"

                    }

                },

                // Triássico

                {

                    x: 201,

                    x2: 252,

                    y: 3,

                    color: "#7C3AED",

                    custom: {

                        tipo: "periodo",

                        nome: "Triássico"

                    }

                }

            ],

            dataLabels: {

                enabled: true,

                formatter() {

                    if (this.point.custom?.tipo === "periodo") {

                        return this.point.custom.nome;

                    }

                    return nome;

                },

                style: {

                    color: "#FFFFFF",

                    textOutline: "none",

                    fontWeight: "600"

                }

            }

        }],

        legend: {

            enabled: false

        },

        credits: {

            enabled: false

        }

    });

}