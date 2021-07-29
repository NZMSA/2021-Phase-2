using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MSAYearbook.Data;
using MSAYearbook.GraphQL.Comments;
using MSAYearbook.GraphQL.Projects;
using MSAYearbook.GraphQL.Students;

namespace MSAYearbook
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddPooledDbContextFactory<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services
                .AddGraphQLServer()
                .AddQueryType(d => d.Name("Query"))
                    .AddTypeExtension<ProjectQueries>()
                    .AddTypeExtension<StudentQueries>()
                .AddMutationType(d => d.Name("Mutation"))
                    .AddTypeExtension<StudentMutations>()
                    .AddTypeExtension<ProjectMutations>()
                    .AddTypeExtension<CommentMutations>()
                .AddType<ProjectType>()
                .AddType<StudentType>()
                .AddType<CommentType>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGraphQL();
            });
        }
    }
}
