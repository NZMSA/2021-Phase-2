using System.Collections.Generic;
using Visual_Studio_Projects.Common;
using Visual_Studio_Projects.Models;

namespace Visual_Studio_Projects.GraphQL.Comments
{
    public class EditCommentPayload : CommentPayloadBase
    {
        public EditCommentPayload(Comment comment)
            : base(comment)
        {
        }

        public EditCommentPayload(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
    }
}