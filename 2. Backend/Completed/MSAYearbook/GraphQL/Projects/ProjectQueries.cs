using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using MSAYearbook.Data;
using MSAYearbook.Models;
using MSAYearbook.Extensions;

namespace MSAYearbook.GraphQL.Projects
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

        [UseAppDbContext]
        public Project GetProject([GraphQLType(typeof(NonNullType<IdType>))] string id, [ScopedService] AppDbContext context)
        {
            return context.Projects.Find(int.Parse(id));
        }
    }
}