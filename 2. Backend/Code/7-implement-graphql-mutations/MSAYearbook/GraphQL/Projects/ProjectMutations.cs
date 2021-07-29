using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using MSAYearbook.Models;
using MSAYearbook.Data;
using MSAYearbook.Extensions;
using MSAYearbook.Extensions;

namespace MSAYearbook.GraphQL.Projects
{
    [ExtendObjectType(name: "Mutation")]
    public class ProjectMutations
    {
        [UseAppDbContext]
        public async Task<Project> AddProjectAsync(AddProjectInput input,
            [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var project = new Project
            {
                Name = input.Name,
                Description = input.Description,
                Link = input.Link,
                Year = (Year)Enum.Parse(typeof(Year), input.Year),
                StudentId = int.Parse(input.StudentId),
                Modified = DateTime.Now,
                Created = DateTime.Now,
            };
            context.Projects.Add(project);

            await context.SaveChangesAsync(cancellationToken);

            return project;
        }

        [UseAppDbContext]
        public async Task<Project> EditProjectAsync(EditProjectInput input,
            [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var project = await context.Projects.FindAsync(int.Parse(input.ProjectId));

            project.Name = input.Name ?? project.Name;
            project.Description = input.Description ?? project.Description;
            project.Link = input.Link ?? project.Link;
            project.Modified = DateTime.Now;

            context.Projects.Add(project);
            await context.SaveChangesAsync(cancellationToken);

            return project;
        }
    }
}