import { SentenceGen } from './lib/sentence_gen.js'
import { Graph } from './lib/graph.js'

const subjectElement = document.getElementById('item');
const valuesElement = document.querySelectorAll('.input-row .value');
const outputElement = document.querySelector('.output');
const button = document.getElementById('result');

button.addEventListener('start', async (e) => {
  // get 5 values.
  console.log('main');
  const subject = subjectElement.value;
  const values = [...valuesElement].map(e => e.value);

  // create graph
  const graph = new Graph();
  graph.create(subject, values);

  // create sentences
  const generator = new SentenceGen(subject, values);
  const results = await generator.getAll();
  outputElement.innerHTML = results.join('<br />');
});
