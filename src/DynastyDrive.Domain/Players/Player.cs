using DynastyDrive.Domain.Teams;

namespace DynastyDrive.Domain.Players;

public class Player
{
    public int Id { get; private set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public DateOnly DateOfBirth { get; private set; }
    public Position Position { get; private set; }
    public PlayerStatus Status { get; private set; }
    public int? TeamId { get; private set; }

    public Player(string firstName, string lastName, DateOnly dateOfBirth, Position position)
    {
        if (string.IsNullOrWhiteSpace(firstName))
            throw new ArgumentException("First name is required.", nameof(firstName));
        if (string.IsNullOrWhiteSpace(lastName))
            throw new ArgumentException("Last name is required.", nameof(lastName));
        if (dateOfBirth == default)
            throw new ArgumentException("Date of birth is required.", nameof(dateOfBirth));
        if (!Enum.IsDefined(position))
            throw new ArgumentOutOfRangeException(nameof(position), position, "Unknown position.");

        FirstName = firstName;
        LastName = lastName;
        DateOfBirth = dateOfBirth;
        Position = position;
        Status = PlayerStatus.Prospect;
    }

    public void JoinTeam(Contract contract)
    {
        if (Status is not (PlayerStatus.FreeAgent or PlayerStatus.Prospect))
            throw new InvalidOperationException($"Player with {Status} status cannot join a team.");

        if (contract.PlayerId != Id)
            throw new ArgumentException(
                "Failed to join team: contract does not belong to player.",
                nameof(contract)
            );

        TeamId = contract.TeamId;
        Status = PlayerStatus.Active;
    }

    public void Release()
    {
        if (Status != PlayerStatus.Active)
            throw new InvalidOperationException($"Cannot release a player with status {Status}.");

        Status = PlayerStatus.FreeAgent;
        TeamId = null;
    }

    public void Retire()
    {
        if (Status == PlayerStatus.Retired)
            throw new InvalidOperationException("Player is already retired.");

        Status = PlayerStatus.Retired;
        TeamId = null;
    }
}
