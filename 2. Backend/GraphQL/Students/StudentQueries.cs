using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Types;
using Visual_Studio_Projects.DataLoader;
using Visual_Studio_Projects.Models;

namespace Visual_Studio_Projects.GraphQL.Students
{
    [ExtendObjectType(name: "Query")]
    public class StudentQueries
    {
        public Task<Student> GetStudentByIdAsync(
            int id,
            StudentByIdDataLoader commentById,
            CancellationToken cancellationToken) =>
            commentById.LoadAsync(id, cancellationToken);
    }
}