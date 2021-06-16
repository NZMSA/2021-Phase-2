using HotChocolate;

namespace Visual_Studio_Projects.GraphQL.Comments
{
    public class AddCommentInput
    {
        [GraphQLNonNullType]
        public string Content { get; set; }

        [GraphQLNonNullType]
        public string ProjectId { get; set; }

        [GraphQLNonNullType]
        public string StudentId { get; set; }
    }
}