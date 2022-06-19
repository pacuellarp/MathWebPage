var inputOne;
var inputTwo;
var inputThree;

let a;
var b;
var c;
var h;


function isos(){


    inputOne= document.getElementById("firstSide");
    inputTwo= document.getElementById("secondSide");
    inputThree= document.getElementById("thirdSide");

    a=inputOne.value*1;
    b=inputTwo.value*1;
    c=inputThree.value*1;

    if(a>0 && b>0 && c>0){
        }if ((a==b && a==c && b==c) || (a!==b && a!==c && b!==c)){
            alert("Los lados no coinciden a un triángulo isósceles, revisa los datos ingresados y vuélvelo a intentar.");
        }else if(a===b){
            if(a>c/2){
                h=Math.sqrt((a*a)-((c*c)/4));
                alert("La altura del triángulo es " + h);
            }else{
                alert("Los lados no coinciden a un triángulo isósceles, revisa los datos ingresados y vuélvelo a intentar.");
            };
        }else if(a==c){
            if(a>b/2){
                h=Math.sqrt((a*a)-((b*b)/4));
                alert("La altura del triángulo es " + h);
            }else{
                alert("Los lados no coinciden a un triángulo isósceles, revisa los datos ingresados y vuélvelo a intentar.");
            };
        }else if(b==c){
            if(b>a/2){
                h=Math.sqrt((b*b)-((a*a)/4));
                alert("La altura del triángulo es " + h);
            }else{
                alert("Los lados no coinciden a un triángulo isósceles, revisa los datos ingresados y vuélvelo a intentar.");
            };
        }else{
        alert("Uno o varios de los lados no tienen un tamaño real, revisa los datos ingresados y vuélvelo a intentar.");
    };
};

