# Implement Queries

![1-introduction-to-msa-yearbook/entity.png](1-introduction-to-msa-yearbook/entity.png)

1. Let's define our relational data

   Add a new item Class `Project.cs` in the `Model` directory using the following code:

   ```csharp
   using System;
   using System.Collections.Generic;
   using System.ComponentModel.DataAnnotations;

   namespace Visual_Studio_Projects.Models
   {
       public enum Year
       {
           YEAR_2021
       }

       public class Project
       {
           [Key]
           public int Id { get; set; }

           [Required]
           public string Name { get; set; } = null!;

           [Required]
           public string Description { get; set; } = null!;

           [Required]
           public string Link { get; set; } = null!;

           [Required]
           public Year Year { get; set; }

           [Required]
           public int StudentId { get; set; }

           public Student Student { get; set; } = null!;

           public DateTime Modified { get; set; }

           public DateTime Created { get; set; }

           public ICollection<Comment> Comments { get; set; } = new List<Comment>();
       }
   }
   ```

   Add a new item Class `Comment.cs` in the `Model` directory using the following code:

   ```csharp
   using System;
   using System.ComponentModel.DataAnnotations;

   namespace Visual_Studio_Projects.Models
   {
       public class Comment
       {
           [Key]
           public int Id { get; set; }

           [Required]
           public string Content { get; set; } = null!;

           [Required]
           public int ProjectId { get; set; }

           public Project Project { get; set; } = null!;

           [Required]
           public int StudentId { get; set; }

           public Student Student { get; set; } = null!;

           public DateTime Modified { get; set; }

           public DateTime Created { get; set; }

       }
   }
   ```

   Edit `Student.cs` in the `Model` with the following

   ```csharp
   using System.Collections.Generic;
   using System.ComponentModel.DataAnnotations;

   namespace MSAYearbook.Models
   {
       public class Student
       {
           [Key]
           public int Id { get; set; }

           [Required]
           public string Name { get; set; }

           [Required]
           public string GitHub { get; set; }

           public string ImageURI { get; set; }

           public ICollection<Project> Projects { get; set; } = new List<Project>();

           public ICollection<Comment> Comments { get; set; } = new List<Comment>();
       }
   }
   ```

2. We want to add our newly defined models and the foreign key relationship between them in `AppDbContext.cs` .

   Edit `AppDbContext.cs` in `Data`

   ```csharp
   using Visual_Studio_Projects.Models;
   using Microsoft.EntityFrameworkCore;

   namespace MSAYearbook.Data
   {
       public class AppDbContext : DbContext
       {
           public AppDbContext(DbContextOptions options) : base(options) { }

           public DbSet<Project> Projects { get; set; }
           public DbSet<Comment> Comments { get; set; }
           public DbSet<Student> Students { get; set; }

           protected override void OnModelCreating(ModelBuilder modelBuilder)
           {
               modelBuilder.Entity<Project>()
                   .HasOne(p => p.Student)
                   .WithMany(s => s.Projects)
                   .HasForeignKey(p => p.StudentId);

               modelBuilder.Entity<Comment>()
                   .HasOne(c => c.Student)
                   .WithMany(s => s.Comments)
                   .HasForeignKey(c => c.StudentId)
                   .OnDelete(DeleteBehavior.NoAction);

               modelBuilder.Entity<Comment>()
                   .HasOne(c => c.Project)
                   .WithMany(p => p.Comments)
                   .HasForeignKey(c => c.ProjectId);
           }
       }
   }
   ```

   > You would notice`.OnDelete(DeleteBehavior.NoAction);` is only used on Comment. This is because Microsoft SQL Server doesn't support multiple cascades on one table. For our case, we will not be removing any students/projects so we can just disable cascade (remove when a parent is removed).

3. Let's make an entity framework migration with our new database schema

   1. In Visual Studio, select the Tools -> NuGet Package Manager -> Package Manager Console
   2. Run the following commands in the Package Manager Console

      ```bash
      Add-Migration AddProjectAndComment
      Update-Database
      ```

4. Now we have implemented all our models. let's run our API again!

   ![6-implement-graphql-queries/Untitled.png](6-implement-graphql-queries/Untitled.png)

   You will notice there are now two objects available under Students. One is Projects and the other are Comments. Under Projects, there are also Comments.

