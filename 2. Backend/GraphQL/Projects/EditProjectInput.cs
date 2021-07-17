namespace Visual_Studio_Projects.GraphQL.Projects
{
    public record EditProjectInput(
        string ProjectId,
        string? Name,
        string? Description,
        string? Link);
}