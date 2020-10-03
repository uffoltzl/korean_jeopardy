using Newtonsoft.Json;
using System.Collections.Generic;

namespace Jeopardy.Models.Questions
{
    public class TextfieldQuestion : Question
    {
        [JsonProperty("expectedAnswer")]
        public List<string> ExpectedAnswer { get; set; }

        public TextfieldQuestion()
        {
            QuestionType = QuestionType.Textfield;
        }

        public bool IsValid(string answer)
        {
            if(answer == null || answer == "")
            {
                return false;
            }
            return ExpectedAnswer.Contains(answer.ToLower());
        }

        public override Question Clone()
        {
            return new TextfieldQuestion
            {
                QuestionType = QuestionType,
                QuestionId = QuestionId,
                QuestionText = QuestionText,
                AlreadyAnswered = false,
                Difficulty = Difficulty,
                Explanation = Explanation,
                ExpectedAnswer = ExpectedAnswer
            };
        }
    }
}
