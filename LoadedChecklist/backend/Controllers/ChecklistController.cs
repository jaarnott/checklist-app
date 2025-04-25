using Microsoft.AspNetCore.Mvc;
using LoadedChecklist.Data;
using LoadedChecklist.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace LoadedChecklist.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChecklistController : ControllerBase
    {
        private readonly ChecklistDbContext _context;

        public ChecklistController(ChecklistDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var items = await _context.ChecklistItems.ToListAsync();
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> AddItem(ChecklistItem item)
        {
            _context.ChecklistItems.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetItems), new { id = item.Id }, item);
        }
    }
}
