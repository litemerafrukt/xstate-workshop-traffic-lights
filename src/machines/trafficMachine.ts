import { assign, createMachine, interpret, send, spawn, StateValueMap } from "xstate"
import { TrafficLight } from "../helpers/TrafficLight"
import map from "lodash/fp/map"
import { pure } from "xstate/es/actions"


const lightMachine = createMachine({
  id: "light",
  initial: "red",

  states: {
    green: {
      on: {
        TOGGLE: "yellow"
      }
    },
    yellow: {
      on: {
        TOGGLE: "red"
      }
    },
    red: {
      on: {
        TOGGLE: "green"
      }
    }
  }
})


const NUMBER_OF_LIGHTS = 2

const PHASES = [[0], [1], [0], [1], [0]]

export interface TrafficMachineContext {
  leftQueue: number,
  rightQueue: number,
  currentPhase: number,
  lights: any[]
}


// @ts-ignore
const sendToggleToCurrentPhase = pure((context: TrafficMachineContext) => {
  console.log("PLEASE")
  return PHASES[context.currentPhase].map((lightIndex) => {
    return send("TOGGLE", { to: (_) => context.lights![lightIndex] })
  })
})

const trafficMachine = createMachine<TrafficMachineContext>({
  id: "traffic",
  initial: "initial",

  preserveActionOrder: true,

  context: {
    leftQueue: 0,
    rightQueue: 0,
    currentPhase: 0,
    lights: []
  },

  on: {
    INCREMENT_LEFT_QUEUE: { actions: "incrementLeftQueue" },
    INCREMENT_RIGHT_QUEUE: { actions: "incrementRightQueue" }
  },
  states: {
    initial: {
      entry: "setupLights",
      always: "waitingToTransition"
    },
    waitingToTransition: {
      entry: sendToggleToCurrentPhase,
      after: {
        5000: { target: "transitioning" }
      }
    },
    transitioning: {
      entry: sendToggleToCurrentPhase,
      after: {
        1000: { target: "waitingToTransition" }
      },
      exit: [sendToggleToCurrentPhase, "incrementCurrentPhase"]
    }

  }
}, {
  guards: {
    isLeftQueueEmpty: (context) => context.leftQueue === 0,
    isRightQueueEmpty: (context) => context.rightQueue === 0
  },
  actions: {

    setupLights: assign({
      lights: (_) => map(() => spawn(lightMachine, { sync: true }))(Array.from(Array(NUMBER_OF_LIGHTS)))
    }),
    incrementCurrentPhase: assign({
      currentPhase: (context) => context.currentPhase + 1 === PHASES.length ? 0 : context.currentPhase + 1
    }),
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

    console.log(state.context.lights[0].getSnapshot())

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
