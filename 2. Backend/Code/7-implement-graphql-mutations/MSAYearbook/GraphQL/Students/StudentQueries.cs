using System.Linq;
using HotChocolate;
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
        public Student GetStudent(int id, [ScopedService] AppDbContext context)
        {
            return context.Students.Find(id);
        }
    }
}