using LibraryManagementBackEnd.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace LibraryManagementBackEnd.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            mb.Entity<User>().HasKey(u => u.Id);
            mb.Entity<User>().HasIndex(u => u.Email).IsUnique(false);
            base.OnModelCreating(mb);
        }
    }
}
