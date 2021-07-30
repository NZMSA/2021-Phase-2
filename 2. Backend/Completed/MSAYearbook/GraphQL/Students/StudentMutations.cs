using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using MSAYearbook.Models;
using MSAYearbook.Data;
using MSAYearbook.Extensions;
using Octokit;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Collections.Generic;
using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Authorization;

namespace MSAYearbook.GraphQL.Students
{
    [ExtendObjectType(name: "Mutation")]
    public class StudentMutations
    {
        [UseAppDbContext]
        [Authorize]
        public async Task<Student> EditSelfAsync(EditSelfInput input, ClaimsPrincipal claimsPrincipal,
                [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var studentIdStr = claimsPrincipal.Claims.First(c => c.Type == "studentId").Value;
            var student = await context.Students.FindAsync(int.Parse(studentIdStr), cancellationToken);

            student.Name = input.Name ?? student.Name;
            student.ImageURI = input.ImageURI ?? student.ImageURI;

            context.Students.Add(student);
            await context.SaveChangesAsync(cancellationToken);

            return student;
        }

        [UseAppDbContext]
        public async Task<LoginPayload> LoginAsync(LoginInput input, [ScopedService] AppDbContext context, CancellationToken cancellationToken)
        {
            var client = new GitHubClient(new ProductHeaderValue("MSA-Yearbook"));

            var request = new OauthTokenRequest(Startup.Configuration["Github:ClientId"], Startup.Configuration["Github:ClientSecret"], input.Code);
            var tokenInfo = await client.Oauth.CreateAccessToken(request);

            if (tokenInfo.AccessToken == null)
            {
                throw new GraphQLRequestException(ErrorBuilder.New()
                    .SetMessage("Bad code")
                    .SetCode("AUTH_NOT_AUTHENTICATED")
                    .Build());
            }

            client.Credentials = new Credentials(tokenInfo.AccessToken);
            var user = await client.User.Current();

            var student = await context.Students.FirstOrDefaultAsync(s => s.GitHub == user.Login, cancellationToken);

            if (student == null)
            {

                student = new Student
                {
                    Name = user.Name ?? user.Login,
                    GitHub = user.Login,
                    ImageURI = user.AvatarUrl,
                };

                context.Students.Add(student);
                await context.SaveChangesAsync(cancellationToken);
            }

            // authentication successful so generate jwt token
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Startup.Configuration["JWT:Secret"]));
            var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>{
                new Claim("studentId", student.Id.ToString()),
            };

            var jwtToken = new JwtSecurityToken(
                "MSA-Yearbook",
                "MSA-Student",
                claims,
                expires: DateTime.Now.AddDays(90),
                signingCredentials: credentials);

            string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            return new LoginPayload(student, token);
        }
    }
}