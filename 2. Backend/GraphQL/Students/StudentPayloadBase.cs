using System.Collections.Generic;
using Visual_Studio_Projects.Common;
using Visual_Studio_Projects.Models;

namespace Visual_Studio_Projects.GraphQL.Students
{
    public class StudentPayloadBase : Payload
    {
        protected StudentPayloadBase(Student student)
        {
            Student = student;
        }

        protected StudentPayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        public Student? Student { get; }
    }
}