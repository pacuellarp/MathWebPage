let isPoblation = document.getElementById('isPoblation');
let isItPobOrSam = document.getElementById('isItPobOrSam');
let sorted = document.getElementById('sorted');
let spaces = document.getElementById('spaces');
let inputData = document.getElementById('inputDataStatistical');
let outputData = document.getElementById('outputDataStatistical');
let data = '';

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
        sorted.innerText = "Your data were already sorted, great!";
    }else{
        sorted.innerText = "Here is your numeric data, now is sorted.";
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
    const data0={...data};
    if(isNum == 0){
        data = data.sort((a,b) => a-b);
        for(var i = 0; i < data.length; i++){
            if (data[i] != data0[i]){
            }else{
                o+=1;
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
        this.arithmeticMean=data.reduce((a,b)=>a+b,0)/data.length;
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
            this.standardDeviation+=(data[0]-this.arithmeticMean)**2;
        };
        this.standardDeviation=this.standardDeviation/dem;
        this.standardDeviation=Math.sqrt(this.standardDeviation);
    }
    calVariance(){
        this.variance=(this.standardDeviation)**2;
    }
    calInterquartileRange(){
        this.interquartileRange=this.thirdQuartile-this.firstQuartile;
    }
    calRange(){
        this.range=data[0]+data[data.length-1]
    }
    calCoefVariation(){
        if(this.arithmeticMean==0){
            this.coefVariation="Tends to infinity";
        }else{
            this.coefVariation=this.standardDeviation/this.arithmeticMean;
        }
    }
    calQuartileCoefDispersion(){
        this.quartileCoefDispersion=(this.thirdQuartile-this.firstQuartile)/(this.thirdQuartile+this.firstQuartile);
    }
    calGeometricMean(){
        var ver=0;
        for(var i=0;i<data.length;i++){
            if(data[i]<0){
                ver+=1;
            };
        };
        if(ver!=0){
            this.geometricMean='-';
        }else{
            this.geometricMean=data[0];
            for(var i=1;i<data.length;i++){
                  this.geometricMean=this.geometricMean*data[i];
            };
            this.geometricMean=(this.geometricMean)**(1/data.length)
        }
    }
}


function calAverages(){
    let ver = sortedAndSpaces();
    if(ver == 1){
        outData();
        let locDis = new LocAndDis();
        locDis.calArithmeticMean()
        locDis.calMedian()
        locDis.calMode()
        locDis.calQuartiles()
        let box;
        box = document.getElementById('arithmeticMean')
        if(box){
            box.value = locDis.arithmeticMean;
        }
        console.log(locDis["arithmeticMean"])
        console.log(locDis["median"])
        console.log(locDis["mode"])
    }else{
        alert("Please enter only numeric data.");
    };
};

