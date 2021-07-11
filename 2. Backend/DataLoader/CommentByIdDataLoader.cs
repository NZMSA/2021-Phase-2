
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Visual_Studio_Projects.Models;
using Visual_Studio_Projects.Data;
using GreenDonut;
using HotChocolate.DataLoader;

namespace Visual_Studio_Projects.DataLoader
{
    public class CommentByIdDataLoader : BatchDataLoader<int, Comment>
    {
        private readonly IDbContextFactory<AppDbContext> _dbContextFactory;

        public CommentByIdDataLoader(
            IBatchScheduler batchScheduler,
            IDbContextFactory<AppDbContext> dbContextFactory)
            : base(batchScheduler)
        {
            _dbContextFactory = dbContextFactory ??
                throw new ArgumentNullException(nameof(dbContextFactory));
        }

        protected override async Task<IReadOnlyDictionary<int, Comment>> LoadBatchAsync(
            IReadOnlyList<int> keys,
            CancellationToken cancellationToken)
        {
            await using AppDbContext dbContext =
                _dbContextFactory.CreateDbContext();

            return await dbContext.Comments
                .Where(s => keys.Contains(s.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}