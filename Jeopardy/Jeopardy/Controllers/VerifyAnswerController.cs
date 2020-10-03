using System;
using System.Collections.Generic;
using Jeopardy.Models;
using Jeopardy.Models.Questions;
using Microsoft.AspNetCore.Mvc;
using Jeopardy.Controllers.Parameters;

namespace Jeopardy.Controllers
{
    [Route("verifyAnswer")]
    [ApiController]
    public class VerifyAnswerController : ControllerBase
    {
        [HttpPost]
        [Route("verifyRadio")]
        public void VerifyRadio([FromBody] SimpleStringParams radioParams)
        {
            Game game = Current.Instance.GameCache.GetGameById(radioParams.GameId);
            Question quest = game.Categories[game.CurrentCategory].Questions[game.CurrentQuestion][0];
            if (quest.QuestionType != QuestionType.Radio)
            {
                throw new Exception("Not the right question to verify");
            }

            RadioQuestion question = (RadioQuestion)quest;
            question.AlreadyAnswered = true;
            if (question.IsValid(radioParams.Response))
            {
                game.Teams[game.CurrentPlayer].AddPoint(question.Difficulty);
            }
            game.NextPlayer();
        }

        [HttpPost]
        [Route("verifyMultipleChoice")]
        public void VerifyMultipleChoice([FromBody] MultipleParams multipleChoiceParams)
        {
            Game game = Current.Instance.GameCache.GetGameById(multipleChoiceParams.GameId);
            Question quest = game.Categories[game.CurrentCategory].Questions[game.CurrentQuestion][0];
            if (quest.QuestionType != QuestionType.MultipleChoice)
            {
                throw new Exception("Not the right question to verify");
            }

            MultipleChoiceQuestion question = (MultipleChoiceQuestion)quest;
            question.AlreadyAnswered = true;
            game.Teams[game.CurrentPlayer].AddPoint(question.IsValid(multipleChoiceParams.Response));
            game.NextPlayer();
        }

        [Route("verifyOrderedList")]
        public void VerifyOrderedList([FromBody] MultipleParams orderedListParams)
        {
            Game game = Current.Instance.GameCache.GetGameById(orderedListParams.GameId);
            Question quest = game.Categories[game.CurrentCategory].Questions[game.CurrentQuestion][0];
            if (quest.QuestionType != QuestionType.OrderedList)
            {
                throw new Exception("Not the right question to verify");
            }

            OrderedListQuestion question = (OrderedListQuestion)quest;
            question.AlreadyAnswered = true;
            game.Teams[game.CurrentPlayer].AddPoint(question.IsValid(orderedListParams.Response));
            game.NextPlayer();
        }

        [HttpPost]
        [Route("verifySlider")]
        public void VerifySlider([FromBody] SimpleIntParams sliderParams)
        {
            Game game = Current.Instance.GameCache.GetGameById(sliderParams.GameId);
            Question quest = game.Categories[game.CurrentCategory].Questions[game.CurrentQuestion][0];
            if (quest.QuestionType != QuestionType.Slider)
            {
                throw new Exception("Not the right question to verify");
            }

            SliderQuestion question = (SliderQuestion)quest;
            question.AlreadyAnswered = true;
            if (question.IsValid(sliderParams.Response))
            {
                game.Teams[game.CurrentPlayer].AddPoint(question.Difficulty);
            }
            game.NextPlayer();
        }

        [HttpPost]
        [Route("verifyTextfield")]
        public void VerifyTextfield([FromBody] SimpleStringParams textfieldParams)
        {
            Game game = Current.Instance.GameCache.GetGameById(textfieldParams.GameId);
            Question quest = game.Categories[game.CurrentCategory].Questions[game.CurrentQuestion][0];
            if (quest.QuestionType != QuestionType.Textfield)
            {
                throw new Exception("Not the right question to verify");
            }

            TextfieldQuestion question = (TextfieldQuestion)quest;
            question.AlreadyAnswered = true;
            if (question.IsValid(textfieldParams.Response))
            {
                game.Teams[game.CurrentPlayer].AddPoint(question.Difficulty);
            }
            game.NextPlayer();
        }
    }
}
