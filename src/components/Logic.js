import React from 'react'

function FunctionOne() {
  return (
    <div>One</div>
  )
}

function FunctionTwo() {
    return (
      <div>Two</div>
    )
  }

export {FunctionOne, FunctionTwo}

/*
const input = {
  discount: 1,
  iterations: 5,
  states: [
      {
          name: "State 1",
          connections: [
              {
                  name: "Action 1",
                  destinations: [{
                      name: "State 1",
                      prob: 1,
                      reward: 5
                  },]
              },
          ]
      },
  ]
}

const blyat = [
  {
      name: "State 1",
      iterations: [
          {
              name: "V0",
              value: 69,
              formula: "68 + 1"
          },
      ]
  },
]
*/