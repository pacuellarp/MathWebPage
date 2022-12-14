var a = document.getElementById('isPoblation');
var b = document.getElementById('isItPobOrSam');
var c = document.getElementById('spaces');

a.addEventListener('change', ()=>{
    if (a.value == 'Yes'){
        b.innerText = "Population standard deviation";
    }else{
        b.innerText = "Sample standard deviation";
    }
},b.innerText = "Population standard deviation");


