-- CreateView
CREATE VIEW "monitoring"."view_realtime_logs" AS
SELECT DISTINCT ON (property_id, service, task)
    id,
    property_id,
    service,
    task,
    datetime,
    status
FROM "monitoring"."logs"
ORDER BY property_id, service, task, datetime DESC;