using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jameel.EntityFrameworkCore.Models
{
    public class User
    {
        public int Id { get; set; }

        [MaxLength(250)]
        public string FirstName { get; set; }

        [MaxLength(250)]
        public string LastName { get; set; }
        public DateTime Dob { get; set; }

        [MaxLength(20)]
        public string PhoneNumber { get; set; }

        [MaxLength(300)]
        public string Address { get; set; }
    }
}
