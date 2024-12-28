document.addEventListener('DOMContentLoaded', function () {
    const quizForm = document.getElementById('quizForm');
    const result = document.getElementById('result');

    quizForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Verificar se todas as perguntas foram respondidas
        const questions = quizForm.querySelectorAll('.question');
        let allAnswered = true;
        let score = 0;

        questions.forEach((question, index) => {
            const inputs = question.querySelectorAll('input[type="radio"]');
            const isChecked = Array.from(inputs).some(input => input.checked);

            if (!isChecked) {
                allAnswered = false;
                question.style.border = "2px solid red"; // Indicar visualmente a questão não respondida
            } else {
                question.style.border = "none"; // Remover destaque, se anteriormente indicado
            }
        });

        if (!allAnswered) {
            result.textContent = "Please answer all the questions before submitting.";
            result.style.display = 'block';
            result.style.color = 'red';
            return;
        }

        // Calcular a pontuação
        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');
        const q3 = document.querySelector('input[name="q3"]:checked');
        const q4 = document.querySelector('input[name="q4"]:checked');
        const q5 = document.querySelector('input[name="q5"]:checked');
        const q6 = document.querySelector('input[name="q6"]:checked');
        const q7 = document.querySelector('input[name="q7"]:checked');
        const q8 = document.querySelector('input[name="q8"]:checked');
        const q9 = document.querySelector('input[name="q9"]:checked');
        const q10 = document.querySelector('input[name="q10"]:checked');

        if (q1 && q1.value === '1896') score++;
        if (q2 && q2.value === 'five rings') score++;
        if (q3 && q3.value === 'France') score++;
        if (q4 && q4.value === 'Breakdance') score++;
        if (q5 && q5.value === 'Phryge') score++;
        if (q6 && q6.value === 'Eiffel Tower') score++;
        if (q7 && q7.value === 'July') score++;
        if (q8 && q8.value === 'USA') score++;
        if (q9 && q9.value === 'Tokyo') score++;
        if (q10 && q10.value === 'Caeleb Dressel') score++;

        result.textContent = `You scored ${score} out of 10.`;
        result.style.display = 'block';
        result.style.color = '#007BFF'; // Cor padrão para feedback positivo
    });
});
