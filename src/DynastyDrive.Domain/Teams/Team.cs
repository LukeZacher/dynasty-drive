namespace DynastyDrive.Domain.Teams;

public class Team
{
    private readonly List<Contract> _contracts = new();

    public int Id { get; private set; }
    public IReadOnlyCollection<Contract> Contracts => _contracts.AsReadOnly();

    // City, Name, Abbreviation, etc. come later

    public Contract SignContract(
        int playerId,
        int firstSeasonYear,
        IReadOnlyList<decimal> yearlySalaries,
        decimal salaryCap
    )
    {
        var contract = new Contract(Id, playerId, firstSeasonYear, yearlySalaries);

        if (_contracts.Any(c => c.PlayerId == contract.PlayerId && c.OverlapsWith(contract)))
            throw new InvalidOperationException(
                "Could not sign player: contract years overlap with player's existing contract."
            );

        decimal capAfterSigning = CapHitFor(firstSeasonYear) + contract.SalaryFor(firstSeasonYear);
        if (capAfterSigning > salaryCap)
            throw new InvalidOperationException(
                $"Signing would put the team at {capAfterSigning:C0}, over the {salaryCap:C0} cap."
            );

        _contracts.Add(contract);
        return contract;
    }

    public decimal CapHitFor(int seasonYear) => _contracts.Sum(c => c.SalaryFor(seasonYear));
}
