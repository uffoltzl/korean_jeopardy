using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Jeopardy.Models
{
    public enum CategoryType
    {
        Food,
        Language,
        History,
        Education,
        Society,
        Tv
    }

    public class Category
    {
        [JsonProperty("categoryType")]
        public CategoryType CategoryType { get; set; }

        [JsonProperty("questions")]
        public Dictionary<int, List<Question>> Questions { get; set; }
    }

    public class CategoriesManager
    {
        private const int MAX_CATEGORIES = 2;
        private Random Rand;

        public CategoriesManager()
        {
            Rand = new Random();
        }

        private List<Question> ChooseQuestion(CategoryType categoryType, int difficulty)
        {
            List<Question> availableQuestions = Current.Instance.Telemetry[categoryType].Questions[difficulty];
            Question chosenQuestion = availableQuestions[Rand.Next(availableQuestions.Count)];
            List<Question> question = new List<Question>();
            question.Add(chosenQuestion.Clone());
            return question;
        }

        private CategoryType ChooseCategory(List<CategoryType> availableTypes)
        {
            return availableTypes[Rand.Next(availableTypes.Count)];
        }

        public Dictionary<CategoryType, Category> ChooseGameCategories(int nbPlayers)
        {
            Dictionary<CategoryType, Category> categories = new Dictionary<CategoryType, Category>();

            List<CategoryType> availableTypes = Enum.GetValues(typeof(CategoryType)).OfType<CategoryType>().ToList();
            for(var i = 0; i < MAX_CATEGORIES+nbPlayers && availableTypes.Count != 0; i++)
            {
                CategoryType catType = ChooseCategory(availableTypes);
                availableTypes.Remove(catType);

                Dictionary<int, List<Question>> questions = new Dictionary<int, List<Question>>();
                for (var j = 1; j <= 5; j++)
                {
                    List<Question> quest = ChooseQuestion(catType, j);
                    questions.Add(j, quest);
                }

                categories.Add(catType, new Category { CategoryType = catType, Questions = questions });
            }

            return categories;
        }
    }
}
