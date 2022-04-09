export class LightSwitch {
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
