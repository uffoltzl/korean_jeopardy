using Newtonsoft.Json;

namespace Jeopardy.Controllers.Parameters
{
    public class SimpleIntParams
    {
        [JsonProperty("gameId")]
        public string GameId { get; set; }

        [JsonProperty("response")]
        public int Response { get; set; }
    }
}
