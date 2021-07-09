/**
 * get appropriate verb from values.
 */
function getVerb(v1, v2) {
  if (v1 === v2) return 'remained flat';
  else if (v1 < v2) return 'rose';
  else if (v1 > v2) return 'fell';
}

/**
 * get appropriate adverb from values.
 */
function getAdverb(v1,v2){
  const abs = Math.abs(v1-v2);
  const percentage = abs / v1;
  
  if(percentage >= 0.7) return "substantially";
  else if(percentage >= 0.3) return 'moderately' ;
  else return 'slightly';

}
/**
 * get appropriate term from values.
 */
function getTerm(v1, v2, values) {
  const startMonth = values[1];
  const endMonth = values[3];
  const startPrice = values[2];
  const endPrice = values[4];

  if (v1 === v2) return `at ${startPrice} from ${startMonth} to ${endMonth}`;
  else return `$diff from ${startPrice} in ${startMonth}  to ${endPrice} in ${endMonth}`;
}

/**
 * create appropriate sentence from 5 values
 */
function createSentence(values) {
  const contentStrucuture = '$subject $verb $term.';
  // get number from value.
  const num1 = Number(values[2].match(/\d+/));
  const num2 = Number(values[4].match(/\d+/));

  return contentStrucuture
      // to upper case first character and replace.
      .replace('$subject', values[0])
      // get verb and replace.
      .replace('$verb', getVerb(num1, num2))
      // get term and replace.
      .replace('$term', getTerm(num1, num2, values))
      // create difference of 2 numbers and replace.
      .replace('$diff', getAdverb(num1,num2));
}
