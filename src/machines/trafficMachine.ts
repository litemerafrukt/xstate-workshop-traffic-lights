import { createMachine, interpret } from "xstate"
import { TrafficLight } from "../helpers/TrafficLight"

const trafficMachine = createMachine({
  id: "traffic",
  initial: "left",
  states: {
    initial: {

    },
    left: {
      after: {
        5000: { target: "transitionRight" }
      },
      on: {
        SWITCH: "transitionRight"
      }
    },
    right: {
      after: {
        5000: { target: "transitionLeft" }
      },
      on: {
        SWITCH: "transitionLeft"
      }
    },
    transitionRight: {
      after: {
        1000: { target: "right" }
      }
    },
    transitionLeft: {
      after: {
        1000: { target: "left" }
      }
    }
  }
})


export function startTrafficMachine(
  leftTrafficLight: TrafficLight,
  rightTrafficLight: TrafficLight
) {
  const trafficService = interpret(trafficMachine).onTransition((state) => {
    const stateValue = state.value as string

    leftTrafficLight.allOff()
    rightTrafficLight.allOff()

    switch (stateValue) {
      case "left": {
        leftTrafficLight.greenOn()
        rightTrafficLight.redOn()
        break
      }
      case "right": {
        leftTrafficLight.redOn()
        rightTrafficLight.greenOn()
        break
      }
      case "transitionRight": {
        leftTrafficLight.yellowOn()
        rightTrafficLight.redOn()
        break
      }
      case "transitionLeft": {
        leftTrafficLight.redOn()
        rightTrafficLight.yellowOn()
        break
      }
      default: {
        //statements;
        break
      }
    }
  })

  trafficService.start()


  return trafficService
}
