using Newtonsoft.Json;
using System.Collections.Generic;

namespace Jeopardy.Controllers.Parameters
{
    public class MultipleParams
    {
        [JsonProperty("gameId")]
        public string GameId { get; set; }

        [JsonProperty("response")]
        public List<string> Response { get; set; }
    }
}
