using System.Collections.Generic;
using Visual_Studio_Projects.Common;
using Visual_Studio_Projects.Models;

namespace Visual_Studio_Projects.GraphQL.Students
{
    public class AddStudentPayload : StudentPayloadBase
    {
        public AddStudentPayload(Student student)
            : base(student)
        {
        }

        public AddStudentPayload(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
    }
}