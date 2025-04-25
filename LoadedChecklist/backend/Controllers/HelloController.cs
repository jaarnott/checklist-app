using Microsoft.AspNetCore.Mvc;

namespace LoadedChecklist.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HelloController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("🎉 Your backend is working!");
        }
    }
}
