using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Visual_Studio_Projects.Models
{

    public class Student
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string GitHub { get; set; }

        public string ImageURI { get; set; }

        public ICollection<Project> Projects { get; set; } = new List<Project>();

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
