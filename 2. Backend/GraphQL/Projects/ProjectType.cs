using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using Visual_Studio_Projects.Data;
using Visual_Studio_Projects.Models;
using Visual_Studio_Projects.GraphQL.Students;

namespace Visual_Studio_Projects.GraphQL.Projects
{
    public class ProjectType : ObjectType<Project>
    {
        protected override void Configure(IObjectTypeDescriptor<Project> descriptor)
        {
            descriptor.Field(p => p.Id).Type<IdType>();
            descriptor.Field(p => p.Name).Type<StringType>();
            descriptor.Field(p => p.Description).Type<StringType>();
            descriptor.Field(p => p.Link).Type<StringType>();
            descriptor.Field(p => p.Year).Type<EnumType<Year>>();

            descriptor
                .Field(p => p.Student)
                .ResolveWith<Resolvers>(r => r.GetStudent(default!, default!))
                .UseDbContext<AppDbContext>()
                .Type<StudentType>();

            descriptor.Field(p => p.Modified).Type<DateTimeType>();
            descriptor.Field(p => p.Created).Type<DateTimeType>();

        }

        private class Resolvers
        {
            public Student GetStudent(Project project, [ScopedService] AppDbContext context)
            {
                return context.Students.Find(project.StudentId);
            }
        }
    }
}