// elements from document
let bodyDiv = document.getElementsByTagName("body")[0];
let heartZoneDiv = document.getElementById("heart-zone");
let mainDiv = document.getElementById("main");
let buttonsContainer = document.getElementsByClassName("btn-container")[0];
let gifElement = document.getElementById("main-gif");
let messageElement = document.getElementById("client-message");
let acceptBtn = document.getElementsByClassName("btn-accept")[0];
let denialBtn = document.getElementsByClassName("btn-denial")[0];

//* App states: 1 state = 1 stage, with images and messages accordingly
let currentState // "accept" | "denial" 
let flowStates = {
    "denial": 0,
    "accept": 0
}

const imagePaths = {
    "denial": {
        "stage-1": "./images/denial/stage-1.gif",
        "stage-2": "./images/denial/stage-2.gif",
        "stage-3": "./images/denial/stage-3.gif",
        "stage-4": undefined,
        "stage-5": undefined,
    },
    "accept": {
        "stage-1": "./images/accept/stage-1.gif",
        "stage-2": "./images/accept/stage-2.gif",
        "stage-3": "./images/accept/stage-3.gif",
        "stage-4": "./images/accept/stage-4.jpg",
    }
}
const clientMessages = {
    "denial": {
        "stage-1": "Pera, como assim vc nao gosta?",
        "stage-2": "Como assim?? assim vc me deixa triste",
        "stage-3": "Para, vc ta sendo mt ruim !! :(",
        "stage-4": undefined,
        "stage-5": undefined,
    },
    "accept": {
        "stage-1": "Tem certeza que vc gosta de mi?",
        "stage-3": "Mas sera que vc gosta muito?",
        "stage-2": "Serio?? muito-muito-muito mesmo?",
        "stage-4": "Te amo mais sua fofinha linda <3"
    }
}
const finalClientMessage = "test span"

//* button styles
//default: for resetting purposes
const acceptButtonDefaultSetup = {
    "scale": "1",
    "font-size": "2.25rem",
    "height": "auto",
    "width": "auto"
}
const denialButtonDefaultSetup = {
    "display": "block",
    "position": "inherit",
    "top": "auto",
    "animation": "none"
}

// for flow stages
const acceptButtonScales = ["1.5", "2.1", "2.4"]
const acceptButtonFinalSetup = {
    "scale": "2.2",
    "margin": "0",
    "width": "100%",
    "height": "50%",
    "font-size": "1.9rem"
}
const denialButtonFinalSetup = {
    "position": "relative",
    "top": "13%",
    "animation": "slide 2s linear infinite"
}

//applying those styles
function applyStyleObject(element, styleObj) {
    Object.keys(styleObj).forEach((key) => {
        element.style[key] = styleObj[key];
    });
}

function applyButtonFinalStyles() {
    // main div
    mainDiv.style["height"] = "100%";

    // upper container
    buttonsContainer.style["flex-direction"] = "column";
    buttonsContainer.style["height"] = "50%";

    // accept button
    applyStyleObject(acceptBtn, acceptButtonFinalSetup)

    // denial button
    applyStyleObject(denialBtn, denialButtonFinalSetup)
}

function resetButtonStyles() {
    //upper divs
    mainDiv.style["height"] = "65%";

    buttonsContainer.style["flex-direction"] = "row";
    buttonsContainer.style["height"] = "auto";

    // accept button
    applyStyleObject(acceptBtn, acceptButtonDefaultSetup)

    // denial button
    applyStyleObject(denialBtn, denialButtonDefaultSetup)
}

/**
 * Generate denial flow over the stages
 *
 * @param {string} choice - can receive strings 'accept' or 'denial'
 * @param {number} currentNumber - receives current stage number (pre-processed)
 */
