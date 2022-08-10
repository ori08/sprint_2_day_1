"use strict"

var gCanvas = document.getElementById('canvas')
var gCtx = gCanvas.getContext('2d')
var canvas_width = 426
var canvas_height = 320
var graph_style = 'arc'


function init() {
    createChart()
    renderChart()
    renderEditor()
}

function renderChart() {
    var terms = getTerms()
    var title = getTitle()
    setPostion()
    gCtx.clearRect(0, 0, canvas_width, canvas_height)

    drawText(title.Name, canvas_height, title.posY, 'blue')



    terms.forEach(chart => {
        if (graph_style === 'arc') drawArcPlusLine(chart)
        else drawRectingle(chart)
        var text = `${chart.valueP}%`
        var posY = 270
        drawText(text, chart.position, posY, chart.color)
        drawText(chart.label, chart.position, posY = 280, chart.color)
    })
}


function drawRectingle(chart) {
    chart.position = (canvas_width / 100) * chart.valueP
    gCtx.beginPath();
    gCtx.rect(0, 0, chart.position, canvas_height)
    gCtx.stroke();

}


function caculateStatistcs() {
    var gSum = []
    var terms = getTerms()
    var sum = 0
    terms.forEach(term => {
        sum += parseInt(term.value)
        gSum.push(parseInt(term.value))
    })
    terms.forEach(term => {
        term.valueP = parseInt((term.value / sum) * 100)
    })
}

function drawArcPlusLine(chart) {
    gCtx.beginPath();
    gCtx.arc(chart.position, 150, chart.valueP, 0, 2 * Math.PI);
    gCtx.draw
    gCtx.stroke();
    gCtx.fillStyle = chart.color;
    gCtx.fill();
    gCtx.beginPath();
    gCtx.moveTo(chart.position, 150);
    gCtx.lineTo(chart.position, 260);
    gCtx.lineWidth = 3
    gCtx.strokeStyle = chart.color
    gCtx.stroke();

}

function onChangeValue(ev, idx) {
    var terms = getTerms()
    if (isNaN(ev.value) || (parseInt(ev.value) > 100)) return
    terms[idx].value = ev.value
    caculateStatistcs()

    renderChart()
}

function onChangeTerm(ev, idx) {
    var terms = getTerms()
    terms[idx].label = ev.value
    var text = terms[idx].label
    var posX = terms[idx].position
    var posY = 270
    drawText(text, posX, posY)
    renderChart()
}

function onAddTitle(ev) {

    var text = ev.value
    console.log(text);
    var title = getTitle()
    console.log(title);
    title.Name = text
    renderChart()
}

function addTerm() {
    var terms = getTerms()
    if (terms.length >= 4) return
    terms.push({
        label: '',
        value: 50,
        valueP: 50,
        color: 'blue',
        position: (gCanvas.width / 3) * 2.5
    })
    renderChart()
    renderEditor()
}

function setPostion() {
    var terms = getTerms()
    var chart_length = terms.length
    var idx = 1
    terms.forEach(chart => {
        chart.position = (gCanvas.width / (chart_length + 1)) * idx
        idx++
    })
}

function drawText(text, posX, posY, fontsize = 15, color) {
    gCtx.lineWidth = 0.5
    gCtx.font = `${fontsize}px Arial`
    gCtx.fillStyle = color
    gCtx.strokeStyle = color
    var messureTxt = gCtx.measureText(text).width
    posX -= messureTxt / 2
    gCtx.fillText(text, posX, posY)
    gCtx.strokeText(text, posX, posY)
}


function setColor(color, idx) {
    var terms = getTerms()
    terms[idx].color = color
    renderChart()
}

function renderEditor() {
    var terms = getTerms()

    var strHtml = ""
    var elTerms = document.querySelector('.terms')
    var chartIdx = 0
    terms.forEach(chart => {
        if (chart.isColorBtnPressed) {
            strHtml += `  
            <div class="term">
            <div class="colors-modal term-input">
                <button class="btn red" onclick="setColor('red',${chartIdx})"></button>
                <button class="btn blue" onclick="setColor('blue',${chartIdx})"></button>
                <button class="btn green" onclick="setColor('green',${chartIdx})"></button>
                <button class="btn-close" onclick="closeModal(${chartIdx})">x</button>
            </div>
        </div>`
        }

        else {

            var stringNum = ''
            switch (chartIdx) {
                case 0: stringNum = 'ONE'
                    break
                case 1: stringNum = "TWO"
                    break
                case 2: stringNum = 'THREE'
                    break
                case 3: stringNum = "FOUR"
                    break
            }

            strHtml += `       
        <div class="term">
         <h2>TERM ${stringNum}</h2>
          <div class="term-input">
          <button onclick="openModal(${chartIdx})">color</button>
        <input type="text" onkeyup=" onChangeTerm(this,${chartIdx})" data-trans="Search" placeholder="Name">
        <input type="text" onkeyup=" onChangeValue(this,${chartIdx})" data-trans="Search" placeholder="Value">
 `
            if (terms.length > 2)
                strHtml += `<button class="btn-close" onclick="removeTerm(${chartIdx})">x</button>`
            strHtml += `</div></div>`

            chartIdx++
        }
    })

    strHtml += `<button onclick="addTerm()">+ ADD TERM</button>`
    elTerms.innerHTML = strHtml
}

function openModal(idx) {
    var terms = getTerms()
    terms[idx].isColorBtnPressed = true
    renderEditor()
}

function closeModal(idx) {
    var terms = getTerms()
    terms[idx].isColorBtnPressed = false
    renderEditor()
}


function removeTerm(idx) {
    var terms = getTerms()
    terms.splice(idx, 1)
    renderChart()
    renderEditor()

}

function openEditor(style) {
    graph_style = style
    var elMain = document.querySelector('.main-container').style.display = "none"
    var elEditor = document.querySelector('.main-container-editor').style.display = "flex"
    renderChart()
}

function closeEditor() {
    var elMain = document.querySelector('.main-container').style.display = "flex"
    var elEditor = document.querySelector('.main-container-editor').style.display = "none"
}