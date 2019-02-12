// ==UserScript==
// @name            NIR Grade Calculator
// @description     帮助你直视你的GPA - 适用NIR
// @author          xq114
// @grant           GM_xmlhttpRequest
// @include         https://*.nir.cn/*
// @version         0.1
// @icon            
// @namespace       xq114_calc
// ==/UserScript==

(function () {
    // GPA equation
    function get_gpa(score) {
        if (score >= 95) return 4.0;
        else if (score >= 90) return 3.8;
        else if (score >= 85) return 3.6;
        else if (score >= 82) return 3.3;
        else if (score >= 78) return 3.0;
        else if (score >= 75) return 2.7;
        else if (score >= 72) return 2.3;
        else if (score >= 68) return 2.0;
        else if (score >= 64) return 1.5;
        else if (score >= 60) return 1.0;
        else return 0.0;
    }

    function get_average(list) {
        var sum_grade = 0.0;
        var sum_point = 0.0;
        for (var clas of list) {
            sum_point += clas.point;
            sum_grade += clas.point * get_gpa(clas.score);
        }
        return (sum_grade / sum_point);
    }

    function insertAfter(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }

    // get infomation
    var table = document.getElementsByClassName("bot_line")[0];
    var grade_table = table.getElementsByTagName("tbody")[0].rows;
    var grade_list = [];
    var class_counter = 0;
    for (var x of grade_table) {
        var class_grade = new Object();
        if(isNaN(x.cells[7].textContent)) continue;
        if(x.cells[9].textContent !== "是") continue;
        class_grade.point = parseFloat(x.cells[7].textContent);
        class_grade.score = parseFloat(x.cells[12].textContent);
        if (class_grade.point >= 90)
            x.cells[0].style.color = "green";
        else if (class_grade.point < 82)
            x.cells[0].style.color = "red";
        grade_list.push(class_grade);
        class_counter += 1;
    }

    // create and insert label
    var g_div = document.createElement("div");
    g_div.id = "gpa_label";
    g_div.style.background = "#f3f2ef";
    g_div.style.textAlign = "center";
    g_div.appendChild(document.createTextNode(" " + class_counter + " classes included, and Your GPA is: " + get_average(grade_list)));
    insertAfter(g_div, table);
})();
