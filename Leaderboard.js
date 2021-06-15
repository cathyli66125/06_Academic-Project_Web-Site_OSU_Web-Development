var myLeaderboardArr = [{"Username":"Jack", "Mileage":80, "Date":"02-12-20"}, 
{"Username":"Jack", "Mileage":80, "Date":"02-12-20"}, 
{"Username":"Jack", "Mileage":80, "Date":"02-12-20"}, 
{"Username":"Jack", "Mileage":80, "Date":"02-12-20"}, 
{"Username":"Jack", "Mileage":80, "Date":"02-12-20"}, 
{"Username":"Jack", "Mileage":80, "Date":"02-12-20"}, 
{"Username":"Jack", "Mileage":80, "Date":"02-12-20"}, 
{"Username":"Mary", "Mileage":60, "Date":"02-15-20"}];
var myHeader = ["Rank", "Username", "Mileage", "Date"]
function tableCreate(){
    console.log("table created")
    var myBody = document.body;
    myDiv = document.createElement("DIV");
    myDiv.classList.add("myDiv")
    myBody.appendChild(myDiv);
    myTable = document.createElement("TABLE");
    myDiv.appendChild(myTable);
    myTable.border = "1";

    var tHead = document.createElement("thead");
    myTable.appendChild(tHead);
    for (i = 0; i < myHeader.length; i++) {
        var header = document.createElement("th");
        header.innerHTML = myHeader[i];
        tHead.appendChild(header);
    }   
    
    var tBody = document.createElement("tbody");
    myTable.appendChild(tBody);
    for (i = 0; i < myLeaderboardArr.length; i++) {
        var tr = document.createElement("tr");
        tBody.appendChild(tr);
        var tRank = document.createElement("td");
        tRank.innerHTML = i+1;
        tr.appendChild(tRank);
        for (j = 1; j < myHeader.length; j++){
            var td = document.createElement("td");
            td.id = i*10 + j + 11;
            td.innerHTML = myLeaderboardArr[i][myHeader[j]];
            tr.appendChild(td);
        }
    }
}
tableCreate();
