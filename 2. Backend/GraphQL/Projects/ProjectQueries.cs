
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using Visual_Studio_Projects.Data;
using Visual_Studio_Projects.DataLoader;
using Visual_Studio_Projects.Models;

namespace Visual_Studio_Projects.GraphQL
{
    [ExtendObjectType(name: "Query")]
    public class ProjectQueries
    {
        [UseAppDbContext]
        [UsePaging]
        public IQueryable<Project> GetProjects([ScopedService] AppDbContext context)
        {
            return context.Projects.OrderBy(c => c.Created);
        }

        public Task<Project> GetProjectByIdAsync(
            int id,
            ProjectByIdDataLoader projectById,
            CancellationToken cancellationToken) =>
            projectById.LoadAsync(id, cancellationToken);


        public async Task<IEnumerable<Project>> GetProjectsByIdAsync(
            int[] ids,
            ProjectByIdDataLoader projectById,
            CancellationToken cancellationToken) =>
            await projectById.LoadAsync(ids, cancellationToken);
    }
}