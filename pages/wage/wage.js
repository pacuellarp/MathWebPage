let interestMode = document.getElementById('interestMode');
let interestData = document.getElementById('interestData');
let nRate = document.getElementById('nRate');
let nRateTime = document.getElementById('nRateTime');
let  = document.getElementById('');



class WriteInterest{
    constructor(){
        this.timeRate=`
            <option value="Annual">Annual</option>
            <option value="Biannual">Biannual</option>
            <option value="Four-monthly">Four-monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Bimonthly">Bimonthly</option>
            <option value="Monthly">Monthly</option>
            <option value="Biweekly">Biweekly</option>
            <option value="Diary">Diary</option>
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
            <button type="button" onclick="calInterest">Calculate</button>
            <button type="button" id="clear1">Clear</button>
        </div>
            <p>Resulting Effective Interest Rate:</p>
            <div>
            <label for="eRate2">
                <input id="eRate2" type="number">
            </label>
            <select id='eRateTime2'>${this.timeRate}
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
        this.eRate={
        x:'Hola',
        y:'Adiós',
        }
        this.nRate={

        }
        this.eRate2={
        x:'Hola',
        y:'Adiós',
        }
        this.nRate2={

        }
        this.eRateTime;
        this.nRateTime;
        this.nRateCompTime;
        this.nRate2CompTime;
        
    }
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

