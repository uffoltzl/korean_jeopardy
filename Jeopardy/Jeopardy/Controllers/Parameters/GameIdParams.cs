using Newtonsoft.Json;

namespace Jeopardy.Controllers.Parameters
{
    public class GameIdParams
    {
        [JsonProperty("gameId")]
        public string GameId { get; set; }
    }
}
