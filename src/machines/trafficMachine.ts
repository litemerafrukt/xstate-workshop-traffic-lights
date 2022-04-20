import { assign, createMachine, interpret, StateValueMap } from "xstate"
import { TrafficLight } from "../helpers/TrafficLight"

const trafficMachine = createMachine({
  id: "traffic",
  initial: "left",

  context: {
    leftQueue: 0,
    rightQueue: 0
  },

  on: {
    INCREMENT_LEFT_QUEUE: { actions: "incrementLeftQueue" },
    INCREMENT_RIGHT_QUEUE: { actions: "incrementRightQueue" }
  },
  states: {
    left: {
      initial: "waitingToDecrement",
      states: {
        waitingToDecrement: {
          after: {
            1000: { target: "decrementing" }
          }
        },
        decrementing: {
          entry: "decrementLeftQueue",
          always: "waitingToDecrement"
        }
      },
      after: {
        5000: { cond: "isLeftQueueEmpty", target: "transitionRight" },
        10000: { target: "transitionRight" }
      }
    },
    right: {
      initial: "waitingToDecrement",
      states: {
        waitingToDecrement: {
          after: {
            1000: { target: "decrementing" }
          }
        },
        decrementing: {
          entry: "decrementRightQueue",
          always: "waitingToDecrement"
        }
      },
      after: {
        5000: { cond: "isRightQueueEmpty", target: "transitionLeft" },
        10000: { target: "transitionLeft" }
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
}, {
  guards: {
    isLeftQueueEmpty: (context) => context.leftQueue === 0,
    isRightQueueEmpty: (context) => context.rightQueue === 0
  },
  actions: {
    // action implementations
    incrementLeftQueue: assign({
      leftQueue: (context) => context.leftQueue + 1
    }),
    incrementRightQueue: assign({
      rightQueue: (context) => context.rightQueue + 1
    }),
    decrementRightQueue: assign({
      rightQueue: (context) => context.rightQueue - 1 >= 0 ? context.rightQueue - 1 : 0
    }),
    decrementLeftQueue: assign({
      leftQueue: (context) => context.leftQueue - 1 >= 0 ? context.leftQueue - 1 : 0
    })
  }
})


export function startTrafficMachine(
  leftTrafficLight: TrafficLight,
  rightTrafficLight: TrafficLight,
  leftQueueElement: HTMLElement,
  rightQueueElement: HTMLElement
) {
  const trafficService = interpret(trafficMachine).onTransition((state) => {
    let stateValue = state.value as string | StateValueMap


    if (typeof stateValue === "object") {
      if ("left" in stateValue) {
        stateValue = "left"
      } else {
        stateValue = "right"
      }
    }


    leftTrafficLight.allOff()
    rightTrafficLight.allOff()

    leftQueueElement.textContent = "Left Queue: " + state.context.leftQueue
    rightQueueElement.textContent = "Right Queue: " + state.context.rightQueue

    if (stateValue.toString().includes("left")) {
      leftTrafficLight.greenOn()
      rightTrafficLight.redOn()
    }
    if (stateValue.toString().includes("right")) {
      leftTrafficLight.redOn()
      rightTrafficLight.greenOn()
    }

    if (stateValue.toString().includes("transitionRight")) {
      leftTrafficLight.yellowOn()
      rightTrafficLight.redOn()

    }
    if (stateValue.toString().includes("transitionLeft")) {
      leftTrafficLight.redOn()
      rightTrafficLight.yellowOn()
    }


  })

  trafficService.start()


  return trafficService
}
