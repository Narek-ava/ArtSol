window.onload = main;
let aB;
const mongoose = request()
function main() {

  aB = ameBank();

}

function ameBank(){
    let copyBox;
    let courseBox = [];
    let courseBoxFilter = [];
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let url = "https://www.ameriabank.am/";

    fetch(proxyUrl + url)
        .then(response => response.text())
        .then(contents => {
            copyBox = contents;
            document.getElementById("ameBank").innerHTML = copyBox;
            courseBox = document.getElementsByClassName("value");

            for (let i = 0; i < 10; i++) {
                courseBoxFilter.push(courseBox[i].innerHTML);
                
            }
        })

        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
    return courseBoxFilter;
}

