const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

$(() => {

  createSelectOption();

  selectFile();

  checkValidation();
});

const createSelectOption = () => {
  $('select.value').each(function (index, elm) {
    $(elm).append($('<option>').text(`Month ${index + 1}`).prop('hidden', true));
    $(elm).append(months.map((e, m) => $('<option>').val(e).text(e)));
    // $(elm).append(months.map((e, m) => $('<option>').val(e).text(e).prop('selected', m == index)));
  });
}

class FileReaderEx extends FileReader{

  readAsText(blob){
    return new Promise((res, rej)=>{
        super.addEventListener("load", ({target}) => res(target.result));
        super.addEventListener("error", ({target}) => rej(target.error));
        super.readAsText(blob);
    });
  }
}

const selectFile = () => {
  var reader = new FileReaderEx();
  $('.input-file').on('change', async (elm) => {
    const file = $(elm.target).prop('files')[0];
    $('.selected-file').text(file.name);

    const data = (await reader.readAsText(file))
      .split(',')
      .map(s => s.trim())
      .map(v => months.find(month => month.startsWith(v)) ?? v);
    const title = data.shift();
    $('#item').val(title);
    $('.value').each((idx, elm) => {
      const value = data[idx] ?? null;
      if (value !== null) {
        $(elm).val(data[idx]);
      }
    });
    console.log(data);
  });
}

/**
 * Check the input values.
 */
const checkValidation = () => {
  const trigger = () => document
    .getElementById('result')
    .dispatchEvent(new Event('start'));

  $('.result').on('click', () => {
    if ([checkItem(), checkMonth(), checkValue()].every(e => e === false)) {
      console.log('trigger');
      trigger();
    }
  });
}

/**
 * Check the input item.
 */
const checkItem = () => {
  const valid = $('#title').val() === "";
  if (valid) alert('Please input "Title"!');
  return valid;
}

/**
 * Check the input month.
 */
const checkMonth = () => {
  const valid = [...$('select').map((idx, elm) => $(elm).val())].some(e => e.startsWith('Month'));
  if (valid) alert('Please input "Month"!');
  return valid;
}

/**
 * Check the input value.
 */
const checkValue = () => {
  const valid = [...$('input.value').map((idx, elm) => $(elm).val())].some(e => !/(\d)+/.test(e));
  if (valid) alert("Please input \"Value\"!");
  return valid;
}
