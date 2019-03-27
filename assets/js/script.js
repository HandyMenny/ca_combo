var headers = [["DL CA", "col-dl"], ["MIMO 4x4", "col-mimo"], ["UL", "col-ul"]];
var myDropdown;
let state = {
  device: null
}
window.onpopstate = function (event) {
  if (event.state == null) {
    closeTable(false);
  }
  else {
    if (toggleDevice(event.state.device) == false) {
      historyNull()
    };
  }
};

function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  myDropdown = document.getElementById("myDropdown");

  //populate dropdown
  for (let i = 0; i < devices.length; i++) {
    let anchor = document.createElement('a');
    let device = devices[i];
    //let div=document.createElement('div');
    anchor.className = "card";
    var img = document.createElement("img");
    img.src = "assets/img/" + device.img;
    let p = document.createElement('p');
    if (device.name == " ")
      p.innerHTML = device.manufacturer + " <br>" + device.model + " <br>" + device.soc + " <br>" + device.year
    else
      p.innerHTML = device.manufacturer + " <br>" + device.name + " <br>" + device.model + " <br>" + device.soc + " <br>" + device.year

    anchor.href = "javascript:void(0)";
    anchor.addEventListener('click', function () {
      toggleDevice(device.model);
    });
    anchor.appendChild(img);
    anchor.appendChild(p);
    //anchor.appendChild(div)
    myDropdown.appendChild(anchor);
    state.device = getUrlParameter("device");
    if (state.device != null && toggleDevice(state.device)== false) {
        historyNull();
		  show(document.body);
    }
	else
		setTimeout( function() { window.dispatchEvent(new Event('load')); show(document.body)}, 100);
  }
});

function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

function filterFunction() {
  var input, filter, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  filterSplitted = filter.split(" ");
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  search: for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    for (j = 0; j < filterSplitted.length; j++) {
      if (txtValue.toUpperCase().indexOf(filterSplitted[j]) == -1) {
        hide(a[i])
        continue search;
      }
    }
    show(a[i]);
  }
}

function toggleTable(id, parent) {
  //var e = document.getElementById(parent);
  document.querySelectorAll('.table-container').forEach(function (table) {
    if (table.id != id) {
      hide(table);
    } else
      show(table);
  })

  document.querySelectorAll('.selection').forEach(function (selector) {
    // console.log(selector)
    if (selector.classList.contains(id)) {
      selector.classList.add('selected')
    } else
      selector.classList.remove('selected')
  })
}

function toggleDevice(id) {
  device = getDevice(id, devices);
  if (device == null)
    return false;

  hide(myDropdown);
  hide(document.getElementById("search"))
  hide(document.getElementById("headbar"))
  show(document.getElementById("topbar"));

  state.device = id;
  updateState()
  var listContainer = document.getElementById('list_container');
  listContainer.innerHTML = ''
  var dev = document.getElementById('device')
  dev.innerHTML = device.manufacturer + " " + device.name + " " + device.model;;
  var div = document.getElementById('listitem');
  div.innerHTML = ''

  for (let i = 0; i < device.list.length; i++) {
    let anchor = document.createElement('a');
    span = document.createElement('span')
    span.className = "selection " + device.list[i].name;

    span.innerHTML = device.list[i].name;
    anchor.href = "javascript:void(0)"
    anchor.addEventListener('click', function () {
      toggleTable(device.list[i].name);
    });
    let tbl = tableCreate(device.list[i]);
    let tblDiv = document.createElement('div');
    tblDiv.className = "table-container";
    tblDiv.id = device.list[i].name;

    if (i > 0) {
      tblDiv.classList.add("hidden");
    }
    else
      span.classList.add("selected");
    anchor.appendChild(span);
    div.appendChild(anchor);
    tblDiv.appendChild(tbl);
    listContainer.appendChild(tblDiv);
  }

  window.dispatchEvent(new Event('editTable'));
  //  document.querySelectorAll('.device').forEach(function(device) {
  //    if (device.id != id) {
  //      device.classList.add('hidden');
  //    } else
  //      device.classList.remove('hidden');
  //  })
  return true;
}

