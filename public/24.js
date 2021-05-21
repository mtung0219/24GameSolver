const bodyParser = require('body-parser');
const itertools = require('itertools');

//import {permutations} from '../node_modules/itertools/itertools.js';

const sub_button = document.getElementById("24submit");

const cards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// corresponds to cards [2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A]

let add = function(a, b) {
    return a+b;
}
let sub = function(a, b) {
    return a-b;
}
let mul = function(a, b) {
    return a*b;
}
let div = function(a, b) {
    return a/b;
}


const operators = [add, sub, mul, div];
const symbols = ["+", "-", "*", "/"];
const mapping = {"+": add, "-": sub, "*": mul, "/": div};
const mapping1 = {add: "+", sub: "-", mul: "*", div: "/"};
const result_ul = document.getElementById("result_ul");
const less_than_four_msg = document.getElementById("less-than-four-cards-msg");
const target_num_el = document.getElementById("target_num");
const solution_row = document.getElementById("solution_row");
const reset = document.getElementById("reset-button");
let target_num = 24;

reset.addEventListener('click', function() {
    clearHand();
});

document.getElementById("click2").addEventListener('click', function() {
    updateCards(0);
});
document.getElementById("click3").addEventListener('click', function() {
    updateCards(1);
});
document.getElementById("click4").addEventListener('click', function() {
    updateCards(2);
});
document.getElementById("click5").addEventListener('click', function() {
    updateCards(3);
});
document.getElementById("click6").addEventListener('click', function() {
    updateCards(4);
});
document.getElementById("click7").addEventListener('click', function() {
    updateCards(5);
});
document.getElementById("click8").addEventListener('click', function() {
    updateCards(6);
});
document.getElementById("click9").addEventListener('click', function() {
    updateCards(7);
});
document.getElementById("click10").addEventListener('click', function() {
    updateCards(8);
});
document.getElementById("clickjack").addEventListener('click', function() {
    updateCards(9);
});
document.getElementById("clickqueen").addEventListener('click', function() {
    updateCards(10);
});
document.getElementById("clickking").addEventListener('click', function() {
    updateCards(11);
});
document.getElementById("clickace").addEventListener('click', function() {
    updateCards(12);
});


function updateCards(index) {

    if (solution_row.childElementCount >= 4) {
        return;
    }

    let card = document.createElement('div');
    card.className = 'col-3 col-md-3 col-lg-2';
    card.alt = `${index + 2}`

    let card_img = document.createElement('img');
    card_img.className = "img-fluid mx-0 my-0 cursor";
    card_img.alt = `${index + 2}`;
    card_img.src = `../imgs/${index + 2}_of_hearts.svg`;

    cards[index]++;

    card.appendChild(card_img);
    solution_row.appendChild(card);

    card.addEventListener('click', function() {
        let index_remove = parseInt(this.alt) - 2;
        cards[index_remove]--;
        this.remove();

        while (result_ul.firstChild) {
            result_ul.removeChild(result_ul.lastChild);
        }
        less_than_four_msg.innerHTML = "Choose 4 cards above.";
    });

    if (solution_row.childElementCount == 4) {

        less_than_four_msg.innerHTML = "Solutions:";
        let four_cards = [];
        for (let i = 0; i < cards.length; i++) {
            let temp_num = cards[i];
            while (temp_num > 0) {
                if (i == cards.length - 1) { // ace
                    four_cards.push(1);
                } else { four_cards.push(i+2); }
                temp_num --;

            }
        }
        calculate(four_cards);
    }
    
}

const urlParams = new URLSearchParams(window.location.search);
const card1 = urlParams.get('n1');
const card2 = urlParams.get('n2');
const card3 = urlParams.get('n3');
const card4 = urlParams.get('n4');


function calculate(c) {
    for (let i = 0; i < c.length; i++) {
        if (c[i] == "J") {
            c[i] = 11;
        } else if (c[i] == "Q") {
            c[i] = 12;
        } else if (c[i] == "K") {
            c[i] = 13;
        } else if (c[i] == "A") {
            c[i] = 1;
        }
        else {
            c[i] = parseInt(c[i]);
        }
    }

    if (target_num_el.value == "") {
        target_num = 24;
    } else {
        target_num = parseInt(target_num_el.value);
    }

    let result_set = solutions(c);

    while (result_ul.firstChild) {
        result_ul.removeChild(result_ul.lastChild);
    }

    if (result_set.size == 0) {
        let li = document.createElement('li');
        result_ul.appendChild(li);

        li.innerHTML += "NO SOLUTIONS FOR THIS HAND!";
        return;
    }

    for (let member of result_set) {
        let li = document.createElement('li');
        result_ul.appendChild(li);

        li.innerHTML += member;
    }
}

