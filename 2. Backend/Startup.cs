using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using HotChocolate;
using Microsoft.EntityFrameworkCore;
using Visual_Studio_Projects.Data;
using Visual_Studio_Projects.DataLoader;
using Visual_Studio_Projects.GraphQL;
using Visual_Studio_Projects.GraphQL.Projects;
using Visual_Studio_Projects.GraphQL.Students;
using Visual_Studio_Projects.GraphQL.Comments;

namespace Visual_Studio_Projects
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services
                .AddCors(o =>
                    o.AddDefaultPolicy(b =>
                        b.AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin()));

            services.AddPooledDbContextFactory<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SQLDatabase")));
            services
                .AddGraphQLServer()
                .AddAuthorization()
                .AddQueryType(d => d.Name("Query"))
                    .AddTypeExtension<ProjectQueries>()
                    .AddTypeExtension<StudentQueries>()
                    .AddTypeExtension<CommentQueries>()
                .AddMutationType(d => d.Name("Mutation"))
                    .AddTypeExtension<ProjectMutation>()
                    .AddTypeExtension<StudentMutation>()
                    .AddTypeExtension<CommentMutation>()
                .AddType<ProjectType>()
                .AddType<StudentType>()
                .AddType<CommentType>()
                .AddFiltering()
                .AddSorting()
                .AddDataLoader<ProjectByIdDataLoader>()
                .AddDataLoader<StudentByIdDataLoader>()
                .AddDataLoader<CommentByIdDataLoader>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app
                .UseRouting()
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapGraphQL();
                });
        }
    }
}
