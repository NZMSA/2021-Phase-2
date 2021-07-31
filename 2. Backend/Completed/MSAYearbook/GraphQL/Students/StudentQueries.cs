using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using MSAYearbook.Data;
using MSAYearbook.Models;
using MSAYearbook.Extensions;

namespace MSAYearbook.GraphQL.Students
{
    [ExtendObjectType(name: "Query")]
    public class StudentQueries
    {
        [UseAppDbContext]
        [UsePaging]
        public IQueryable<Student> GetStudents([ScopedService] AppDbContext context)
        {
            return context.Students;
        }

        [UseAppDbContext]
        public Student GetStudent([GraphQLType(typeof(NonNullType<IdType>))] string id, [ScopedService] AppDbContext context)
        {
            return context.Students.Find(int.Parse(id));
        }

        [UseAppDbContext]
        [Authorize]
        public Student GetSelf(ClaimsPrincipal claimsPrincipal, [ScopedService] AppDbContext context)
        {
            var studentIdStr = claimsPrincipal.Claims.First(c => c.Type == "studentId").Value;

            return context.Students.Find(int.Parse(studentIdStr));
        }
    }
}
