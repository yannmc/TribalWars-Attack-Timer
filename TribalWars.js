/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Made by Yann Morin Charbonneau - Github : @yannmc
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

//Initialization of all public variables
villageList = [];
var targetInfo = [];
var attackDate = new Date();
var hitDate = new Date();
var SendingDate = new Date();
var nbVillages = 0;
var villa;
var attackLength;

//Functions to call when loading the page
function onLoad(){
  checkMemory();
  rowColor();
  attackRow();
}

//Function to convert seconds to HH:MM:SS format
function toHHMMSS(totalSec){
  var hours = parseInt( totalSec / 3600 );
  var minutes = parseInt( totalSec / 60 ) % 60;
  var seconds = Math.round(totalSec % 60);

  var result = (hours < 10 ? "0" + hours : hours) + "h:" + (minutes < 10 ? "0" + minutes : minutes) + "m:" + (seconds  < 10 ? "0" + seconds : seconds) + "s";
  return result;
}

//Creates the drop down menu to choose when the attack has to hit
function listDays(){
  select = document.getElementById("days");

  for (var i = 1; i <= 31; i++){
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = i;
    select.appendChild(opt);
  }
}

//Fuction to add a new row to allow the input of another village
function addVillage(){
  var table = document.getElementById("allVilla");
  var row = table.insertRow(-1);
  var x = document.getElementById("units_table").rows.length;
  var villageNumber = (x - 2);
  nbVillages = nbVillages + 1;

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);
  var cell9 = row.insertCell(8);
  var cell10 = row.insertCell(9);
  var cell11 = row.insertCell(10);
  var cell12 = row.insertCell(11);
  var cell13 = row.insertCell(12);
  var cell14 = row.insertCell(13);
  var cell15 = row.insertCell(14);
  var cell16 = row.insertCell(15);

  cell1.innerHTML = "<img class=\"deleteBtn\" src=\"images/delete.png\" onclick=\"deleteRow(this)\"><input class=\"input\" type=\"text\" size=\"15\" id=\"nameV\" placeholder=\"village's name\"/>";
  cell2.innerHTML = "<input class=\"input\" value=\"500\" type=\"text\" size=\"4\" placeholder=\"X\">";
  cell3.innerHTML = "<input class=\"input\" value=\"500\" type=\"text\" size=\"4\" placeholder=\"Y\">";
  cell4.innerHTML = "<input id=\"spear\" type=\"checkbox\" name=\"unitSpear\" value=\"spear\">";
  cell5.innerHTML = "<input id=\"sword\" type=\"checkbox\" name=\"unitSword\" value=\"sword\">";
  cell6.innerHTML = "<input id=\"axe\" type=\"checkbox\" name=\"unitAxe\" value=\"axe\">";
  cell7.innerHTML = "<input id=\"archer\" type=\"checkbox\" name=\"unitArcher\" value=\"archer\">";
  cell8.innerHTML = "<input id=\"spy\" type=\"checkbox\" name=\"unitSpy\" value=\"spy\">";
  cell9.innerHTML = "<input id=\"light\" type=\"checkbox\" name=\"unitLight\" value=\"light\">";
  cell10.innerHTML = "<input id=\"marcher\" type=\"checkbox\" name=\"unitMarcher\" value=\"marcher\">";
  cell11.innerHTML = "<input id=\"heavy\" type=\"checkbox\" name=\"unitHeavy\" value=\"heavy\">";
  cell12.innerHTML = "<input id=\"ram\" type=\"checkbox\" name=\"unitRam\" value=\"ram\">";
  cell13.innerHTML = "<input id=\"catapult\" type=\"checkbox\" name=\"unitCatapult\" value=\"catapult\">";
  cell14.innerHTML = "<input id=\"knight\" type=\"checkbox\" name=\"unitKnight\" value=\"knight\">";
  cell15.innerHTML = "<input id=\"snob\" type=\"checkbox\" name=\"unitSnob\" value=\"snob\">";
  cell16.innerHTML = "<input type=\"checkbox\" name=\"useIt\" id=\"villageSelected\" value=\"selected\">";
}

//Function to set the color of each row for the villages portion
function rowColor(){
  var x = document.getElementById("allVilla").rows.length;
  for(var i = 0; i < x; i++){
    var y = document.getElementById("allVilla").getElementsByTagName("tr");
    if(i % 2 !== 0){
      y[i].style.backgroundColor = "#fff5da";
    }else if(i % 2 === 0){
      y[i].style.backgroundColor = "#f4e4bc";
    }
  }
}

