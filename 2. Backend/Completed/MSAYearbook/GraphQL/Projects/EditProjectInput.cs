using HotChocolate;
using HotChocolate.Types;

namespace MSAYearbook.GraphQL.Projects
{
    public record EditProjectInput(
        [property: GraphQLType(typeof(NonNullType<IdType>))]
        string ProjectId,
        string? Name,
        string? Description,
        string? Link);
}