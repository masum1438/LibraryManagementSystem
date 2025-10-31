using Bogus;
using LibraryManagementBackEnd.Models;

namespace LibraryManagementBackEnd.Services
{
    public interface IUserGeneratorService
    {
        IEnumerable<User> GenerateUsers(int count);
    }

    public class UserGeneratorService : IUserGeneratorService
    {
        public IEnumerable<User> GenerateUsers(int count)
        {
            var id = 0;
            var faker = new Faker<User>()
               
                .RuleFor(u => u.Name, f => f.Person.FullName)
                .RuleFor(u => u.Age, f => f.Random.Int(18, 80))
                .RuleFor(u => u.Email, (f, u) => f.Internet.Email(u.Name))
                .RuleFor(u => u.TimeStamp, f => f.Date.Recent(30));

            return faker.Generate(count);
        }
    }
}
