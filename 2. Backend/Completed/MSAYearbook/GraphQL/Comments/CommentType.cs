using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using MSAYearbook.Data;
using MSAYearbook.Models;
using MSAYearbook.GraphQL.Projects;
using MSAYearbook.GraphQL.Students;

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
                .UseAppDbContext<AppDbContext>()
                .Type<NonNullType<ProjectType>>();

            descriptor
                .Field(s => s.Student)
                .ResolveWith<Resolvers>(r => r.GetStudent(default!, default!, default))
                .UseAppDbContext<AppDbContext>()
                .Type<NonNullType<StudentType>>();

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