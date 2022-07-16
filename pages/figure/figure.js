class Figure{
    constructor(perimeter,area){
        this.perimeter=perimeter;
        this.area=area;
    }
    calPerimeter(){
        return "Este es el perímetro";
    }
    calArea(){
        return "Esta es la área";
    }
}

class Circle extends Figure{
    constructor(perimeter,area, radio){
        super(perimeter,area);
        this.radio=radio;
    }
    calPerimeter(){
        this.perimeter=Math.round(2*Math.PI*this.radio*1000)/1000;
    }
    calArea(){
        this.area=Math.round(Math.PI*(this.radio**2)*1000)/1000;
    }
}

class CircularSector extends Circle{
    constructor(perimeter,area, radio, centralAngle, arcLenght){
        super(perimeter,area, radio);
        this.centralAngle=centralAngle;
        this.arcLenght=arcLenght;
    }
    calPerimeter(){
        this.perimeter=Math.round(((this.radio*2)+this.arcLenght)*1000)/1000;
    }
    calArea(){
        this.area=Math.round((this.radio**2)*1000*(this.centralAngle*Math.PI/180)/2)/1000;
    }
    calParameter(){
        if(this.radio==0){
            this.radio=Round(this.arcLenght/(this.centralAngle*Math.PI/180));
        }else if(this.centralAngle==0){
            this.centralAngle=Round((this.arcLenght/this.radio)*(180/Math.PI));
        }else if(this.arcLenght==0){
            this.arcLenght=Round(this.radio*(this.centralAngle*Math.PI/180));
        }
    }
}

class Sides extends Figure{
    constructor(perimeter, area, sideOne, sideTwo){
        super(perimeter,area);
        this.sideOne=sideOne;
        this.sideTwo=sideTwo;
    }
}

class Square extends Sides{
    constructor(perimeter, area, sideOne){
        super(perimeter, area, sideOne);
    }
    calArea(){
        this.area = Round(this.sideOne*this.sideOne);
    }
    calPerimeter(){
        this.perimeter = Round(this.sideOne*4);
    }
}

class Rhombus extends Sides{
    constructor(perimeter, area, sideOne, diagonalOne, diagonalTwo){
        super(perimeter, area, sideOne);
        this.diagonalOne=diagonalOne;
        this.diagonalTwo=diagonalTwo;
    }
    calArea(){
        this.area = Round(this.diagonalOne*this.diagonalTwo/2);
    }
    calPerimeter(){
        this.perimeter = Round(this.sideOne*4);
    }
    calDiagonal(){
        if(this.diagonalOne == 0){
            this.diagonalOne = Round(Math.sqrt(((this.sideOne)**2)-((this.diagonalTwo/2)**2))*2);
        }else if(this.diagonalTwo == 0){
            this.diagonalTwo = Round(Math.sqrt(((this.sideOne)**2)-((this.diagonalOne/2)**2))*2);
        }else if(this.sideOne == 0){
            this.sideOne = Round(Math.sqrt(((this.diagonalOne/2)**2)+((this.diagonalTwo/2)**2)));
        }
    }
}

class Polygon extends Sides{
    constructor(perimeter, area, sideOne, nSides, apothem){
        super(perimeter, area, sideOne);
        this.nSides=nSides;
        this.apothem=apothem;
    }
    calArea(){
        this.area = Round((this.perimeter*this.apothem)/2);
    }
    calPerimeter(){
        this.perimeter = Round(this.nSides*this.sideOne);
    }
    calApothem(){
        if(this.apothem == 0){
            this.apothem = Round(this.sideOne/(2*Math.tan(Math.PI/this.nSides)));
        }else if (this.sideOne == 0){
            this.sideOne = Round((2*Math.tan(Math.PI/this.nSides))*this.apothem);
        }else if(this.nSides == 0){
            this.nSides = Round(Math.PI/(Math.atan(this.sideOne/(2*this.apothem))));
        }
    }
}

