
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HotChocolate;
using HotChocolate.Types;

using Visual_Studio_Projects.Models;
using Visual_Studio_Projects.Data;

namespace Visual_Studio_Projects.GraphQL.Students
{
    [ExtendObjectType(name: "Mutation")]
    public class StudentMutation
    {
        [UseAppDbContext]
        public async Task<AddStudentPayload> AddStudentAsync(AddStudentInput input,
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

            return new AddStudentPayload(student);
        }

        [UseAppDbContext]
        public async Task<EditStudentPayload> EditStudentAsync(EditStudentInput input,
                [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var student = await context.Students.FindAsync(Int32.Parse(input.StudentId));

            student.Name = input.Name ?? student.Name;
            student.GitHub = input.GitHub ?? student.GitHub;
            student.ImageURI = input.ImageURI ?? student.ImageURI;

            context.Students.Add(student);
            await context.SaveChangesAsync(cancellationToken);

            return new EditStudentPayload(student);
        }
    }
}