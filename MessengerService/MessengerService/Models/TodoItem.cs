using System.Text.Json.Serialization;
namespace MessengerService.Models;

public class TodoItem
{
    public int Id { get; init; }

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("isCompleted")]
    public bool IsCompleted { get; set; }
}