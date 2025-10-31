using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementBackEnd.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }   // Auto-increment ID

        [Required]
        public string Name { get; set; } = string.Empty;

        public int Age { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        public DateTime TimeStamp { get; set; }
    }
}