5. For us to use nested queries e.g `Student -> Project -> Comment` . We must introduce resolvers. Resolvers are placed on the types of objects.

   Let's create a type for each object with its corresponding resolvers

   Add a new item Class `StudentType.cs` in the `GraphQL/Student` directory using the following code:

   ```csharp
   using System.Linq;
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
   ```

   Add two new folders inside `GraphQL` called `Projects` and `Comments`

   Add a new item Class `ProjectType.cs` in the `GraphQL/Projects` directory using the following code:

   ```csharp
   using System.Linq;
   using HotChocolate;
   using HotChocolate.Types;
   using MSAYearbook.Data;
   using MSAYearbook.Models;
   using MSAYearbook.GraphQL.Students;
   using MSAYearbook.GraphQL.Comments;

   namespace MSAYearbook.GraphQL.Projects
   {
       public class ProjectType : ObjectType<Project>
       {
           protected override void Configure(IObjectTypeDescriptor<Project> descriptor)
           {
               descriptor.Field(p => p.Id).Type<NonNullType<IdType>>();
               descriptor.Field(p => p.Name).Type<NonNullType<StringType>>();
               descriptor.Field(p => p.Description).Type<NonNullType<StringType>>();
               descriptor.Field(p => p.Link).Type<NonNullType<StringType>>();
               descriptor.Field(p => p.Year).Type<NonNullType<EnumType<Year>>>();

               descriptor
                   .Field(p => p.Student)
                   .ResolveWith<Resolvers>(r => r.GetStudent(default!, default!))
                   .UseDbContext<AppDbContext>()
                   .Type<NonNullType<StudentType>>();

               descriptor
                   .Field(p => p.Comments)
                   .ResolveWith<Resolvers>(r => r.GetComments(default!, default!))
                   .UseDbContext<AppDbContext>()
                   .Type<NonNullType<ListType<NonNullType<CommentType>>>>();

               descriptor.Field(p => p.Modified).Type<NonNullType<DateTimeType>>();
               descriptor.Field(p => p.Created).Type<NonNullType<DateTimeType>>();

           }

           private class Resolvers
           {
               public Student GetStudent(Project project, [ScopedService] AppDbContext context)
               {
                   return context.Students.Find(project.StudentId);
               }

               public IQueryable GetComments(Project project, [ScopedService] AppDbContext context)
               {
                   return context.Comments.Where(c => c.ProjectId == project.Id);
               }
           }
       }
   }
   ```

   Add a new item Class `CommentType.cs` in the `GraphQL/Type` directory using the following code:

   ```csharp
   using System.Linq;
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
                   .ResolveWith<Resolvers>(r => r.GetProject(default!, default!))
                   .UseDbContext<AppDbContext>()
                   .Type<NonNullType<ListType<NonNullType<ProjectType>>>>();

               descriptor
                   .Field(s => s.Student)
                   .ResolveWith<Resolvers>(r => r.GetStudent(default!, default!))
                   .UseDbContext<AppDbContext>()
                   .Type<NonNullType<ListType<NonNullType<CommentType>>>>();

               descriptor.Field(p => p.Modified).Type<NonNullType<DateTimeType>>();
               descriptor.Field(p => p.Created).Type<NonNullType<DateTimeType>>();

           }

           private class Resolvers
           {
               public Project GetProject(Comment Comment, [ScopedService] AppDbContext context)
               {
                   return context.Projects.Find(Comment.ProjectId);
               }

               public Student GetStudent(Comment Comment, [ScopedService] AppDbContext context)
               {
                   return context.Students.Find(Comment.StudentId);
               }
           }
       }
   }
   ```

6. Now all the types and resolvers are setup let's finalise our queries

   Add a new item Class `ProjectQueries.cs` in the `GraphQL/Projects` directory using the following code:

   ```csharp
   using System.Linq;
   using HotChocolate;
   using HotChocolate.Data;
   using HotChocolate.Types;
   using MSAYearbook.Data;
   using MSAYearbook.Models;

   namespace MSAYearbook.GraphQL.Projects
   {
       [ExtendObjectType(name: "Query")]
       public class ProjectQueries
       {
           [UseDbContext(typeof(AppDbContext))]
           [UsePaging]
           public IQueryable<Project> GetProjects([ScopedService] AppDbContext context)
           {
               return context.Projects.OrderBy(c => c.Created);
           }

           public Project GetProject(int id, [ScopedService] AppDbContext context)
           {
               return context.Projects.Find(id);
           }
       }
   }
   ```

   Edit the file `StudentQueries.cs` in the `GraphQL/Students`directory using the following code:

   ```csharp
   using System.Linq;
   using HotChocolate;
   using HotChocolate.Data;
   using HotChocolate.Types;
   using MSAYearbook.Data;
   using MSAYearbook.Models;

   namespace MSAYearbook.GraphQL.Students
   {
       [ExtendObjectType(name: "Query")]
       public class StudentQueries
       {
           [UseDbContext(typeof(AppDbContext))]
           [UsePaging]
           public IQueryable<Student> GetStudents([ScopedService] AppDbContext context)
           {
               return context.Students;
           }

           [UseDbContext(typeof(AppDbContext))]
           public Student GetStudent(int id, [ScopedService] AppDbContext context)
           {
               return context.Students.Find(id);
           }
       }
   }
   ```

7. We must add our types to our GraphQL server by adding it in `Startup.cs`

   ```csharp
   services
   		.AddGraphQLServer()
   		.AddQueryType(d => d.Name("Query"))
   		    .AddTypeExtension<StudentQueries>()
   		.AddType<ProjectType>()
       .AddType<StudentType>()
       .AddType<CommentType>();
   ```

   We must also add in our new queries.

   ```csharp
   services
   		.AddGraphQLServer()
   		.AddQueryType(d => d.Name("Query"))
   		    .AddTypeExtension<ProjectQueries>()
           .AddTypeExtension<StudentQueries>()
   		.AddType<ProjectType>()
   		.AddType<StudentType>()
   		.AddType<CommentType>();
   ```

8. Run the app and check if the schema has been updated (make sure you click the refresh button to reload the schema)

   ![6-implement-graphql-queries/Untitled%201.png](6-implement-graphql-queries/Untitled%201.png)

## Summary

In this part, we looked at how to create multiple Entity Framework models with relations and how these relationships would be in GraphQL. It is an important note that Resolvers are required when calling nested relations as we need to call the child.

[**<< Part #7 - GraphQL Mutations >>**](7-implement-graphql-mutations.md)
