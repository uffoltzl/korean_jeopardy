using Newtonsoft.Json;

namespace Jeopardy.Models.Questions
{
    public class SliderQuestion : Question
    {
        [JsonProperty("beginAnswer")]
        public int BeginAnswer { get; set; }

        [JsonProperty("endAnswer")]
        public int EndAnswer { get; set; }

        [JsonProperty("step")]
        public int Step { get; set; }

        [JsonProperty("correctAnswer")]
        public int CorrectAnswer { get; set; }

        [JsonProperty("acceptedError")]
        public int AcceptedError { get; set; }

        public SliderQuestion()
        {
            QuestionType = QuestionType.Slider;
        }

        public bool IsValid(int answer)
        {
            return answer <= CorrectAnswer+AcceptedError && answer >= CorrectAnswer-AcceptedError;
        }

        public override Question Clone()
        {
            return new SliderQuestion
            {
                QuestionType = QuestionType,
                QuestionId = QuestionId,
                QuestionText = QuestionText,
                AlreadyAnswered = false,
                Difficulty = Difficulty,
                Explanation = Explanation,
                BeginAnswer = BeginAnswer,
                EndAnswer = EndAnswer,
                Step = Step,
                AcceptedError = AcceptedError,
                CorrectAnswer = CorrectAnswer
            };
        }
    }
}
