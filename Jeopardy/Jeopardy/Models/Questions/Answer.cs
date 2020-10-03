using Newtonsoft.Json;

namespace Jeopardy.Models
{
    public class Answer
    {
        [JsonProperty("answerId")]
        public string AnswerId { get; set; }

        [JsonProperty("textAnswer")]
        public string TextAnswer { get; set; }
    }
}
