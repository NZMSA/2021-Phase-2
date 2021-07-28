using MSAYearbook.Models;

namespace MSAYearbook.GraphQL.Students
{
    public record LoginPayload(
        Student student,
        string jwt);
}