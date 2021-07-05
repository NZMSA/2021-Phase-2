using System.Collections.Generic;
using Visual_Studio_Projects.Common;
using Visual_Studio_Projects.Models;

namespace Visual_Studio_Projects.GraphQL.Projects
{
    public class EditProjectPayload : ProjectPayloadBase
    {
        public EditProjectPayload(Project project)
            : base(project)
        {
        }

        public EditProjectPayload(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
    }
}