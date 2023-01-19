let interestMode = document.getElementById('interestMode');
let interestData = document.getElementById('interestData');
let compoundedCalculation = document.getElementById('compoundedCalculation');
let initialCompoundedCalculation = document.getElementById('initialCompoundedCalculation');
let compoundedData = document.getElementById('compoundedData');
let compoundedOutput = document.getElementById('compoundedOutput');
let whatIfD = document.getElementById('whatIfD');


function Round(num){
    return Math.round((num)*1000000)/1000000;
}

class WriteInterest{
    constructor(){
        this.timeRate=`
            <option value="1">Annual</option>
            <option value="2">Biannual</option>
            <option value="3">Four-monthly</option>
            <option value="4">Quarterly</option>
            <option value="6">Bimonthly</option>
            <option value="12">Monthly</option>
            <option value="24">Biweekly</option>
            <option value="360">Diary</option>
        </select>`;
        this.NTE=`<p>Nominal Interest Rate (%):</p>
        <div>
            <label for="nRate">
                <input id="nRate" type="number">
            </label>
            <select id="nRateTime">${this.timeRate}
        </div>
        <p>Compounding Frequency:</p>
        <select id="nRateCompTime">${this.timeRate}
        <div class="buttonContainer">
            <button type="button" onclick="calInterest()">Calculate</button>
            <button type="button" onclick="clear1()">Clear</button>
        </div>
            <p>Resulting Effective Interest Rate:</p>`;
        this.ETN=`<p>Effective Interest Rate (%):</p>
        <div>
            <label for="eRate">
                <input id="eRate" type="number">
            </label>
            <select id='eRateTime'> ${this.timeRate}
        </div>
        <p>Compounding Frequency for Nominal Rate:</p>
        <select id='nRate2CompTime'>${this.timeRate}
        <div class="buttonContainer">
            <button type="button" onclick="calInterest()">Calculate</button>
            <button type="button" onclick="clear1()">Clear</button>
        </div>
            <p>Resulting Nominal Interest Rate (%):</p>`;
        this.ETE=`<p>Effective Interest Rate (%):</p>
            <div>
                <label for="eRate">
                    <input id="eRate" type="number">
                </label>
                <select id='eRateTime'>${this.timeRate}
            </div>
            <div class="buttonContainer">
            <button type="button" onclick="calInterest()">Calculate</button>
            <button type="button" onclick="clear1()">Clear</button>
        </div>
        <p>Equivalent Effective Interest Rate (%):</p>`;
        this.NTN=`<p>Initial Nominal Interest Rate (%):</p>
        <div>
            <label for="nRate">
                <input id="nRate" type="number">
            </label>
            <select id='nRateTime'>${this.timeRate}
        </div>
        <p>Compounding Frequency of Initial rate:</p>
        <select id='nRateCompTime'>${this.timeRate}
        <p>Compounding Frequency for Equivalent rate:</p>
        <select id='nRate2CompTime'>${this.timeRate}
        <div class="buttonContainer">
            <button type="button" onclick="calInterest()">Calculate</button>
            <button type="button" onclick="clear1()">Clear</button>
        </div>
        <p>Equivalent Nominal Interest Rate (%):</p>`;
        this.eRate=0;
        this.nRate=0;
        this.rate2={
            annual:0,
            biannual:0,
            fourmonthly:0,
            quarterly:0,
            bimonthly:0,
            monthly:0,
            biweekly:0,
            diary:0,
        }
        this.eRateTime;
        this.nRateTime;
        this.nRateCompTime;
        this.nRate2CompTime;
        this.times=[1,2,3,4,6,12,24,360]
    }
    ETEFun(eRate,eRateTime,eRate2Time){
        return Round(((1+eRate)**(eRateTime/eRate2Time))-1);
    }
    NTNFun(nRate,nRateTime,nRateCompTime,nRate2CompTime,nRate2Time){
        return Round((((1+(nRate*nRateTime/nRateCompTime))**(nRateCompTime/nRate2CompTime)-1)*nRate2CompTime)/nRate2Time);
    }
    calNTE(){
        this.rate2.annual=((1+(this.nRate*this.nRateTime/this.nRateCompTime))**(this.nRateCompTime))-1;
        let i=0;
        for(const prop in this.rate2){
            this.rate2[prop]=this.ETEFun(this.rate2.annual,1,this.times[i]);
            i+=1;
        }
    }
    calETN(){
        this.eRate=this.ETEFun(this.eRate,this.eRateTime,1);
        this.rate2.annual=((this.eRate+1)**(1/this.nRate2CompTime)-1)*this.nRate2CompTime;
        let i=0;
        for(const prop in this.rate2){
            this.rate2[prop]=this.NTNFun(this.rate2.annual,1,this.nRate2CompTime,this.nRate2CompTime,this.times[i]);
            i+=1;
        }
    }
    calETE(){
        let i=0;
        for(const prop in this.rate2){
            this.rate2[prop]=this.ETEFun(this.eRate,this.eRateTime,this.times[i]);
            i+=1;
        }
    }
    calNTN(){
        let i=0;
        for(const prop in this.rate2){
            this.rate2[prop]=this.NTNFun(this.nRate,this.nRateTime,this.nRateCompTime,this.nRate2CompTime,this.times[i]);
            i+=1;
        }
    };
};

