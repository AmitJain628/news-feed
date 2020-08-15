export const fetchQuestionsTopicList = async () => {
    return (await import('../data/question-topic-list.json')).default;
}

export const fetchQuestions = async () => {
    return (await import('../data/question-topic-1.json')).default;
}
