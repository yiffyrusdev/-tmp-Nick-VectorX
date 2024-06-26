using Microsoft.EntityFrameworkCore;
using VectorXBackend.Properties;

var builder = WebApplication.CreateBuilder(args);

//Dependency Injection
DependencyInjectionSetup.Configure(
    builder.Services, 
    builder.Configuration.GetConnectionString("DefaultConnection")
);

// Add services to the container.
builder.Services.AddControllers();

//CORS
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins().AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors(MyAllowSpecificOrigins); //Use CORS
app.MapControllers();
app.Run();