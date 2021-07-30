using HotChocolate;
using HotChocolate.Types;

namespace MSAYearbook.GraphQL.Comments
{
    public record AddCommentInput(
        string Content,
        [GraphQLType(typeof(NonNullType<IdType>))]
        string ProjectId);
}