using Jameel.Service.Services;
using Jameel.Service.Services.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Text.Json;

namespace Jameel.Host.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [ActionName("Add")]
        public ActionResult CreateUser(CreateUserInputDto input)
        {
            try
            {
                return new JsonResult(JsonConvert.SerializeObject(_userService.AddUser(input)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpGet]
        [ActionName("GetAll")]
        public ActionResult GetAllUsers()
        {
            try
            {
                return new JsonResult(JsonConvert.SerializeObject(_userService.GetAllUsers(), new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        } 
        
        [HttpDelete]
        [ActionName("Delete")]
        public ActionResult Delete(int userId)
        {
            try
            {
                return new JsonResult(JsonConvert.SerializeObject(_userService.Delete(userId), new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); 
            }

        }
    }
}
