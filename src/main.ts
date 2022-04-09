import { setTheScene } from "./scene"
import "./style.css"

const { scene, timeControl, lightSwitch, leftTrafficLight, rightTrafficLight } =
  await setTheScene()

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
