using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using LoadedChecklist.Data;

var builder = WebApplication.CreateBuilder(args);

// ✅ Load configuration from appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// ✅ Add controllers
builder.Services.AddControllers();

// ✅ Add EF Core with SQL Server
builder.Services.AddDbContext<ChecklistDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// ✅ Enable routing
app.UseRouting();

// ✅ Map controller endpoints
app.MapControllers();

app.UseRouting();
app.MapControllers();

// ✅ Seed test data
ChecklistDbInitializer.Seed(app.Services);

app.Run();