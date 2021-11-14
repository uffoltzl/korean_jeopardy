using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Jeopardy.Models;

namespace Jeopardy.Controllers
{
    [Route("home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpPost]
        [Route("beginGame")]
        public string BeginGame(List<string> teamNames)
        {
            string gameId = Guid.NewGuid().ToString();

            List<Team> teams = teamNames.Select(team => new Team {
                Name = team,
            }).ToList();
            teams[0].IsTurn = true;

            Dictionary<CategoryType, Category> categories = Current.Instance.CategoriesManager.ChooseGameCategories(teams.Count);

            Current.Instance.GameCache.AddGame(new Game
            {
                GameId = gameId,
                Teams = teams,
                Categories = categories,
                CurrentCategory = categories.Keys.ToList()[0]
            });

            return gameId;
        }
    }
}
