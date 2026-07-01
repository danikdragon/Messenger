using MessengerService.Models;
using MessengerService.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace MessengerService.Endpoints;

public class TodoEndpoints : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/todos");

        // /api/todos
        group.MapGet("/", async (AppDbContext db) =>
        {
            return Results.Ok(await db.Todos.ToListAsync());
        });

        // /api/todos
        group.MapPost("/", async ([FromBody] TodoItem item, AppDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(item.Title))
                return Results.BadRequest("Название задачи не может быть пустым!");

            db.Todos.Add(item);
            await db.SaveChangesAsync();
            return Results.Created($"/api/todos/{item.Id}", item);
        });

        // /api/todos/{id}
        group.MapPut("/{id}", async (int id, TodoItem inputTodo, AppDbContext db) =>
        {
            var todo = await db.Todos.FindAsync(id);
            if (todo is null) return Results.NotFound();

            todo.Title = inputTodo.Title;
            todo.IsCompleted = inputTodo.IsCompleted;

            await db.SaveChangesAsync();
            return Results.Ok(todo);
        });

        // /api/todos/{id}
        group.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            if (await db.Todos.FindAsync(id) is TodoItem todo)
            {
                db.Todos.Remove(todo);
                await db.SaveChangesAsync();
                return Results.Ok(todo);
            }
            return Results.NotFound();
        });
    }
}