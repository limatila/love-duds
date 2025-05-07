let gifElement = document.getElementById("main-gif");
let messageElement = document.getElementById("client-message");
let mainDiv = document.getElementsByTagName("main")[0];
let buttonsContainer = document.getElementsByClassName("btn-container")[0];
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
    },
    "accept": {
        "stage-1": "./images/accept/stage-1.gif",
        "stage-2": "./images/accept/stage-2.gif",
        "stage-3": "./images/accept/stage-3.gif",
        "stage-4": undefined,
        "stage-5": undefined,
    }
}
const clientMessages = {
    "denial": {
        "stage-1": "Pera, como assim você não gosta?",
        "stage-2": "Como assim?? assim vc me deixa triste",
        "stage-3": "Para, você tá sendo mt ruim :(",
        "stage-4": undefined,
        "stage-5": undefined,
    },
    "accept": {
        "stage-1": "Quer dizer que você gosta muito de mi?",
        "stage-2": "Sério?? muito mesmo?",
        "stage-3": "Te amo mais sua fofinha linda <3",
    }
}
const acceptButtonScales = ["1.7", "2.2"]
const acceptButtonFinalSetup = {
    "margin": "0",
    "width": "100%",
    "height": "50%",
    "font-size": "1.9rem" 
}
const denialButtonFinalSetup = {
    "position": "absolute",
    "top": "92%",
}

/**
 * Check flow state to generate future app stages
 *
 * @param {string} choice - can receive strings 'accept' or 'denial'
 * @returns {number}  
 */
function generateFlowState(choice) {    
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

function manageDenialProcess(choice, currentNumber) {
    if (choice === "accept"){ //reset to normal style
        acceptBtn.style.scale = "1"
    }
    if (choice === "denial" && currentNumber <= Object.keys(clientMessages[choice]).length - 2){
        acceptBtn.style.scale = acceptButtonScales[currentNumber - 1]
    } else if (choice === "denial" && currentNumber === Object.keys(clientMessages[choice]).length - 1) { //apply final stage style to:
        // main div
        mainDiv.style.height = "100%";

        // upper container
        buttonsContainer.style["flex-direction"] = "column";
        buttonsContainer.style["height"] = "50%";

        // accept button
        Object.keys(acceptButtonFinalSetup).forEach((key) => {
            acceptBtn.style[key] = acceptButtonFinalSetup[key];
        })
        
        // denial button
        Object.keys(denialButtonFinalSetup).forEach((key) => {
            denialBtn.style[key] = denialButtonFinalSetup[key];
        })
        
    }

    if (choice === "denial" && currentNumber >= Object.keys(clientMessages[choice]).length - 1){
        denialBtn.style.display = "none";
    }
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
    
    //modify
    if(clientMessages[choice][stageToApply] !== undefined){
        let imageToApply = imagePaths[choice][stageToApply]
        let messageToSend = clientMessages[choice][stageToApply]

        gifElement.src = imageToApply
        messageElement.innerText = messageToSend
    }

    manageDenialProcess(choice, currentNumber)

    //finally
    currentState = choice;
}