class BaseAndHeight extends Sides{
    constructor(perimeter, area, sideOne, sideTwo, base, height, sideThree){
        super(perimeter, area, sideOne, sideTwo);
        this.base=base;
        this.height=height;
        this.sideThree=sideThree;
    }
}

class Triangle extends BaseAndHeight{
    constructor (perimeter, area, sideOne, sideTwo, base, height, sideThree, alpha, beta, gamma, typeSideTriangle, typeAngleTriangle){
        super(perimeter, area, sideOne, sideTwo, base, height, sideThree);
        this.alpha=alpha;
        this.beta=beta;
        this.gamma=gamma;
        this.typeSideTriangle=typeSideTriangle;
        this.typeAngleTriangle=typeAngleTriangle;
    }
    calArea(){
        this.base = Math.round(this.sideTwo*1000)/1000;
        this.area = Math.round((this.base*this.height/2)*1000)/1000;
    }
    calPerimeter(){
        this.perimeter = Math.round((this.sideOne+this.sideTwo+this.sideThree)*1000)/1000;
    }
    calHeight(){
        if(this.sideOne!=0 && this.sideTwo!=0 && this.sideThree!=0){
            if(this.sideOne==this.sideTwo && this.sideOne==this.sideThree){
                this.height = Math.sqrt((this.sideOne**2)-((this.sideOne/2)**2));
            }else if(this.sideOne==this.sideThree && this.sideOne!=this.sideTwo){
                this.height = Math.sqrt((this.sideOne**2)-((this.sideTwo/2)**2));
            }else if((this.sideOne!=this.sideTwo && this.sideOne!=this.sideThree) && this.sideThree!=this.sideTwo){
                this.height = (2/this.sideTwo)*Math.sqrt(((this.sideOne+this.sideTwo+this.sideThree)/2)*(((this.sideOne+this.sideTwo+this.sideThree)/2)-this.sideOne)*(((this.sideOne+this.sideTwo+this.sideThree)/2)-this.sideTwo)*(((this.sideOne+this.sideTwo+this.sideThree)/2)-this.sideThree));
            }
        }
        this.height=Math.round(this.height*1000)/1000;
    }
    calSide(){
        if(this.sideOne==0){
            this.sideOne = Math.sqrt((this.height**2)+((this.sideTwo-(this.sideThree*Math.cos(Math.asin(this.height/this.sideThree))))**2));
            this.sideOne=Math.round(this.sideOne*1000)/1000;
        }else if(this.sideTwo==0){
            this.sideTwo = (this.sideOne*Math.cos(Math.asin(this.height/this.sideOne)))+(this.sideThree*Math.cos(Math.asin(this.height/this.sideThree)));
            this.sideTwo=Math.round(this.sideTwo*1000)/1000;
        }else if(this.sideThree==0){
            this.sideThree = Math.sqrt((this.height**2)+((this.sideTwo-(this.sideOne*Math.cos(Math.asin(this.height/this.sideOne))))**2));
            this.sideThree=Math.round(this.sideThree*1000)/1000;
        }
    }
    calInternalAngles(){
        this.gamma = Math.round(Math.asin(this.height/this.sideOne)*(180/Math.PI)*1000)/1000;
        this.alpha = Math.round(Math.asin(this.height/this.sideThree)*(180/Math.PI)*1000)/1000;
        this.beta = Math.round((180-this.alpha-this.gamma)*1000)/1000;
    }
    calTypeTriangle(){
        if(this.sideOne==this.sideTwo && this.sideOne==this.sideThree){
            this.typeSideTriangle="Equilateral";
        }else if((this.sideOne==this.sideThree && this.sideOne!=this.sideTwo) || (this.sideOne==this.sideTwo && this.sideOne!=this.sideThree) || (this.sideTwo==this.sideThree && this.sideOne!=this.sideTwo)){
            this.typeSideTriangle="Isosceles";
        }else if((this.sideOne!=this.sideTwo && this.sideOne!=this.sideThree) && this.sideThree!=this.sideTwo){
            this.typeSideTriangle="Scalene";
        }
        if(this.alpha==90 || this.beta==90 || this.gamma==90){
            this.typeAngleTriangle = "Right";
        }else if(this.alpha<90 && this.beta<90 && this.gamma<90){
            this.typeAngleTriangle = "Acute";
        }else if(this.alpha>90 || this.beta>90 || this.gamma>90){
            this.typeAngleTriangle = "Obtuse";
        }
    }
}

