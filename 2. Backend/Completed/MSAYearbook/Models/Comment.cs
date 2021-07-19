using System;
using System.ComponentModel.DataAnnotations;

namespace MSAYearbook.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public int ProjectId { get; set; }

        public Project Project { get; set; }

        [Required]
        public int StudentId { get; set; }

        public Student Student { get; set; }

        public DateTime Modified { get; set; }

        public DateTime Created { get; set; }

    }
}
