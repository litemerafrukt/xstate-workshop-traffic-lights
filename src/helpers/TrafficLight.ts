export class TrafficLight {
  red: HTMLElement
  yellow: HTMLElement
  green: HTMLElement

  constructor(redId: string, yellowId: string, greenId: string) {
    this.red = document.getElementById(redId)
    this.yellow = document.getElementById(yellowId)
    this.green = document.getElementById(greenId)
  }

  allOff() {
    this.red.style.visibility = "hidden"
    this.yellow.style.visibility = "hidden"
    this.green.style.visibility = "hidden"
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
