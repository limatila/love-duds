let gifElement = document.getElementById("main-gif")
let messageElement = document.getElementById("client-message")

//* App states: 1 state = 1 stage, with images and messages accordingly
let currentState // "accept" | "denial" 
let flowStates = {
    "denial": 0,
    "accept": 0
}
let maxFlowStates = {
    "denial": 0,
    "accept": 0
}
const imagePaths = {
    "denial": {
        "stage-1": "./images/denial/stage-1.gif",
        "stage-2": "./images/denial/stage-2.gif",
        "stage-3": "./images/denial/stage-3.gif",
        "stage-4": "./images/denial/stage-4.jpg", 
    },
    "accept": {
        "stage-1": "./images/accept/stage-1.gif",
        "stage-2": "./images/accept/stage-2.gif",
        "stage-3": "./images/accept/stage-3.gif",
    }
}
const clientMessages = {
    "denial": {
        "stage-1": "Pera, como assim você não gosta?",
        "stage-2": "Como assim?? assim vc me deixa triste",
        "stage-3": "Para, você tá sendo mt ruim :(",
        "stage-4": ""
    },
    "accept": {
        "stage-1": "Quer dizer que você gosta muito de mi?",
        "stage-2": "Sério?? muito mesmo?",
        "stage-3": "Te amo mais sua fofinha linda <3",
    }
}

/**
 * Check Flow State to generate future app stages
 *
 * @param {string} choice - can receive strings 'accept' or 'denial'
 * @returns {number}  
 */
function applyFlowState(choice) {
    switch(choice){
        case "denial":
            if (flowStates[choice] !== Object.keys(clientMessages[choice]).length){
                flowStates[choice]++
            }
            break;
        case "accept":
            if (flowStates[choice] !== Object.keys(clientMessages[choice]).length){
                flowStates[choice]++
            }
            break;
        default:
            throw Error("Not allowed choice at applyFlowState:" + choice)
    }

    return flowStates[choice]
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
    
    let currentNumber = applyFlowState(choice)

    let stageToApply = "stage-" + currentNumber
    
    let imageToApply = imagePaths[choice][stageToApply]
    let messageToSend = clientMessages[choice][stageToApply]

    //modify
    gifElement.src = imageToApply
    messageElement.textContent = messageToSend

    //finally
    currentState = choice
}
