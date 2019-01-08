var radius = 250;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const scale = 50;

function draw() {

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.arc(width / 2, height / 2, radius / 2, 90 * Math.PI / 180, 180 * Math.PI / 180, false);
    ctx.fillStyle = '#FFA520';
    ctx.fill();

    ctx.moveTo(width / 2, height / 2 + radius / 2);
    ctx.lineTo(width / 2 - radius / 2, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2 - radius / 2);
    ctx.lineTo(width / 2 + radius / 2, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2 - radius / 2);
    ctx.lineTo(width / 2 - radius, height / 2 - radius / 2);
    ctx.lineTo(width / 2 - radius, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();

    ctx.strokeStyle = '#000';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    ctx.fillStyle = '#FFF';
}

let selectedDot = null;
let isIncorrect = false;

function getMP(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function lastDot() {
    if (selectedDot != null) {
        if ((selectedDot.getX() - width / 2)/scale >= -3 && (selectedDot.getX() - width / 2)/scale <= 3
            && (-selectedDot.getY() + height / 2)/scale >= -3 && (-selectedDot.getY() + height / 2)/scale <= 3) {
            ctx.beginPath();
            ctx.arc(selectedDot.getX(), selectedDot.getY(), 3, 0, Math.PI * 2);
            ctx.fillStyle = '#FFF';
            ctx.fill();
        }
    }
}

function drawRect() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(width / 2 - scale * 5, height / 2 - scale * 3, 6*scale, 6*scale);
    ctx.fill();
}

canvas.addEventListener('click', function (event) {
    const MP = getMP(canvas, event);
    selectedDot = null;
    if ((MP.x - width / 2)/scale >= -5 && (MP.x - width / 2)/scale <= 1 && (-MP.y + height / 2)/scale >= -3 && (-MP.y + height / 2)/scale <= 3) {
        draw();
        drawRect()
        historyDots();
        ctx.beginPath();
        ctx.arc(MP.x, MP.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF';
        ctx.fill();
        isIncorrect = false;
        document.getElementById('form:hiddenX').value = ((MP.x - width / 2) / scale).toFixed(2);
        document.getElementById('form:yText').value = ((-MP.y + height / 2) / scale).toFixed(2);
        selectedDot = new class {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
            getX() {return this.x;}
            getY() {return this.y;}
        } (MP.x, MP.y);
        const cbs = document.getElementsByClassName("cb");
        for (let i = 0; i < cbs.length; i++) {
            cbs[i].checked = false;
        }
        document.getElementById('form:sendButton').click();
    } else {
        draw();
        drawRect()
        historyDots();
        isIncorrect = true;
        ctx.font = "20px Helvetica";
        ctx.fillStyle= '#F00';
        ctx.fillText("-5 <= x <= 1", 10, 20);
        ctx.fillText("-3 <= y <= 3", 10, 40);
    }
    ctx.fillStyle= '#FFF';
    ctx.font = "12px Helvetica";
    ctx.fillText("(" + ((MP.x - width / 2) / scale).toFixed(2).toString()+"; "+((-MP.y + height / 2) / scale).toFixed(2).toString()+")", 10, 595);
});

canvas.addEventListener('mousemove', function (event) {
    const MP = getMP(canvas, event);
    draw();
    drawRect()
    historyDots();
    lastDot();
    ctx.beginPath();
    ctx.fillStyle= '#FFF';
    ctx.font = "12px Helvetica";
    ctx.fillText("(" + ((MP.x - width / 2) / scale).toFixed(2).toString()+"; "+((-MP.y + height / 2) / scale).toFixed(2).toString()+")", 10, 595);
    if (isIncorrect) {
        ctx.font = "20px Helvetica";
        ctx.fillStyle= '#F00';
            ctx.fillText("-5 <= x <= 1", 10, 20);
        ctx.fillText("-3 <= y <= 3", 10, 40);
    }
});


function historyDots() {
    const x = document.querySelectorAll('td.x');
    const y = document.querySelectorAll('td.y');
    const c = document.querySelectorAll('td.c');
    for (let i = 0; i < x.length; i++) {
        ctx.beginPath();
        let valueOfX = parseFloat(x[i].innerText);
        let valueOfY = parseFloat(y[i].innerText);
        let isCorrect = c[i].innerText.toString();
        ctx.arc(valueOfX * scale + width / 2, height / 2 - valueOfY * scale, 3, 0, Math.PI * 2);
        isCorrect.startsWith("Попадание") ? ctx.fillStyle = '#0F0' : ctx.fillStyle = '#F00';
        ctx.fill();
    }
}

draw();
drawRect()
historyDots();
lastDot();