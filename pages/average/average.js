let isPoblation = document.getElementById('isPoblation');
let isItPobOrSam = document.getElementById('isItPobOrSam');
let sorted = document.getElementById('sorted');
let spaces = document.getElementById('spaces');
let inputData = document.getElementById('inputDataStatistical');
let outputData = document.getElementById('outputDataStatistical');
let table = document.getElementById('outliersTable');
let data = '';

let idArrays=["arithmeticMean","median","mode","firstQuartile","thirdQuartile","midRange","standardDeviation","variance","interquartileRange","range","coefVariation","quartileCoefDispersion","geometricMean","harmonicMean","rootMeanSquare","interquartileMean"]

function Round(num){
    return Math.round((num)*1000)/1000;
}

isPoblation.addEventListener('change', ()=>{
    if (isPoblation.value == 'Yes'){
        isItPobOrSam.innerText = "Population standard deviation";
    }else{
        isItPobOrSam.innerText = "Sample standard deviation";
    }
},isItPobOrSam.innerText = "Population standard deviation");

function addCode(s,o){
    if (s==1){
        spaces.innerText = "Your data had spaces, but it's ok.";
    }else{
        spaces.innerText ="";  
    };
    if (o==1){
        sorted.innerText = "Here is your numeric data, now is sorted.";
    }else{
        sorted.innerText = "Your data already were sorted, great!";
    }
}

function sortedAndSpaces(){
    let s=0;
    let o=0;
    let isNum = 0;
    data = inputData.value.replace(/\s+/g,'');
    if(data != inputData.value){
        s=1;
    }
    data = data.split(',');
    for (var i=0; i<data.length;i++){
        if(!(data[i]*1<=0 || data[i]*1>0)){
            isNum += 1;
        }else{
            data[i] = data[i]*1;
        };
    };
    const data0=data.slice();
    if(isNum == 0){
        data = data.sort((a,b) => a-b);
        for(var i = 0; i < data.length; i++){
            if (data[i] != data0[i]){
                o+=1;
            }else{
            };
          };
          if (o != 0){
            o=1;
          };
        addCode(s,o);
        return 1;
    }else{
        return 0;
    };
};

function outData(){
    outputData.value=data[0];
    for (var i=1;i<data.length;i++){
        outputData.value+= `,${data[i]}`;
    };
};

