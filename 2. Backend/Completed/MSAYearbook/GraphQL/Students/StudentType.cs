using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using HotChocolate;
using HotChocolate.Types;
using MSAYearbook.Data;
using MSAYearbook.Models;
using MSAYearbook.GraphQL.Projects;
using MSAYearbook.GraphQL.Comments;

namespace MSAYearbook.GraphQL.Students
{
    public class StudentType : ObjectType<Student>
    {
        protected override void Configure(IObjectTypeDescriptor<Student> descriptor)
        {
            descriptor.Field(s => s.Id).Type<NonNullType<IdType>>();
            descriptor.Field(s => s.Name).Type<NonNullType<StringType>>();
            descriptor.Field(s => s.GitHub).Type<NonNullType<StringType>>();
            descriptor.Field(s => s.ImageURI).Type<NonNullType<StringType>>();

            descriptor
                .Field(s => s.Projects)
                .ResolveWith<Resolvers>(r => r.GetProjects(default!, default!, default))
                .UseAppDbContext<AppDbContext>()
                .Type<NonNullType<ListType<NonNullType<ProjectType>>>>();

            descriptor
                .Field(s => s.Comments)
                .ResolveWith<Resolvers>(r => r.GetComments(default!, default!, default))
                .UseAppDbContext<AppDbContext>()
                .Type<NonNullType<ListType<NonNullType<CommentType>>>>();
        }

        private class Resolvers
        {
            public async Task<IEnumerable<Project>> GetProjects(Student student, [ScopedService] AppDbContext context,
               CancellationToken cancellationToken)
            {
                return await context.Projects.Where(c => c.StudentId == student.Id).ToArrayAsync(cancellationToken);
            }

            public async Task<IEnumerable<Comment>> GetComments(Student student, [ScopedService] AppDbContext context,
               CancellationToken cancellationToken)
            {
                return await context.Comments.Where(c => c.StudentId == student.Id).ToArrayAsync(cancellationToken);
            }
        }

    }
}