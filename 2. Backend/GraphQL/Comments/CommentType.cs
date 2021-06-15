using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using Visual_Studio_Projects.Data;
using Visual_Studio_Projects.Models;
using Visual_Studio_Projects.GraphQL.Projects;
using Visual_Studio_Projects.GraphQL.Students;

namespace Visual_Studio_Projects.GraphQL.Comments
{
    public class CommentType : ObjectType<Comment>
    {
        protected override void Configure(IObjectTypeDescriptor<Comment> descriptor)
        {
            descriptor.Field(s => s.Id).Type<StringType>();
            descriptor.Field(s => s.Content).Type<StringType>();

            descriptor
                .Field(s => s.Project)
                .ResolveWith<Resolvers>(r => r.GetProject(default!, default!))
                .UseDbContext<AppDbContext>()
                .Type<ProjectType>();

            descriptor
                .Field(s => s.Student)
                .ResolveWith<Resolvers>(r => r.GetStudent(default!, default!))
                .UseDbContext<AppDbContext>()
                .Type<StudentType>();

            descriptor.Field(p => p.Modified).Type<DateTimeType>();
            descriptor.Field(p => p.Created).Type<DateTimeType>();

        }

        private class Resolvers
        {
            public Project GetProject(Comment Comment, [ScopedService] AppDbContext context)
            {
                return context.Projects.FirstOrDefault(p => p.Id == Comment.ProjectId);
            }

            public Student GetStudent(Comment Comment, [ScopedService] AppDbContext context)
            {
                return context.Students.FirstOrDefault(s => s.Id == Comment.StudentId);
            }
        }

    }
}