function getDevice(id, device) {
  for (var i = 0; i < device.length; i++) {
    if (device[i].model == id) { return device[i]; }
  }
  return null;
}

function tableCreate(list) {
  tbl = document.createElement('table');
  tbl.className = 'responsive table-striped';
  //header
  var columnCount = headers.length;



  var combo = list.combo
  for (let i = 0; i < combo.length; i++) {
    let tr = tbl.insertRow(-1);
    comboResult = convertCombos(combo[i]);
    for (let j = 0; j < columnCount; j++) {
      let td = tr.insertCell(-1);
      td.innerHTML = comboResult[j];
    }
  }

  let thead = document.createElement('thead');
  let row = document.createElement('tr')
  for (let i = 0; i < columnCount; i++) {
    let headerCell = document.createElement("TH");
    headerCell.innerHTML = headers[i][0];
    headerCell.className = headers[i][1];
    row.appendChild(headerCell);
  }
  thead.appendChild(row)
  tbl.appendChild(thead)
  return tbl;
}

function convertCombos(combo) {
  var dl = combo.dl;
  var mimo = combo.mimo;
  var ul = combo.ul;

  var resultdl = "";
  var resultmimo = "";
  var comboLenght = dl.length;
  var mimoLenght = mimo.length;

  var ulLenght = ul.length;
  var resultUl = "";

  var i = 0;
  while (true) {
    resultdl += "<span class=\"B" + parseInt(dl[i]) + "\">" + parseInt(dl[i]) + "</span>";

    if (++i < comboLenght) {
      resultdl += " + ";
    }
    else break;
  }

  var previous = false;
  for (i = 0; i < mimoLenght; i++) {

    if (previous)
      resultmimo += ", ";
    var prev = false;

    for (var j = 0; j < comboLenght; j++) {
      if (mimo[i].charAt(j) == '4') {
        if (prev)
          resultmimo += " + ";
        resultmimo += "<span class=\"B" + parseInt(dl[j]) + "\">" + parseInt(dl[j]) + "</span>";
        previous = prev = true;
      }
    }
  }
  resultmimo = resultmimo.substring(0, resultmimo.length - 2);

  i = 0;
  while (true) {
    prev = false;
    for (var j = 0; j < comboLenght; j++) {
      if (ul[i].charAt(j) != '0') {
        if (prev)
          resultUl += " + ";
        resultUl += "<span class=\"B" + parseInt(dl[j]) + "\">" + parseInt(dl[j]) + "</span>";
        prev = true;
      }
    }
    if (++i < ulLenght) {
      resultUl += ", ";
    }
    else
      break;

  }

  //console.log(resultdl)
  return [resultdl, resultmimo, resultUl];
}

function closeTable(flag) {
  if (flag == true)
    historyNull()

  show(myDropdown);
  show(document.getElementById("search"))
  show(document.getElementById("headbar"))
  hide(document.getElementById("topbar"));
  var listContainer = document.getElementById('list_container');
  listContainer.innerHTML = ''
  var div = document.getElementById('listitem');
  div.innerHTML = ''
}

function updateState() {
  history.pushState(state, "", "?device=" + state.device);
}

function historyNull() {
  console.log("hystorynull")
  state.device = null;
  history.pushState(state, "", "?");
}
// for (var i = 0; i < e.childNodes.length; i++) {
// if (e.childNodes[i].className == 'collapse')
// {
// if (e.childNodes[i].id != id)
// e.childNodes[i].style.display = 'none';
// else
// e.childNodes[i].style.display = 'block';
// }
// else
// if (e.childNodes[i].className == 'select_list')
// {
// e.querySelectorAll('selection')
// if (e.childNodes[i].childNodes[0]..className == 'selection')
// {
// if (e.childNodes[i].class != id)
// e.childNodes[i].classList.remove('selected');
// else
// e.childNodes[i].classList.add('selected');
// }
// }
//}