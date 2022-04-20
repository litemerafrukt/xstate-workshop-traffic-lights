import { startTimeMachine } from "./machines/timeMachine"
import { setTheScene } from "./scene"
import "./style.css"
import { startTrafficMachine } from "./machines/trafficMachine"

const { timeControl, lightSwitch, leftTrafficLight, rightTrafficLight } =
  await setTheScene()

const leftQueueElement = document.getElementById("leftQueue")
const rightQueueElement = document.getElementById("rightQueue")

const trafficService = startTrafficMachine(leftTrafficLight,rightTrafficLight, leftQueueElement, rightQueueElement)

/* Car buttons */
const leftCarButton = document.getElementById("leftCar")
const rightCarButton = document.getElementById("rightCar")

leftCarButton.addEventListener("click", () => {
  trafficService.send("INCREMENT_LEFT_QUEUE")
  console.log("left car button clicked, Tuuut!")
})

rightCarButton.addEventListener("click", () => {
  trafficService.send("INCREMENT_RIGHT_QUEUE")
  console.log("right car button clicked, Tuuut!")
})

/* Time switch */
const timeSwitchButton = document.getElementById("timeSwitch")
startTimeMachine(timeControl, timeSwitchButton, lightSwitch)

/* Signal error by blinking traffic lights */
/*let blinkOn = false

setInterval(() => {
  if (blinkOn) {
    leftTrafficLight.redOn()
    leftTrafficLight.yellowOn()
    leftTrafficLight.greenOn()
    rightTrafficLight.redOn()
    rightTrafficLight.yellowOn()
    rightTrafficLight.greenOn()
    blinkOn = false
  } else {
    leftTrafficLight.redOff()
    leftTrafficLight.yellowOff()
    leftTrafficLight.greenOff()
    rightTrafficLight.redOff()
    rightTrafficLight.yellowOff()
    rightTrafficLight.greenOff()
    blinkOn = true
  }
}, 750)
*/