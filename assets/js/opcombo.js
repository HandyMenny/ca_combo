tim=[ [[3, 1], "<1", "489.5"], [[7, 1], "-", "-"], [[7, 3], "14", "685.3"], [[7, 3, 1], "-", "-"], [[20, 1], "<1", "195.8"], [[20, 3], "32", "489.5"], [[20, 3, 1], "<1", "587.4"], [[20, 7], "7", "391.6"], [[20, 7, 1], "-", "-"], [[20, 7, 3], "7", "783.2"], [[20, 7, 3, 1], "-", "-"], [[32, 3], "1", "587.4"], [[32, 7], "1", "489.5"], [[32, 7, 1], "-", "-"], [[32, 7, 3], "1", "881.1"], [[32, 20], "1", "293.7"], [[32, 20, 3], "1", "685.3"], [[32, 20, 7], "1", "587.4"], [[32, 20, 7, 3], "1", "979.0"] ]
vodafone=[ [[3, 1], "9", "489.5"], [[7, 1], "2", "391.6"], [[7, 3], "12", "685.3"], [[7, 3, 1], "2", "783.2"], [[20, 1], "13", "195.8"], [[20, 3], "39", "489.5"], [[20, 3, 1], "7", "587.4"], [[20, 7], "8", "391.6"], [[20, 7, 1], "2", "489.5"], [[20, 7, 3], "7", "783.2"], [[20, 7, 3, 1], "2", "881.1"], [[32, 3], "<1", "587.4"], [[32, 7], "<1", "489.5"], [[32, 7, 1], "<1", "587.4"], [[32, 7, 3], "<1", "881.1"], [[32, 20], "<1", "293.7"], [[32, 20, 3], "<1", "685.3"], [[32, 20, 7], "<1", "587.4"], [[32, 20, 7, 3], "<1", "979.0"] ]
wind=[ [[3, 1], "48", "489.5"], [[7, 1], "18", "489.5"], [[7, 3], "25", "783.2"], [[7, 3, 1], "17", "881.1"], [[20, 1], "41", "195.8"], [[20, 3], "61", "489.5"], [[20, 3, 1], "41", "587.4"], [[20, 7], "31", "489.5"], [[20, 7, 1], "16", "587.4"], [[20, 7, 3], "23", "881.1"], [[20, 7, 3, 1], "16", "979.0"], [[32, 3], "-", "-"], [[32, 7], "-", "-"], [[32, 7, 1], "-", "-"], [[32, 7, 3], "-", "-"], [[32, 20], "-", "-"], [[32, 20, 3], "-", "-"], [[32, 20, 7], "-", "-"], [[32, 20, 7, 3], "-", "-"] ]
iliad=[ [[3, 1], "-", "-"], [[7, 1], "-", "-"], [[7, 3], "100", "391.6"], [[7, 3, 1], "-", "-"], [[20, 1], "-", "-"], [[20, 3], "-", "-"], [[20, 3, 1], "-", "-"], [[20, 7], "-", "-"], [[20, 7, 1], "-", "-"], [[20, 7, 3], "-", "-"], [[20, 7, 3, 1], "-", "-"], [[32, 3], "-", "-"], [[32, 7], "-", "-"], [[32, 7, 1], "-", "-"], [[32, 7, 3], "-", "-"], [[32, 20], "-", "-"], [[32, 20, 3], "-", "-"], [[32, 20, 7], "-", "-"], [[32, 20, 7, 3], "-", "-"] ]
timul=[ [[7, 3], "14", "131.25"], [[20, 3], "32", "112.5"] ]
global=[ [[3, 1], "18", "0"], [[7, 1], "6", "0"], [[7, 3], "17", "0"], [[7, 3, 1], "6", "0"], [[20, 1], "17", "0"], [[20, 3], "43", "0"], [[20, 3, 1], "15", "0"], [[20, 7], "14", "0"], [[20, 7, 1], "6", "0"], [[20, 7, 3], "12", "0"], [[20, 7, 3, 1], "6", "0"], [[32, 3], "<1", "0"], [[32, 7], "<1", "0"], [[32, 7, 1], "<1", "0"], [[32, 7, 3], "<1", "0"], [[32, 20], "<1", "0"], [[32, 20, 3], "<1", "0"], [[32, 20, 7], "<1", "0"], [[32, 20, 7, 3], "<1", "0"] ]
globalul=[ [[7, 3], "5", "0"], [[20, 3], "11", "0"] ]


document.addEventListener('DOMContentLoaded', function () {
    tbl = document.getElementById("OPCombo").getElementsByTagName('tbody')[0]
        for (let j = 0; j < global.length; j++) {
        let tr = tbl.insertRow(-1);

        let td = tr.insertCell(-1);
        td.innerHTML = convertCombos(global[j][0]);
        td = tr.insertCell(-1);
        td.innerHTML = parse_percent(global[j][1]);

        td = tr.insertCell(-1);
        td.innerHTML = parse_percent(tim[j][1]);
         td = tr.insertCell(-1);
        td.innerHTML = tim[j][2];

        td = tr.insertCell(-1);
        td.innerHTML = parse_percent(vodafone[j][1]);
        td = tr.insertCell(-1);
        td.innerHTML = vodafone[j][2];

        td = tr.insertCell(-1);
        td.innerHTML = parse_percent(wind[j][1]);
        td = tr.insertCell(-1);
        td.innerHTML = wind[j][2];
        
        td = tr.insertCell(-1);
        td.innerHTML = parse_percent(iliad[j][1]);
        td = tr.insertCell(-1);
        td.innerHTML = iliad[j][2];
    }
});


function convertCombos(combo) {
   
    var resultdl = "";
    var comboLenght = combo.length;

    var i = 0;
    while (true) {
      resultdl += "<span class=\"B" + parseInt(combo[i]) + "\">" + parseInt(combo[i]) + "</span>";
  
      if (++i < comboLenght) {
        resultdl += " + ";
      }
      else break;
    }
  
    
    console.log(resultdl)
    return resultdl;
  }

  function parse_percent(percent)
  {
    if(percent!="-")
        percent+="%";
    return percent;
  }