//Function to set the color of each row for the attack portion
function attackRowColor(){
  var a = document.getElementById("attack").rows.length;
  for(var i = 0; i < a; i++){
    var b = document.getElementById("attack").getElementsByTagName("tr");
    if(i % 2 !== 0){
      b[i].style.backgroundColor = "#fff5da";
    }else if(i % 2 === 0){
      b[i].style.backgroundColor = "#f4e4bc";
    }
  }
}

//Function to update the informations related to all villages
function updateVillageInformations(){
  for(var i = 0; i < document.getElementById("allVilla").rows.length; i++){
    villa = {
      villaName:document.getElementById("allVilla").rows[i].cells[0].querySelector('input').value,
      coordX:document.getElementById("allVilla").rows[i].cells[1].querySelector('input').value,
      coordY:document.getElementById("allVilla").rows[i].cells[2].querySelector('input').value,
      fields:"",
      realFields:"",
      units:{
        uSpear:{checked:document.getElementById("allVilla").rows[i].cells[3].querySelector('input').checked,speed:18},
        uSword:{checked:document.getElementById("allVilla").rows[i].cells[4].querySelector('input').checked,speed:22},
        uAxe:{checked:document.getElementById("allVilla").rows[i].cells[5].querySelector('input').checked,speed:18},
        uArcher:{checked:document.getElementById("allVilla").rows[i].cells[6].querySelector('input').checked,speed:18},
        uSpy:{checked:document.getElementById("allVilla").rows[i].cells[7].querySelector('input').checked,speed:9},
        uLight:{checked:document.getElementById("allVilla").rows[i].cells[8].querySelector('input').checked,speed:10},
        uMarcher:{checked:document.getElementById("allVilla").rows[i].cells[9].querySelector('input').checked,speed:10},
        uHeavy:{checked:document.getElementById("allVilla").rows[i].cells[10].querySelector('input').checked,speed:11},
        uRam:{checked:document.getElementById("allVilla").rows[i].cells[11].querySelector('input').checked,speed:30},
        uCatapult:{checked:document.getElementById("allVilla").rows[i].cells[12].querySelector('input').checked,speed:30},
        uKnight:{checked:document.getElementById("allVilla").rows[i].cells[13].querySelector('input').checked,speed:10},
        uSnob:{checked:document.getElementById("allVilla").rows[i].cells[14].querySelector('input').checked,speed:35}
      },
      using:document.getElementById("allVilla").rows[i].cells[15].querySelector('input').checked,
      travelSpeed:"",
      travelTime:"",
      travelTimeHMS:"",
      departure:""
    };
    villageList[i] = villa;
    getField(document.getElementById("xT").value, document.getElementById("yT").value, Number(document.getElementById("allVilla").rows[i].cells[1].querySelector('input').value), document.getElementById("allVilla").rows[i].cells[2].querySelector('input').value, i);
    getTravelSpeed(i);
    getTravelTime(i);
    getSendTime(i);
  }
}

//Function to update the informations related to the target
function updateTargetInformations(){
  targetInfo = {
    targetX:"",
    targetY:"",
    landingTime:"",
    landingTimeMs:""
  };
  targetInfo.targetX = document.getElementById("xT").value;
  targetInfo.targetY = document.getElementById("yT").value;
  setHitTime();
}

//Function to calculate the distance between two points on a 2D map
function getField(xt, yt, xv, yv, i){
  var fields = Math.round(Math.sqrt(Math.pow((xt - xv), 2) + Math.pow((yt - yv), 2)));
  var realFields = Math.sqrt(Math.pow((xt - xv), 2) + Math.pow((yt - yv), 2));
  villageList[i].realFields = realFields;
  villageList[i].fields = fields;
}

//Function to calculate the travel speed according to the slowest unit that will be sent
function getTravelSpeed(i){
  //travelSpeed is in seconds
  if(villageList[i].units.uSnob.checked){
    villageList[i].travelSpeed = 35;
  }else if(villageList[i].units.uRam.checked || villageList[i].units.uCatapult.checked){
    villageList[i].travelSpeed = 30;
  }else if(villageList[i].units.uSword.checked){
    villageList[i].travelSpeed = 22;
  }else if(villageList[i].units.uSpear.checked || villageList[i].units.uAxe.checked || villageList[i].units.uArcher.checked){
    villageList[i].travelSpeed = 18;
  }else if(villageList[i].units.uHeavy.checked){
    villageList[i].travelSpeed = 11;
  }else if(villageList[i].units.uLight.checked || villageList[i].units.uMarcher.checked || villageList[i].units.uKnight.checked){
    villageList[i].travelSpeed = 10;
  }else if(villageList[i].units.uSpy.checked){
    villageList[i].travelSpeed = 9;
  }else{
    villageList[i].travelSpeed = 0;
  }
}

