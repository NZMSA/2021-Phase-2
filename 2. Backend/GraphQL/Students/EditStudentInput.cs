using HotChocolate;

namespace Visual_Studio_Projects.GraphQL.Students
{
    public class EditStudentInput
    {
        [GraphQLNonNullType]
        public string StudentId { get; set; }

        public string Name { get; set; }

        public string GitHub { get; set; }

        public string ImageURI { get; set; }
    }
}