class Rectangle extends BaseAndHeight{
    constructor(perimeter, area, base, height){
        super(perimeter, area, base, height);
    }
    calArea(){
        this.area = Round(this.base*this.height);
    }
    calPerimeter(){
        this.perimeter = Round((this.base+this.height)*2);
    }
}

class Rhomboid extends BaseAndHeight{
    constructor(perimeter, area, sideOne, sideTwo, height, littleN, base){
        super(perimeter, area, sideOne, sideTwo, height, base);
        this.littleN=littleN;
    }
    calArea(){
        this.base=this.sideTwo;
        if(this.littleN==0){
            this.littleN=Round(Math.sqrt(this.sideOne**2-this.height**2));
        }else{
            this.height = Round(Math.sqrt(this.sideOne**2-this.littleN**2));
        }
        this.area=Round(this.base*this.height);
    }
    calPerimeter(){
        this.perimeter = Round((this.base+this.height)*2);
    }
}

class Trapezium extends BaseAndHeight{
    constructor (perimeter, area, sideOne, sideTwo, height, sideThree, sideFour) {
        super(perimeter, area, sideOne, sideTwo, height, sideThree);
        this.sideFour=sideFour;
    }
    calArea(){
        this.area = Round((this.sideOne+this.sideTwo)*this.height/2);
    }
    calPerimeter(){
        this.perimeter = Round(this.sideOne+this.sideTwo+this.sideThree+this.sideFour);
    }
    calHeight(){
        this.height = Round(Math.sqrt((-this.sideOne+this.sideTwo+this.sideThree+this.sideFour)*(this.sideOne-this.sideTwo+this.sideThree+this.sideFour)*(this.sideOne-this.sideTwo+this.sideThree-this.sideFour)*(this.sideOne-this.sideTwo-this.sideThree+this.sideFour))/(2*Math.abs(this.sideTwo-this.sideOne)));
    }
}

function Round(num){
    return Math.round((num)*1000)/1000;
}

function MinimumIdAccepted(idArray,minimumIdAccepted){//Ingresan el array de id de cada figura y la cantidad de id níminos aceptados
    return idArray.filter(
        (id,index)=>{
            if(index<minimumIdAccepted){
                return id;//Retorna un array recortado, que sólo contiene los id mínimos
            }
        }
    )
}

function Verification(idIncomingData, mininumNullsAccepted){//Recibe el array de id mínimos y el número mínimo de cajas vacías dentro de estos id mínimos
    let box;
    let boxValue;
    let nulls=0;
    for(var i=0;i<idIncomingData.length;i++){
        box = document.getElementById(idIncomingData[i]);//Revisa cada caja con el id indicado
        if(box){//Espera que exista el valor
            boxValue=box.value*1;
        }
        if(boxValue==0){//Cuenta cuántas cajas vacías hay
            nulls++;
        }else if(boxValue<0){
            alert("Enter valid data for the calculation.");//Evalúa si hay un número negativo para abortar todo
            i=idIncomingData.length;
            return 0;
        }
    }
    if(nulls>mininumNullsAccepted){//Compara si sobrepasa o no el número de datos vacíos admitidos
        alert("Enter the minimum data required for the calculation.");
        return 0;
    }else{
    return 1//Este valor es el que se usará para arrancar o no el cálculo de cada figura, con 0 no inicia, con 1 sí inicia
    }
} 

