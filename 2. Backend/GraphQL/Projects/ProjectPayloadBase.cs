using System.Collections.Generic;
using Visual_Studio_Projects.Common;
using Visual_Studio_Projects.Models;

namespace Visual_Studio_Projects.GraphQL.Projects
{
    public class ProjectPayloadBase : Payload
    {
        protected ProjectPayloadBase(Project project)
        {
            Project = project;
        }

        protected ProjectPayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        public Project? Project { get; }
    }
}