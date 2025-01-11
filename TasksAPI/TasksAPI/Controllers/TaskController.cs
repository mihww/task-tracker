using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TasksAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("This is a dummy GET method.");
        }

        [HttpPost]
        public IActionResult Post()
        {
            return Ok("This is a dummy POST method!");
        }

        [HttpPut]
        public IActionResult Put()
        {
            return Ok("This is a dummy PUT method!");
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            return Ok("This is a dummy DELETE method!");
        }
    }
}
