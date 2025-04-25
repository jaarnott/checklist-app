using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using LoadedChecklist.Models;

namespace LoadedChecklist.Data
{
    public class ChecklistDbContext : DbContext
    {
        public ChecklistDbContext(DbContextOptions<ChecklistDbContext> options)
            : base(options)
        {
        }

        public DbSet<ChecklistItem> ChecklistItems { get; set; }
    }

    public static class ChecklistDbInitializer
    {
        public static void Seed(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ChecklistDbContext>();

            if (context.ChecklistItems.Any())
                return;

            context.ChecklistItems.AddRange(
                new ChecklistItem { Title = "Create your first checklist", IsCompleted = false },
                new ChecklistItem { Title = "Tick an item off", IsCompleted = false },
                new ChecklistItem { Title = "Celebrate 🎉", IsCompleted = false }
            );

            context.SaveChanges();
        }
    }
}