import { Store } from './lib/store.js'
import { Content } from './lib/content.js'
import { SentenceGen } from './lib/sentence_gen.js'

const inputElement = document.getElementById('input');
const outputElement = document.getElementById('output');
const button = document.getElementById('push-btn');

button.addEventListener('click', async (e) => {
  // get 5 values.
  const values = inputElement.value.replaceAll('\n', '').split(',');
  const store = new Store();

  // create cointent data from input value.
  const contents = [
    new Content(...values.slice(1, 5)),
    new Content(...values.slice(3, 7)),
    new Content(...values.slice(5, 9)),
    new Content(...values.slice(7, 11)),
    new Content(...values.slice(9)),
  ];

  const generator = new SentenceGen(values[0], contents);
  console.log(await generator.next());
  console.log(await generator.next());
  console.log(await generator.next());
  console.log(await generator.next());
  console.log(await generator.next());
});