using Visual_Studio_Projects.Models;
using Microsoft.EntityFrameworkCore;

namespace Visual_Studio_Projects.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Project> Projects { get; set; } = default!;
        public DbSet<Comment> Comments { get; set; } = default!;
        public DbSet<Student> Students { get; set; } = default!;

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
                .HasForeignKey(c => c.ProjectId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}