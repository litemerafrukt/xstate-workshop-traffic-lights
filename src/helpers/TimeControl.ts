export class TimeControl {
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
