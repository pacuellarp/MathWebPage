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
        this.perimeter=2*Math.PI()*this.radio;
    }
    calArea(){
        this.area=Math.PI()*(this.radio**2);
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
        if(this.height==0){
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
        this.beta = Math.PI()-this.alpha-this.gamma;
    }
    calTypeTriangle(){
        if(this.sideOne==this.sideTwo && this.sideOne==this.sideThree){
            this.typeSideTriangle="Equilátero";
        }else if((this.sideOne==this.sideThree && this.sideOne!=this.sideTwo) || (this.sideOne==this.sideTwo && this.sideOne!=this.sideThree) || (this.sideTwo==this.sideThree && this.sideOne!=this.sideTwo)){
            this.typeSideTriangle="Isósceles";
        }else if((this.sideOne!=this.sideTwo && this.sideOne!=this.sideThree) && this.sideThree!=this.sideTwo){
            this.typeSideTriangle="Escaleno";
        }
        if(this.alpha==Math.PI()/2 || this.beta==Math.PI()/2 || this.gamma==Math.PI()/2){
            this.typeAngleTriangle = "rectángulo";
        }else if(this.alpha<Math.PI()/2 && this.beta<Math.PI()/2 && this.gamma<Math.PI()/2){
            this.typeAngleTriangle = "acutángulo";
        }else if(this.alpha>Math.PI()/2 || this.beta>Math.PI()/2 || this.beta>Math.PI()/2){
            this.typeAngleTriangle = "obtusángulo";
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

function Verification(idIncomingData, mininumNullsAccepted){
    let box;
    let boxValue;
    let nulls=0;
    for(var i=0;i<idIncomingData.length;i++){
        box = document.getElementById(idIncomingData[i]);//Revisa cada caja con el id indicado
        if(a){//Espera que exista el valor
            boxVale=a.value*1;
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

function CalTriangle(){
    let verificationNumber=Verification(["firstSideTriangle","secondSideTriangle","thirdSideTriangle","heightTriangle"],1);
    if(verificationNumber==1){
        console.log("Yes!");
    }else{
        console.log("Oh no...");
    }
}