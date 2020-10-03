using Newtonsoft.Json;
using System.Collections.Generic;

namespace Jeopardy.Models.Questions
{
    public class RadioQuestion : Question
    {
        [JsonProperty("possibleAnswers")]
        public List<Answer> PossibleAnswers { get; set; }

        [JsonProperty("correctAnswerId")]
        public string CorrectAnswerId { get; set; }

        public RadioQuestion()
        {
            QuestionType = QuestionType.Radio;
        }

        public bool IsValid(string answerId)
        {
            return CorrectAnswerId == answerId;
        }

        public override Question Clone()
        {
            return new RadioQuestion
            {
                QuestionType = QuestionType,
                QuestionId = QuestionId,
                QuestionText = QuestionText,
                AlreadyAnswered = false,
                Difficulty = Difficulty,
                Explanation = Explanation,
                PossibleAnswers = new List<Answer>(PossibleAnswers),
                CorrectAnswerId = CorrectAnswerId
            };
        }
    }
}
