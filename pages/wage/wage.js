let interestMode = document.getElementById('interestMode');
let interestData = document.getElementById('interestData');

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
            <button type="button" id="clear1">Clear</button>
        </div>
            <p>Resulting Effective Interest Rate:</p>
            <div>
            <label for="eRate2">
                <input id="eRate2" type="number">
            </label>
            <select id='eRate2Time'>${this.timeRate}
        <div/>`;
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
            <button type="button" onclick="calInterest">Calculate</button>
            <button type="button" id="clear1">Clear</button>
        </div>
            <p>Resulting Nominal Interest Rate (%):</p>
            <div>
            <label for="nRate2">
                <input id="nRate2" type="number">
            </label>
            <select id='nRate2Time'>${this.timeRate}
            </div>`;
        this.ETE=`<p>Effective Interest Rate (%):</p>
            <div>
                <label for="eRate">
                    <input id="eRate" type="number">
                </label>
                <select id='eRateTime'>${this.timeRate}
            </div>
            <div class="buttonContainer">
            <button type="button" onclick="calInterest">Calculate</button>
            <button type="button" id="clear1">Clear</button>
        </div>
        <p>Equivalent Effective Interest Rate (%):</p>
        <div>
            <label for="eRate2">
                <input id="eRate2" type="number">
            </label>
            <select id='eRate2Time'>${this.timeRate}
        </div>`;
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
            <button type="button" onclick="calInterest">Calculate</button>
            <button type="button" id="clear1">Clear</button>
        </div>
        <p>Equivalent Nominal Interest Rate (%):</p>
        <div>
            <label for="nRate2">
                <input id="nRate2" type="number">
            </label>
            <select id='nRate2Time'>${this.timeRate}
        </div>`;
        this.eRate=0;
        this.nRate=0;
        this.eRate2={
            annual:0,
            biannual:0,
            fourmonthly:0,
            quarterly:0,
            bimonthly:0,
            monthly:0,
            biweekly:0,
            diary:0,
        }
        this.nRate2={
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
    ETE(eRate,eRateTime,eRate2Time){
        return (((1+eRate)^(eRateTime/eRate2Time))-1);
    }
    NTN(nRate,nRateTime,nRateCompTime,nRate2CompTime,nRate2Time){
        return ((((1+(nRate*nRateTime/nRateCompTime))^(nRateCompTime/nRate2CompTime)-1)*nRate2CompTime)/nRate2Time);
    }
    calNTE(){
        this.eRate2.annual=(1+(this.nRate*this.nRateTime/this.nRateCompTime))^(this.nRateCompTime)-1;
        let i=0;
        for(const prop in this.eRate2){
            this.eRate2[prop]=ETE(this.eRate2.annual,1,this.times[i])
            i+=1;
        }
    }
    calETN(){
        this.eRate=this.ETE(this.eRate,this.eRateTime,1);
        this.nRate2.annual=((this.eRate+1)^(1/this.this.nRate2CompTime)-1)*this.nRate2CompTime;
        let i=0;
        for(const prop in this.nRate2){
            this.nRate2[prop]=this.NTN(this.nRate2.annual,1,this.nRate2CompTime,this.nRate2CompTime,this.times[i]);
            i+=1;
        }
    }
    calETE(){
        let i=0;
        for(const prop in this.eRate2){
            this.eRate2[prop]=this.ETE(this.eRate,this.eRateTime,this.times[i]);
            i+=1;
        }
    }
    calNTN(){
        let i=0;
        for(const prop in this.nRate2){
            this.nRate2[prop]=this.NTN(this.nRate,this.nRateTime,this.nRateCompTime,this.nRate2CompTime,this.times[i]);
            i+=1;
        }
    };
}

let wi= new WriteInterest()


interestMode.addEventListener('change',()=>{
    if(interestMode.value=="NomToEff"){
        interestData.innerHTML=wi.NTE;
    }else if(interestMode.value=="EffToNom"){
        interestData.innerHTML=wi.ETN;
    }else if(interestMode.value=="EffToEff"){
        interestData.innerHTML=wi.ETE;
    }else if(interestMode.value=="NomToNom"){
        interestData.innerHTML=wi.NTN;
    }
},interestData.innerHTML=wi.NTE)

let nRate = document.getElementById('nRate');
let nRate2 = document.getElementById('nRate2');
let nRateTime = document.getElementById('nRateTime');
let nRate2Time = document.getElementById('nRate2Time');
let eRate = document.getElementById('eRate');
let eRate2 = document.getElementById('eRate2');
let eRateTime = document.getElementById('eRateTime');
let eRate2Time = document.getElementById('eRate2Time');
let nRateCompTime = document.getElementById('nRateCompTime');
let nRate2CompTime = document.getElementById('nRate2CompTime');

function calInterest(){
    if(true){
        wi.eRate=(eRate.value*1)/100;
        wi.nRate=(nRate.value*1)/100;
        wi.eRateTime=eRateTime.value*1;
        wi.nRateTime=nRateTime.value*1;
        wi.nRateCompTime=nRateCompTime.value*1;
        wi.nRate2CompTime=nRate2CompTime.value*1;

        wi.calNTE();

    };

};

