using System.Collections.Generic;
using Visual_Studio_Projects.Common;
using Visual_Studio_Projects.Models;

namespace Visual_Studio_Projects.GraphQL.Comments
{
    public class AddCommentPayload : CommentPayloadBase
    {
        public AddCommentPayload(Comment comment)
            : base(comment)
        {
        }

        public AddCommentPayload(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
    }
}