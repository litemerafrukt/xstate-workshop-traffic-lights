import { startTimeMachine } from "./machines/timeMachine"
import { setTheScene } from "./scene"
import "./style.css"

const { timeControl, lightSwitch, leftTrafficLight, rightTrafficLight } =
  await setTheScene()

/* Car buttons */
const leftCarButton = document.getElementById("leftCar")
const rightCarButton = document.getElementById("rightCar")

leftCarButton.addEventListener("click", () => {
  console.log("left car button clicked, Tuuut!")
})

rightCarButton.addEventListener("click", () => {
  console.log("right car button clicked, Tuuut!")
})

/* Time switch */
const timeSwitchButton = document.getElementById("timeSwitch")
startTimeMachine(timeControl, timeSwitchButton)

/* Signal error by blinking traffic lights */
let blinkOn = true

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
