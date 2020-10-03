using Newtonsoft.Json;

namespace Jeopardy.Models
{
    public enum QuestionType
    {
        Radio,
        MultipleChoice,
        Textfield,
        Slider,
        OrderedList
    }

    public abstract class Question
    {
        [JsonProperty("questionType")]
        public QuestionType QuestionType { get; set; }

        [JsonProperty("questionId")]
        public string QuestionId { get; set; }

        [JsonProperty("questionText")]
        public string QuestionText { get; set; }

        [JsonProperty("alreadyAnswered")]
        public bool AlreadyAnswered { get; set; }

        [JsonProperty("difficulty")]
        public int Difficulty { get; set; }

        [JsonProperty("explanation")]
        public string Explanation { get; set; }

        public abstract Question Clone();
    }
}
