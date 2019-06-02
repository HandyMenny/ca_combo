var headers = [["DL CA", "col-dl"], ["MIMO 4x4", "col-mimo"], ["UL", "col-ul"]];
var myDropdown;
var devices;
var backScrollTop=0;



window.onpopstate = function (event) {
  console.log(window.location);
  var deviceParam=getUrlParameter("device");
  console.log(deviceParam)
  console.log(event.state)
  //window.history.pushState(null, "", "?");
  if (typeof deviceParam == 'undefined') {
    console.log("closing table")
    closeTable(false);
    historyNull()
  }
  else {
    if (!toggleDevice(deviceParam,false)) {
      historyNull()
    }
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
  deviceParam = getUrlParameter("device");
  if (deviceParam == undefined) {
    show(document.body);
  }

  loadJSON(function (response) {
    // Parse JSON string into object
    devices = JSON.parse(response);
  });

  if (deviceParam != undefined && !toggleDevice(deviceParam, false)) {
    historyNull();
    show(document.body);
  }
  else
    setTimeout(function () { window.dispatchEvent(new Event('load')); show(document.body) }, 0);


  //populate dropdown
  for (var i = 0; i < devices.length; i++)
    (function () {
      var anchor = document.createElement('a');
      var device = devices[i];
      //var div=document.createElement('div');
      anchor.className = "card";
      var img = document.createElement("img");
      img.src = "assets/img/" + device.img;
      var p = document.createElement('p');
      if (device.name == " ")
        p.innerHTML = device.manufacturer + " <br>" + device.model + " <br>" + device.soc + " <br>" + device.year
      else
        p.innerHTML = device.manufacturer + " <br>" + device.name + " <br>" + device.model + " <br>" + device.soc + " <br>" + device.year

      anchor.href = "?device=" + device.model;
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        toggleDevice(device.model, true);
      });
      anchor.appendChild(img);
      anchor.appendChild(p);
      //anchor.appendChild(div)
      myDropdown.appendChild(anchor);

    }()); // immediate invocation
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

function toggleDevice(id,flag) {
  device = getDevice(id, devices);
  if (device == null)
    return false;
  oldTitle=document.title;
  document.title = document.title.replace("",device.manufacturer + " " + ((device.name.length>1 && device.name) || device.model) + " - ");
  if (flag) {
    updateState(id)
  }
  
  if(scrollTop()!=0)
  {
	backScrollTop=scrollTop();
	//console.log(scrollTop());
	//console.log(backScrollTop);
	window.scroll(0,0);
  }
  
  hide(myDropdown);
  hide(document.getElementById("search"))
  hide(document.getElementById("headbar"))

  show(document.getElementById("topbar"));
  var listContainer = document.getElementById('list_container');
  listContainer.innerHTML = ''
  var dev = document.getElementById('device')
  dev.innerHTML = device.manufacturer + " " + device.name + " " + device.model;;
  var div = document.getElementById('listitem');
  div.innerHTML = ''

  if(device.description!= "null") {
  var para = document.createElement("p");
  var node = document.createTextNode(device.description);

  para.appendChild(node);
  listContainer.appendChild(para);
  }


  for (var i = 0; i < device.list.length; i++)
    (function () {
      var anchor = document.createElement('a');
      var listName = device.list[i].name;

      span = document.createElement('span')
      span.className = "selection " + listName;

      span.innerHTML = listName;
      anchor.href = "javascript:void(0)"
      anchor.addEventListener('click', function () {
        toggleTable(listName);
      });
      var tbl = tableCreate(device.list[i]);
      var tblDiv = document.createElement('div');
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
    }()); // immediate invocation
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
  for (var i = 0; i < combo.length; i++) {
    var tr = tbl.insertRow(-1);
    comboResult = convertCombos(combo[i]);
    for (var j = 0; j < columnCount; j++) {
      var td = tr.insertCell(-1);
      td.innerHTML = comboResult[j];
    }
  }

  var thead = document.createElement('thead');
  var row = document.createElement('tr')
  for (var i = 0; i < columnCount; i++) {
    var headerCell = document.createElement("TH");
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
  document.title=oldTitle;

  if (flag == true) {
    if (history.state != null) {
      window.scroll(0, history.state.backScrollTop);
      window.history.back();
      return;
    }
    else
      historyNull();
  }
  
  show(myDropdown);
  show(document.getElementById("search"))
  show(document.getElementById("headbar"))
  hide(document.getElementById("topbar"));
  var listContainer = document.getElementById('list_container');
  listContainer.innerHTML = ''
  var div = document.getElementById('listitem');
  div.innerHTML = ''
}

function updateState(param) {
  history.pushState('{device:' + param + 'backScrollTop:' + scrollTop() + '}', document.title, "?device=" + param);
}

function historyNull() {
  console.log("hystorynull")
  history.replaceState('{device:null, backScrollTop:' + scrollTop() + '}', document.title, "?");
}

function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', 'assets/js/device.json', false); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

function scrollTop() {
	return window.pageYOffset || document.documentElement.scrollTop;
};
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
