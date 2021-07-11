using System.Reflection;
using Visual_Studio_Projects.Data;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;

namespace Visual_Studio_Projects.Extensions
{
    public class UseAppDbContextAttribute : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(
            IDescriptorContext context,
            IObjectFieldDescriptor descriptor,
            MemberInfo member)
        {
            descriptor.UseDbContext<AppDbContext>();
        }
    }
}