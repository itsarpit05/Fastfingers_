

const typing_ground = document.querySelector('#textarea');

const btn = document.querySelector('#btn');
const score = document.querySelector('#score');
const show_sentence = document.querySelector('#showsentence');

let starttime , endtime , totaltime;
let istypingstarted = false;

const sentences =  [
    "The cat jumped over the fence into the garden of 6 flowers",
    "The quick brown fox jumps over the lazy dog in the yard at 9",
    "Rain poured down as we ran under the bus stop shelter at 7",
    "Pizza delivered at 12 am saved the midnight study session",
    "Helicopters flew above the city lights shimmering below at 5",
    "Meeting set for 10 am was canceled without notice at 9 15",
    "The birds sang at the top of the tree at 6 am in the park",
    "Books piled up in the library tower reached to the ceiling",
    "Five dollars and three cookies were left on the kitchen table",
    "The spacecraft launched into the stars at 1 45 in the morning"
]

//step 3
const startTyping=()=>{
  let random_number = Math.floor(Math.random()*sentences.length);
show_sentence.innerHTML = sentences[random_number];
let date = new Date();
starttime = date.getTime();

btn.innerText = "Done";
istypingstarted = true;
score.innerHTML = "";
 }

 
 const calculatetypingspeed=(time_taken)=>{

    let totalwords = typing_ground.value.trim(); 
    let actualwords = totalwords === ''? 0 : totalwords.split(" ").length;

    if(actualwords!==0){
        let typing_speed = (actualwords/time_taken)*60;
        typing_speed  = Math.round(typing_speed);
        score.innerHTML = `Your typing speed is ${typing_speed} words per minutes & you wrote ${actualwords} words & time taken ${time_taken} sec`;
       }
       else {
        score.innerHTML = `Your typing speed is 0 words per minutes & time taken ${time_taken} sec`;
       }
}



 
typing_ground.addEventListener('input', () => {
    if (istypingstarted) {
        const displaytext = show_sentence.innerText;
        const inputtext = typing_ground.value;

        // Check if input matches display text letter by letter
        const lastInputChar = inputtext[inputtext.length - 1];
        const expectedChar = displaytext[inputtext.length - 1];

        if (inputtext === displaytext) {
            // If the entire input matches the display text
            let date = new Date();
            endtime = date.getTime();
            totaltime = (endtime - starttime) / 1000; // Time taken in seconds
            calculatetypingspeed(totaltime); // Calculate and display speed
        } else if (inputtext.length === displaytext.length) {
            // If the input length matches but does not match completely
            score.innerHTML = "Error: The sentence does not match!";
        } else if (lastInputChar !== expectedChar) {
            // If the last character typed does not match the corresponding character in the display text
            score.innerHTML = "Error: The sentence does not match!";
        }

        else{
            score.innerHTML = "";
        }
    }
});

 //step 4 
 const endTypingTest = ()=>{

    btn.innerText = "Start";
     show_sentence.innerHTML = "";
     typing_ground.value = "";
     typing_ground.setAttribute('disabled', 'true');
     istypingstarted=false;
 }


//step 2
btn.addEventListener('click' , ()=>{

    switch(btn.innerText.toLowerCase()){
        case "start":
        typing_ground.removeAttribute('disabled');
        startTyping();
        break;

        case "done":
            typing_ground.setAttribute('disabled' , 'true');
            endTypingTest();
            break;
    }
})