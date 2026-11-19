using DynastyDrive.Domain.Players;
using DynastyDrive.Domain.Teams;

namespace DynastyDrive.Domain.Tests.Players;

public class PlayerTests
{
    [Fact]
    public void JoinTeam_WithOwnContract_MakesPlayerActiveOnTeam()
    {
        var player = new Player("Joe", "Smith", new DateOnly(2003, 5, 1), Position.QB);
        var team = new Team();
        Contract contract = team.SignContract(
            player.Id,
            2027,
            [1_000_000m],
            salaryCap: 200_000_000m
        );

        player.JoinTeam(contract);

        Assert.Equal(PlayerStatus.Active, player.Status);
        Assert.Equal(team.Id, player.TeamId);
    }

    [Fact]
    public void Retire_MakesPlayerRetiredAndWithoutTeam()
    {
        var player = new Player("Joe", "Smith", new DateOnly(2003, 5, 1), Position.QB);
        var team = new Team();
        Contract contract = team.SignContract(
            player.Id,
            2027,
            [1_000_000m],
            salaryCap: 200_000_000m
        );

        player.JoinTeam(contract);
        player.Retire();

        Assert.Equal(PlayerStatus.Retired, player.Status);
        Assert.Null(player.TeamId);
    }
}