class WriteCompoundedInterest{
    constructor(){
        this.compoundedCalculation=[['P',`<option value="P">Present value (P)</option>`],['F',`<option value="F">Future value (F)</option>`],['A',`<option value="A">Repeating payment (A)</option>`],['G',`<option value="G">Initial gradient payment (G)</option>`],['D',`<option value="D">Initial exponentially increasing payment (D)</option>`],['X',`<option value="F">Future value (F)</option><option value="A">Repeating payment (A)</option><option value="G">Initial gradient payment (G)</option><option value="D">Initial exponentially increasing payment (D)</option>`]]
        this.compoundedInputValues=[`<p>Present value (P):</p>
        <label for="pc">
            <input id="pc" type="number">
        </label>`,`<p>Future value (F):</p>
        <label for="fc">
            <input id="fc" type="number">
        </label>`,`<p>Repeating payment (A):</p>
        <label for="ac">
            <input id="ac" type="number">
        </label>`,`<p>Initial gradient payment (G):</p>
        <label for="gc">
            <input id="gc" type="number">
        </label>`,`<p>Initial exponentially increasing payment (D):</p>
        <label for="dc">
            <input id="dc" type="number">
        </label>
        <p>Increasing percentage (g):</p>
        <label for="ggc">
            <input id="ggc" type="number">
        </label>`]
        this.compoundedOutputValues=[`Equivalent present value (P)`,`Equivalent future value (F)`,`Equivalent repeating payment (A)`,`Equivalent initial gradient payment (G)`,`Equivalent initial exponentially increasing payment (D)`]
        }
}

function vars(){
    var nRate = document.getElementById('nRate');
    var nRateTime = document.getElementById('nRateTime');
    var eRate = document.getElementById('eRate');
    var eRateTime = document.getElementById('eRateTime');
    var nRateCompTime = document.getElementById('nRateCompTime');
    var nRate2CompTime = document.getElementById('nRate2CompTime');
    var rate2 = document.getElementById('rate2');
    var rate2Time = document.getElementById('rate2Time');
    var clear1 = document.getElementById('clear1');
};

let wi= new WriteInterest();
let wc= new WriteCompoundedInterest();
vars();


interestMode.addEventListener('change',()=>{
    if(interestMode.value=="NomToEff"){
        interestData.innerHTML=wi.NTE;
        vars();
        rate2.value=``;
    }else if(interestMode.value=="EffToNom"){
        interestData.innerHTML=wi.ETN;
        vars();
        rate2.value=``;
    }else if(interestMode.value=="EffToEff"){
        interestData.innerHTML=wi.ETE;
        vars();
        rate2.value=``;
    }else if(interestMode.value=="NomToNom"){
        interestData.innerHTML=wi.NTN;
        vars();
        rate2.value=``;
    }
},interestData.innerHTML=wi.NTE, vars())

initialCompoundedCalculation.addEventListener('change',()=>{
    whatIfD.innerHTML='';
    if(initialCompoundedCalculation.value!='P'){
        compoundedOutput.innerText=wc.compoundedOutputValues[0];
    }else{
        compoundedOutput.innerText=wc.compoundedOutputValues[1];
    }
    compoundedCalculation.innerHTML='';
        for(var i=0;i<wc.compoundedCalculation.length-1;i++){
            if(initialCompoundedCalculation.value!=wc.compoundedCalculation[i][0]){
                compoundedCalculation.innerHTML+=wc.compoundedCalculation[i][1];            
            };
            if(initialCompoundedCalculation.value==wc.compoundedCalculation[i][0]){
                compoundedData.innerHTML=wc.compoundedInputValues[i];
            };
        };
},compoundedCalculation.innerHTML=wc.compoundedCalculation[5][1],compoundedData.innerHTML=wc.compoundedInputValues[0])

