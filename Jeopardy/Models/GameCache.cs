using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;

namespace Jeopardy.Models
{
    public class GameCache
    {
        private MemoryCache _gameCache;

        public GameCache()
        {
            _gameCache = new MemoryCache("GameCache");
        }

        public Game GetGameById(string gameId)
        {
            if (gameId == null)
            {
                return null;
            }

            if (!_gameCache.Contains(gameId))
            {
                return null;
            }
            else
            {
                return (Game)_gameCache.Get(gameId);
            }

        }

        public void AddGame(Game game)
        {
            if (game != null)
            {
                _gameCache.Set(game.GameId, game, new DateTimeOffset(DateTime.Now.AddDays(1)));
            }
        }

        public void DeleteGame(string gameId)
        {
            if (gameId != null)
            {
                _gameCache.Remove(gameId);
            }
        }
}
}
