function formatCurrency(amount) {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}

function resetResults() {
    monthlyPayment.textContent = formatCurrency(0);
    totalPayment.textContent = formatCurrency(0);
    totalInterest.textContent = formatCurrency(0);
}

function showError(message) {
    errorMessage.textContent = message;
    resetResults();
}

function validateInputs(carPrice, downPayment, numberOfPayments, interestRate) {
    if (carPrice <= 0) {
        return "Car price must be greater than 0.";
    }

    if (downPayment < 0) {
        return "Down payment cannot be negative.";
    }

    if (downPayment >= carPrice) {
        return "Down payment must be less than the car price.";
    }

    if (numberOfPayments <= 0) {
        return "Loan term must be greater than 0.";
    }

    if (interestRate < 0) {
        return "Interest rate cannot be negative.";
    }

    return "";
}


const loanForm = document.getElementById("loan-form");
const monthlyPayment = document.getElementById("monthly-payment");
const totalPayment = document.getElementById("total-payment");
const totalInterest = document.getElementById("total-interest");
const errorMessage = document.getElementById("error-message");

const carPriceInput = document.getElementById("car-price");
const downPaymentInput = document.getElementById("down-payment");
const loanTermInput = document.getElementById("loan-term");
const interestRateInput = document.getElementById("interest-rate");

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function () {
    loanForm.reset();
    errorMessage.textContent = "";
    resetResults();
});



loanForm.addEventListener("submit", function (event) {
    event.preventDefault();
    errorMessage.textContent = ""; // Clear previous error message

    const carPrice = Number(carPriceInput.value);
    const downPayment = Number(downPaymentInput.value);
    const loanTerm = Number(loanTermInput.value);
    const interestRate = Number(interestRateInput.value);


    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;

    const numberOfPayments = loanTerm;
    const validationMessage = validateInputs(
        carPrice,
        downPayment,
        numberOfPayments,
        interestRate
    );

    if (validationMessage) {
        showError(validationMessage);
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

    monthlyPayment.textContent = formatCurrency(monthly);
    totalPayment.textContent = formatCurrency(total);
    totalInterest.textContent = formatCurrency(interest);
});
