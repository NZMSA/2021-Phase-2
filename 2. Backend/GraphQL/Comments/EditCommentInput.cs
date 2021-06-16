using HotChocolate;

namespace Visual_Studio_Projects.GraphQL.Comments
{
    public class EditCommentInput
    {
        [GraphQLNonNullType]
        public string CommentId { get; set; }

        public string Content { get; set; }
    }
}