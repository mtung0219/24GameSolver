
function test() {
    printTest();
    //timer = setInterval(printTest, 500)
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
const t = document.getElementById("testid");
function glitch() {
    console.log("glitching");
    let t_text = t.innerHTML;

    let i = Math.round(Math.random() * (t_text.length-1));
    console.log(i);
    let correct_text = t_text[i];

    let new_char = " ";
    if (isLetter(t_text[i])) {
        if (t_text[i] == t_text[i].toUpperCase()) {
            new_char = t_text[i].toLowerCase();
        } else {
            new_char = t_text[i].toUpperCase();
        }
        
    } else {
        return;
    }
    let new_str = setCharAt(t_text,i, new_char);
    t.innerHTML = new_str;

    setTimeout(function(){changeText(i, correct_text, new_char, false)}, 100);
}

function changeText(index, character, wrong_char, change_back) {
    let t_text1 = t.innerHTML;
    let old_str = setCharAt(t_text1, index, character);
    t.innerHTML = old_str;

    if (Math.round(Math.random()*10) > 3 || change_back) {
        change_back = !change_back;
        setTimeout(function(){changeText(index, wrong_char, character, change_back)}, 50);
    }
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function isLetter(char) {
    return char.length == 1 && char.match(/[a-z]/i);
}
function isLetter(char) {
    return char.length == 1 && char.match(/[a-z]/i);
}

function printTest() {
    //let a = document.getElementById("pantone3").getBoundingClientRect().top;

    let scrollDiv = document.getElementById("pantone3").offsetTop;

    window.scrollTo( {top: scrollDiv, behavior: 'smooth'});
}



/*$(window).scroll($.debounce(50, true, function() {
    console.log("SCROLLING");
}));

$(window).scroll($.debounce(50, function() {
    let arr = [];

    $('.img-fluid').each(function(i, obj) {
        arr.push(obj.offsetTop)
    })

    console.log(arr);
    console.log(document.documentElement.scrollTop);
    let cur_position = document.documentElement.scrollTop;
    let index;
    let max_index = 0;
    let max = 99999;

    for (index = 0; index < arr.length; index++) {
        let diff = Math.abs(arr[index] + 110 - cur_position);
        if (diff < max) {
            max = diff;
            max_index = index;
        }
    }

    if (max_index != 0 && max_index != arr.length - 1) {
        window.scrollTo( {top: arr[max_index] + 110, behavior: 'smooth'});
    }
    

}));*/


//test();

const nouns = ["an artist","an anarchist","G A Y", "an agent of RUGAL", "a simulation theorist","a streamer","a youtuber","a thinker","a gambler", "a gentleman thief"];
const rotating_noun =document.getElementById("rotating-noun");
let noun_index = 0;
let noun_autoscroll = true;

function start_noun_autoscroll() {
    noun_interval = setInterval(function() {
    if (!autoscroll) {
        clearInterval(noun_interval);
        return;
    }
    rotating_noun.innerHTML = nouns[noun_index];
    if (noun_index == nouns.length - 1) {
        noun_index = 0;
    } else {
        noun_index++;
    }
    }, 700);
}
start_noun_autoscroll();

let slideIndex = 0;
let temp_len = 6;
let autoscroll = true;
const parent = document.getElementById("c-inner");
//showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += 1);
}

function showSlides(n) {
    let i;
    if (n > 0) {
        parent.insertBefore(document.querySelector(".c-item"), null);
    }
    
    if (n<0) {
        console.log(Array.from(document.querySelectorAll('.c-item')).pop());
        console.log(document.querySelector(".c-item"));
        parent.insertBefore(
            Array.from(document.querySelectorAll('.c-item')).pop(), document.querySelector(".c-item"));
    }

    const slides = document.getElementsByClassName("c-item");
    console.log(slides);
    if (n >= slides.length) {
        slideIndex = 0;
    }

    //if (n<1) {slideIndex = slides.length;}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display="none";
    }

    let second;
    let third;
    
    if (slideIndex + 1 == slides.length) {
        second = 0;
    } else {second = slideIndex + 1;}
    if (second + 1 == slides.length) {
        third = 0;
    } else {third = second + 1;}

    console.log(slideIndex);
    console.log(second);
    console.log(third);

    slides[0].style.display="block";
    slides[1].style.display="block";
    slides[2].style.display="block";
}

document.getElementById("c-inner").addEventListener("click", animate_test);

function animate_test() {

    console.log("starting");
    $(".c-1").animate( {
    opacity:0.25,
    left: $(".c-item").width()
    }, 5000, function() {
        console.log("animation done");
    });
}

const long_portion = document.getElementById("c-slide");
console.log("starting " + long_portion.offsetWidth);
console.log(long_portion.style.right);
let counter = 0;

document.getElementById("next").addEventListener("click", function() {next_action(true, "user")});
document.getElementById("prev").addEventListener("click", function() {next_action(false, "user")});

let auto_interval;
function start_autoscroll() {
    auto_interval = setInterval(function() {
    if (!autoscroll) {
        console.log("autoscroll stopped");
        clearInterval(auto_interval);
        return;
    }
    console.log("going one");
    next_action(true,"auto");
    }, 3000);
}
start_autoscroll();


function next_action(direction, from) {
    if (from == "user"){
        autoscroll = false;
        clearInterval(auto_interval);
    }
    let w = long_portion.offsetWidth / 15;
    if (direction) {
        document.getElementById("next").style.pointerEvents = "none";
        command = "+=" + w;
        counter += 1;
    } else {
        document.getElementById("prev").style.pointerEvents = "none";
        command = "-=" + w;
        counter -= 1;
    }
    $('#c-slide').animate( {
    right: command,
    }, 1000, test_next);
    //console.log(long_portion.offsetWidth);
    //console.log(long_portion.style.right);

    function test_next() {
        document.getElementById("next").style.pointerEvents = "auto";
        document.getElementById("prev").style.pointerEvents = "auto";
        if (Math.abs(counter) >= 6) {
            console.log("should reset");
            counter = 0;
            //$('#c-slide').removeAttr('style');
            long_portion.style.right=null;
        }
    }

}

$(window).blur(function() {
    autoscroll = false;
    noun_autoscroll = false;
    clearInterval(auto_interval);
    clearInterval(noun_interval);
});

$(window).focus(function() {
    if (!autoscroll) {
        autoscroll = true;
        console.log("restarting autoscroll..");
        start_autoscroll();
    }
    if (!noun_autoscroll) {
        noun_autoscroll = true;
        start_noun_autoscroll();
    }
    
})

window.addEventListener('resize', function(event) {
    long_portion.style.right = null;
    counter = 0;
    console.log("resized!");
    if ($(window).width() < 768) {
        long_portion.style.width="1500%";
        long_portion.style.right="600%";
        //console.log("xs");
    } else if ($(window).width() >= 768 && $(window).width() < 992) {
        long_portion.style.width="500%";
        long_portion.style.right="200%";
        //console.log("sm");
    } else if ($(window).width() >= 992 && $(window).width() < 1200) {
        long_portion.style.width="500%";
        long_portion.style.right="200%";
        //console.log("md");
    } else {
        long_portion.style.width="500%";
        long_portion.style.right="200%";
        //console.log("lg");
    }
})


