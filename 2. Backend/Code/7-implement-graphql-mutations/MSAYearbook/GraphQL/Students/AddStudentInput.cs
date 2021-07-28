namespace MSAYearbook.GraphQL.Students
{
    public record AddStudentInput(
        string Name,
        string GitHub,
        string? ImageURI);
}