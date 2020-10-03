using System.Collections.Generic;
using Jeopardy.Controllers.Parameters;
using Jeopardy.Models;
using Microsoft.AspNetCore.Mvc;

namespace Jeopardy.Controllers
{
    [Route("game")]
    [ApiController]
    public class GameController : ControllerBase
    {
        [HttpGet]
        [Route("getTeams")]
        public List<Team> GetTeams(string gameId)
        {
            return Current.Instance.GameCache.GetGameById(gameId).Teams;
        }

        [HttpGet]
        [Route("getCategory")]
        public CategoryType GetCategory(string gameId)
        {
            Game game = Current.Instance.GameCache.GetGameById(gameId);
            if(game.CurrentQuestion == -1)
            {
                return game.NextCategory();
            }
            else
            {
                return game.CurrentCategory;
            }
        }

        [HttpGet]
        [Route("getAvailableQuestions")]
        public List<bool> GetAvailableQuestions(string gameId)
        {
            Game game = Current.Instance.GameCache.GetGameById(gameId);

            if (!game.Categories.ContainsKey(game.CurrentCategory))
            {
                game.NextCategory();
            }

            Dictionary<int, List<Question>> questions = game.Categories[game.CurrentCategory].Questions;
            List<bool> result = new List<bool>();
            for(var i = 0; i < 5; i++)
            {
                result.Add(questions[5-i][0].AlreadyAnswered);
            }
            return result;
        }

        [HttpGet]
        [Route("getQuestion")]
        public Question GetQuestion(string gameId, int difficulty)
        {
            Game game = Current.Instance.GameCache.GetGameById(gameId);
            game.CurrentQuestion = difficulty;
            return game.Categories[game.CurrentCategory].Questions[game.CurrentQuestion][0];
        }

        [HttpGet]
        [Route("getCurrentQuestion")]
        public Question GetCurrentQuestion(string gameId)
        {
            Game game = Current.Instance.GameCache.GetGameById(gameId);
            if(game.CurrentQuestion == -1)
            {
                return null;
            }
            return game.Categories[game.CurrentCategory].Questions[game.CurrentQuestion][0];
        }

        [HttpPost]
        [Route("nextRound")]
        public int NextRound([FromBody] GameIdParams gameIdParams)
        {
            Game game = Current.Instance.GameCache.GetGameById(gameIdParams.GameId);
            game.CurrentQuestion = -1;
            game.Round++;
            return game.Round;
        }

        [HttpGet]
        [Route("getWinner")]
        public List<Team> GetWinner(string gameId)
        {
            return Current.Instance.GameCache.GetGameById(gameId).FindWinner();
        }

        [HttpGet]
        [Route("getStopGame")]
        public int GetStopGame(string gameId)
        {
            return Current.Instance.GameCache.GetGameById(gameId).GetGameover();
        }

        [HttpGet]
        [Route("getRound")]
        public int GetRound(string gameId)
        {
            return Current.Instance.GameCache.GetGameById(gameId).Round;
        }
    }
}
