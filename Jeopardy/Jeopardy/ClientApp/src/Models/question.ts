export enum QuestionType
{
    Radio,
    MultipleChoice,
    Textfield,
    Slider,
    OrderedList
}
export interface Question {
    questionType: QuestionType;
    questionId: string;
    questionText: string;
    alreadyAnswered: boolean;
    difficulty: number;
    explanation: string;
}

export interface Answer {
    answerId: string;
    textAnswer: string;
}

export interface MultipleChoiceQuestion extends Question {
    possibleAnswers: Answer[];
    correctAnswerIds: string[];
}

export interface OrderedListQuestion extends Question {
    possibleAnswers: Answer[];
    correctOrderIds: string[];
}

export interface TextfieldQuestion extends Question {
    expectedAnswer: string[];
}

export interface RadioQuestion extends Question {
    possibleAnswers: Answer[];
    correctAnswerId: string;
}

export interface SliderQuestion extends Question {
    beginAnswer: number;
    endAnswer: number;
    step: number;
    correctAnswer: number;
    acceptedError: number;
}