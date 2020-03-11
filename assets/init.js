function setCookie(cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = "todo" + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie() {
    var name = "todo" + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//code taken from wSchools ended here
////////////////////////////////////////////////////////////////////////


//declaring values
var todos,value,CValue="";
var input = document.getElementById("todo");


//when document loaded
function load(){
    var user = getCookie();
    if (user == "") {
        todos = [];
    } else {
        todos = user.split(",");
        todos.pop();
    }
    ul = document.getElementById("ul");
    todos.forEach(function(i){
    li = document.createElement("li");
    li.appendChild(document.createTextNode(i));
    ul.appendChild(li);
    });
}
document.onload = load();

if(todos.length !== 0){
    document.getElementById("notodo").style.display = "none"
}
//to create li tags and add events
var lis = document.getElementsByTagName("li");

for(i=0; i<lis.length; i++){
    k = lis[i].innerText;
    lis[i].addEventListener("click", function(){remove(event);});
}

//just to reduce
function cvalued(){
    todos.forEach(function(i){
        CValue += (i+',');
    });
}

//when todo is added
function todoer(){
    value = input.value;
    if(value){
    cvalued();
    CValue += (value+",");
    setCookie(CValue);
    location.reload();
    }else{
        alertbox("Please enter todo to add to list");
    }
}

//when todo is deleted
function remove(e){
    rvalue = e.path[0].firstChild.data;
    todos = todos.filter(function(i){
        return i != rvalue;
    })
    cvalued();
    setCookie(CValue);
    location.reload();
}

window.addEventListener("keypress", function(){
    if(this.event.key === "Enter"){
        todoer();
    };
});

input.addEventListener("keyup", function(){
    if(input.value.length === 1){
        input.value = input.value.toUpperCase();
    };
});

function alertbox(txt){
    document.getElementById("alert-text").innerText = txt;
    document.getElementById("invisible").style.display = "block";
    document.getElementById("alert").style.marginTop = "0%";
}

document.getElementById("invisible").addEventListener("click", removeAlert);

function removeAlert(){
    document.getElementById("invisible").style.display = "none";
    document.getElementById("alert").style.marginTop = "-1200px";
}