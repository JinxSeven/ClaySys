CREATE OR ALTER PROCEDURE usp_GetGameById
@GameId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT * FROM Games g
	WHERE g.GameId = @GameId;
END;