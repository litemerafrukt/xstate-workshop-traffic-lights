class TimeControl {
  bg: HTMLElement

  constructor(nightBGId: string) {
    this.bg = document.getElementById(nightBGId)
  }

  night() {
    this.bg.style.visibility = "visible"
  }

  day() {
    this.bg.style.visibility = "hidden"
  }
}

class LightSwitch {
  lightLayer: HTMLElement
  lightHalo: HTMLElement

  constructor(lightLayerId: string, lightHaloId: string) {
    this.lightLayer = document.getElementById(lightLayerId)
    this.lightHalo = document.getElementById(lightHaloId)
  }

  on() {
    this.lightLayer.style.visibility = "visible"
    this.lightHalo.style.visibility = "visible"
  }

  off() {
    this.lightLayer.style.visibility = "hidden"
    this.lightHalo.style.visibility = "hidden"
  }
}

class TrafficLight {
  red: HTMLElement
  yellow: HTMLElement
  green: HTMLElement

  constructor(redId: string, yellowId: string, greenId: string) {
    this.red = document.getElementById(redId)
    this.yellow = document.getElementById(yellowId)
    this.green = document.getElementById(greenId)
  }

  redOn() {
    this.red.style.visibility = "visible"
  }

  redOff() {
    this.red.style.visibility = "hidden"
  }

  yellowOn() {
    this.yellow.style.visibility = "visible"
  }

  yellowOff() {
    this.yellow.style.visibility = "hidden"
  }

  greenOn() {
    this.green.style.visibility = "visible"
  }

  greenOff() {
    this.green.style.visibility = "hidden"
  }
}

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
