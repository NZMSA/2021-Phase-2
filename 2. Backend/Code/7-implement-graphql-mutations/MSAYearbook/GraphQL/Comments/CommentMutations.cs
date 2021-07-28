using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using MSAYearbook.Models;
using MSAYearbook.Data;
using MSAYearbook.Extensions;

namespace MSAYearbook.GraphQL.Comments
{
    [ExtendObjectType(name: "Mutation")]
    public class CommentMutations
    {
        [UseAppDbContext]
        public async Task<Comment> AddCommentAsync(AddCommentInput input,
        [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var comment = new Comment
            {
                Content = input.Content,
                ProjectId = int.Parse(input.ProjectId),
                StudentId = int.Parse(input.StudentId),
                Modified = DateTime.Now,
                Created = DateTime.Now,
            };
            context.Comments.Add(comment);

            await context.SaveChangesAsync(cancellationToken);

            return comment;
        }

        [UseAppDbContext]
        public async Task<Comment> EditCommentAsync(EditCommentInput input,
                [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var comment = await context.Comments.FindAsync(int.Parse(input.CommentId));
            comment.Content = input.Content ?? comment.Content;
            context.Comments.Add(comment);

            await context.SaveChangesAsync(cancellationToken);

            return comment;
        }
    }
}