using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Jeopardy.Models
{
    public class Game
    {
        [JsonProperty("gameId")]
        public string GameId { get; set; }

        [JsonProperty("teams")]
        public List<Team> Teams { get; set; }

        [JsonProperty("categories")]
        public Dictionary<CategoryType, Category> Categories { get; set; }

        [JsonProperty("currentCategory")]
        public CategoryType CurrentCategory { get; set; }

        [JsonProperty("currentQuestion")]
        public int CurrentQuestion { get; set; }

        [JsonProperty("currentPlayer")]
        public int CurrentPlayer { get; set; }

        [JsonProperty("round")]
        public int Round { get; set; }

        Random Rand;

        public Game()
        {
            CurrentPlayer = 0;
            CurrentQuestion = -1;
            Round = 1;
            Rand = new Random();
        }

        public void NextPlayer()
        {
            Teams[CurrentPlayer].IsTurn = false;
            CurrentPlayer = (CurrentPlayer + 1)%Teams.Count;
            Teams[CurrentPlayer].IsTurn = true;
        }

        public void VerifyCategory(CategoryType type)
        {
            if (!Categories.ContainsKey(type))
            {
                // can not exist if first turn CurrentCategory = Food and Food not chosen as a game category
                return;
            }

            Dictionary<int, List<Question>> questions = Categories[type].Questions;

            bool isCompleted = true;
            foreach(KeyValuePair<int, List<Question>> entry in questions)
            {
                if (!entry.Value[0].AlreadyAnswered)
                {
                    isCompleted = false;
                    break;
                }
            }

            if (isCompleted)
            {
                Categories.Remove(type);
            }
        }

        public CategoryType NextCategory()
        {
            VerifyCategory(CurrentCategory);

            List<CategoryType> availableTypes = Categories.Keys.ToList();
            CurrentCategory = availableTypes[Rand.Next(availableTypes.Count)];
            return CurrentCategory;
        }

        public List<Team> FindWinner()
        {
            List<Team> winners = new List<Team>();

            int points = 0;
            foreach(Team team in Teams)
            {
                if(points < team.Points)
                {
                    winners = new List<Team>();
                    winners.Add(team);
                    points = team.Points;
                }
                else if(points == team.Points)
                {
                    winners.Add(team);
                }
            }

            return winners;
        }

        public int GetGameover()
        {
            return Teams.Count * 5 + 1;
        }
    }
}
