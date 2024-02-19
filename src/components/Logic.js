import React from 'react'

function initialize2DArray(n, m) {
  let arr = [];
  for (let i = 0; i < n; i++) {
      arr.push([]);
      for (let j = 0; j < m; j++) {
          arr[i].push({
              value: 0,
              eq: 'First Iteration is Always 0'
          });
      }
  }
  return arr;
}

function vi_calculate(input) {
  let index = input.states.map(a => a.name);
  let values = initialize2DArray(input.iterations, input.states.length);
  for (let i = 1; i < input.iterations; i++) {
      for (let j = 0; j < input.states.length; j++) {
          curr = input.states[j];

          let max = Number.NEGATIVE_INFINITY;
          let maxName = "";
          let maxEq = "";
          for (let k = 0; k < curr.connections.length; k++) {
              let sum = 0;
              let eq = "";
              for (let h = 0; h < curr.connections[k].destinations.length; h++) {
                  let dest = curr.connections[k].destinations[h]
                  sum += dest.prob * (dest.reward + (input.discount * values[i - 1][index.indexOf(dest.name)].value))
                  eq = `T(s,a,s') * (R(s,a,s') + (γ * V${i-1}(${dest.name})) =\n${dest.prob} * (${dest.reward} + (${input.discount} * ${values[i - 1][index.indexOf(dest.name)].value}) ≈ ${sum}`
              }
              if(sum > max){
                  max = sum;
                  maxName = curr.connections[k].name;
                  maxEq= eq;
              }
          }
          if(max == Number.NEGATIVE_INFINITY){
              max = 0;
          }
          values[i][index.indexOf(curr.name)] = {
              value: max,
              eq: maxEq
          };
      }
  }
  return ({
      header: index,
      values: values
  });
}

export default vi_calculate;

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

const output = {
  header: [
    "State 1",
    "State 2"
  ],
  values: [
    {
      value: 3,
      eq: T(s,a,s') * (R(s,a,s') + (γ * V8(Warm)) =\n0.5 * (1 + (1 * 11.5) ≈ 3
    }
  ]
}


########## TEST DATA ##########
const input = {
    discount: 1,
    iterations: 10,
    states: [
        {
            name: "Cool",
            connections: [
                {
                    name: "Slow",
                    destinations: [{
                        name: "Cool",
                        prob: 1,
                        reward: 1
                    },]
                },
                {
                    name: "Fast",
                    destinations: [{
                        name: "Cool",
                        prob: 0.5,
                        reward: 2
                    },
                    {
                        name: "Warm",
                        prob: 0.5,
                        reward: 2
                    },]
                },
            ]
        },
        {
            name: "Warm",
            connections: [
                {
                    name: "Slow",
                    destinations: [{
                        name: "Cool",
                        prob: 0.5,
                        reward: 1
                    },
                    {
                        name: "Warm",
                        prob: 0.5,
                        reward: 1
                    },]
                },
            ]
        }
    ]
}
*/