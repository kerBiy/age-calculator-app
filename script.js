// Select the output elements
const output_year = document.getElementById("year-output");
const output_month = document.getElementById("month-output");
const output_day = document.getElementById("day-output");

// Select the submit button
const submit_button = document.getElementById("submit-btn");
isValid = false;

// Select the input elements
const input_year = document.getElementById("year-input");
const input_month = document.getElementById("month-input");
const input_day = document.getElementById("day-input");

// Select the error elements
const error_year = document.getElementById("year-error");
const error_month = document.getElementById("month-error");
const error_day = document.getElementById("day-error");

function getDay(day) {
  day = parseInt(day, 10);
  return day < 10 && day[0] != "0" ? `0${day}` : day;
}

function getMonth(month) {
  month = parseInt(month, 10);
  return month < 10 && month[0] != "0" ? `0${month}` : month;
}

function errorYear(prompt) {
  error_year.innerHTML = prompt;
  document.getElementById("year-label").style.color = "var(--clr-red)";
  input_year.style.borderColor = "var(--clr-red)";
}

function errorMonth(prompt) {
  error_month.innerHTML = prompt;
  document.getElementById("month-label").style.color = "var(--clr-red)";
  input_month.style.borderColor = "var(--clr-red)";
}

function errorDay(prompt) {
  error_day.innerHTML = prompt;
  document.getElementById("day-label").style.color = "var(--clr-red)";
  input_day.style.borderColor = "var(--clr-red)";
}

function resetYear() {
  error_year.innerHTML = "";
  document.getElementById("year-label").style.color = "var(--clr-gray)";
  input_year.style.borderColor = "var(--clr-light-gray)";
}

function resetMonth() {
  error_month.innerHTML = "";
  document.getElementById("month-label").style.color = "var(--clr-gray)";
  input_month.style.borderColor = "var(--clr-light-gray)";
}

function resetDay() {
  error_day.innerHTML = "";
  document.getElementById("day-label").style.color = "var(--clr-gray)";
  input_day.style.borderColor = "var(--clr-light-gray)";
}

function resetStyle() {
  resetYear();
  resetMonth();
  resetDay();
}

function isValidYear(year) {
  currentYear = new Date().getFullYear();
  if (Number.isInteger(year) && year >= 0 && year <= currentYear) {
    resetYear();
    return true;
  }

  errorYear("Must be in the past");
  return false;
}

function isValidMonth(month, year) {
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;

  if (!(Number.isInteger(month) && month >= 1 && month <= 12)) {
    errorMonth("Must be a valid month");
    return false;
  }
  if (year == currentYear && month > currentMonth) {
    errorMonth("Must be in the past");
    return false;
  }
  resetMonth();
  return true;
}

function isValidDay(year, month, day) {
  if (!(Number.isInteger(day) && day >= 1 && day <= 31)) {
    errorDay("Must be a valid day");
    return false;
  }

  const lastDayOfMonth = new Date(year, month, 0).getDate();

  if (day > lastDayOfMonth) {
    errorDay("Must be a valid date");
    errorMonth("");
    errorYear("");
    return false;
  }

  resetDay();
  return true;
}

function isValidDate(inputDate) {
  const dateParts = inputDate.split("-");
  if (dateParts.length === 3) {
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    const validYear = isValidYear(year);
    const validMonth = isValidMonth(month, year);
    const validDay = isValidDay(year, month, day);
    return validYear && validMonth && validDay;
  }

  return false;
}

function resetOutputDates() {
  output_day.innerHTML = "--";
  output_month.innerHTML = "--";
  output_year.innerHTML = "--";
}

const getDateDifference = (inputDate) => {
  const inputDateTime = new Date(inputDate);
  const currentDate = new Date();

  const yearsDifference =
    currentDate.getFullYear() - inputDateTime.getFullYear();

  let monthsDifference = currentDate.getMonth() - inputDateTime.getMonth();
  if (currentDate.getDate() < inputDateTime.getDate()) {
    monthsDifference--;
  }

  let daysDifference = currentDate.getDate() - inputDateTime.getDate();
  if (daysDifference < 0) {
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    daysDifference =
      lastDayOfMonth - inputDateTime.getDate() + currentDate.getDate();
    monthsDifference--;
  }

  return {
    years: yearsDifference,
    months: monthsDifference,
    days: daysDifference,
  };
};

submit_button.addEventListener("click", () => {
  let day = getDay(input_day.value);
  let month = getMonth(input_month.value);
  let year = input_year.value;

  let birthday = `${year}-${month}-${day}`;

  if (!isValidDate(birthday)) {
    resetOutputDates();
    return;
  }

  let difference = getDateDifference(birthday);
  output_day.innerHTML = difference.days;
  output_month.innerHTML = difference.months;
  output_year.innerHTML = difference.years;
});
