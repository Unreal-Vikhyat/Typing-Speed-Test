// Select the Start / Stop / Restart button
let bnt = document.querySelector(".restart");

// Select the timer text (60s)
let timer = document.querySelector(".time");


// Select the textarea where user types
let textarea = document.querySelector(".typing-area");

//  Select the text paragraph
let text=document.querySelector(".quote");

// select the WPM value
let wpm=document.querySelector(".wpm");

// select the Accuracy Percentage
let accuracy=document.querySelector(".accuracy");

// total no of chars has been typed
let totalchartyped=0;

// Initial timer value
let timeval = 60;

// corrected chars typed 
let correctChars = 0;

// for indexing the para
let cursorIndex = 0;

// Flag to track whether test is running or not
// false → stopped
// true  → running
let stopflag = false;

// To store setInterval ID (needed to stop the timer later)
let intervalId = null;


// Function to start the test
function btnstartstop() {

    // If test is already running, do nothing
    if (stopflag) 
    {
        // Stop timer
            clearInterval(intervalId);

            // Change button text
            bnt.innerText = "Restart";

            // Mark test as stopped
            stopflag = false;

            // Reset time for next run
            timeval = 60;
            wpm.innerText = "0";
            accuracy.innerText = "0%";

            location.reload();
            return;
    }

    // Change button text
    bnt.innerText = "Stop";

    // Mark test as started
    stopflag = true;

    // Start the timer
    timervalue();
}


// Function to handle countdown timer
function timervalue() {

    // Safety: clear any previous interval
    clearInterval(intervalId);

    // Start countdown every 1 second
    intervalId = setInterval(function () {

        // Decrease time
        timeval--;

        // Update timer text
        timer.innerText = `${timeval}s`;

        // When time reaches 0
        if (timeval === 0) {
            
            //location.reload();

            // Stop timer
            clearInterval(intervalId);

            // Change button text
            bnt.innerText = "Restart";

            // Mark test as stopped
            stopflag = false;

            // Reset time for next run
            timeval = 60;

            wpm.innerText=0;

            accuracy.innerText ="0%";

            textarea.value = ""

            correctChars = 0;
            totalTypedChars = 0;

            alert("Time End !!")




        }

    }, 1000);
}


// Start test when button is clicked
textarea.addEventListener("input", function (e) {

    if (!stopflag) {
        btnstartstop();
    }

    // Handle backspace → do NOT count typing
    if (e.inputType === "deleteContentBackward") {
        return;
    }

    totalchartyped++;

    cursorIndex = textarea.value.length - 1;

    // Count correct characters
    if(text.innerText[cursorIndex]===textarea.value[cursorIndex]) 
        { correctChars++; }

    // WPM (still character-based for now)
    wpm.innerText = Math.floor(correctChars / 5);

    // Accuracy (never > 100 now)
    let acc = (correctChars / totalchartyped) * 100;
    accuracy.innerText = `${Math.round(acc)}%`;
});

