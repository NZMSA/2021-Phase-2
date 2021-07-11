
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HotChocolate;
using HotChocolate.Types;
using Visual_Studio_Projects.Models;
using Visual_Studio_Projects.Data;
using Visual_Studio_Projects.Extensions;

namespace Visual_Studio_Projects.GraphQL.Comments
{
    [ExtendObjectType(name: "Mutation")]
    public class CommentMutation
    {
        [UseAppDbContext]
        public async Task<AddCommentPayload> AddCommentAsync(AddCommentInput input,
        [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var comment = new Comment
            {
                Content = input.Content,
                ProjectId = Int32.Parse(input.ProjectId),
                StudentId = Int32.Parse(input.StudentId),
                Modified = DateTime.Now,
                Created = DateTime.Now,
            };
            context.Comments.Add(comment);

            await context.SaveChangesAsync(cancellationToken);

            return new AddCommentPayload(comment);
        }

        [UseAppDbContext]
        public async Task<EditCommentPayload> EditCommentAsync(EditCommentInput input,
                [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var comment = await context.Comments.FindAsync(Int32.Parse(input.CommentId));
            comment.Content = input.Content ?? comment.Content;
            context.Comments.Add(comment);

            await context.SaveChangesAsync(cancellationToken);

            return new EditCommentPayload(comment);
        }
    }
}