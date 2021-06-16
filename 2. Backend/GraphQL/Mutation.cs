using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HotChocolate;
using HotChocolate.Data;
using Visual_Studio_Projects.Data;
using Visual_Studio_Projects.Models;
using Visual_Studio_Projects.GraphQL.Projects;
using Visual_Studio_Projects.GraphQL.Students;
using Visual_Studio_Projects.GraphQL.Comments;

namespace Visual_Studio_Projects.GraphQL
{
    public class Mutation
    {
        [UseDbContext(typeof(AppDbContext))]
        public async Task<Project> AddProjectAsync(AddProjectInput input,
        [ScopedService] AppDbContext context)
        {
            var project = new Project
            {
                Name = input.Name,
                Description = input.Description,
                Link = input.Link,
                Year = (Year)Enum.Parse(typeof(Year), input.Year),
                StudentId = Int32.Parse(input.StudentId),
                Modified = DateTime.Now,
                Created = DateTime.Now,
            };

            await context.Projects.AddAsync(project);
            await context.SaveChangesAsync();

            return project;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<Student> AddStudentAsync(AddStudentInput input,
        [ScopedService] AppDbContext context)
        {
            var student = new Student
            {
                Name = input.Name,
                GitHub = input.GitHub,
                ImageURI = input.ImageURI,
            };

            await context.Students.AddAsync(student);
            await context.SaveChangesAsync();

            return student;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<Comment> AddCommentAsync(AddCommentInput input,
        [ScopedService] AppDbContext context)
        {
            var comment = new Comment
            {
                Content = input.Content,
                ProjectId = Int32.Parse(input.ProjectId),
                StudentId = Int32.Parse(input.StudentId),
                Modified = DateTime.Now,
                Created = DateTime.Now,
            };

            await context.Comments.AddAsync(comment);
            await context.SaveChangesAsync();

            return comment;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<Project> EditProjectAsync(EditProjectInput input,
        [ScopedService] AppDbContext context)
        {
            using (var transaction = context.Database.BeginTransaction())
            {
                try
                {
                    var project = await context.Projects.FirstOrDefaultAsync(p => p.Id == Int32.Parse(input.ProjectId));

                    project.Name = input.Name ?? project.Name;
                    project.Description = input.Description ?? project.Description;
                    project.Link = input.Link ?? project.Link;
                    project.Modified = DateTime.Now;

                    await context.Projects.AddAsync(project);
                    await context.SaveChangesAsync();

                    transaction.Commit();
                    return project;
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<Student> EditStudentAsync(EditStudentInput input,
        [ScopedService] AppDbContext context)
        {
            using (var transaction = context.Database.BeginTransaction())
            {
                try
                {
                    var student = await context.Students.FirstOrDefaultAsync(p => p.Id == Int32.Parse(input.StudentId));

                    student.Name = input.Name ?? student.Name;
                    student.GitHub = input.GitHub ?? student.GitHub;
                    student.ImageURI = input.ImageURI ?? student.ImageURI;

                    await context.Students.AddAsync(student);
                    await context.SaveChangesAsync();

                    transaction.Commit();
                    return student;
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<Comment> EditCommentAsync(EditCommentInput input,
        [ScopedService] AppDbContext context)
        {
            using (var transaction = context.Database.BeginTransaction())
            {
                try
                {
                    var comment = await context.Comments.FirstOrDefaultAsync(p => p.Id == Int32.Parse(input.CommentId));

                    comment.Content = input.Content ?? comment.Content;

                    await context.Comments.AddAsync(comment);
                    await context.SaveChangesAsync();

                    transaction.Commit();
                    return comment;
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }
    }
}