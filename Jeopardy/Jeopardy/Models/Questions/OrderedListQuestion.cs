using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace Jeopardy.Models.Questions
{
    public class OrderedListQuestion : Question
    {
        [JsonProperty("possibleAnswers")]
        public List<Answer> PossibleAnswers { get; set; }

        [JsonProperty("correctOrderedIds")]
        public List<string> CorrectOrderedIds { get; set; }

        public OrderedListQuestion()
        {
            QuestionType = QuestionType.OrderedList;
        }

        public int IsValid(List<string> answerIds)
        {
            bool wrong = false;
            var i = 0;
            while(i < CorrectOrderedIds.Count)
            {
                if (answerIds[i] != CorrectOrderedIds[i])
                {
                    if (wrong)
                    {
                        return 0;
                    }
                    else
                    {
                        wrong = true;
                        CorrectOrderedIds.Remove(answerIds[i]);
                        answerIds.RemoveAt(i);
                    }
                }
                else
                {
                    i++;
                }
            }

            if (wrong)
            {
                return Difficulty / 2;
            }
            else
            {
                return Difficulty;
            }
        }

        public override Question Clone()
        {
            return new OrderedListQuestion
            {
                QuestionType = QuestionType,
                QuestionId = QuestionId,
                QuestionText = QuestionText,
                AlreadyAnswered = false,
                Difficulty = Difficulty,
                Explanation = Explanation,
                PossibleAnswers = new List<Answer>(PossibleAnswers),
                CorrectOrderedIds = new List<string>(CorrectOrderedIds)
            };
        }
    }
}
