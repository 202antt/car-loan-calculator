const loanForm = document.getElementById("loan-form");
const monthlyPayment = document.getElementById("monthly-payment");
const totalPayment = document.getElementById("total-payment");
const totalInterest = document.getElementById("total-interest");
const errorMessage = document.getElementById("error-message");

loanForm.addEventListener("submit", function (event) {
    event.preventDefault();
    errorMessage.textContent = ""; // Clear previous error message

    const carPrice = Number(document.getElementById("car-price").value);
    const downPayment = Number(document.getElementById("down-payment").value);
    const loanTerm = Number(document.getElementById("loan-term").value);
    const interestRate = Number(document.getElementById("interest-rate").value);

    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;

    const numberOfPayments = loanTerm;

    if (carPrice <= 0) {
        errorMessage.textContent = "Car price must be greater than 0.";
        monthlyPayment.textContent = "$0.00";
        totalPayment.textContent = "$0.00";
        totalInterest.textContent = "$0.00";
        return;
    }

    if (downPayment < 0) {
        errorMessage.textContent = "Down payment cannot be negative.";
        monthlyPayment.textContent = "$0.00";
        totalPayment.textContent = "$0.00";
        totalInterest.textContent = "$0.00";
        return;
    }

    if (downPayment >= carPrice) {
        errorMessage.textContent = "Down payment must be less than the car price.";
        monthlyPayment.textContent = "$0.00";
        totalPayment.textContent = "$0.00";
        totalInterest.textContent = "$0.00";
        return;
    }

    if (numberOfPayments <= 0) {
        errorMessage.textContent = "Loan term must be greater than 0.";
        monthlyPayment.textContent = "$0.00";
        totalPayment.textContent = "$0.00";
        totalInterest.textContent = "$0.00";
        return;
    }

    if (interestRate < 0) {
        errorMessage.textContent = "Interest rate cannot be negative.";
        monthlyPayment.textContent = "$0.00";
        totalPayment.textContent = "$0.00";
        totalInterest.textContent = "$0.00";
        return;
    }


    let monthly;
    if (monthlyRate === 0) {
        monthly = principal / numberOfPayments;
    } else {
        monthly =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const total = monthly * numberOfPayments;
    const interest = total - principal;

    monthlyPayment.textContent = `$${monthly.toFixed(2)}`;
    totalPayment.textContent = `$${total.toFixed(2)}`;
    totalInterest.textContent = `$${interest.toFixed(2)}`;
});