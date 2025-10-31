using LibraryManagementBackEnd.Data;
using LibraryManagementBackEnd.Models;
using LibraryManagementBackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace LibraryManagementBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IUserGeneratorService _gen;
        private readonly IMemoryCache _cache;
        private readonly ILogger<UsersController> _logger;
        private const string UsersCacheKey = "all_users_cache";

        public UsersController(AppDbContext db, IUserGeneratorService gen, IMemoryCache cache, ILogger<UsersController> logger)
        {
            _db = db;
            _gen = gen;
            _cache = cache;
            _logger = logger;
        }

        [HttpPost("create-user")]      
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            user.TimeStamp = DateTime.UtcNow;

            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            // Invalidate cache
            _cache.Remove(UsersCacheKey);

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }



        [HttpPost("create-bulk-users")]
        public async Task<IActionResult> CreateBulkUsers()
        {
            var users = _gen.GenerateUsers(10_000).ToList();

            // Use Bulk insert pattern — EF Core AddRangeAsync
            await _db.Users.AddRangeAsync(users);
            await _db.SaveChangesAsync();

            _cache.Remove(UsersCacheKey);
            _logger.LogInformation("Inserted {count} users", users.Count);
            return Ok(new { inserted = users.Count });
        }


        [HttpGet("fetch-users")]
        public async Task<IActionResult> FetchUsers(int from = 1, int to = 100)
        {
            if (from < 1) from = 1;
            if (to < from) to = from;
            if (to - from > 5000) to = from + 5000;

            int skip = from - 1;
            int take = to - from + 1;

            var totalCount = await _db.Users.CountAsync();

            var users = await _db.Users
                .AsNoTracking()
                .OrderBy(u => u.Id) // ✅ sequential order
                .Skip(skip)
                .Take(take)
                .Select(u => new
                {
                    u.Id,
                    u.Name,
                    u.Email,
                    u.Age,
                    u.TimeStamp
                })
                .ToListAsync();

            return Ok(new
            {
                from,
                to,
                count = users.Count,
                totalCount,
                users
            });
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var u = await _db.Users.FindAsync(id);
            if (u == null) return NotFound();
            return Ok(u);
        }
    }
}
