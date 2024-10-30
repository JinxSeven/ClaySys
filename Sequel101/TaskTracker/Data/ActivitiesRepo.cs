﻿using Microsoft.Data.SqlClient;
using System.Diagnostics;

namespace TaskTracker.Data
{
    public class ActivitiesRepo
    {
        private readonly IDataAccess _dataAccess;
        public ActivitiesRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public List<Object> GetTaskActicities(int task_id)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand getTasksCmd = new SqlCommand("SELECT * FROM fnGetUserActivities(@task_id)", connection);
                getTasksCmd.Parameters.AddWithValue("@task_id", task_id);
                var reader = getTasksCmd.ExecuteReader();

                var taskActivities = new List<Object>();
                while (reader.Read())
                {
                    taskActivities.Add(new
                    {
                        Id = reader["id"],
                        TaskId = reader["taskId"],
                        ActivityTitle = reader["activityTitle"],
                        Description = reader["description"],
                        Hours = reader["hours"]
                    });
                }

                reader.Close();
                connection.Close();

                return taskActivities;
            }
        }

        public void AddNewActivity(Models.ActivityData activityData)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand addNewActCmd = new SqlCommand("spAddActivity", connection);
                addNewActCmd.CommandType = System.Data.CommandType.StoredProcedure;
                addNewActCmd.Parameters.AddWithValue("@task_id", activityData.TaskId);
                addNewActCmd.Parameters.AddWithValue("@activity_title", activityData.ActivityTitle);
                addNewActCmd.Parameters.AddWithValue("@description", activityData.Description);
                addNewActCmd.Parameters.AddWithValue("@hours", activityData.Hours);
                addNewActCmd.ExecuteNonQuery();

                connection.Close();
            }
        }

        public void EditActivity(Models.ActivityData activityData)
        {
            using(var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand editActCmd = new SqlCommand("spEditActivity", connection);
                editActCmd.CommandType = System.Data.CommandType.StoredProcedure;
                editActCmd.Parameters.AddWithValue("@activity_id", activityData.Id);
                editActCmd.Parameters.AddWithValue("@activity_title", activityData.ActivityTitle);
                editActCmd.Parameters.AddWithValue("@description", activityData.Description);
                editActCmd.Parameters.AddWithValue("@hours", activityData.Hours);
                editActCmd.ExecuteNonQuery();

                connection.Close();
            }
        }

        //public void DeleteActivity(Models.ActivityData activityData)
        public void DeleteActivity(int activityId)
        {
            using (var connection = _dataAccess.ReturnConn())
            {
                connection.Open();

                SqlCommand deleteActCmd = new SqlCommand("spDeleteActivity", connection);
                deleteActCmd.CommandType = System.Data.CommandType.StoredProcedure;
                deleteActCmd.Parameters.AddWithValue("@activity_id", activityId);
                deleteActCmd.ExecuteNonQuery();

                connection.Close();
            }
        }
    }
}
