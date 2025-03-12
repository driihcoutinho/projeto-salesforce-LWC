public with sharing class TaskController {
    @AuraEnabled
    public static List<Task__c> getTasks() {
        return [SELECT Id, Name, Status__c FROM Task__c];
    }

    @AuraEnabled
    public static Task__c createTask(String taskName) {
        Task__c task = new Task__c(Name = taskName);
        insert task;
        return task;
    }

    @AuraEnabled
    public static Task__c updateTask(Id taskId, String taskName, String status) {
        Task__c task = [SELECT Id, Name, Status__c FROM Task__c WHERE Id = :taskId];
        task.Name = taskName;
        task.Status__c = status;
        update task;
        return task;
    }

    @AuraEnabled
    public static void deleteTask(Id taskId) {
        Task__c task = [SELECT Id FROM Task__c WHERE Id = :taskId];
        delete task;
    }
}