compoundedCalculation.addEventListener('change',()=>{
    if(compoundedCalculation.value=='P'){
        compoundedOutput.innerText=wc.compoundedOutputValues[0];
        whatIfD.innerHTML='';
    }else if(compoundedCalculation.value=='F'){
        compoundedOutput.innerText=wc.compoundedOutputValues[1];
        whatIfD.innerHTML='';
    }else if(compoundedCalculation.value=='A'){
        compoundedOutput.innerText=wc.compoundedOutputValues[2];
        whatIfD.innerHTML='';
    }else if(compoundedCalculation.value=='G'){
        compoundedOutput.innerText=wc.compoundedOutputValues[3];
        whatIfD.innerHTML='';
    }else if(compoundedCalculation.value=='D'){
        compoundedOutput.innerText=wc.compoundedOutputValues[4];
        whatIfD.innerHTML=`<p>Increasing percentage (g) for D:</p>
        <label for="ggc">
        <input id="ggc" type="number">
    </label>`
    }
},compoundedOutput.innerText=wc.compoundedOutputValues[1])



function calInterest(){
    if(interestMode.value=='NomToEff'){
        wi.nRate=(nRate.value*1)/100;
        wi.nRateTime=nRateTime.value*1;
        wi.nRateCompTime=nRateCompTime.value*1;
        wi.calNTE();
        rate2.value=`${wi.rate2.annual*100}%`
    }else if(interestMode.value=='EffToNom'){
        wi.eRate=(eRate.value*1)/100;
        wi.eRateTime=eRateTime.value*1;
        wi.nRate2CompTime=nRate2CompTime.value*1;
        wi.calETN();
        rate2.value=`${wi.rate2.annual*100}%`
    }else if(interestMode.value=='EffToEff'){
        wi.eRate=(eRate.value*1)/100;
        wi.eRateTime=eRateTime.value*1;
        wi.calETE();
        rate2.value=`${wi.rate2.annual*100}%`
    }else if(interestMode.value=='NomToNom'){
        wi.nRate=(nRate.value*1)/100;
        wi.nRateTime=nRateTime.value*1;
        wi.nRateCompTime=nRateCompTime.value*1;
        wi.nRate2CompTime=nRate2CompTime.value*1;
        wi.calNTN();
        rate2.value=`${wi.rate2.annual*100}%`
    }
};

function clear1(){
    if(interestMode.value=="NomToEff" || interestMode.value=="NomToNom"){
        nRate.value = '';
        nRateTime.value = '1';
        nRateCompTime.value = '1';
        if(interestMode.value=="NomToNom"){
            nRate2CompTime.value = '1';
        };
    };
    if(interestMode.value=="EffToEff" || interestMode.value=="EffToNom"){
        eRate.value = '';
        eRateTime.value = '1';
        if(interestMode.value=="EffToNom"){
            nRate2CompTime.value = '1';
        };
    };
    if(rate2){
        rate2Time.value = '1';
        rate2.value = '';
    };   
};

rate2Time.addEventListener('change',()=>{
    if(rate2Time.value=="1"){
        rate2.value=`${wi.rate2.annual*100}%`;
    }else if(rate2Time.value=="2"){
        rate2.value=`${wi.rate2.biannual*100}%`;
    }else if(rate2Time.value=="3"){
        rate2.value=`${wi.rate2.fourmonthly*100}%`;
    }else if(rate2Time.value=="4"){
        rate2.value=`${wi.rate2.quarterly*100}%`;;
    }else if(rate2Time.value=="6"){
        rate2.value=`${wi.rate2.bimonthly*100}%`;
    }else if(rate2Time.value=="12"){
        rate2.value=`${wi.rate2.monthly*100}%`;
    }else if(rate2Time.value=="24"){
        rate2.value=`${wi.rate2.biweekly*100}%`;
    }else if(rate2Time.value=="360"){
        rate2.value=`${wi.rate2.diary*100}%`;
    };
},rate2.value=``);


