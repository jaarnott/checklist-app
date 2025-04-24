using Microsoft.AspNetCore.Mvc;

namespace LoadedChecklist.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChecklistController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() => Ok(new[] { "Item 1", "Item 2" });
    }
}
