$(document).ready(function() {
  return $('.zip-search form').submit(function() {
    var results, zip;
    $(this).find('.error').hide();
    zip = $(this).find('input').val();
    $(this).find('.result').hide();
    results = $(this).find('.result[data-zip="' + zip + '"]');
    results.show();
    if (!results.length) {
      $(this).find('.error').show();
    }
    return false;
  });
});
