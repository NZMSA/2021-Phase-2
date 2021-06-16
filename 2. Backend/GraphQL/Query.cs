using System.Linq;
using Visual_Studio_Projects.Data;
using Visual_Studio_Projects.Models;
using HotChocolate;
using HotChocolate.Data;

namespace Visual_Studio_Projects.GraphQL
{
    public class Query
    {
        [UseDbContext(typeof(AppDbContext))]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Project> GetProject([ScopedService] AppDbContext context)
        {
            return context.Projects;
        }

        [UseDbContext(typeof(AppDbContext))]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Student> GetStudent([ScopedService] AppDbContext context)
        {
            return context.Students;
        }

        [UseDbContext(typeof(AppDbContext))]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Comment> GetComment([ScopedService] AppDbContext context)
        {
            return context.Comments;
        }
    }
}