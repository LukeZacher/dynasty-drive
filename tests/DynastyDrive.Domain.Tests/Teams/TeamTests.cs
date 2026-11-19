using DynastyDrive.Domain.Teams;

namespace DynastyDrive.Domain.Tests.Teams;

public class TeamTests
{
    [Fact]
    public void SignContract_ThatGoesOverCap_Throws()
    {
        decimal salaryCap = 55_000_000m;

        var team = new Team();

        team.SignContract(playerId: 1, 2027, [50_000_000m, 45_000_000m, 45_000_000m], salaryCap);

        var ex = Assert.Throws<InvalidOperationException>(() =>
            team.SignContract(playerId: 2, 2027, [10_000_000m, 12_000_000m], salaryCap)
        );

        Assert.Contains("cap", ex.Message);
    }

    [Fact]
    public void SignContract_ExactlyAtCap_Succeeds()
    {
        decimal salaryCap = 60_000_000m;

        var team = new Team();

        team.SignContract(playerId: 1, 2027, [10_000_000m], salaryCap);
        team.SignContract(playerId: 2, 2027, [20_000_000m, 22_000_000m], salaryCap);
        team.SignContract(playerId: 3, 2027, [30_000_000m, 35_000_000m, 35_000_000m], salaryCap);
    }

    [Fact]
    public void SignContract_WithSamePlayerAndOverlappingSeasons_Throws()
    {
        decimal salaryCap = 150_000_000m;

        var team = new Team();

        team.SignContract(playerId: 1, 2027, [50_000_000m, 45_000_000m, 45_000_000m], salaryCap);

        var ex = Assert.Throws<InvalidOperationException>(() =>
            team.SignContract(playerId: 1, 2028, [30_000_000m, 30_000_000m], salaryCap)
        );

        Assert.Contains("overlap", ex.Message);
    }
}
