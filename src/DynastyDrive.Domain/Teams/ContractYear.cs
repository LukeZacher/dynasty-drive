namespace DynastyDrive.Domain.Teams;

public class ContractYear
{
    public int SeasonYear { get; private set; }
    public decimal Salary { get; private set; }

    internal ContractYear(int seasonYear, decimal salary)
    {
        if (salary < 0)
            throw new ArgumentException("Salary cannot be negative.", nameof(salary));

        SeasonYear = seasonYear;
        Salary = salary;
    }
}
