"use strict"
var gChart

function createChart() {
    gChart = ({
        theme: 'rectangles',
        title: {
            Name: 'Favorite Food',
            posY: 50
        },
        style: {
            font: 'Arial',
            fontSize: '45px',
            backgroundColor: 'transparent',
        },
        valueType: 'percent/value',
        terms:
            [{
                label: 'Pizza',
                value: 50,
                valueP: 50,
                color: 'pink',
                position: gCanvas.width / 3
            },
            {
                label: 'Burger',
                value: 50,
                color: 'green',
                valueP: 50,
                position: (gCanvas.width / 3) * 2
            }
            ]
    })
}

function getTerms() {
    return gChart.terms
}

function getTitle() {
    return gChart.title
}