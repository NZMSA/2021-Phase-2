using HotChocolate;
using HotChocolate.Types;

namespace MSAYearbook.GraphQL.Comments
{
    public record EditCommentInput(
        [GraphQLType(typeof(NonNullType<IdType>))]
        string CommentId,
        string? Content);
}