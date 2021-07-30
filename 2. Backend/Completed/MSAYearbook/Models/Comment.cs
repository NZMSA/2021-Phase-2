using System;
using System.ComponentModel.DataAnnotations;
using HotChocolate;

namespace MSAYearbook.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Content { get; set; } = default!;

        [Required]
        [GraphQLIgnore]
        public int ProjectId { get; set; }

        public Project Project { get; set; } = default!;

        [Required]
        public int StudentId { get; set; }

        public Student Student { get; set; } = default!;

        public DateTime Modified { get; set; }

        public DateTime Created { get; set; }

    }
}
