namespace MSAYearbook.GraphQL.Students
{
    public record EditStudentInput(
        string StudentId,
        string? Name,
        string? GitHub,
        string? ImageURI);
}