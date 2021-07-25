const months = ["Jan", "Feb", "Mar", "Ari", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

$(() => {

  // createSelectOption();

  selectFile();
  
  checkValidation();
});

const createSelectOption = () => {
  const selectBoxes = $('select');
  console.log(selectBoxes);

  // selectBoxes.forEach(selectBox => {
  //   createMonth(selectBox);
  // });
  $('select').each(function(index, element) {
    createMonth(element);
  });
}

const createMonth = (selectBox) => {

  months.forEach(month => {
    selectBox.append($('<option>').html(month).val(month));
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
  $('.result').on('click', () => {

    // File is not selected
    if ($('.input-file').prop('files').length === 0) {
      checkItem();
      checkMonth();
      checkValue();
    }
  });
}

/**
 * Check the input item.
 */
const checkItem = () => {
  if ($('.item-area').val() === "") {
    alert("Please input \"Item\"!");
  }
}

/**
 * Check the input month.
 */
const checkMonth = () => {
  $('select').each(function(index, element) {
    if (element.value.match('Month')) {
      alert("Please input \"Month\"!");
      return false;
    }
  });
}

/**
 * Check the input value.
 */
const checkValue = () => {
  $('.value').each(function(index, element) {
    if (element.value === "") {
      alert("Please input \"Value\"!");
      return false;
    }
  });
}