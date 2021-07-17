using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using Visual_Studio_Projects.Data;
using Visual_Studio_Projects.Models;
using Visual_Studio_Projects.GraphQL.Projects;
using Visual_Studio_Projects.GraphQL.Comments;

namespace Visual_Studio_Projects.GraphQL.Students
{
    public class StudentType : ObjectType<Student>
    {
        protected override void Configure(IObjectTypeDescriptor<Student> descriptor)
        {
            descriptor.Field(s => s.Id).Type<IdType>();
            descriptor.Field(s => s.Name).Type<StringType>();
            descriptor.Field(s => s.GitHub).Type<StringType>();
            descriptor.Field(s => s.ImageURI).Type<StringType>();

            descriptor
                .Field(s => s.Projects)
                .ResolveWith<Resolvers>(r => r.GetProjects(default!, default!))
                .UseDbContext<AppDbContext>()
                .Type<ProjectType>();

            descriptor
                .Field(s => s.Comments)
                .ResolveWith<Resolvers>(r => r.GetComments(default!, default!))
                .UseDbContext<AppDbContext>()
                .Type<CommentType>();
        }

        private class Resolvers
        {
            public IQueryable<Project> GetProjects(Student student, [ScopedService] AppDbContext context)
            {
                return context.Projects.Where(c => c.StudentId == student.Id);
            }

            public IQueryable<Comment> GetComments(Student student, [ScopedService] AppDbContext context)
            {
                return context.Comments.Where(c => c.StudentId == student.Id);
            }
        }
    }
}