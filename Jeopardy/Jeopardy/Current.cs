using Jeopardy.Models;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;
using Jeopardy.Telemetry;

namespace Jeopardy
{
    public class Current
    {
        private static object instanceLock = new object();
        public static Current Instance { get; private set; }
        public static void Init()
        {
            lock (instanceLock)
            {
                if (Instance == null)
                {
                    Instance = new Current();
                }
            }
        }

        public GameCache GameCache { get; set; }
        public Dictionary<CategoryType, Category> Telemetry { get; set; }

        public CategoriesManager CategoriesManager { get; set; }

        private Current()
        {
            GameCache = new GameCache();
            CategoriesManager = new CategoriesManager();
            LoadTelemetry();
        }

        private void LoadTelemetry()
        {
            Telemetry = new Dictionary<CategoryType, Category>();
            foreach(CategoryType type in Enum.GetValues(typeof(CategoryType)))
            {
                using (StreamReader r = new StreamReader("./Telemetry/"+ type.ToString() +".json"))
                {
                    string json = r.ReadToEnd();
                    JsonConverter[] converters = { new QuestionJsonConverter() };
                    Category cat = JsonConvert.DeserializeObject<Category>(json, new JsonSerializerSettings() { Converters = converters });
                    Telemetry.Add(type, cat);
                }
            }
        }
    }
}