function OverwritingValues(idIncomingData,objectKeysInOrder,object){//Recibe el array de id mínimos, un array con los keys del objeto EN EL ORDEN QUE TIENE EL ARRAY DE ID, y el objeto de la figura
    let box;
    let boxValue=[];
    let objectKeys = objectKeysInOrder.filter(
        (key,index)=>{
            if(index<idIncomingData.length){
                return key;//Retorna un array recortado, que sólo contiene los keys relacionado a los id mínimos
            }
        }
    )
    for(var i=0;i<idIncomingData.length;i++){
        box = document.getElementById(idIncomingData[i]);//Revisa cada caja con el id indicado
        if(box){//Espera que exista el valor
            boxValue.push(box.value*1);//Rellena el array con los valores ingresados en cada caja
        }
    }
    for(var i=0;i<objectKeys.length;i++){
                object[objectKeys[i]] = boxValue[i];//Sobreescribe cada propiedad del objeto según su key enlazado al id de las cajas en la página. SE ENLAZAN CON EL ORDEN ANTERIOMENTE MENCIONADO.
    }
}

function ValuesToShow(idArray,objectKeysInOrder,object){
    let box;
    for(var i=0;i<idArray.length;i++){
        box = document.getElementById(idArray[i]);//Revisa cada caja con el id indicado
        if(box){//Espera que exista el valor
            box.value = object[objectKeysInOrder[i]];
        }
    }
}

//Lista de listas de id por figura
let idArrays = [["firstSideTriangle","secondSideTriangle","thirdSideTriangle","heightTriangle", "areaTriangle", "perimeterTriangle", "firstAngle", "secondAngle", "thirdAngle", "typeSideTriangle", "typeAngleTriangle"],["radioCircle","areaCircle","perimeterCircle"],["sideSquare","areaSquare","perimeterSquare"], ["baseRectangle","heightRectangle","areaRectangle","perimeterRectangle"],["radioCircularSector", "centralAngleCircularSector", "arcLenghtCircularSector", "areaCircularSector", "perimeterCircularSector"],["sideRhombus","diagonalOneRhombus","diagonalTwoRhombus","areaRhombus","perimeterRhombus"],[ "sidePolygon","nSides","apothem","areaPolygon","perimeterPolygon"],["sideOneRhomboid", "sideTwoRhomboid", "heightRhomboid","littleNRhomboid", "baseRhomboid", "areaRhomboid", "perimeterRhomboid"],["sideOneTrapezium", "sideTwoTrapezium", "sideThreeTrapezium", "sideFourTrapezium", "heightTrapezium", "areaTrapezium", "perimeterTrapezium"]]
//Lista de listas de object keys de cada objeto por figura
let AllObjectKeysInOrder=[["sideOne", "sideTwo", "sideThree", "height", "area", "perimeter", "alpha", "beta", "gamma", "typeSideTriangle", "typeAngleTriangle"],["radio","area","perimeter"],["sideOne", "area", "perimeter"],["base","height","area","perimeter"],["radio", "centralAngle", "arcLenght", "area", "perimeter"],["sideOne","diagonalOne","diagonalTwo","area","perimeter"],[ "sideOne","nSides","apothem","area","perimeter"],[ "sideOne", "sideTwo", "height", "littleN", "base", "area", "perimeter"],["sideOne", "sideTwo", "sideThree", "sideFour", "height", "area", "perimeter"]];

//Array para almacenar los id de los botones de Clear
const idClear=[];
//Array para almacenar el espacio de cada botón de Clear
const clear=[];

//Se almacenan los id y los espacios de los botones de Clear
for(i=0;i<9;i++){ 
    idClear.push("clear"+i);
    clear.push(document.getElementById(idClear[i]));
}

function Clear(evt){//El parámetro será los id de los datos de la figura, los cuales (datos) serán borrados
    let box;
    for(var i=0;i<evt.currentTarget.myParam.length;i++){//Ese evt.currentTarget.myParam servirá para obtener el parámetro desde target attribute del evento (https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function)
        box = document.getElementById(evt.currentTarget.myParam[i]);//Revisa cada caja con el id indicado
        if(box){//Espera que exista el valor
            box.value = "";//Lo borra
        }
    }
}

