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
        this.perimeter=2*Math.PI*this.radio;
    }
    calArea(){
        this.area=Math.PI*(this.radio**2);
    }
}

class CircularSector extends Circle{
    constructor(perimeter,area, radio, centralAngle, arcLenght){
        super(perimeter,area, radio);
        this.centralAngle=centralAngle;
        this.arcLenght=arcLenght;
    }
    calPerimeter(){
        this.perimeter=(this.radio*2)+this.arcLenght;
    }
    calArea(){
        this.area=(this.radio**2)*this.centralAngle/2;
    }
    calParameter(){
        if(this.radio==0){
            this.radio=this.arcLenght/this.centralAngle;
        }else if(this.centralAngle==0){
            this.centralAngle=this.arcLenght/this.radio;
        }else if(this.arcLenght==0){
            this.arcLenght=this.radio*this.centralAngle;
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
        this.area = this.sideOne*this.sideOne;
    }
    calPerimeter(){
        this.perimeter = this.sideOne*4;
    }
}

class Rhombus extends Sides{
    constructor(perimeter, area, sideOne, diagonalOne, diagonalTwo){
        super(perimeter, area, sideOne);
        this.diagonalOne=diagonalOne;
        this.diagonalTwo=diagonalTwo;
    }
    calArea(){
        this.area = this.sideOne*this.sideOne;
    }
    calPerimeter(){
        this.perimeter = this.sideOne*4;
    }
    calDiagonal(){
        if(this.diagonalOne == 0){
            this.diagonalOne = (this.area*2)/this.diagonalTwo;
        }else if(this.diagonalTwo == 0){
            this.diagonalTwo = (this.area*2)/this.diagonalOne;
        }else if(this.sideOne == 0){
            this.sideOne = (this.diagonalOne*this.diagonalTwo)/2;
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
        this.area = (this.perimeter*this.apothem)/2;
    }
    calPerimeter(){
        this.perimeter = this.nSides*this.sideOne;
    }
    calApothem(){
        if(this.apothem == 0){
            this.apothem = this.sideOne/(2*Math.tan(Math.PI/this.nSides));
        }else if (this.sideOne == 0){
            this.sideOne = (2*Math.tan(Math.PI/this.nSides))*this.apothem;
        }else if(this.nSides == 0){
            this.nSides = Math.PI/(Math.atan(this.sideOne/(2*this.apothem)));
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
        this.base = this.sideTwo;
        this.area = (this.base*this.height)/2;
    }
    calPerimeter(){
        this.perimeter = this.sideOne+this.sideTwo+this.sideThree;
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
    }
    calSide(){
        if(this.sideOne==0){
            this.sideOne = Math.sqrt((this.height**2)+((this.sideTwo-(this.sideThree*Math.cos(Math.asin(this.height/this.sideThree))))**2));
        }else if(this.sideTwo==0){
            this.sideTwo = (this.sideOne*Math.cos(Math.asin(this.height/this.sideOne)))+(this.sideThree*Math.cos(Math.asin(this.height/this.sideThree)));
        }else if(this.sideThree==0){
            this.sideThree = Math.sqrt((this.height**2)+((this.sideTwo-(this.sideOne*Math.cos(Math.asin(this.height/this.sideOne))))**2));
        }
    }
    calInternalAngles(){
        this.gamma = Math.asin(this.height/this.sideOne);
        this.alpha = Math.asin(this.height/this.sideThree);
        this.beta = Math.PI-this.alpha-this.gamma;
    }
    calTypeTriangle(){
        if(this.sideOne==this.sideTwo && this.sideOne==this.sideThree){
            this.typeSideTriangle="Equilátero";
        }else if((this.sideOne==this.sideThree && this.sideOne!=this.sideTwo) || (this.sideOne==this.sideTwo && this.sideOne!=this.sideThree) || (this.sideTwo==this.sideThree && this.sideOne!=this.sideTwo)){
            this.typeSideTriangle="Isósceles";
        }else if((this.sideOne!=this.sideTwo && this.sideOne!=this.sideThree) && this.sideThree!=this.sideTwo){
            this.typeSideTriangle="Escaleno";
        }
        if(this.alpha==Math.PI/2 || this.beta==Math.PI/2 || this.gamma==Math.PI/2){
            this.typeAngleTriangle = "Rectángulo";
        }else if(this.alpha<Math.PI/2 && this.beta<Math.PI/2 && this.gamma<Math.PI/2){
            this.typeAngleTriangle = "Acutángulo";
        }else if(this.alpha>Math.PI/2 || this.beta>Math.PI/2 || this.beta>Math.PI/2){
            this.typeAngleTriangle = "Obtusángulo";
        }
    }
}

class Rectangule extends BaseAndHeight{
    constructor(perimeter, area, base, height){
        super(perimeter, area, base, height);
    }
    calArea(){
        this.area = this.base*this.height;
    }
    calPerimeter(){
        this.perimeter = (this.base+this.height)*2;
    }
}

class Rhomboid extends BaseAndHeight{
    constructor(perimeter, area, sideOne, sideTwo, base, height, littleN){
        super(perimeter, area, sideOne, sideTwo, base, height);
        this.littleN=littleN;
    }
    calArea(){
        this.base=this.sideTwo;
        if(this.littleN==0){
            this.littleN=Math.sqrt(this.sideOne**2-this.height*2);
        }else{
            this.height = Math.sqrt(this.sideOne**2-this.littleN**2);
        }
        this.area=this.base*this.height;
    }
    calPerimeter(){
        this.perimeter = (this.base+this.height)*2;
    }
}

class Trapezium extends BaseAndHeight{
    constructor (perimeter, area, sideOne, sideTwo, height, sideThree, sideFour) {
        super(perimeter, area, sideOne, sideTwo, height, sideThree);
        this.sideFour=sideFour;
    }
    calArea(){
        this.area = (this.sideOne+this.sideTwo)*this.height/2;
    }
    calPerimeter(){
        this.perimeter = this.sideOne+this.sideTwo+this.sideThree+this.sideFour;
    }
    calHeight(){
        this.height = Math.sqrt((-this.sideOne+this.sideTwo+this.sideThree+this.sideFour)*(this.sideOne-this.sideTwo+this.sideThree+this.sideFour)*(this.sideOne-this.sideTwo+this.sideThree-this.sideFour)*(this.sideOne-this.sideTwo-this.sideThree+this.sideFour))/(2*Math.abs(this.sideTwo-this.sideOne));
    }
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
            alert("Ingresa datos válidos para el cálculo.");//Evalúa si hay un número negativo para abortar todo
            i=idIncomingData.length;
            return 0;
        }
    }
    if(nulls>mininumNullsAccepted){//Compara si sobrepasa o no el número de datos vacíos admitidos
        alert("Ingresa el mínimo de datos requerido para el cálculo.");
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


function CalTriangle(){
    let objectKeysInOrder=["sideOne", "sideTwo", "sideThree", "height", "area", "perimeter", "alpha", "beta", "gamma", "typeSideTriangle", "typeAngleTriangle"];
    let idArray=["firstSideTriangle","secondSideTriangle","thirdSideTriangle","heightTriangle", "areaTriangle", "perimeterTriangle", "firstAngle", "secondAngle", "thirdAngle", "typeSideTriangle", "typeAngleTriangle"];
    let minimumIdArray = MinimumIdAccepted(idArray,4);
    let verificationNumber=Verification(minimumIdArray,1);
    if(verificationNumber==1){
        let triangle = new Triangle();
        OverwritingValues(minimumIdArray,objectKeysInOrder,triangle);
        triangle.calHeight();
        triangle.calSide();
        triangle.calInternalAngles();
        triangle.calTypeTriangle();
        triangle.calPerimeter();
        triangle.calArea();
        ValuesToShow(idArray,objectKeysInOrder,triangle);
        let canvasTriangle = document.getElementById("drawTriangle");
        let draw = canvasTriangle.getContext("2d");
        let b;
        let m=triangle.sideOne*Math.cos(triangle.gamma);
        let h;
        if (triangle.base >= triangle.height){
            b=250;
            m=(m/triangle.base)*b;  
            h=triangle.height*250/triangle.base;
        }else{
            h=0;
            b=triangle.base*250/triangle.height;
            m=(m/triangle.base)*b;  
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