class LocAndDis{
    constructor(arithmeticMean,median,mode,firstQuartile,thirdQuartile,midRange,standardDeviation,variance,interquartileRange,range,coefVariation,quartileCoefDispersion,geometricMean,harmonicMean,rootMeanSquare,interquartileMean){
        this.arithmeticMean=arithmeticMean;
        this.median=median;
        this.mode=mode;
        this.firstQuartile=firstQuartile;
        this.thirdQuartile=thirdQuartile;
        this.midRange=midRange;
        this.standardDeviation=standardDeviation;
        this.variance=variance;
        this.interquartileRange=interquartileRange;
        this.range=range;
        this.coefVariation=coefVariation;
        this.quartileCoefDispersion=quartileCoefDispersion;
        this.geometricMean=geometricMean;
        this.harmonicMean=harmonicMean;
        this.rootMeanSquare=rootMeanSquare;
        this.interquartileMean=interquartileMean;
    }
    calArithmeticMean(){
        this.arithmeticMean=Round(data.reduce((a,b)=>a+b,0)/data.length);
    }
    calMedian(){
        const mid = Math.floor(data.length / 2);
        if( data.length % 2 !== 0){
            this.median=data[mid];
        }else{
            this.median=(data[mid - 1] + data[mid]) / 2;
        };
    }
    calMode(){
        const data0=data.slice()
        this.mode=data0.sort((a,b) =>
            data0.filter(v => v===a).length
            - data0.filter(v => v===b).length
        ).pop();
    };
    calQuartiles(){
        let data1=[]
        let data2=[]
        const mid = Math.floor(data.length / 2);
        if(data.length%2!==0){
            data1=data.slice(0,mid);
            data2=data.slice(mid+1)
        }else{
            data1=data.slice(0,mid);
            data2=data.slice(mid)
        }
        const mid1 = Math.floor(data1.length / 2);
        if( data1.length % 2 !== 0){
            this.firstQuartile=data1[mid1];
        }else{
            this.firstQuartile=(data1[mid1 - 1] + data1[mid1]) / 2;
        };
        const mid2 = Math.floor(data2.length / 2);
        if( data2.length % 2 !== 0){
            this.thirdQuartile=data2[mid2];
        }else{
            this.thirdQuartile=(data2[mid2 - 1] + data2[mid2]) / 2;
        };
    }
    calmidRange(){
        this.midRange=(data[0]+data[data.length-1])/2
    }
    calStandardDeviation(){
        let dem=0;
        this.standardDeviation=0;
        if (isPoblation.value == 'Yes'){
            dem=data.length;
        }else{
            dem=data.length-1;
        }
        for(var i=0;i<data.length;i++){
            this.standardDeviation+=(data[i]-this.arithmeticMean)**2;
        };
        this.standardDeviation=this.standardDeviation/dem;
        this.standardDeviation=Round(Math.sqrt(this.standardDeviation));
    }
    calVariance(){
        this.variance=Round((this.standardDeviation)**2);
    }
    calInterquartileRange(){
        this.interquartileRange=this.thirdQuartile-this.firstQuartile;
    }
    calRange(){
        this.range=-data[0]+data[data.length-1]
    }
    calCoefVariation(){
        if(this.arithmeticMean==0){
            this.coefVariation="Tends to infinity";
        }else{
            this.coefVariation=Round(this.standardDeviation/this.arithmeticMean);
        }
    }
    calQuartileCoefDispersion(){
        this.quartileCoefDispersion=Round((this.thirdQuartile-this.firstQuartile)/(this.thirdQuartile+this.firstQuartile));
    }
    calGeometricMean(){
        let ver=0;
        for(var i=0;i<data.length;i++){
            if(data[i]<=0){
                ver+=1;
            };
        };
        if(ver!=0){
            this.geometricMean='';
        }else{
            this.geometricMean=data[0];
            for(var i=1;i<data.length;i++){
                  this.geometricMean=this.geometricMean*data[i];
            };
            this.geometricMean=(this.geometricMean)**(1/data.length)
        }
        this.geometricMean=Round(this.geometricMean)
    }
    calHarmonicMean(){
        this.harmonicMean=0;
        let ver=0;
        for(var i=0;i<data.length;i++){
            if(data[i]==0){
                ver+=1;
            };
        };
        if(ver!=0){
            this.harmonicMean='';
        }else{
            for(var i=0;i<data.length;i++){
                this.harmonicMean+=(1/data[i]);
            }
            this.harmonicMean=Round(((this.harmonicMean)**(-1))*data.length)
        }
    }
    calRootMeanSquare(){
        this.rootMeanSquare=0;
        for(var i=0;i<data.length;i++){
            this.rootMeanSquare+=(data[i])**2;
        };
        this.rootMeanSquare=Round(Math.sqrt(this.rootMeanSquare*(1/data.length)))
    }
    calInterquartileMean(){
        if(data.length%4==0){
            this.interquartileMean=0;
            let min=(data.length/4);
            let max=3*data.length/4;
            for(var i=min;i<max;i++){
                this.interquartileMean+=data[i]
            }
            this.interquartileMean=Round(this.interquartileMean*2/data.length);
        }else{
            let a=data.length/4
            let b=a*2
            a=Math.floor(a)
            let c=data.slice(a,(data.length-a))
            let d=(b-(c.slice(1,c.length-1).length))/2
            let e=c.slice(1,c.length-1).reduce((a,b)=>a+b,0)
            this.interquartileMean=Round((e+(c[0]+c[c.length-1])*d)/b)
        }
    }
    drawBoxPlot(){
        let canvasBoxPlot = document.getElementById("drawBoxPlot");
        let draw = canvasBoxPlot.getContext("2d");
        let li=this.firstQuartile-1.5*this.interquartileRange;
        let ls=this.thirdQuartile+1.5*this.interquartileRange;
        let lsF=ls.toFixed(1);
        let prop=350/(ls-li)
        draw.clearRect(0,0,350,150);
        draw.beginPath();
        draw.moveTo(0,135);
        draw.lineTo(350,135);
        draw.strokeStyle="black";
        draw.stroke();
        draw.beginPath();
        draw.moveTo(0,45);
        draw.lineTo(0,105);
        draw.strokeStyle="black";
        draw.stroke();
        draw.beginPath();
        draw.moveTo(0,130);
        draw.lineTo(0,140);
        draw.strokeStyle="black";
        draw.stroke();
        draw.beginPath();
        draw.moveTo(this.firstQuartile*prop,130);
        draw.lineTo(this.firstQuartile*prop,140);
        draw.strokeStyle="black";
        draw.stroke();
        draw.beginPath();
        draw.moveTo(this.median*prop,130);
        draw.lineTo(this.median*prop,140);
        draw.strokeStyle="black";
        draw.stroke();
        draw.beginPath();
        draw.moveTo(this.thirdQuartile*prop,130);
        draw.lineTo(this.thirdQuartile*prop,140);
        draw.strokeStyle="black";
        draw.stroke();
        draw.beginPath();
        draw.moveTo(350,130);
        draw.lineTo(350,140);
        draw.strokeStyle="black";
        draw.stroke();
        draw.beginPath();
        draw.moveTo(350,45);
        draw.lineTo(350,105);
        draw.strokeStyle="black";
        draw.stroke();
        draw.beginPath();
        draw.moveTo(0,75);
        draw.lineTo(this.firstQuartile*prop,75);
        draw.strokeStyle="black";
        draw.stroke();
        draw.beginPath();
        draw.moveTo(350,75);
        draw.lineTo(this.thirdQuartile*prop,75);
        draw.strokeStyle="black";
        draw.stroke();
        draw.beginPath();
        draw.rect(this.firstQuartile*prop, 45, (this.median-this.firstQuartile)*prop, 60);
        draw.strokeStyle="black";
        draw.fillStyle="blue";
        draw.fill();
        draw.stroke();
        draw.beginPath();
        draw.rect(this.median*prop, 45, (this.thirdQuartile-this.median)*prop, 60);
        draw.strokeStyle="black";
        draw.fillStyle="green";
        draw.fill();
        draw.stroke();
        draw.beginPath();
        draw.moveTo(this.median*prop,45);
        draw.lineTo(this.median*prop,105);
        draw.strokeStyle="black";
        draw.stroke();
        draw.font="10px Arial";
        draw.fillStyle="black";
        draw.fillText(`${li}`,0,150)
        draw.fillText(`${lsF}`,326,150)
        draw.fillText(`${this.firstQuartile}`,this.firstQuartile*prop,150)
        draw.fillText(`${this.thirdQuartile}`,this.thirdQuartile*prop,150)
        draw.fillText(`${this.median}`,this.median*prop,150)
        draw.closePath();
    }
    makeTable(){
        let le=this.firstQuartile-3*this.interquartileRange;
        let lo=this.firstQuartile-1.5*this.interquartileRange;
        let uo=this.thirdQuartile+1.5*this.interquartileRange;
        let ue=this.thirdQuartile+3*this.interquartileRange;
        let led=data.filter(x=>x<le);
        let lod=data.filter(x=>x<lo&&x>=le);
        let uod=data.filter(x=>x>uo&&x<=ue);
        let ued=data.filter(x=>x>ue);
        let max=Math.max(led.length,lod.length,uod.length,ued.length);
        let lex;
        let lox;
        let uox;
        let uex;
    
        table.innerHTML+=`<tr>
        <th>Lower extremes</th>
        <th>Lower outliers</th>
        <th>Upper outliers</th>
        <th>Upper extremes</th>
        </tr>`
    
        for (var i=0;i<max;i++){
            if(typeof(led[i])=='number'){
                lex= led[i];
            }else{
                lex= '-'
            }
            if(typeof(lod[i])=='number'){
                lox= lod[i];
            }else{
                lox= '-'
            }
            if(typeof(uod[i])=='number'){
                uox= uod[i];
            }else{
                uox= '-'
            }
            if(typeof(ued[i])=='number'){
                uex= ued[i];
            }else{
                uex= '-'
            }
            table.innerHTML+=`<tr>
            <td>${lex}</td>
            <td>${lox}</td>
            <td>${uox}</td>
            <td>${uex}</td>
            </tr>`
        }
    }
}



