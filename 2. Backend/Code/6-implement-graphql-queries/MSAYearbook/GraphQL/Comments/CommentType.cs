using System.Threading.Tasks;
using System.Threading;
using HotChocolate;
using HotChocolate.Types;
using MSAYearbook.Data;
using MSAYearbook.Models;
using MSAYearbook.GraphQL.Projects;

namespace MSAYearbook.GraphQL.Comments
{
    public class CommentType : ObjectType<Comment>
    {
        protected override void Configure(IObjectTypeDescriptor<Comment> descriptor)
        {
            descriptor.Field(s => s.Id).Type<NonNullType<IdType>>();
            descriptor.Field(s => s.Content).Type<NonNullType<StringType>>();

            descriptor
                .Field(s => s.Project)
                .ResolveWith<Resolvers>(r => r.GetProject(default!, default!, default))
                .UseDbContext<AppDbContext>()
                .Type<NonNullType<ProjectType>>();

            descriptor
                .Field(s => s.Student)
                .ResolveWith<Resolvers>(r => r.GetStudent(default!, default!, default))
                .UseDbContext<AppDbContext>()
                .Type<NonNullType<CommentType>>();

            descriptor.Field(p => p.Modified).Type<NonNullType<DateTimeType>>();
            descriptor.Field(p => p.Created).Type<NonNullType<DateTimeType>>();

        }

        private class Resolvers
        {
            public async Task<Project> GetProject(Comment comment, [ScopedService] AppDbContext context,
                CancellationToken cancellationToken)
            {
                return await context.Projects.FindAsync(new object[] { comment.ProjectId }, cancellationToken);
            }

            public async Task<Student> GetStudent(Comment comment, [ScopedService] AppDbContext context,
                CancellationToken cancellationToken)
            {
                return await context.Students.FindAsync(new object[] { comment.StudentId }, cancellationToken);
            }
        }
    }
}