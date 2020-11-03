$(function(){
    
    var userName = $('#userName');
    var position = $('#position');
    var office = $('#office');
    var age = $('#age');
    var startDate = $('#startDate');
    var salary = $('#salary');

    var add = $("#add")
    var tab = $('table');
    var alert1 = $('#alert1');
    var display = $('#mainDisplay');

    var newData = $('#newData');
    var isThereData = $('#isThereData');

    var tBody = $('<tbody></tbody>');
    tab.append(tBody);


    var searchInput = $('#searchInput');
    var selectOption = $('select');
        
    var numberOfRecordes;
    
    var sort = $('button.sort');
    
    var nOfR = $('.nOfR');
    
    
    /**********pagination handling*******/
    setTimeout(function pagination(){
        if(numberOfRecordes <= 10){
            var allTrs = $(`table tr`).not(':first');
            allTrs.hide();
            for(let i=0 ; i < numberOfRecordes; i++){
                allTrs[i].style = "";
            }
        } else if(numberOfRecordes > 10){
            var allTrs = $(`table tr`).not(':first');
            allTrs.hide();
            for(let i=0 ; i < 10; i++){
                allTrs[i].style = "";
            }
            let pigUl = $('nav ul');
            for(let j=Math.ceil(numberOfRecordes/10); j>1;j--){
                let newLi = $(`<li class="page-item liC" id=li${j}><a class="page-link" href="#">${j}</a></li>`);
                newLi.insertAfter('nav ul #li1');
            }
        }
    },100);
    /**********pagination clicking element handling*******/
    setTimeout(function(){
        let allLi = $('nav ul li.liC');
        
        allLi.on('click',function(e){
            e.preventDefault();
            let nPage = parseInt(e.target.innerText);
            var allTrs = $(`table tr`).not(':first');
            allTrs.hide();
            if(numberOfRecordes < (nPage*10))
            loopEnd = numberOfRecordes;
            else
            loopEnd = (nPage*10);


            for(let i=((nPage*10)-10) ; i < loopEnd; i++){
                allTrs[i].style = "";
            }
            for(let j=0 ; j < allLi.length; j++){
                if(allLi[j].firstChild.classList.contains('selectedLi')){
                    allLi[j].firstChild.classList.remove('selectedLi'); 
                }
            }
             e.target.classList.add('selectedLi');
        })
    },100)
    /********Select Option******/
    function op(currentSelectedVal = 10){
        
       currentSelectedVal = selectOption.val()
       if(isNaN(currentSelectedVal)) currentSelectedVal=numberOfRecordes;
        if(currentSelectedVal > numberOfRecordes){
            currentSelectedVal=numberOfRecordes;
            var text = `<p>there are only ${currentSelectedVal} Students</p>`;
            nOfR[0].innerHTML = text;
        } else{
              var text = `<p>${currentSelectedVal} Students</p>`;
                nOfR[0].innerHTML = text;
        }
        
        var allTrs = $(`table tr`).not(':first');
        allTrs.hide();
        
        for(let i=0 ; i < currentSelectedVal; i++){
            //allTrs[i].css({display: 'block'});
            allTrs[i].style = "";
        }
      
        nOfR.toggleClass('newDataStyle');
        setTimeout(function(){
            nOfR.toggleClass('newDataStyle');
        },2000);
    }
    selectOption.on('change',op);
    /*********Sorting*******/
        $('th').click(function(){
            var table = $(this).parents('table').eq(0);
            var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
            this.asc = !this.asc;
            if (!this.asc){rows = rows.reverse()}
            for (var i = 0; i < rows.length; i++){table.append(rows[i])}
            })
    
            function comparer(index) {
                return function(a, b) {
                var valA = getCellValue(a, index), valB = getCellValue(b, index)
                return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
                }
            }
    
            function getCellValue(row, index){ return $(row).children('td').eq(index).text()}
        
    /*********************/
    
    /*****************retriving data from JSON file***************************/
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'instructors.txt');
    xhr.send();
    $.ajax({
             url:"instructors.txt",
             method:"get",
             success:function(res){
                var res = xhr.responseText;
                res = JSON.parse(xhr.responseText);
                numberOfRecordes = res.length;
                for (var i = 0; i < res.length; i++) {
                        /*newtr = "<tr>";
                        var tdsvals = "<td>" + res[i].name + "</td>";
                        newtr += tdsvals+"</tr>";
                        tab.css('opacity','1');
                        tab.innerHTML += newtr; */
                        /************/
                        var tr = $(`<tr></tr>`);
                        var td = $(`<td>${res[i].id}</td>
                                    <td>${res[i].name}</td>
                                    <td>${res[i].position}</td>
                                    <td>${res[i].office}</td>
                                    <td>${res[i].age}</td>
                                    <td>${res[i].startDate}</td>
                                    <td>${res[i].salary}</td>
                                    <td><button class="delete btn" style="background:none" data-toggle="modal" data-target="#confirmModel">${res[i].delete}</button></td>
                                    <td><a href="#" class="edit">${res[i].edit}</a></td>`);
                        tr.append(td);
                        tBody.append(tr);
                        tab.append(tBody);
                        tab.css('opacity','1');
                        /************/

                 }
             },
             error:function(erro){
                 console.log(erro)
             }
    })
    
    /*******updating data at JSON file data from JSON file*************/
     
    
    /** Search Function**/
    searchInput.on('keyup',function(e){
        var alllTd = $(`table tr td`);
        alllTd.parent().hide();

        var allTd = $(`table tr td:contains(${searchInput.val()})`);
        allTd.parent().show();
    });
   

    /** Display button click handling**/
    display.on('click', function(){
        if(display[0].innerHTML == "Display Data"){
            if(numberOfRecordes > 0){
                display[0].innerHTML = "Hide Data"
                tab.css('opacity','1');
            }else{
                isThereData.toggleClass('newDataStyle');
                isThereData.toggleClass('oldDateStyle');
                setTimeout(function(){
                    isThereData.toggleClass('newDataStyle');
                    isThereData.toggleClass('oldDateStyle');
                },5000)
            }
        } else{
            display[0].innerHTML = "Display Data";
            tab.css('opacity','0');
        }
    })
        
    /** Add data button click handling**/
    add.on('click', function(e){
         var st1 = studentInfo(numberOfRecordes+1,userName.val(),position.val(), office.val(), age.val(), startDate.val(), salary.val());
        
        
        if(userName.val().length == 0 || office.val().length == 0 || age.val().length == 0|| startDate.val().length == 0 || salary.val().length == 0 || position.val().length == 0 ){
            e.preventDefault();
            alert1.css('display', 'block');
        }else{
            e.preventDefault();
            
            /*************************************************
            
            
            /****************************************************/
                var tr = $(`<tr></tr>`);
                tBody.append(tr);
                for(key in st1){
                    switch(st1[key]){
                        case 'Delete':
                            var td = $('<td></td>');
                            var a = $('<button class="delete btn" style="background:none" data-toggle="modal" data-target="#confirmModel"></button>');
                            a.append(st1[key]);
                            td.append(a);
                            tr.append(td);
                        break;
                        case 'Edit':
                            var td = $('<td></td>');
                            var a = $('<a class="edit" href="#">');
                            td.append(a);
                            tr.append(td);
                            a.append(st1[key]);
                        break;
                        default: 
                            var td = $('<td></td>');
                            tr.append(td);
                            td.append(st1[key]); 
                    }
                }
                numberOfRecordes++;
                op();
                alert1.css('display', 'none');
                if(display[0].innerHTML == "Display Data"){
                    newData[0].innerHTML = "A new student has been added Succesfully, Press Display button to see results";
                }else{
                    newData[0].innerHTML = "A new student has been added Succesfully";
                }
                newData.toggleClass('newDataStyle');
                newData.toggleClass('oldDateStyle');
                setTimeout(function(){
                    newData.toggleClass('newDataStyle');
                    newData.toggleClass('oldDateStyle');
                },3000)
                add.attr('data-dismiss','modal');
                userName.val(null);office.val(null);salary.val(null);age.val(null);position.val(null);startDate.val(null);
        }
    })
    let confirm = $('#confirm');
    let cancel = $('#cancel');

    //*Delete data button click handling*//
    tab.on('click', function(e){
        if(e.target.classList.contains('delete')){
            let tr = e.target.closest("tr");
            confirm.on('click',function(){
                tr.remove();
                numberOfRecordes--;
                /*if(numberOfRecordes == 0){
                    tab.css('opacity','0');
                    display[0].innerHTML = "Display Data";
                }*/
            })
        }
    });
    //*Edit data button click handling*//
    tab.on('click', function(e){
        if(e.target.innerHTML == 'Edit'){
            e.target.innerHTML = "Save";
            var tr = e.target.closest('tr');
            tr.style.backgroundColor = "yellow";
            for(var i=0; i < 7; i++){
                var temp = tr.children[i].innerHTML;
                var inn = `<input class="form-control" type="text" value="${tr.children[i].innerHTML}"/>`;
                tr.children[i].innerHTML = inn;
            }
        } else if(e.target.innerHTML == 'Save'){
                e.target.innerHTML = "Edit";
                var tr = e.target.closest('tr');
                tr.style.backgroundColor = "";
                for(var i=0; i < 7; i++){
                    var inp = tr.children[i].children;
                    inp[0].parentElement.innerHTML = inp[0].value;
                }
        }
    });
    
    
    
})

function studentInfo (_id, _name, _position, _office, _age, _startDate, _salary){
    return{
        id: _id,
        name : _name,
        position : _position,
        office : _office,
        age : _age,
        startDate : _startDate,
        salary : _salary,
        delete: "Delete",
        edit: "Edit"
    }
}