//Function to calculate the travel time using the distance in fields and the travel speed
function getTravelTime(i){
  var xT = document.getElementById("xT").value;
  var yT = document.getElementById("yT").value;
  //travelTime in seconds
  villageList[i].travelTimeHMS = toHHMMSS(60 * villageList[i].travelSpeed * villageList[i].realFields);
  villageList[i].travelTime = 60 * villageList[i].travelSpeed * villageList[i].realFields;
}

//Funtion to calculate when the attack should be sent to land at the desired time
function getSendTime(i){
  var departureDate = new Date();
  var walkingTimeMS = 1000 * (villageList[i].travelTime);

  departureDate.setTime(Math.round(Number(targetInfo.landingTimeMs) - Number(walkingTimeMS)));
  villageList[i].departure = departureDate.valueOf();
}

//Function to registrer when the attack should land
function setHitTime(){
  attackDate.setMonth(document.getElementById("month").value);
  attackDate.setDate(document.getElementById("days").value);
  attackDate.setHours(document.getElementById("hours").value);
  attackDate.setMinutes(document.getElementById("minutes").value);
  attackDate.setSeconds(document.getElementById("seconds").value);

  targetInfo.landingTime = attackDate.toString();
  targetInfo.landingTimeMs = attackDate.valueOf();
}

//Function to save the informations related to all villages
function saveVillages(){
  console.log(attackDate.valueOf());
  if(localStorage.getItem("allVillages") === null){
    updateVillageInformations();
    localStorage.setItem("allVillages",JSON.stringify(villageList));
  }else{
    if(confirm("Are you sure you want to save?\nThe previous save file will be deleted") === true){
      villageList = [];
      localStorage.removeItem("allVillages");
      updateVillageInformations();
      localStorage.setItem("allVillages",JSON.stringify(villageList));
      alert("The villages were saved");
    }else{
      alert("The villages were not saved");
    }
  }

}

//Function to save the informations related to the target
function saveTarget(){
  if(localStorage.getItem("targetInfo") === null){
    updateTargetInformations();
    localStorage.setItem("targetInfo",JSON.stringify(targetInfo));
  }else{
    if(confirm("Are you sure you want to save?\nThe previous save file will be deleted") === true){
      updateTargetInformations();
      localStorage.setItem("targetInfo",JSON.stringify(targetInfo));
      alert("The target was saved");
    }else{
      alert("The target was not saved");
    }
  }
}

//Function to check if the is anything saved
function checkMemory(){
  //check if villages are saved
  if(localStorage.getItem("allVillages") !== null){
    reloadVillages();
  }else{
    console.log("no village saved");
    nbVillages = 1;
  }

  //check if a target is saved
  if(localStorage.getItem("targetInfo") !== null){
    reloadTarget();
  }else{
    console.log("no target saved");
  }
}

//Function to load the informations related to the target saved (if any)
function reloadTarget(){

  targetInfo = JSON.parse(localStorage.getItem("targetInfo"));

  hitDate.setTime(Number(targetInfo.landingTimeMs));

  document.getElementById("xT").value = targetInfo.targetX;
  document.getElementById("yT").value = targetInfo.targetY;
  document.getElementById("days").value = Number(hitDate.getDate());
  document.getElementById("month").value = Number(hitDate.getMonth());
  document.getElementById("hours").value = Number(hitDate.getHours());
  document.getElementById("minutes").value = Number(hitDate.getMinutes());
  document.getElementById("seconds").value = Number(hitDate.getSeconds());

}

//Function to load the informations related to all villages saved (if any)
function reloadVillages(){
  villageList = JSON.parse(localStorage.getItem("allVillages"));
  for(var i = 0; i < villageList.length; i++){
    //village infos
    document.getElementById("allVilla").rows[i].cells[0].querySelector('input').value = villageList[i].villaName;
    document.getElementById("allVilla").rows[i].cells[1].querySelector('input').value = villageList[i].coordX;
    document.getElementById("allVilla").rows[i].cells[2].querySelector('input').value = villageList[i].coordY;

    //units infos
    if(villageList[i].units.uSpear.checked){
      document.getElementById("allVilla").rows[i].cells[3].querySelector('input').checked = true;
    }
    if(villageList[i].units.uSword.checked){
      document.getElementById("allVilla").rows[i].cells[4].querySelector('input').checked = true;
    }
    if(villageList[i].units.uAxe.checked){
      document.getElementById("allVilla").rows[i].cells[5].querySelector('input').checked = true;
    }
    if(villageList[i].units.uArcher.checked){
      document.getElementById("allVilla").rows[i].cells[6].querySelector('input').checked = true;
    }
    if(villageList[i].units.uSpy.checked){
      document.getElementById("allVilla").rows[i].cells[7].querySelector('input').checked = true;
    }
    if(villageList[i].units.uLight.checked){
      document.getElementById("allVilla").rows[i].cells[8].querySelector('input').checked = true;
    }
    if(villageList[i].units.uMarcher.checked){
      document.getElementById("allVilla").rows[i].cells[9].querySelector('input').checked = true;
    }
    if(villageList[i].units.uHeavy.checked){
      document.getElementById("allVilla").rows[i].cells[10].querySelector('input').checked = true;
    }
    if(villageList[i].units.uRam.checked){
      document.getElementById("allVilla").rows[i].cells[11].querySelector('input').checked = true;
    }
    if(villageList[i].units.uCatapult.checked){
      document.getElementById("allVilla").rows[i].cells[12].querySelector('input').checked = true;
    }
    if(villageList[i].units.uKnight.checked){
      document.getElementById("allVilla").rows[i].cells[13].querySelector('input').checked = true;
    }
    if(villageList[i].units.uSnob.checked){
      document.getElementById("allVilla").rows[i].cells[14].querySelector('input').checked = true;
    }
    if(villageList[i].using){
      document.getElementById("allVilla").rows[i].cells[15].querySelector('input').checked = true;
    }
    if((i + 1) != villageList.length){
      addVillage();
    }
  }
}

