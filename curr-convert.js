const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button")
let fromCurr=document.querySelector(".from select")
let toCurr=document.querySelector(".to select")
let msg=document.querySelector(".msg")
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText = countryList2[currCode]
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
          newOption.selected="selected"
        }
        else if(select.name==="to" && currCode==="BDT"){
          newOption.selected="selected"
        }
        select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
      console.log(evt.target.value)
      updateFlag(evt.target)
    })
}
let updateFlag=(element)=>{
  let currCode=element.value
  //console.log(countryList[currCode])
  let flag=element.parentElement.querySelector("img")
  //console.log(flag)
  flag.src=`https://flagsapi.com/${countryList[currCode]}/shiny/64.png`
}
btn.addEventListener("click",async (evt)=>{
  evt.preventDefault()
  let amount=document.querySelector(".amount input")
  if(amount.value<=1  || amount.value==""){
    amount.value=1
  }
  //console.log(amount.value)
  let url=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
  //console.log(url)
  let response=await fetch(url)
  let data=await response.json()
  //console.log(data)
  let exchangeval
  let newarr=data[fromCurr.value.toLowerCase()]
  //console.log(newarr)
  for(let to in newarr){
    if (to==toCurr.value.toLowerCase()){
      //console.log(newarr[to])
       exchangeval=Number(newarr[to])*Number(amount.value)
    }
  }
  msg.innerText=`${amount.value} ${fromCurr.value}= ${exchangeval} ${toCurr.value}`
})