//Se crean los addEventListener de cada botón que llamará la función para borrar
for(i=0;i<9;i++){
    clear[i].addEventListener("click",Clear,false);
    clear[i].myParam = idArrays[i];//Aquí, se alamcena en el párametro en el target attribute del evento, pues el addEventListener no permite una función con parámetro
}

function CalTriangle(){
    let objectKeysInOrder=AllObjectKeysInOrder[0];
    let idArray=idArrays[0];
    let minimumIdArray = MinimumIdAccepted(idArray,4);
    let verificationNumber=Verification(minimumIdArray,1);
    if(verificationNumber==1){
        let triangle = new Triangle();
        OverwritingValues(minimumIdArray,objectKeysInOrder,triangle);
        let a=triangle.sideOne;
        let b=triangle.sideTwo;
        let c=triangle.sideThree;
        if((triangle.sideOne!=0 && triangle.sideTwo!=0) && triangle.sideThree!=0){
            if(triangle.sideTwo==triangle.sideThree && triangle.sideOne!=triangle.sideTwo){
                triangle.sideTwo=a;
                triangle.sideOne=b;
            }else if(triangle.sideOne==triangle.sideTwo && triangle.sideOne!=triangle.sideThree){
                triangle.sideTwo=c;
                triangle.sideThree=b;
            }else if((triangle.sideOne!=triangle.sideTwo && triangle.sideOne!=triangle.sideThree) && triangle.sideThree!=triangle.sideTwo){
                if((a>b && b>c) || (a>c && c>b) ){
                    triangle.sideTwo=a;
                    triangle.sideOne=b;
                }else if((c>a && a>b) || (c>b && b>a)){
                    triangle.sideTwo=c;
                    triangle.sideThree=b;
                }
            }
        }
        triangle.calHeight();
        triangle.calSide();
        triangle.calInternalAngles();
        triangle.calTypeTriangle();
        triangle.calPerimeter();
        triangle.calArea();
        ValuesToShow(idArray,objectKeysInOrder,triangle);
        let canvasTriangle = document.getElementById("drawTriangle");
        let draw = canvasTriangle.getContext("2d");
        let m=triangle.sideOne*Math.cos(triangle.gamma*(Math.PI/180));
        let h;
        if (triangle.base >= triangle.height){
            b=250;
            m=(m/triangle.base)*b;  
            h=triangle.height*250/triangle.base;
        }else{
            h=250;
            b=triangle.base*250/triangle.height;
            m=(m/triangle.base)*b;  
            console.log(h,b,m);
        }
        draw.clearRect(0,0,250,250);
        draw.beginPath();
        draw.moveTo(0,250);
        draw.lineTo(b,250);
        draw.stroke();
        draw.moveTo(b,250);
        draw.lineTo(m,250-h);
        draw.stroke();
        draw.strokeStyle="blue";
        draw.moveTo(m,250-h);
        draw.lineTo(0,250);
        draw.stroke();
        draw.closePath();
    }else{
        console.log("Oh no...");
    }
}

function calCircle(){
    let objectKeysInOrder=AllObjectKeysInOrder[1];
    let idArray=idArrays[1];
    let minimumIdArray = MinimumIdAccepted(idArray,1);
    let verificationNumber=Verification(minimumIdArray,0);
    if(verificationNumber==1){
        let circle = new Circle();
        OverwritingValues(minimumIdArray,objectKeysInOrder,circle);
        circle.calArea();
        circle.calPerimeter();
        ValuesToShow(idArray,objectKeysInOrder,circle);
    }else{
        console.log("Oh no...");
    }
}

function calSquare(){
    let objectKeysInOrder=AllObjectKeysInOrder[2];
    let idArray=idArrays[2];
    let minimumIdArray = MinimumIdAccepted(idArray,1);
    let verificationNumber=Verification(minimumIdArray,0);
    if(verificationNumber==1){
        let square = new Square();
        OverwritingValues(minimumIdArray,objectKeysInOrder,square);
        square.calArea();
        square.calPerimeter();
        ValuesToShow(idArray,objectKeysInOrder,square);
    }else{
        console.log("Oh no...");
    }
}