function ValuesToShow(idArray,object){
    let box;
    for(var i=0;i<idArray.length;i++){
        box = document.getElementById(idArray[i]);//Revisa cada caja con el id indicado
        if(box){//Espera que exista el valor
            box.value = object[idArray[i]];
        }
    }
}

let clr=document.getElementById("clear")
clr.addEventListener("click",Clear,false);

function Clear(){
    let box;
    let ids=idArrays.slice()
    ids.push("inputDataStatistical")
    ids.push("outputDataStatistical")
    for(var i=0;i<ids.length;i++){
        box = document.getElementById(ids[i]);//Revisa cada caja con el id indicado
        if(box){//Espera que exista el valor
            box.value = "";
        }
    }
    addCode(0,1)
    table.innerHTML=``;
    let canvasBoxPlot = document.getElementById("drawBoxPlot");
    let draw = canvasBoxPlot.getContext("2d");
    draw.beginPath();
    draw.rect(0,0,350,150);
    draw.strokeStyle="white";
    draw.fillStyle="white";
    draw.fill();
    draw.stroke();
    draw.closePath();
}


function calAverages(){
    table.innerHTML=``;
    let ver = sortedAndSpaces();
    if(ver == 1){
        outData();
        let locDis = new LocAndDis();
        locDis.calArithmeticMean()
        locDis.calMedian()
        locDis.calMode()
        locDis.calQuartiles()
        locDis.calmidRange()
        locDis.calStandardDeviation()
        locDis.calVariance()
        locDis.calInterquartileRange()
        locDis.calRange()
        locDis.calCoefVariation()
        locDis.calQuartileCoefDispersion()
        locDis.calGeometricMean()
        locDis.calHarmonicMean()
        locDis.calRootMeanSquare()
        locDis.calInterquartileMean()
        locDis.drawBoxPlot()
        ValuesToShow(idArrays,locDis)
        locDis.makeTable()
    }else{
        alert("Please enter only numeric data.");
    };
};

