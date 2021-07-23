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


namespace MSAYearbook.GraphQL.Projects
{
    [ExtendObjectType(name: "Mutation")]
    public class ProjectMutations
    {
        [UseAppDbContext]
        [Authorize]
        public async Task<Project> AddProjectAsync(AddProjectInput input, ClaimsPrincipal claimsPrincipal,
            [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var studentIdStr = claimsPrincipal.Claims.First(c => c.Type == "studentId").Value;
            var project = new Project
            {
                Name = input.Name,
                Description = input.Description,
                Link = input.Link,
                Year = (Year)Enum.Parse(typeof(Year), input.Year),
                StudentId = int.Parse(studentIdStr),
                Modified = DateTime.Now,
                Created = DateTime.Now,
            };
            context.Projects.Add(project);

            await context.SaveChangesAsync(cancellationToken);

            return project;
        }

        [UseAppDbContext]
        [Authorize]
        public async Task<Project> EditProjectAsync(EditProjectInput input, ClaimsPrincipal claimsPrincipal,
            [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var studentIdStr = claimsPrincipal.Claims.First(c => c.Type == "studentId").Value;
            var project = await context.Projects.FindAsync(int.Parse(input.ProjectId));

            if (project.StudentId != int.Parse(studentIdStr))
            {
                throw new GraphQLRequestException(ErrorBuilder.New()
                    .SetMessage("Not owned by student")
                    .SetCode("AUTH_NOT_AUTHORIZED")
                    .Build());
            }

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