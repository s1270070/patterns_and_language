// add prototype capitalize the first letter.
String.prototype.firstUpper = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

class Content {
  /**
   * constructor
   * @param  {...String} values
   */
  constructor(...values) {
    this.month = {
      start: values[0],
      end: values[2],
    };
    this.price = {
      start: Number(values[1].match(/\d+/)),
      end: Number(values[3].match(/\d+/)),
      get diff() { return this.start - this.end },
    };
  }

  // get appropriate verb
  get verb() {
    const diff = this.price.diff;
    if (diff === 0) return 'remained flat';
    else if (diff < 0) return 'rose';
    else if (diff > 0) return 'fell';
  }

  // get appropriate noun
  get noun() {
    const diff = this.price.diff;
    if (diff > 0) return 'fall';
    else if (diff < 0) return 'rise';
  }

  // get appropriate abverb
  get abverb() {
    const percentage = Math.abs(this.price.diff) / this.price.start;
    if (percentage >= 0.7) return "substantially";
    else if (percentage >= 0.3) return 'moderately';
    else return 'slightly';
  }

  // get appropriate adjective
  get adjective() {
    const percentage = Math.abs(this.price.diff) / this.price.start;
    if (percentage >= 0.7) return "substance";
    else if (percentage >= 0.3) return 'moderate';
    else return 'slight';
  }

  // get appropriate term
  get term() {
    const price = this.price;
    const month = this.month;
    if (price.diff == 0) return `at ${price.start} from ${month.start} to ${month.end}`;
    else return `from ${price.start} in ${month.start} to ${price.end} in ${month.end}`;
  }
}

class SentenceGenerator {
  /**
   * constructor
   * @param {String} subject
   * @param {Array<Content>} contents
   */
  constructor(subject, contents) {
    this.subject = subject;
    this.contents = contents;
    this.strucutuers = [
      "$subject $adjective $noun in the student of number $term.",
      "$subject $adverb $verb $term.",
    ]
  }

  /**
   * create subjects
   * @returns {Array<String>} subjects
   */
  createSubjects() {
    const [_, multi] = this.subject.match(/^The number of (.+)/);
    return [
      this.subject,
      `${multi.firstUpper()} number`,
      `The number of them`,
      `The number`,
      `It`
    ];
  }

  /**
   * create dummy subject
   */
  createDummySubjects() {
    return [
      'There was a',
      '',
      'It was',
      '',
      'It was'
    ];
  }

  /**
   * get generated sentences
   * @returns {Array<String>} sentences
   * if even, return verb style sentence
   * if odd and diff not 0, return noun style sentence
   */
  get() {
    const subjects = this.createSubjects();
    const dummy = this.createDummySubjects();

    return this.contents.map((c, i) => {

      if (i % 2 == 0 && c.price.diff != 0) {
        return this.strucutuers[0]
          .replace('$subject', dummy[i])
          .replace('$adjective', c.adjective)
          .replace('$noun', c.noun)
          .replace('$term', c.term)
          .replaceAll(/\s+/g, ' ')
      } else {
        return this.strucutuers[1]
          .replace('$subject', subjects[i])
          .replace('$adverb', c.abverb)
          .replace('$verb', c.verb)
          .replace('$term', c.term)
          .replaceAll(/\s+/g, ' ');
      }
    });
  }
}
/**
* call this function to generate sentences from inputs.
*/
function main(values) {
  // create cointent data from input value.
  const contents = [
    new Content(...values.slice(1, 5)),
    new Content(...values.slice(3, 7)),
    new Content(...values.slice(5, 9)),
    new Content(...values.slice(7, 11)),
    new Content(...values.slice(9)),
  ];
  const generator = new SentenceGenerator(values[0], contents);

  return generator.get();
}

