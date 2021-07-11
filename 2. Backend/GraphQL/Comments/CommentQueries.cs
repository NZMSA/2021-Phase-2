
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using Visual_Studio_Projects.Data;
using Visual_Studio_Projects.DataLoader;
using Visual_Studio_Projects.Models;
using Visual_Studio_Projects.Extensions;

namespace Visual_Studio_Projects.GraphQL
{
    [ExtendObjectType(name: "Query")]
    public class CommentQueries
    {
        [UseAppDbContext]
        [UsePaging]
        public IQueryable<Comment> GetComments([ScopedService] AppDbContext context)
        {
            return context.Comments.OrderBy(c => c.Created);
        }

        public Task<Comment> GetCommentByIdAsync(
            int id,
            CommentByIdDataLoader commentById,
            CancellationToken cancellationToken) =>
            commentById.LoadAsync(id, cancellationToken);


        public async Task<IEnumerable<Comment>> GetCommentsByIdAsync(
           int[] ids,
            CommentByIdDataLoader commentById,
            CancellationToken cancellationToken) =>
            await commentById.LoadAsync(ids, cancellationToken);
    }
}