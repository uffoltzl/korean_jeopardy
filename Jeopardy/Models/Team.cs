using Newtonsoft.Json;

namespace Jeopardy.Models
{
    public class Team
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("points")]
        public int Points { get; set; }

        [JsonProperty("isTurn")]
        public bool IsTurn { get; set; }

        public Team()
        {
            Points = 0;
            IsTurn = false;
        }

        public void AddPoint(int points)
        {
            Points += points;
        }
    }
}