function clearHand() {
    while (result_ul.firstChild) {
        result_ul.removeChild(result_ul.lastChild);
    }
    while (solution_row.firstChild) {
        solution_row.removeChild(solution_row.lastChild);
    }
    for (let i = 0; i < cards.length; i++) {
        cards[i] = 0;
    }
    less_than_four_msg.innerHTML = "Choose 4 cards above.";
}

function ans(so_far, next_index, lst, op_order, op, s, component_set) {
    if (op_order == null){
        op_order = [];
    }
    if (op == "+") {
        so_far = add(so_far, lst[next_index]);
    } else if (op == "-") {
        so_far = sub(so_far, lst[next_index]);
    } else if (op == "*") {
        so_far = mul(so_far, lst[next_index]);
    } else {
        so_far = div(so_far, lst[next_index]);
    }
    op_order.push(op);
    if (next_index == 3 && so_far == target_num) {
        format_helper(lst, op_order, s, component_set);
        return true;
    }
    else if (next_index == 3) {
        return false;
    }
    if (lst[next_index + 1] > so_far) {
        //no subtraction or div
        return ans(so_far, next_index + 1, lst, [...op_order], symbols[0], s, component_set) ||
               ans(so_far, next_index + 1, lst, [...op_order], symbols[2], s, component_set);
    }
    // all 4 operators valid
    return ans(so_far, next_index + 1, lst, [...op_order], symbols[0], s, component_set) ||
           ans(so_far, next_index + 1, lst, [...op_order], symbols[1], s, component_set) ||
           ans(so_far, next_index + 1, lst, [...op_order], symbols[2], s, component_set) ||
           ans(so_far, next_index + 1, lst, [...op_order], symbols[3], s, component_set);
}

function format_helper(lst, op_order, s, component_set) {

    result = ""
    arr_components = [];
    arr_components.push(...lst);
    arr_components.push(...op_order);

    // (1 + 2) * 3 + 4 format
    if ((op_order[2] == "+" || op_order[2] == "-") && ((op_order[1] == "*" || op_order[1] == "/") &&
                                                       (op_order[0] == "+" || op_order[0] == "-"))){

        //sort lst items 0 and 1
        arr_components.push("(");
        arr_components.push(")");
           result += "(" + lst[0] + " " + op_order[0] + " " + lst[1] + ")" + " " +
                  op_order[1] + " " + lst[2] + " " + op_order[2] + " " + lst[3];                                            
    }
        
    // other formats
    else if ((op_order[2] == "/" || op_order[2] == "*") && ((op_order[1] != "*" && op_order[1] != "/") ||
        (op_order[0] != "*" && op_order[0] != "/"))){

        // (1 + 2) * 3 * 4 format
        if (op_order[1] == "*" || op_order[1] == "/") {
            arr_components.push("(");
            arr_components.push(")");
            result += "(" + lst[0] + " " + op_order[0] + " " + lst[1] + ")" + " " + op_order[1] + " " + lst[2] + " " + op_order[2] + " " + lst[3];
        }
        // (1 * 2 + 3) * 4 OR (1 + 2 + 3) * 4 format
        else {
            arr_components.push("(");
            arr_components.push(")");
            result += "(" + lst[0] + " " + op_order[0] + " " + lst[1] + " " + op_order[1] + " " + lst[2] + ")" + " " + op_order[2] + " " + lst[3];
        }
    }

    // 1 + 2 + 3 + 4 format
    else {

        // sort lst and op_order
        /*op_order.unshift("+");
        let sorted_arrs = custom_sort(lst, op_order);

        op_order = sorted_arrs[1].slice(1);
        lst = sorted_arrs[0];*/

        result += lst[0] + " " + op_order[0] + " " + lst[1] + " " + op_order[1] + " " + lst[2] + 
        " " + op_order[2] + " " + lst[3];
    }

    arr_components.sort();
    let arr_str = arr_components.join();
    if (!component_set.has(arr_str)) {
        s.add(result + ` = ${target_num}`);
        component_set.add(arr_str);
    }

}

function solutions(cards) {
    let perms = itertools.permutations(cards);
    let inner_count = 0;
    let has24 = false;
    let s = new Set();
    let component_set = new Set();
    for (let p of perms) {
        for (let op of symbols) {
            if ( ans(p[0], 1, p, null, op, s, component_set)) {
                has24 = true;
            }
        }
    }
    if (has24) {
        /*for (let member of s) {
            console.log(member);
        }*/
    }
    return s;
}