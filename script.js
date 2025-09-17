// Vocabulary quiz data
const quizData = [
    {
        question: "What does 'experience' mean?",
        options: ["trải nghiệm", "sự khác biệt", "văn hóa", "công việc"],
        correct: 0,
        type: "definition"
    },
    {
        question: "Choose the correct English word for 'miêu tả, mô tả':",
        options: ["delicious", "describe", "swallow", "unusual"],
        correct: 1,
        type: "translation"
    },
    {
        question: "What is the Vietnamese meaning of 'difference'?",
        options: ["trải nghiệm", "sự khác biệt", "ngôn ngữ hình thể", "văn hóa"],
        correct: 1,
        type: "definition"
    },
    {
        question: "'Body language' refers to:",
        options: ["ngôn ngữ viết", "ngôn ngữ nói", "ngôn ngữ hình thể", "ngôn ngữ máy"],
        correct: 2,
        type: "definition"
    },
    {
        question: "Which word means 'làm ghê tởm, làm kinh tởm'?",
        options: ["scary", "disgust", "thrilled", "confused"],
        correct: 1,
        type: "translation"
    },
    {
        question: "The Vietnamese meaning of 'culture' is:",
        options: ["khách", "bụng", "văn hóa", "dạ dày"],
        correct: 2,
        type: "definition"
    },
    {
        question: "Choose the synonym for 'scary':",
        options: ["thrilling", "frightening", "delicious", "tiny"],
        correct: 1,
        type: "synonym"
    },
    {
        question: "'Teaching job' means:",
        options: ["công việc bán hàng", "công việc dạy học", "công việc du lịch", "công việc nấu ăn"],
        correct: 1,
        type: "definition"
    },
    {
        question: "What does 'a small village' refer to?",
        options: ["một thành phố lớn", "một ngôi làng nhỏ", "một quốc gia", "một châu lục"],
        correct: 1,
        type: "definition"
    },
    {
        question: "'Overseas' means:",
        options: ["trong nước", "hải ngoại, nước ngoài", "dưới biển", "trên núi"],
        correct: 1,
        type: "definition"
    },
    {
        question: "Which phrase means 'những món ngon'?",
        options: ["tiny dishes", "scary dishes", "delicious dishes", "unusual dishes"],
        correct: 2,
        type: "translation"
    },
    {
        question: "The verb 'swallow' means:",
        options: ["nhai", "nuốt", "nôn", "cắn"],
        correct: 1,
        type: "definition"
    },
    {
        question: "What does 'tiny' mean?",
        options: ["rất lớn", "vừa phải", "rất nhỏ, nhỏ xíu", "dài"],
        correct: 2,
        type: "definition"
    },
    {
        question: "'Guest' in Vietnamese is:",
        options: ["chủ nhà", "khách", "hàng xóm", "bạn bè"],
        correct: 1,
        type: "definition"
    },
    {
        question: "What body part is 'stomach'?",
        options: ["tay", "chân", "đầu", "bụng, dạ dày"],
        correct: 3,
        type: "definition"
    },
    {
        question: "'Unusual' means:",
        options: ["bình thường", "bất thường", "thường xuyên", "hiếm khi"],
        correct: 1,
        type: "definition"
    },
    {
        question: "Which word describes feeling 'thích thú, vui sướng'?",
        options: ["depressing", "embarrassed", "thrilled", "annoyed"],
        correct: 2,
        type: "translation"
    },
    {
        question: "'Depressing' means:",
        options: ["làm vui vẻ", "làm hạnh phúc", "làm chán nản", "làm tức giận"],
        correct: 2,
        type: "definition"
    },
    {
        question: "If you feel 'embarrassed', you are:",
        options: ["tự tin", "lúng túng, bối rối", "vui vẻ", "tức giận"],
        correct: 1,
        type: "definition"
    },
    {
        question: "What does 'convincing' mean?",
        options: ["có sức thuyết phục", "không thuyết phục", "khó hiểu", "dễ hiểu"],
        correct: 0,
        type: "definition"
    }
];

class VocabularyQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.wrongAnswers = [];
        this.isRetryMode = false;
        this.retryQuestions = [];
        this.currentRetryIndex = 0;
        this.countdownTimer = null;
        
        // Shuffle questions randomly
        this.shuffledQuizData = this.shuffleArray([...quizData]);
        this.totalQuestions = this.shuffledQuizData.length;
        
        this.initializeElements();
        this.bindEvents();
        this.loadQuestion();
    }
    
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    initializeElements() {
        this.questionEl = document.getElementById('question');
        this.optionsEl = document.querySelectorAll('.option');
        this.progressEl = document.getElementById('progress');
        this.questionNumberEl = document.getElementById('questionNumber');
        this.totalQuestionsEl = document.getElementById('totalQuestions');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.feedbackEl = document.getElementById('feedback');
        this.resultsEl = document.getElementById('results');
        this.quizContainer = document.querySelector('.quiz-container');
        this.restartBtn = document.getElementById('restartBtn');
        this.retryIndicator = document.getElementById('retryIndicator');
        
        this.totalQuestionsEl.textContent = this.totalQuestions;
    }
    
    bindEvents() {
        this.optionsEl.forEach((option, index) => {
            option.addEventListener('click', () => this.selectOption(index));
        });
        
        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.submitBtn.addEventListener('click', () => this.submitQuiz());
        this.resetBtn.addEventListener('click', () => this.resetQuiz());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
    }
    
    loadQuestion() {
        // Clear any running countdown when loading a new question
        this.clearCountdown();
        
        let question;
        let questionIndex;
        
        if (this.isRetryMode) {
            if (this.currentRetryIndex >= this.retryQuestions.length) {
                this.completeRetry();
                return;
            }
            question = this.retryQuestions[this.currentRetryIndex];
            questionIndex = this.currentRetryIndex;
            this.questionNumberEl.textContent = `Retry ${this.currentRetryIndex + 1}`;
        } else {
            question = this.shuffledQuizData[this.currentQuestion];
            questionIndex = this.currentQuestion;
            this.questionNumberEl.textContent = this.currentQuestion + 1;
        }
        
        this.questionEl.textContent = question.question;
        
        this.optionsEl.forEach((option, index) => {
            option.textContent = question.options[index];
            option.className = 'option';
            option.disabled = false;
        });
        
        // Show previous answer if exists
        const answerIndex = this.isRetryMode ? questionIndex : this.currentQuestion;
        if (this.answers[answerIndex] !== undefined) {
            this.optionsEl[this.answers[answerIndex]].classList.add('selected');
        }
        
        this.updateProgress();
        this.updateButtons();
        this.hideFeedback();
    }
    
    selectOption(index) {
        // Remove previous selection
        this.optionsEl.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selection to clicked option
        this.optionsEl[index].classList.add('selected');
        
        // Store answer
        const answerIndex = this.isRetryMode ? this.currentRetryIndex : this.currentQuestion;
        this.answers[answerIndex] = index;
        
        // Show immediate feedback and auto advance
        this.showFeedback(index);
    }
    
    showFeedback(selectedIndex) {
        let question;
        if (this.isRetryMode) {
            question = this.retryQuestions[this.currentRetryIndex];
        } else {
            question = this.shuffledQuizData[this.currentQuestion];
        }
        
        const isCorrect = selectedIndex === question.correct;
        
        this.feedbackEl.className = 'feedback show';
        
        if (isCorrect) {
            this.feedbackEl.classList.add('correct');
            this.feedbackEl.innerHTML = `
                Correct! Well done!
                <div class="auto-advance-indicator">
                    <div class="countdown-circle">1.5</div>
                    Next question coming up...
                </div>
            `;
            this.optionsEl[selectedIndex].classList.add('correct');
        } else {
            this.feedbackEl.classList.add('wrong');
            this.feedbackEl.innerHTML = `
                Incorrect. The correct answer is: ${question.options[question.correct]}
                <div class="auto-advance-indicator">
                    <div class="countdown-circle">1.5</div>
                    Next question coming up...
                </div>
            `;
            this.optionsEl[selectedIndex].classList.add('wrong');
            this.optionsEl[question.correct].classList.add('correct');
            
            // Store wrong answer for retry mode
            if (!this.isRetryMode) {
                this.wrongAnswers.push({
                    questionIndex: this.currentQuestion,
                    question: question,
                    userAnswer: selectedIndex,
                    correctAnswer: question.correct
                });
            }
        }
        
        // Disable all options after selection
        this.optionsEl.forEach(option => {
            option.classList.add('disabled');
        });
        
        // Check if this is the last question
        const isLastQuestion = this.isRetryMode ? 
            this.currentRetryIndex === this.retryQuestions.length - 1 :
            this.currentQuestion === this.totalQuestions - 1;
            
        if (isLastQuestion) {
            // Update feedback for last question
            const indicator = this.feedbackEl.querySelector('.auto-advance-indicator');
            if (indicator) {
                indicator.innerHTML = `
                    <div class="countdown-circle">1.5</div>
                    Submit button will appear...
                `;
            }
        }
        
        // Auto advance to next question after 1.5 seconds with countdown
        this.startCountdown(() => {
            this.autoAdvanceToNext();
        });
    }
    
    startCountdown(callback) {
        // Clear any existing countdown
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
        }
        
        const countdownEl = this.feedbackEl.querySelector('.countdown-circle');
        if (!countdownEl) return;
        
        let timeLeft = 1.5;
        this.countdownTimer = setInterval(() => {
            timeLeft -= 0.1;
            countdownEl.textContent = Math.max(0, timeLeft).toFixed(1);
            
            if (timeLeft <= 0) {
                clearInterval(this.countdownTimer);
                this.countdownTimer = null;
                callback();
            }
        }, 100);
    }
    
    clearCountdown() {
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
            this.countdownTimer = null;
        }
    }
    
    
    autoAdvanceToNext() {
        if (this.isRetryMode) {
            if (this.currentRetryIndex < this.retryQuestions.length - 1) {
                this.currentRetryIndex++;
                this.loadQuestion();
            } else {
                // Last question in retry mode, show submit button
                this.nextBtn.style.display = 'none';
                this.submitBtn.style.display = 'block';
                this.submitBtn.textContent = 'Complete Retry';
            }
        } else {
            if (this.currentQuestion < this.totalQuestions - 1) {
                this.currentQuestion++;
                this.loadQuestion();
            } else {
                // Last question, show submit button
                this.nextBtn.style.display = 'none';
                this.submitBtn.style.display = 'block';
                this.submitBtn.textContent = 'Submit Quiz';
            }
        }
    }
    
    hideFeedback() {
        this.feedbackEl.className = 'feedback';
    }
    
    updateProgress() {
        let progress;
        if (this.isRetryMode) {
            progress = ((this.currentRetryIndex + 1) / this.retryQuestions.length) * 100;
        } else {
            progress = ((this.currentQuestion + 1) / this.totalQuestions) * 100;
        }
        this.progressEl.style.width = `${progress}%`;
    }
    
    updateButtons() {
        if (this.isRetryMode) {
            this.prevBtn.disabled = this.currentRetryIndex === 0;
            
            // Check if this is the last question or if answer is already selected
            const isLastQuestion = this.currentRetryIndex === this.retryQuestions.length - 1;
            const hasAnswer = this.answers[this.currentRetryIndex] !== undefined;
            
            if (isLastQuestion && hasAnswer) {
                this.nextBtn.style.display = 'none';
                this.submitBtn.style.display = 'block';
                this.submitBtn.textContent = 'Complete Retry';
            } else if (hasAnswer) {
                this.nextBtn.style.display = 'none';
                this.submitBtn.style.display = 'none';
            } else {
                this.nextBtn.style.display = 'block';
                this.submitBtn.style.display = 'none';
                this.nextBtn.disabled = true;
            }
        } else {
            this.prevBtn.disabled = this.currentQuestion === 0;
            
            // Check if this is the last question or if answer is already selected
            const isLastQuestion = this.currentQuestion === this.totalQuestions - 1;
            const hasAnswer = this.answers[this.currentQuestion] !== undefined;
            
            if (isLastQuestion && hasAnswer) {
                this.nextBtn.style.display = 'none';
                this.submitBtn.style.display = 'block';
                this.submitBtn.textContent = 'Submit Quiz';
            } else if (hasAnswer) {
                this.nextBtn.style.display = 'none';
                this.submitBtn.style.display = 'none';
            } else {
                this.nextBtn.style.display = 'block';
                this.submitBtn.style.display = 'none';
                this.nextBtn.disabled = true;
            }
        }
    }
    
    previousQuestion() {
        if (this.isRetryMode) {
            if (this.currentRetryIndex > 0) {
                this.currentRetryIndex--;
                this.loadQuestion();
            }
        } else {
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
                this.loadQuestion();
            }
        }
    }
    
    nextQuestion() {
        if (this.isRetryMode) {
            if (this.currentRetryIndex < this.retryQuestions.length - 1) {
                this.currentRetryIndex++;
                this.loadQuestion();
            }
        } else {
            if (this.currentQuestion < this.totalQuestions - 1) {
                this.currentQuestion++;
                this.loadQuestion();
            }
        }
    }
    
    calculateScore() {
        this.score = 0;
        for (let i = 0; i < this.totalQuestions; i++) {
            if (this.answers[i] === this.shuffledQuizData[i].correct) {
                this.score++;
            }
        }
    }
    
    submitQuiz() {
        let requiredAnswers, currentAnswers;
        
        if (this.isRetryMode) {
            requiredAnswers = this.retryQuestions.length;
            currentAnswers = this.retryQuestions.filter((_, index) => this.answers[index] !== undefined).length;
        } else {
            requiredAnswers = this.totalQuestions;
            currentAnswers = this.answers.filter(answer => answer !== undefined).length;
        }
        
        if (currentAnswers < requiredAnswers) {
            alert('Please answer all questions before submitting.');
            return;
        }
        
        if (this.isRetryMode) {
            this.completeRetry();
        } else {
            this.calculateScore();
            if (this.wrongAnswers.length > 0) {
                this.startRetryMode();
            } else {
                this.showResults();
            }
        }
    }
    
    
    startRetryMode() {
        alert(`You got ${this.wrongAnswers.length} questions wrong. Let's retry those questions!`);
        this.isRetryMode = true;
        this.retryQuestions = this.wrongAnswers.map(wrong => wrong.question);
        this.currentRetryIndex = 0;
        this.answers = []; // Reset answers for retry
        
        // Show retry indicator
        this.retryIndicator.style.display = 'block';
        
        // Update total questions display for retry mode
        this.totalQuestionsEl.textContent = this.retryQuestions.length;
        
        this.loadQuestion();
    }
    
    completeRetry() {
        // Calculate retry score
        let retryScore = 0;
        for (let i = 0; i < this.retryQuestions.length; i++) {
            if (this.answers[i] === this.retryQuestions[i].correct) {
                retryScore++;
            }
        }
        
        alert(`Retry completed! You got ${retryScore} out of ${this.retryQuestions.length} questions correct.`);
        this.showResults();
    }
    
    showResults() {
        this.quizContainer.style.display = 'none';
        this.resultsEl.style.display = 'block';
        
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        
        document.getElementById('scorePercentage').textContent = `${percentage}%`;
        document.getElementById('correctAnswers').textContent = this.score;
        document.getElementById('totalScore').textContent = this.totalQuestions;
        
        this.showDetailedResults();
    }
    
    showDetailedResults() {
        const resultDetailsEl = document.getElementById('resultDetails');
        resultDetailsEl.innerHTML = '<h3>Detailed Results:</h3>';
        
        for (let i = 0; i < this.totalQuestions; i++) {
            const question = this.shuffledQuizData[i];
            const userAnswer = this.answers[i];
            const isCorrect = userAnswer === question.correct;
            
            const resultDiv = document.createElement('div');
            resultDiv.className = `question-result ${isCorrect ? 'correct' : 'wrong'}`;
            
            resultDiv.innerHTML = `
                <h4>Question ${i + 1}: ${question.question}</h4>
                <p><strong>Your answer:</strong> ${question.options[userAnswer]}</p>
                ${!isCorrect ? `<p><strong>Correct answer:</strong> ${question.options[question.correct]}</p>` : ''}
            `;
            
            resultDetailsEl.appendChild(resultDiv);
        }
    }
    
    
    resetQuiz() {
        if (confirm('Are you sure you want to reset the quiz? All progress will be lost.')) {
            this.restartQuiz();
        }
    }
    
    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.wrongAnswers = [];
        this.isRetryMode = false;
        this.retryQuestions = [];
        this.currentRetryIndex = 0;
        
        // Hide retry indicator
        this.retryIndicator.style.display = 'none';
        
        // Shuffle questions again for new quiz
        this.shuffledQuizData = this.shuffleArray([...quizData]);
        this.totalQuestions = this.shuffledQuizData.length;
        
        this.resultsEl.style.display = 'none';
        this.quizContainer.style.display = 'block';
        
        // Reset total questions display
        this.totalQuestionsEl.textContent = this.totalQuestions;
        
        this.loadQuestion();
    }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    const quiz = new VocabularyQuiz();
    // Store quiz instance globally if needed
    window.vocabularyQuiz = quiz;
});