const manageDenialProcess = (choice, currentNumber) => {
    if (choice === "accept"){ //reset to normal style
        resetButtonStyles();
    }
    if (choice === "denial" && currentNumber <= Object.keys(clientMessages[choice]).length - 2){
        acceptBtn.style.scale = acceptButtonScales[currentNumber - 1] || acceptBtn.style.scale
    } else if (choice === "denial" && currentNumber === Object.keys(clientMessages[choice]).length - 1) { //apply final stage style to:
        applyButtonFinalStyles();
        messageElement.textContent = "";
    } else if (choice === "denial" && currentNumber >= Object.keys(clientMessages[choice]).length){
        denialBtn.style.display = "none";
    }
}

/**
 * Add flow state counter to generate future app stages
 *
 * @param {string} choice - can receive strings 'accept' or 'denial'
 * @returns {number}  
 */
const generateFlowState = (choice) => {
    if (!["denial", "accept"].includes(choice)){
        throw Error("Not allowed choice at generateFlowState" + choice)
    } 

    // verifying current state change -> do not proceed to next stage
    if(currentState !== undefined && choice !== currentState){
        if (flowStates[choice] === 0){ //first time will bug out
            flowStates[choice]++
        }
        return flowStates[choice]
    }

    //verifying if there's a stage to be iterated over the choice
    if (flowStates[choice] !== Object.keys(clientMessages[choice]).length){
        flowStates[choice]++
    }

    return flowStates[choice];
}

/**
 * Finish accept flow - finish flow with floating hearts animation!
 */
const finishAcceptStage = async () => {
    //remove choices
    acceptBtn.remove()
    denialBtn.remove()

    //random number generators for hearts
    let generateRandomScale = () => {
        let generatedNumber = Math.random() * 2
        if (generatedNumber < 0.7 || generatedNumber > 1.2) { 
            return generateRandomScale() 
        } else {
            console.log(generatedNumber);
            return generatedNumber
        }
    }
    let generateRandomLeftPos = () => {
        let generatedNumber = Math.round(Math.random() * 100)
        if (generatedNumber < 20 || generatedNumber > 70) { 
            return generateRandomLeftPos() 
        } else {
            console.log(generatedNumber);
            return generatedNumber
        }
    }
    let generateRandomDirection = () => {
        return Math.random() < 0.5 ? "leftFloater" : "rightFloater"
      }

    //spawn multiple floating hearts
    let spawnHeart = () => {
        let newHeart = document.createElement("span")
        let newWrapper = document.createElement("div")
        newHeart.className = "heart"
        newWrapper.className = "heartWrapper"

        //apply random float, size, and middle pos in screen
        newWrapper.classList.add(generateRandomDirection())
        newWrapper.style["scale"] = generateRandomScale()
        newWrapper.style["left"] = generateRandomLeftPos() + "%"

        newWrapper.appendChild(newHeart)
        heartZoneDiv.appendChild(newWrapper)

        setTimeout(() => {
            newWrapper.remove()
            newHeart.remove()
        }, 10 * (10 ** 3) - 80) // 30s = 30000ms, -80 to prevent faulty deletions
    }

    spawnHeart()
    setInterval(spawnHeart, 670)
    setInterval(spawnHeart, 960)
}

/**
 * Generate app flow
 *
 * @param {string} choice - can receive strings 'accept' or 'denial'
 */
const applyChoice = (choice) => {
    if (!["denial", "accept"].includes(choice)){
        throw Error("Not allowed choice at applyChoice" + choice)
    } 

    let currentNumber = generateFlowState(choice)
    
    let stageToApply = "stage-" + currentNumber
    console.log(stageToApply)
    
    //modify sources
    if(clientMessages[choice][stageToApply] !== undefined){
        let imageToApply = imagePaths[choice][stageToApply]
        let messageToSend = clientMessages[choice][stageToApply]

        gifElement.src = imageToApply
        messageElement.innerText = messageToSend
    }

    //denial ending
    manageDenialProcess(choice, currentNumber)
    
    //accept ending
    if (choice === "accept" && currentNumber >= Object.keys(clientMessages[choice]).length){
        finishAcceptStage()
    }

    //finally
    currentState = choice;
}
