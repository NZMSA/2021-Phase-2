using System.Collections.Generic;
using Visual_Studio_Projects.Common;
using Visual_Studio_Projects.Models;

namespace Visual_Studio_Projects.GraphQL.Students
{
    public class EditStudentPayload : StudentPayloadBase
    {
        public EditStudentPayload(Student student)
            : base(student)
        {
        }

        public EditStudentPayload(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
    }
}