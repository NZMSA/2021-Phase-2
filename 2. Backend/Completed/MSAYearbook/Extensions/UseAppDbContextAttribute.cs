
using System.Reflection;
using MSAYearbook.Data;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;

namespace MSAYearbook.Extensions
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
