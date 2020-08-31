let questions = [];
async function getData() {
  const response = await fetch("./questions.json");
  const data = await response.json();
  for (i = 0; i < data.length; i++) {
    questions[i] = data[i];
  }
}
getData();

// Variables
let main = document.querySelector("main");
let testStart = document.querySelector(".testStart");
let name;
let score = 0;
let total;
let result;
let ans = "";
let a = -1;

let interval;

let min = document.querySelector('.min');
let sec = document.querySelector('.sec');
let msec = document.querySelector('.msec');

let m = 0, s = 0, ms = 0;


// Functions
const start = () => {
  name = document.querySelector("#name").value;
  total = questions.length;
  startTimer()
  ques();
};

const ques = () => {
  a++;
  var ele = document.getElementsByName("option");

  for(i = 0; i < ele.length; i++) { 
    if(ele[i].checked) 
      if (ele[i].value === ans)
            console.log(++score);
  } 
  if (a < questions.length) {
    let q = `
            <p>Q${a + 1}) ${questions[a].q}</p> 
            <div class="options">
                <div class="opt"><input type="radio" name="option" value="${
                  questions[a].o1
                }" id="o1">&nbsp;&nbsp;&nbsp;<label for="o1">${
      questions[a].o1
    }</label></div>
                <div class="opt"><input type="radio" name="option" value="${
                  questions[a].o2
                }" id="o2">&nbsp;&nbsp;&nbsp;<label for="o2">${
      questions[a].o2
    }</label></div>
                <div class="opt"><input type="radio" name="option" value="${
                  questions[a].o3
                }" id="o3">&nbsp;&nbsp;&nbsp;<label for="o3">${
      questions[a].o3
    }</label></div>
                
            </div>
            <button class="testStart next" onclick="ques()">Next</button>
        `;
    ans = questions[a].ans;
  
    main.innerHTML = q;
  } else {
    finalResult();
  }
};

const finalResult = () => {
  stopTimer();
  let result = score*100/total;
    if (result >= 80){
     
        main.innerHTML = `
        <h3><span style="color: green">Congratulations</span>, ${name}</h3>
        <p>You are Pass</p>  
        <p>Your score is ${result.toFixed(2)}%</p>      
      `;
      
    }
    else
      main.innerHTML = `
      <h3><span style="color: green">Oh Sorry</span>, ${name}</h3>
      <p>You are Fail</p>  
      <p>Your score is ${result}%</p>      
    `;
}

const startTimer = () => {
    
    interval = setInterval(() => {
        
        if (ms >= 100){
            ms = 0;
            s++;
            if (s < 60){
                sec.innerHTML = s;
            } else if (s == 60) {
              sec.innerHTML = 0;
            }

        } else if (s >= 60){
            s = 0;
            m++;
            min.innerHTML = m;
            
        } 
        ms++;
       if (ms < 100){
        msec.innerHTML = ms;
        if (m === 10){
          msec.innerHTML = 0;
          finalResult();
        }
       } 
       
    }, 10)
   
}
const stopTimer = () => {
    clearInterval(interval); 
}
