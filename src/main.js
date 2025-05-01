let gifElement = document.getElementById("main-gif")
let messageElement = document.getElementById("client-message")

let currentState // "accept" | "denial" 
let flowStates = {
    "denial": 0,
    "accept": 0
}
const imagePaths = {
    "denial": {
        "stage-1": "dist/images/denial/stage-1.gif",
        "stage-2": "dist/images/denial/stage-2.gif",
        "stage-3": "dist/images/denial/stage-3.gif",
        "stage-4": "dist/images/denial/stage-4.jpg", 
    },
    "accept": {
        "stage-1": "dist/images/accept/stage-1.gif",
        "stage-2": "dist/images/accept/stage-2.gif",
        "stage-3": "dist/images/accept/stage-3.gif",
    }
}
const clientMessages = {
    "denial": {
        "stage-1": "#1",
        "stage-2": "#2",
        "stage-3": "#3",
        "stage-4": "#4"
    },
    "accept": {
        "stage-1": "#1",
        "stage-2": "#2",
        "stage-3": "#3",
    }
}

/**
 * Generate app flow
 *
 * @param {string} choice - can receive strings 'accept' or 'denial'
 */
const applyChoice = (choice) => {
    if ( !(choice === "denial" && flowStates[choice] !== 4)
        && 
         !(choice === "accept" && flowStates[choice] !== 3))

    flowStates[choice] += 1
    let stageToApply = "stage-" + flowStates[choice]
    
    let imageToApply = imagePaths[choice][stageToApply]
    console.log(imageToApply)
    let messageToSend = currentState[choice][stageToApply]
    console.log(messageToSend)

    //modify
    gifElement.src = imageToApply
    messageElement.textContent = messageToSend

    //finally
    currentState = choice
    alert("user choice: ", choice)
}