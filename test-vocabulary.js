// Test case để kiểm tra logic trích xuất từ vựng tiếng Anh
const testQuestions = [
    {
        question: "Which phrase means 'những món ngon'?",
        options: ["tiny dishes", "scary dishes", "delicious dishes", "unusual dishes"],
        correct: 2,
        expected: "delicious dishes" // Nên đọc từ đáp án đúng
    },
    {
        question: "What does 'experience' mean?",
        options: ["trải nghiệm", "sự khác biệt", "văn hóa", "công việc"],
        correct: 0,
        expected: "experience" // Nên đọc từ trong quotes
    },
    {
        question: "Choose the correct English word for 'miêu tả, mô tả':",
        options: ["delicious", "describe", "swallow", "unusual"],
        correct: 1,
        expected: "describe" // Nên đọc từ đáp án đúng
    }
];

console.log("Testing English vocabulary extraction...");
// Test sẽ được chạy trong browser console