//Function to fill the attack table with the desired villages
function attackRow() {
  updateVillageInformations();
  var table = document.getElementById("attack");
  var x = document.getElementById("units_table").rows.length;
  attackLength = document.getElementById("attack").rows.length;
  if(attackLength !== 0){
    for(var j = 0; j < attackLength; j++){
      document.getElementById("attack").deleteRow(0);
    }
  }
  for(var i = 2; i < x; i++){
    if(villageList[(i - 2)].using){
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);

      SendingDate.setTime(Number(villageList[(i - 2)].departure));
      var send = SendingDate.toString();

      cell1.innerHTML = villageList[(i - 2)].villaName;
      cell2.innerHTML = "X : " + villageList[(i - 2)].coordX + ", Y : " + villageList[(i - 2)].coordY;
      cell3.innerHTML = villageList[(i - 2)].fields + " fields";
      cell4.innerHTML = villageList[(i - 2)].travelTimeHMS;
      cell5.innerHTML = send.slice(0,24);
    }
  }
  attackLength = document.getElementById("attack").rows.length;
  attackRowColor();
}

//Function to generate the text needed to copy and pste in a tribalwars forum and/or mail
function quickCopyPaste(){
  document.getElementById("inline_popup").className = "ui-draggable show";
  var x = document.getElementById("allVilla").rows.length;
  var str = "";
  var send;
  var numAttack = 0;
  for(var i = 0; i < x; i++){
    if(villageList[i].using){
      numAttack = numAttack + 1;
      SendingDate.setTime(Number(villageList[i].departure));
      send = SendingDate.toString();
      str = str + "Attack #" + numAttack + " - Sending from [coord]" + villageList[i].coordX + "|" + villageList[i].coordY + "[/coord] on " + send.slice(0,24) + " to [coord]" + document.getElementById("xT").value + "|" + document.getElementById("yT").value + "[/coord] and landing on " + targetInfo.landingTime.slice(0,24) + "<br>";
    }
  }
  //var popup = prompt("Quick Copy & Paste Informations\nThere may be more than 2 lines\nBe sure to sleect everything :)", str);
  document.getElementById("copyPaste").innerHTML = str;
  str = "";
}

//Function to delete a row when clicking on 'x'
function deleteRow(o){
  nbVillages = nbVillages - 1;
  var p = o.parentNode.parentNode;
  p.parentNode.removeChild(p);
  rowColor();
}

//Function to show the quick copy and paste window
function inlinePopupClose() {
  if ($('#inline_popup') !== null) {
    $('#inline_popup').removeClass('show');
    setTimeout(function() {
      $('#inline_popup').addClass('hidden');
    }, 300);
  }
}

//Function to allow the dragging of the quick copy and paste window

interact('.popup_helper').ignoreFrom('#inline_popup_main')
.draggable({
// enable inertial throwing
inertia: true,
// call this function on every dragmove event
onmove: dragMoveListener
});

function dragMoveListener (event) {
var target = event.target,
// keep the dragged position in the data-x/data-y attributes
x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

// translate the element
target.style.webkitTransform =
target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

// update the position attributes
target.setAttribute('data-x', x);
target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;


//Function to delete the villages saved in the localStorage
function deleteVillageMemory(){
  if(confirm("Are you sure you want to delete all the villages informations?") === true){
    localStorage.removeItem("allVillages");
  }
}

//Function to delete the target's informations saved in the localStorage
function deleteTargetMemory(){
  if(confirm("Are you sure you want to delete the target's informations?") === true){
    localStorage.removeItem("targetInfo");
  }
}
