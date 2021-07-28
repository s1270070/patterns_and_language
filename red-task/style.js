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

const selectFile = () => {
  $('.input-file').on('change', function () {
    const file = $(this).prop('files')[0];
    $('.selected-file').text(file.name);
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

    // File is not selected
    if ($('.input-file').prop('files').length !== 0) {
      trigger();
      return;
    }
    console.log('a');
    if ([checkItem(), checkMonth(), checkValue()].some(e => !e)) {
      trigger();
    }
  });
}

/**
 * Check the input item.
 */
const checkItem = () => {
  if ($('.item-area').val() === "") {
    alert("Please input \"Item\"!");
    return false;
  }
  return true;
}

/**
 * Check the input month.
 */
const checkMonth = () => {
  const valid = [...$('select').map((idx, elm) => $(elm).val())].every(e => e.match('Month'));
  if (valid) alert("Please input \"Month\"!");
  return valid;
}

/**
 * Check the input value.
 */
const checkValue = () => {
  const valid = [...$('input.value').map((idx, elm) => $(elm).val())].every(e => e === '');
  if (valid) alert("Please input \"Value\"!");
  return valid;
}
