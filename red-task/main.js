import { SentenceGen } from './lib/sentence_gen.js'

const subjectElement = document.getElementById('item');
const valuesElement = document.querySelectorAll('.input-row .value');
const outputElement = document.querySelector('.output');
const button = document.getElementById('result');

button.addEventListener('start', async (e) => {
  // get 5 values.
  console.log('main');
  const subject = subjectElement.value;
  const values = [...valuesElement].map(e => e.value);

  const generator = new SentenceGen(subject, values);
  const results = await Promise.all(generator.contents.map(async () => generator.next()));
  outputElement.innerHTML = results.join('<br />');
});
