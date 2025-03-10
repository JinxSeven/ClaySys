USE [master]
GO
/****** Object:  Database [TaskTracker]    Script Date: 07-03-2025 8.01.01 PM ******/
CREATE DATABASE [TaskTracker]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TaskTracker', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\TaskTracker.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TaskTracker_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\TaskTracker_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [TaskTracker] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TaskTracker].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TaskTracker] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TaskTracker] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TaskTracker] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TaskTracker] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TaskTracker] SET ARITHABORT OFF 
GO
ALTER DATABASE [TaskTracker] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TaskTracker] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TaskTracker] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TaskTracker] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TaskTracker] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TaskTracker] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TaskTracker] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TaskTracker] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TaskTracker] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TaskTracker] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TaskTracker] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TaskTracker] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TaskTracker] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TaskTracker] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TaskTracker] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TaskTracker] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TaskTracker] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TaskTracker] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [TaskTracker] SET  MULTI_USER 
GO
ALTER DATABASE [TaskTracker] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TaskTracker] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TaskTracker] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TaskTracker] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TaskTracker] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [TaskTracker] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'TaskTracker', N'ON'
GO
ALTER DATABASE [TaskTracker] SET QUERY_STORE = OFF
GO
USE [TaskTracker]
GO
/****** Object:  Table [dbo].[Activities]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Activities](
	[id] [uniqueidentifier] NOT NULL,
	[task_id] [uniqueidentifier] NOT NULL,
	[activity_title] [varchar](50) NOT NULL,
	[description] [varchar](200) NOT NULL,
	[hours] [decimal](4, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clients](
	[id] [uniqueidentifier] NOT NULL,
	[client_name] [nvarchar](100) NOT NULL,
	[contact_mail] [nvarchar](255) NULL,
	[contact_phone] [nvarchar](20) NULL,
	[created_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Projects](
	[id] [uniqueidentifier] NOT NULL,
	[project_name] [nvarchar](100) NOT NULL,
	[description] [nvarchar](max) NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL,
	[client_id] [uniqueidentifier] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tasks]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tasks](
	[id] [uniqueidentifier] NOT NULL,
	[user_id] [uniqueidentifier] NOT NULL,
	[client_name] [varchar](50) NOT NULL,
	[project_name] [varchar](50) NOT NULL,
	[task_title] [varchar](50) NOT NULL,
	[hours] [decimal](4, 2) NOT NULL,
	[date_time] [datetime] NOT NULL,
	[assigned_to] [varchar](50) NOT NULL,
	[assigned_by] [varchar](50) NOT NULL,
	[task_state] [varchar](50) NULL,
	[priority] [varchar](25) NULL,
	[description] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [uniqueidentifier] NOT NULL,
	[username] [varchar](25) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[is_admin] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Activities] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Clients] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[Tasks] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Activities]  WITH CHECK ADD FOREIGN KEY([task_id])
REFERENCES [dbo].[Tasks] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Clients] FOREIGN KEY([client_id])
REFERENCES [dbo].[Clients] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Projects] CHECK CONSTRAINT [FK_Projects_Clients]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])
ON DELETE CASCADE
GO
/****** Object:  StoredProcedure [dbo].[usp_AddActivity]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_AddActivity]
@task_id UNIQUEIDENTIFIER,
@activity_title VARCHAR(50),
@description VARCHAR(200),
@hours DECIMAL(4, 2)
AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM Tasks WHERE id = @task_id)
	BEGIN
		RAISERROR('Task does not exist', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		INSERT INTO Activities (task_id, activity_title, description, hours)
		VALUES (@task_id, @activity_title, @description, @hours)
	END
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_AddTask]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_AddTask]
@user_id UNIQUEIDENTIFIER,
@client_name VARCHAR(50),
@project_name VARCHAR(50),
@task_title VARCHAR(50),
@hours DECIMAL(4, 2),
@date_time DATETIME,
@assigned_to VARCHAR(50), 
@assigned_by VARCHAR(50),
@task_state VARCHAR(50),
@priority VARCHAR(25),
@description VARCHAR(200),
@task_id UNIQUEIDENTIFIER OUTPUT
AS
BEGIN
	IF NOT EXISTS
	(
		SELECT 1 FROM Users WHERE id = @user_id 
	)
	BEGIN
		RAISERROR('User does not exist!', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		DECLARE @InsertedTask TABLE (task_id UNIQUEIDENTIFIER)
		INSERT INTO Tasks 
		( 
			user_id, client_name, project_name,
			task_title, hours, date_time,
			assigned_to, assigned_by, task_state,
			priority, description
		)
		OUTPUT INSERTED.id INTO @InsertedTask
		VALUES
		(
			@user_id, @client_name, @project_name,
			@task_title, @hours, @date_time,
			@assigned_to, @assigned_by, @task_state,
			@priority, @description
		)
		SELECT @task_id = task_id FROM @InsertedTask;
	END
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_AddUser]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_AddUser]
@username VARCHAR(25),
@email VARCHAR(50),
@password VARCHAR(255),
@is_admin BIT
AS
BEGIN
	SET XACT_ABORT ON;
	IF NOT EXISTS
	(
		SELECT 1 FROM Users 
		WHERE email = @email OR username = @username
	)
	BEGIN
		INSERT INTO Users (userName, email, password, is_admin)
		VALUES (@username, @email, @password, @is_admin);
	END
	ELSE
	BEGIN
		RAISERROR('Email or username already taken!', 16, 1);
		RETURN;
	END
END
GO
/****** Object:  StoredProcedure [dbo].[usp_DeleteTask]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_DeleteTask]
@task_id UNIQUEIDENTIFIER
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Tasks WHERE id =  @task_id)
	BEGIN
		RAISERROR('Task does not exist', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		DELETE Tasks
		WHERE id = @task_id;
	END
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_EditTask]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_EditTask]
@task_id UNIQUEIDENTIFIER,
@client_name VARCHAR(50),
@project_name VARCHAR(50),
@task_title VARCHAR(50),
@hours DECIMAL(10, 2),
@date_time DATETIME,
@assigned_to VARCHAR(50), 
@assigned_by VARCHAR(50),
@task_state VARCHAR(50),
@priority VARCHAR(25),
@description VARCHAR(200)
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Tasks WHERE id = @task_id)
	BEGIN
		RAISERROR('Task does not exist', 16, 1);
		RETURN;
	END
	ELSE
	BEGIN
		UPDATE Tasks
		SET
			client_name = ISNULL(@client_name, client_name),
			project_name = ISNULL(@project_name, project_name),
			task_title = ISNULL(@task_title, task_title),
			hours = ISNULL(@hours, hours),
			date_time = ISNULL(@date_time, date_time),
			assigned_to = ISNULL(@assigned_to, assigned_to),
			assigned_by = ISNULL(@assigned_by, assigned_by),
			task_state = ISNULL(@task_state, task_state),
			priority = ISNULL(@priority, priority),
			description = ISNULL(@description, description)
		WHERE id = @task_id;
	END
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_GetAdmins]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_GetAdmins]
AS
BEGIN
	SELECT username, id FROM Users
	WHERE is_admin = 1;
END
GO
/****** Object:  StoredProcedure [dbo].[usp_GetLoggedUser]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_GetLoggedUser]
@username VARCHAR(50),
@password VARCHAR(255)
AS
BEGIN
	IF EXISTS 
	(
		SELECT 1 FROM Users WHERE username = @username
		AND password = @password
	)
	BEGIN
		SELECT * FROM Users WHERE username = @username
		AND password = @password	
	END
	ELSE
	BEGIN
		RAISERROR('Invalid credentials', 16, 1);
		RETURN;
	END
END
GO
/****** Object:  StoredProcedure [dbo].[usp_GetUsers]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_GetUsers]
AS
BEGIN
	SELECT username, id FROM Users
	WHERE is_admin = 0;
END
GO
/****** Object:  StoredProcedure [dbo].[usp_GetUserTaskState]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_GetUserTaskState]
AS
BEGIN
	SELECT usr.id, usr.username, usr.email, tsk.task_state
	FROM Users AS usr
	JOIN Tasks AS tsk ON usr.id = tsk.user_id;
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_GetUserTaskStats]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_GetUserTaskStats]
AS
BEGIN
    WITH TaskSummary AS (
        SELECT 
            user_id, 
            COUNT(*) AS total_tasks,
            SUM(CASE WHEN task_state = 'new' THEN 1 ELSE 0 END) AS new_tasks,
            SUM(CASE WHEN task_state = 'complete' THEN 1 ELSE 0 END) AS complete_tasks,
            SUM(CASE WHEN task_state = 'active' THEN 1 ELSE 0 END) AS active_tasks
        FROM Tasks
        GROUP BY user_id
    )
    SELECT 
        U.username, 
        U.email, 
        U.is_admin, 
        ISNULL(T.user_id, U.id) AS user_id, -- Use user ID from Users table if no tasks exist
        ISNULL(T.total_tasks, 0) AS total_tasks, -- Default to 0 if no tasks
        ISNULL((T.new_tasks * 100.0 / NULLIF(T.total_tasks, 0)), 0) AS new_percentage, -- Handle division by zero
        ISNULL((T.complete_tasks * 100.0 / NULLIF(T.total_tasks, 0)), 0) AS complete_percentage, -- Handle division by zero
        ISNULL((T.active_tasks * 100.0 / NULLIF(T.total_tasks, 0)), 0) AS active_percentage -- Handle division by zero
    FROM Users U
    LEFT JOIN TaskSummary T ON U.id = T.user_id; -- Include all users, even those with no tasks
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_UpdateTaskState]    Script Date: 07-03-2025 8.01.01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_UpdateTaskState]
@id UNIQUEIDENTIFIER,
@task_state varchar(50)
AS
BEGIN
	IF EXISTS (SELECT 1 FROM Tasks WHERE id = @id)
	BEGIN
		UPDATE Tasks
			SET task_state = ISNULL(@task_state, task_state)
			WHERE id = @id;
	END
	ELSE
	BEGIN
		RAISERROR('Task does not exist', 16, 1);
	END
END
GO
USE [master]
GO
ALTER DATABASE [TaskTracker] SET  READ_WRITE 
GO
