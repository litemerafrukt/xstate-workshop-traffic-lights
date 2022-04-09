export class TimeControl {
  bg: HTMLElement

  constructor(nightBGId: string) {
    this.bg = document.getElementById(nightBGId)
  }

  night() {
    this.bg.style.visibility = "visible"
    this.bg.style.opacity = "1"
  }

  day() {
    this.bg.style.visibility = "hidden"
    this.bg.style.opacity = "0"
  }
}
