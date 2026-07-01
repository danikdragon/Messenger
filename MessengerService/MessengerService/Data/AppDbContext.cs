using Microsoft.EntityFrameworkCore;
using MessengerService.Models;

namespace MessengerService.Data;
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options) 
{
    public DbSet<TodoItem> Todos => Set<TodoItem>();
}