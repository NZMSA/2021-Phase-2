using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Security.Claims;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Authorization;
using MSAYearbook.Models;
using MSAYearbook.Data;
using MSAYearbook.Extensions;

namespace MSAYearbook.GraphQL.Comments
{
    [ExtendObjectType(name: "Mutation")]
    public class CommentMutations
    {
        [UseAppDbContext]
        [Authorize]
        public async Task<Comment> AddCommentAsync(AddCommentInput input, ClaimsPrincipal claimsPrincipal,
        [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var studentIdStr = claimsPrincipal.Claims.First(c => c.Type == "studentId").Value;
            var comment = new Comment
            {
                Content = input.Content,
                ProjectId = int.Parse(input.ProjectId),
                StudentId = int.Parse(studentIdStr),
                Modified = DateTime.Now,
                Created = DateTime.Now,
            };
            context.Comments.Add(comment);

            await context.SaveChangesAsync(cancellationToken);

            return comment;
        }

        [UseAppDbContext]
        [Authorize]
        public async Task<Comment> EditCommentAsync(EditCommentInput input, ClaimsPrincipal claimsPrincipal,
                [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var studentIdStr = claimsPrincipal.Claims.First(c => c.Type == "studentId").Value;
            var comment = await context.Comments.FindAsync(int.Parse(input.CommentId));

            if (comment.StudentId != int.Parse(studentIdStr))
            {
                throw new GraphQLRequestException(ErrorBuilder.New()
                    .SetMessage("Not owned by student")
                    .SetCode("AUTH_NOT_AUTHORIZED")
                    .Build());
            }

            comment.Content = input.Content ?? comment.Content;
            context.Comments.Add(comment);

            await context.SaveChangesAsync(cancellationToken);

            return comment;
        }
    }
}