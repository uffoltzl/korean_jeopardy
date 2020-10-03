using Jeopardy.Models;
using Jeopardy.Models.Questions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jeopardy.Telemetry
{
    public class QuestionJsonConverter: JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return (objectType == typeof(Question));
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JObject jo = JObject.Load(reader);
            if(jo["questionType"] == null)
            {
                return null;
            }

            if (jo["questionType"].Value<string>() == QuestionType.MultipleChoice.ToString())
                return jo.ToObject<MultipleChoiceQuestion>(serializer);

            if (jo["questionType"].Value<string>() == QuestionType.Radio.ToString())
                return jo.ToObject<RadioQuestion>(serializer);

            if (jo["questionType"].Value<string>() == QuestionType.Textfield.ToString())
                return jo.ToObject<TextfieldQuestion>(serializer);

            if (jo["questionType"].Value<string>() == QuestionType.Slider.ToString())
                return jo.ToObject<SliderQuestion>(serializer);

            if (jo["questionType"].Value<string>() == QuestionType.OrderedList.ToString())
                return jo.ToObject<OrderedListQuestion>(serializer);

            return null;
        }

        public override bool CanWrite
        {
            get { return false; }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}
