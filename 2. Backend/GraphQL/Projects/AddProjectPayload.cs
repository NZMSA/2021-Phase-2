using System.Collections.Generic;
using Visual_Studio_Projects.Common;
using Visual_Studio_Projects.Models;

namespace Visual_Studio_Projects.GraphQL.Projects
{
    public class AddProjectPayload : ProjectPayloadBase
    {
        public AddProjectPayload(Project project)
            : base(project)
        {
        }

        public AddProjectPayload(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
    }
}