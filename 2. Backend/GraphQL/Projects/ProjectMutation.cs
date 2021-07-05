
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HotChocolate;
using HotChocolate.Types;

using Visual_Studio_Projects.Models;
using Visual_Studio_Projects.Data;

namespace Visual_Studio_Projects.GraphQL.Projects
{
    [ExtendObjectType(name: "Mutation")]
    public class ProjectMutation
    {
        [UseAppDbContext]
        public async Task<AddProjectPayload> AddProjectAsync(AddProjectInput input,
            [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var project = new Project
            {
                Name = input.Name,
                Description = input.Description,
                Link = input.Link,
                Year = (Year)Enum.Parse(typeof(Year), input.Year),
                StudentId = Int32.Parse(input.StudentId),
                Modified = DateTime.Now,
                Created = DateTime.Now,
            };
            context.Projects.Add(project);

            await context.SaveChangesAsync(cancellationToken);

            return new AddProjectPayload(project);
        }

        [UseAppDbContext]
        public async Task<EditProjectPayload> EditProjectAsync(EditProjectInput input,
            [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var project = await context.Projects.FindAsync(Int32.Parse(input.ProjectId));

            project.Name = input.Name ?? project.Name;
            project.Description = input.Description ?? project.Description;
            project.Link = input.Link ?? project.Link;
            project.Modified = DateTime.Now;

            context.Projects.Add(project);
            await context.SaveChangesAsync(cancellationToken);

            return new EditProjectPayload(project);
        }
    }
}