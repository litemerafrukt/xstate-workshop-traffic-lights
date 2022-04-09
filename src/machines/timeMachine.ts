import { createMachine, interpret } from "xstate"
import { TimeControl } from "../helpers/TimeControl"

const timeMachine = createMachine({
  id: "time",
  initial: "day",
  states: {
    day: {
      on: {
        SWITCH: "night",
      },
    },
    night: {
      on: {
        SWITCH: "day",
      },
    },
  },
})

/**
 * interpret and start the time machine,
 * hook up to button event and time (DOM) control.
 *
 * https://xstate.js.org/docs/guides/interpretation.html#interpreter
 */
export function startTimeMachine(
  timeControl: TimeControl,
  timeButton: HTMLElement
) {
  const timeService = interpret(timeMachine).onTransition((state) => {
    const stateValue = state.value as string

    timeControl[stateValue]()
    timeButton.innerText = stateValue
  })

  timeService.start()

  timeButton.addEventListener("click", () => {
    timeService.send("SWITCH")
  })

  return timeService
}
