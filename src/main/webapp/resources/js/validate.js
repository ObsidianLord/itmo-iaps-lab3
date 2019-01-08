function validate() {
    let str, check = true;

    document.getElementById('form:yText').onkeydown = function () {
        if (check) str = document.getElementById('form:yText').value;
        check = false;
    };

    document.getElementById('form:yText').onkeyup = function () {
        if ((!/^-?\d*[.,]?\d{0,3}$/.test(document.getElementById('form:yText').value))||
            ((parseFloat(document.getElementById('form:yText').value.replace(/,/,'.'))<-3)||
                (parseFloat(document.getElementById('form:yText').value.replace(/,/,'.'))>3))) {
            document.getElementById('form:yText').value = str;
        }
        check = true;
    };

    document.getElementById('form:rText').onkeydown = function () {
        if (check) str = document.getElementById('form:rText').value;
        check = false;
    };

    document.getElementById('form:rText').onkeyup = function () {
        if ((!/^-?\d*[.,]?\d{0,3}$/.test(document.getElementById('form:rText').value))||
            ((parseFloat(document.getElementById('form:rText').value.replace(/,/,'.'))<2)||
                (parseFloat(document.getElementById('form:rText').value.replace(/,/,'.'))>5))) {
            document.getElementById('form:rText').value = str;
        } else {
            radius = this.value.replace(/,/,'.') * scale;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw();
            drawRect()
            historyDots();
            lastDot();
        }
        check = true;
    };

    draw();
    drawRect()
    historyDots();
    lastDot();
}

function resetOther(obj) {
    const cbs = document.getElementsByClassName("cb");
    for (let i = 0; i < cbs.length; i++) {
        cbs[i].checked = false;
    }
    obj.checked = true;
    switch (obj.id) {
        case "form:xCheck-5":
            document.getElementById("form:hiddenX").value = -5;
            break;
        case "form:xCheck-4":
            document.getElementById("form:hiddenX").value = -4;
            break;
        case "form:xCheck-3":
            document.getElementById("form:hiddenX").value = -3;
            break;
        case "form:xCheck-2":
            document.getElementById("form:hiddenX").value = -2;
            break;
        case "form:xCheck-1":
            document.getElementById("form:hiddenX").value = -1;
            break;
        case "form:xCheck0":
            document.getElementById("form:hiddenX").value = 0;
            break;
        case "form:xCheck1":
            document.getElementById("form:hiddenX").value = 1;
    }
}

validate();