using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using MSAYearbook.Models;
using MSAYearbook.Data;
using MSAYearbook.Extensions;

namespace MSAYearbook.GraphQL.Students
{
    [ExtendObjectType(name: "Mutation")]
    public class StudentMutations
    {
        [UseAppDbContext]
        public async Task<Student> AddStudentAsync(AddStudentInput input,
        [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var student = new Student
            {
                Name = input.Name,
                GitHub = input.GitHub,
                ImageURI = input.ImageURI,
            };

            context.Students.Add(student);
            await context.SaveChangesAsync(cancellationToken);

            return student;
        }

        [UseAppDbContext]
        public async Task<Student> EditStudentAsync(EditStudentInput input,
                [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var student = await context.Students.FindAsync(int.Parse(input.StudentId));

            student.Name = input.Name ?? student.Name;
            student.GitHub = input.GitHub ?? student.GitHub;
            student.ImageURI = input.ImageURI ?? student.ImageURI;

            context.Students.Add(student);
            await context.SaveChangesAsync(cancellationToken);

            return student;
        }
    }
}