using Newtonsoft.Json;

namespace Jeopardy.Controllers.Parameters
{
    public class SimpleStringParams
    {
        [JsonProperty("gameId")]
        public string GameId { get; set; }
        
        [JsonProperty("response")]
        public string Response { get; set; }
    }
}
