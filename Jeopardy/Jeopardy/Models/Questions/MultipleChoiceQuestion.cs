using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace Jeopardy.Models.Questions
{
    public class MultipleChoiceQuestion : Question
    {
        [JsonProperty("possibleAnswers")]
        public List<Answer> PossibleAnswers { get; set; }

        [JsonProperty("correctAnswerIds")]
        public List<string> CorrectAnswerIds { get; set; }

        public MultipleChoiceQuestion()
        {
            QuestionType = QuestionType.MultipleChoice;
        }

        public int IsValid(List<string> answerIds)
        {
            int intersectCount = answerIds.Intersect(CorrectAnswerIds).Count();
            if (answerIds.Count == CorrectAnswerIds.Count - 1)
            {
                if(intersectCount == answerIds.Count)
                {
                    return Difficulty / 2;
                }
            }
            else if (answerIds.Count == CorrectAnswerIds.Count + 1)
            {
                if(intersectCount == CorrectAnswerIds.Count)
                {
                    return Difficulty / 2;
                }
            }
            else if (answerIds.Count == CorrectAnswerIds.Count)
            {
                if (intersectCount == answerIds.Count)
                {
                    return Difficulty;
                }
                else if (intersectCount == CorrectAnswerIds.Count - 1)
                {
                    return Difficulty / 2;
                }
            }

            return 0;
        }

        public override Question Clone()
        {
            return new MultipleChoiceQuestion
            {
                QuestionType = QuestionType,
                QuestionId = QuestionId,
                QuestionText = QuestionText,
                AlreadyAnswered = false,
                Difficulty = Difficulty,
                Explanation = Explanation,
                PossibleAnswers = new List<Answer>(PossibleAnswers),
                CorrectAnswerIds = new List<string>(CorrectAnswerIds),
            };
        }
    }
}
