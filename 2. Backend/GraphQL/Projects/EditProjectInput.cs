using HotChocolate;

namespace Visual_Studio_Projects.GraphQL.Projects
{
    public class EditProjectInput
    {
        [GraphQLNonNullType]
        public string ProjectId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Link { get; set; }
    }

}