function calRectangle(){
    let objectKeysInOrder=AllObjectKeysInOrder[3];
    let idArray=idArrays[3];
    let minimumIdArray = MinimumIdAccepted(idArray,2);
    let verificationNumber=Verification(minimumIdArray,0);
    if(verificationNumber==1){
        let rectangle = new Rectangle();
        OverwritingValues(minimumIdArray,objectKeysInOrder,rectangle);
        rectangle.calArea();
        rectangle.calPerimeter();
        ValuesToShow(idArray,objectKeysInOrder,rectangle);
    }else{
        console.log("Oh no...");
    }
}

function calCircularSector(){
    let objectKeysInOrder=AllObjectKeysInOrder[4];
    let idArray=idArrays[4];
    let minimumIdArray = MinimumIdAccepted(idArray,3);
    let verificationNumber=Verification(minimumIdArray,1);
    if(verificationNumber==1){
        let circularSector = new CircularSector();
        OverwritingValues(minimumIdArray,objectKeysInOrder,circularSector);
        circularSector.calParameter();
        circularSector.calArea();
        circularSector.calPerimeter();
        ValuesToShow(idArray,objectKeysInOrder,circularSector);
    }else{
        console.log("Oh no...");
    }
}

function calRhombus(){
    let objectKeysInOrder=AllObjectKeysInOrder[5];
    let idArray=idArrays[5];
    let minimumIdArray = MinimumIdAccepted(idArray,3);
    let verificationNumber=Verification(minimumIdArray,1);
    if(verificationNumber==1){
        let rhombus = new Rhombus();
        OverwritingValues(minimumIdArray,objectKeysInOrder,rhombus);
        rhombus.calDiagonal();
        rhombus.calArea();
        rhombus.calPerimeter();
        ValuesToShow(idArray,objectKeysInOrder,rhombus);
    }else{
        console.log("Oh no...");
    }
}

function calPolygon(){
    let objectKeysInOrder=AllObjectKeysInOrder[6];
    let idArray=idArrays[6];
    let minimumIdArray = MinimumIdAccepted(idArray,3);
    let verificationNumber=Verification(minimumIdArray,1);
    if(verificationNumber==1){
        let polygon = new Polygon();
        OverwritingValues(minimumIdArray,objectKeysInOrder,polygon);
        polygon.calApothem();
        polygon.calPerimeter();
        polygon.calArea();
        ValuesToShow(idArray,objectKeysInOrder,polygon);
    }else{
        console.log("Oh no...");
    }
}

function calRhomboid(){
    let objectKeysInOrder=AllObjectKeysInOrder[7];
    let idArray=idArrays[7];
    let minimumIdArray = MinimumIdAccepted(idArray,4);
    let verificationNumber=Verification(minimumIdArray,1);
    if(verificationNumber==1){
        let rhomboid = new Rhomboid(); 
        OverwritingValues(minimumIdArray,objectKeysInOrder,rhomboid);
        rhomboid.calArea();
        rhomboid.calPerimeter();
        ValuesToShow(idArray,objectKeysInOrder,rhomboid);
    }else{
        console.log("Oh no...");
    }
}

function calTrapezium(){
    let objectKeysInOrder=AllObjectKeysInOrder[8];
    let idArray=idArrays[8];
    let minimumIdArray = MinimumIdAccepted(idArray,4);
    let verificationNumber=Verification(minimumIdArray,0);
    if(verificationNumber==1){
        let trapezium = new Trapezium(); 
        OverwritingValues(minimumIdArray,objectKeysInOrder,trapezium);
        trapezium.calHeight();
        trapezium.calArea();
        trapezium.calPerimeter();
        ValuesToShow(idArray,objectKeysInOrder,trapezium);
    }else{
        console.log("Oh no...");
    }

}