// import countryList from "./code"
const base_url = "https://v6.exchangerate-api.com/v6/4d731a6797c03c8f186e7005/latest/"

const dropdown = document.querySelectorAll(".container select");
const fromCurr = document.querySelector(".from")
const toCurr = document.querySelector(".to")
const btn = document.querySelector(".button");
const swapping = document.querySelector(".swap");
for (let select of dropdown){
    for(currcode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerHTML = currcode;
        newOpt.value = currcode;
       

        if(select.name==="from" && currcode=="USD"){
            newOpt.selected = "selected";
        }
        else if(select.name==="to" && currcode=="INR"){
            newOpt.selected = "selected"
        }
        select.append(newOpt);
        select.addEventListener("change", (evt)=>{
            updateFlag(evt.target);
        })
    }
}
const updateFlag = (element)=>{
    let currcode = element.value;
    let countryCode = countryList[currcode]
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}
btn.addEventListener("click", async ()=>{
    console.log("object");
    let amt = document.querySelector(".amount");
    let amtValue = amt.value;
    if(amtValue=="" || amtValue<1){
        amtValue = 1;
        amt.value = "1";
    }
   
    // console.log(fromCurr.value, toCurr.value);

    try{
        const data = await fetch(`${base_url}${fromCurr.value}`);
    const res = await data.json();
    const data2 = res.conversion_rates;
    console.log(data2);
    const result = document.querySelector(".result");
    
    const n = data2[toCurr.value] * amtValue;
    result.innerHTML = `Convert to ${toCurr.value} =  ${n}`
    }
    catch(err){
        console.log(err);
    }   

})



swapping.addEventListener("click", ()=>{
    console.log("no");
    const str = toCurr.value;
    toCurr.value = fromCurr.value;
    fromCurr.value = str;
    updateFlag2();

})
const updateFlag2 = ()=>{
    const img1 = fromCurr.parentElement.querySelector("img");
    const cntCode1 = countryList[fromCurr.value]
    img1.src = `https://flagsapi.com/${cntCode1}/flat/64.png`
    const cntCode2 = countryList[toCurr.value]
    const img2 = toCurr.parentElement.querySelector("img");
    img2.src = `https://flagsapi.com/${cntCode2}/flat/64.png`
}
 