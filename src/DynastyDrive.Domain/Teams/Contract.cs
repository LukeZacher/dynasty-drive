namespace DynastyDrive.Domain.Teams;

public class Contract
{
    public const int MaxYears = 10;

    private readonly List<ContractYear> _years = new();

    public int Id { get; private set; }
    public int TeamId { get; private set; }
    public int PlayerId { get; private set; }
    public int FirstSeasonYear => _years[0].SeasonYear;
    public int LastSeasonYear => _years[^1].SeasonYear;
    public IReadOnlyCollection<ContractYear> Years => _years.AsReadOnly();

    internal Contract(
        int teamId,
        int playerId,
        int firstSeasonYear,
        IReadOnlyList<decimal> yearlySalaries
    )
    {
        if (yearlySalaries.Count < 1 || yearlySalaries.Count > MaxYears)
            throw new ArgumentException(
                $"Invalid contract length ({yearlySalaries.Count} years). Must be between 1 and {MaxYears} years.",
                nameof(yearlySalaries)
            );

        for (int i = 0; i < yearlySalaries.Count; i++)
        {
            _years.Add(new ContractYear(firstSeasonYear + i, yearlySalaries[i]));
        }

        TeamId = teamId;
        PlayerId = playerId;
    }

    public decimal SalaryFor(int seasonYear) =>
        _years.FirstOrDefault(y => y.SeasonYear == seasonYear)?.Salary ?? 0;

    public bool OverlapsWith(Contract other)
    {
        return FirstSeasonYear <= other.LastSeasonYear && other.FirstSeasonYear <= LastSeasonYear;
    }
}
