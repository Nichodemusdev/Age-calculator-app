document.getElementById('date-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    
    const dayValue = parseInt(dayInput.value, 10);
    const monthValue = parseInt(monthInput.value, 10);
    const yearValue = parseInt(yearInput.value, 10);
    
    const dayLabel = document.querySelector('label[for="day"]');
    const monthLabel = document.querySelector('label[for="month"]');
    const yearLabel = document.querySelector('label[for="year"]');
    
    let isValid = true;
    
    
    document.querySelectorAll('.error-message').forEach(msg => msg.style.display = 'none');
    document.querySelectorAll('input').forEach(input => input.style.border = '1px solid #ddd');
    document.querySelectorAll('label').forEach(label => label.style.color = 'black');
    
    
    if (!dayInput.value) {
        showError(dayInput, dayLabel, 'This field is required');
        isValid = false;
    } else if (isNaN(dayValue) || dayValue < 1 || dayValue > 31) {
        showError(dayInput, dayLabel, 'Must be a valid day');
        isValid = false;
    }
    
    
    if (!monthInput.value) {
        showError(monthInput, monthLabel, 'This field is required');
        isValid = false;
    } else if (isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
        showError(monthInput, monthLabel, 'Must be a valid month');
        isValid = false;
    }
    
    
    const currentYear = new Date().getFullYear();
    if (!yearInput.value) {
        showError(yearInput, yearLabel, 'This field is required');
        isValid = false;
    } else if (isNaN(yearValue) || yearValue > currentYear) {
        showError(yearInput, yearLabel, 'Must be in the past');
        isValid = false;
    }
    
    
    if (isValid && !isValidDate(dayValue, monthValue, yearValue)) {
        showError(dayInput, dayLabel, 'Must be a valid date');
        showError(monthInput, monthLabel, '');
        showError(yearInput, yearLabel, '');
        isValid = false;
    }
    

    if (isValid) {
        displayResult(dayValue, monthValue, yearValue);
    }
});

function showError(input, label, message) {
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    input.style.border = '1px solid red';
    label.style.color = 'red';
}

function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function displayResult(day, month, year) {
    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();
    
    if (days < 0) {
        months--;
        days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const yearsInfo = document.getElementById('years-info');
    const monthsInfo = document.getElementById('months-info');
    const daysInfo = document.getElementById('days-info');
    
    
    document.querySelectorAll('.result-dash').forEach(dash => dash.style.display = 'none');
    
    
    yearsInfo.textContent = years;
    monthsInfo.textContent = months;
    daysInfo.textContent = days;
}
