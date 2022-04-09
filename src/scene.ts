import { TimeControl } from "./helpers/TimeControl"
import { LightSwitch } from "./helpers/LightSwitch"
import { TrafficLight } from "./helpers/TrafficLight"

export async function setTheScene() {
  const crossing = await import("/assets/crossing.svg?raw")
  const scene = document.getElementById("scene")
  scene.innerHTML = crossing.default

  const timeControl = new TimeControl("nightBG")
  timeControl.day()

  const lightSwitch = new LightSwitch("lightLayer", "lightHalo")
  lightSwitch.off()

  const leftTrafficLight = new TrafficLight(
    "redLeft",
    "yellowLeft",
    "greenLeft"
  )
  const rightTrafficLight = new TrafficLight(
    "redRight",
    "yellowRight",
    "greenRight"
  )

  return {
    scene,
    timeControl,
    lightSwitch,
    leftTrafficLight,
    rightTrafficLight,
  }
}
