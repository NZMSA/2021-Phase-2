using System.Collections.Generic;
using Visual_Studio_Projects.Common;
using Visual_Studio_Projects.Models;

namespace Visual_Studio_Projects.GraphQL.Comments
{
    public class CommentPayloadBase : Payload
    {
        protected CommentPayloadBase(Comment comment)
        {
            Comment = comment;
        }

        protected CommentPayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        public Comment? Comment { get; }
    }
}