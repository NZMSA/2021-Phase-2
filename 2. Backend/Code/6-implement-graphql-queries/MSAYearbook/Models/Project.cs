using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MSAYearbook.Models
{
    public enum Year
    {
        YEAR_2021
    }

    public class Project
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        [Required]
        public string Link { get; set; } = null!;

        [Required]
        public Year Year { get; set; }

        [Required]
        public int StudentId { get; set; }

        public Student Student { get; set; } = null!;

        public DateTime Modified { get; set; }

        public DateTime Created { get; set; }

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}