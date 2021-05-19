

console.log("asdf");
//const canvas = document.getElementById('canv1');
//const ctx = canvas.getContext("2d");
const textfield = document.getElementById('crawl');
const ocean = document.getElementById('ocean');
let w = document.body.offsetWidth;

/*canvas.width = document.body.offsetWidth;
canvas.height = window.innerHeight;

console.log("set width to " + canvas.width);
console.log("set height to " + canvas.height);

//ctx.fillStyle = 'black';
//ctx.fillRect(0, 0, canvas.width, canvas.height);

let w = canvas.width
let h = canvas.height
const cols= Math.floor(w/20) + 1;
const y_pos = Array(cols).fill(800);

function matrix() {
    console.log("asdf");
    console.log(document.body.scrollTop);
    ctx.fillStyle="#0001";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle='#0f0';

    y_pos.forEach( (y, ind) => {
        console.log("asdf");
        let text = Math.round(Math.random());
        text.style.fontSize= text.style.fontSize + 1
        let x = ind * 20;

        ctx.fillText(text, x, y);

        //if (y > 100 + Math.random() * 6000) y_pos[ind] = 0;

        y_pos[ind] = y - 20;
    })
}*/

function asdf() {
    console.log(textfield);

    textfield.innerHTML= generateRandomDigits();
}

function generateRandomDigits() {
    let output = "";
    for (let i = 0; i < 200; i++) {
        output = output + " " + Math.round(Math.random());
    }
    return output;
}

function test() {
    timer = setInterval(matrix, 50)
}
//setInterval(matrix, 50);
// start disintegrating: 1110
// stop disintegrating: 8500

function disintegrate() {
    let elem = document.getElementById('teststicky')
    let pos = document.documentElement.scrollTop;
    if (pos < 2010) {
        elem.style.opacity = 1;
    } else {
        elem.style.opacity = (4000-pos)/4000;
    }
}


//test();
asdf();