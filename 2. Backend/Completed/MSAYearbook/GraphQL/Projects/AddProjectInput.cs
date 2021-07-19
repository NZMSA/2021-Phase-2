namespace MSAYearbook.GraphQL.Projects
{
    public record AddProjectInput(
        string Name,
        string Description,
        string Link,
        string Year);
}