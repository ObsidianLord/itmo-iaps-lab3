const clock = document.getElementById('clock');

window.onkeydown = function (e) {
    const code = e.key;
    if (code === 'Enter') {
        document.getElementById('link').click();
    }
};

function update(){
    clock.innerText = new Date().toLocaleString();
    setTimeout(update, 11000);
}

update();